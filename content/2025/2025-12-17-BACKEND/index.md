---
emoji: 📚
title: emit()을 await 해야 할까? – NestJS Kafka와 Observable의 진짜 의미
date: '2025-12-17'
author: JH8459
categories: Backend
---

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-12-01/BACKEND/thumbnail.png"/>

## 📚 Overview

현재 재직 중인 회사에서는 SNS 마케팅을 하나의 상품으로 만들어 판매하는 서비스를 운영하고 있다.

기업이나 개인 사용자는 인스타그램, 블로그, 유튜브 등 다양한 SNS 채널을 대상으로 좋아요, 팔로워, 조회수와 같은 마케팅 상품을 주문할 수 있고 서비스는 이 주문을 실제 SNS 마케팅 작업으로 연결해주는 역할을 한다.

이 과정은 단순히 “주문을 하나 처리하는 것”에서 끝나지 않는다.

- 주문 생성
- 결제 및 포인트 차감
- 주문 상태 관리
- SNS 마케팅 작업 집행
- 경우에 따라 외부 마케팅 솔루션 업체와의 연동

까지 이어지는 여러 단계의 처리 흐름이 존재한다.

특히, SNS 마케팅 작업은 자사에서 운영하는 서버가 직접 처리하기도 하고, 상황에 따라서는 외부 SNS 마케팅 플랫폼(공급자) 에 주문을 전달해 처리를 위임하기도 한다.

이처럼 하나의 주문이 여러 서버, 때로는 외부 시스템까지 거쳐 처리되는 구조이기 때문에 서비스 전반은 자연스럽게 마이크로서비스 아키텍처(MSA) 형태를 띠게 되었다.

이러한 구조에서 주문 서비스와 SNS 처리 주체(자사 서버 혹은 외부 공급자)를 느슨하게 연결하기 위해 서비스에서는 Kafka를 사용해 메시지 기반으로 주문을 전달하고 있다.

<br>
<br>

### 1. Kafka 메시지 전송은 언제 ‘성공’이라고 말할 수 있을까?

---

Kafka로 메시지를 보냈다고 하면, 보통 다음과 같은 상태를 기대한다.

- 메시지가 브로커에 정상적으로 전달되었다.
- 컨슈머가 메시지를 받아 처리를 시작했다.
- 전송 중 문제가 발생했다면 호출한 쪽에서 에러를 인지할 수 있다.

<br>
<br>

하지만 실제 Kafka 기반 시스템에서는 “메시지를 보냈다”는 표현이 생각보다 훨씬 모호하다. 메시지를 어디까지 전달했을 때를 성공으로 볼 것인지, 그리고 그 성공 여부를 누가, 언제 알 수 있는지가 코드만 봐서는 명확하지 않기 때문이다.

NestJS에서 Kafka 메시지를 발행할 때, 보통 다음과 같은 코드를 사용한다.

```ts
@Injectable()
export class SendKafkaService {
  constructor(@Inject(KafkaService) private readonly client: ClientKafka) {}

  execute({ topic, data }: TopicProducerMessage): void {
    this.client.emit(topic, data);
  }
}
```

이 코드는 과연 어디까지 성공한 상태일까?

- Kafka 브로커에 실제로 도달했을까?
- 전송에 실패했다면 에러를 받을 수 있을까?
- 이 시점에 주문 상태를 변경해도 될까?

<br>

이 질문에 답하려면, 먼저 NestJS의 emit()이 무엇을 반환하는지부터 이해해야 한다.

Kafka 이전에, 우리가 다루고 있는 것은 사실 Kafka 이벤트가 아니라 **Observable 객체**이다.

> Observable 이란?
>
> NestJS의 client.emit()은 값을 즉시 반환하지 않는다. 대신 Observable 객체를 반환한다.
> Observable은 간단히 말해 아직 실행되지 않은 비동기 작업의 결과를 담고 있는 컨테이너에 가깝다.
> Observable이 구독(subscribe) 되거나, firstValueFrom, lastValueFrom 등으로 await 되기 전까지는 내부에서 발생한 성공이나 실패가 호출한 쪽으로 전달되지 않는다.

<br>
<br>

### 2. emit()은 내부적으로 무엇을 하고 있을까?

---

앞서 살펴본 것처럼, emit()을 호출했다고 해서 곧바로 “Kafka로 메시지가 성공적으로 전송되었다”고 말하기는 어렵다. 그 이유를 이해하려면 NestJS의 emit()이 내부적으로 어떤 작업을 수행하는지 한 단계만 더 들어가 볼 필요가 있다.

NestJS에서 client.emit()은 단순히 “Kafka로 메시지 하나 날리는 함수”가 아니라, 이벤트 발행 과정을 [RxJS Observable](https://rxjs.dev/guide/observable)로 감싼 인터페이스다.

먼저 Nest의 ClientProxy.emit() 주석엔 이렇게 정의되어 있다.

```ts
// @nestjs/microservices
/**
 * Emits an event to the server/broker.
 * Used for event-driven communication style between microservices.
 * @param pattern Pattern to identify the event
 * @param data Data to be sent
 * @returns Observable that completes when the event is successfully emitted
 */
emit<TResult = any, TInput = any>(pattern: any, data: TInput): Observable<TResult>;
```

즉, emit()은 “값을 즉시 반환”하는 API가 아니라, 이벤트 발행 완료를 표현하는 Observable 객체를 반환해준다.

<br>
<br>

## 🤔 Understanding