---
emoji: 📚
title: NestJS Kafka emit(), 어디까지 성공했다고 말할 수 있을까?
date: '2025-12-20'
author: JH8459
categories: Backend
thumbnail: https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-12-20/BACKEND/thumbnail.png
---

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-12-20/BACKEND/banner.png"/>

## 📚 Overview

현재 재직 중인 회사에서는 SNS 마케팅을 하나의 상품으로 만들어 판매하는 서비스를 운영하고 있다.

기업이나 개인 사용자는 인스타그램, 블로그, 유튜브 등 다양한 SNS 채널을 대상으로 좋아요, 팔로워, 조회수와 같은 마케팅 상품을 주문할 수 있고 서비스는 이 주문을 실제 SNS 마케팅 작업으로 연결해주는 역할을 한다.

이 과정은 단순히 "주문을 하나 처리하는 것"에서 끝나지 않는다.

- 주문 생성
- 결제 및 포인트 차감
- 주문 상태 관리
- SNS 마케팅 작업 집행
- 경우에 따라 외부 마케팅 솔루션 업체와의 연동

까지 이어지는 여러 단계의 처리 흐름이 존재한다.

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-12-20/BACKEND/flow.png"/>

특히, SNS 마케팅 작업은 자사에서 운영하는 서버가 직접 처리하기도 하고, 상황에 따라서는 외부 SNS 마케팅 플랫폼(공급자) 에 주문을 전달해 처리를 위임하기도 한다.

이처럼 하나의 주문이 여러 서버, 때로는 외부 시스템까지 거쳐 처리되는 구조이기 때문에 서비스 전반은 자연스럽게 마이크로서비스 아키텍처(MSA) 형태를 띠게 되었다.

이러한 구조에서 주문 서비스와 SNS 처리 주체(자사 서버 혹은 외부 공급자)를 느슨하게 연결하기 위해 서비스에서는 Kafka를 사용해 메시지 기반으로 주문을 전달하고 있다.

<br>
<br>

### 1. Kafka 메시지 전송은 언제 "성공"이라고 말할 수 있을까?

---

Kafka로 메시지를 보냈다고 하면, 보통 다음과 같은 상태를 기대한다.

- 메시지가 브로커에 정상적으로 전달되었다.
- 컨슈머가 메시지를 받아 처리를 시작했다.
- 전송 중 문제가 발생했다면 호출한 쪽에서 에러를 인지할 수 있다.

하지만 실제 Kafka 기반 시스템에서는 "메시지를 보냈다"는 표현이 생각보다 훨씬 모호하다. 메시지를 어디까지 전달했을 때를 성공으로 볼 것인지, 그리고 그 성공 여부를 누가, 언제 알 수 있는지가 코드만 봐서는 명확하지 않기 때문이다.

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

이 질문에 답하려면, 먼저 NestJS의 emit()이 무엇을 반환하는지부터 이해해야 한다.

Kafka 이전에, 우리가 다루고 있는 것은 사실 Kafka 이벤트가 아니라 **Observable 객체**이다.

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-12-20/BACKEND/observable.png"/>

> Observable 이란?
>
> NestJS의 client.emit()은 값을 즉시 반환하지 않는다. 대신 Observable 객체를 반환한다.
> Observable은 간단히 말해 아직 실행되지 않은 비동기 작업의 결과를 담고 있는 컨테이너에 가깝다.
> Observable이 구독(subscribe) 되거나, firstValueFrom, lastValueFrom 등으로 await 되기 전까지는 내부에서 발생한 성공이나 실패가 호출한 쪽으로 전달되지 않는다.

<br>
<br>

### 2. emit()은 내부적으로 무엇을 하고 있을까?

---

앞서 살펴본 것처럼, emit()을 호출했다고 해서 곧바로 "Kafka로 메시지가 성공적으로 전송되었다"고 말하기는 어렵다. 그 이유를 이해하려면 NestJS의 emit()이 내부적으로 어떤 작업을 수행하는지 한 단계만 더 들어가 볼 필요가 있다.

NestJS에서 client.emit()은 단순히 "Kafka로 메시지 하나 날리는 함수"가 아니라, 이벤트 발행 과정을 [RxJS Observable](https://rxjs.dev/guide/observable)로 감싼 인터페이스다.

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

즉, emit()은 "값을 즉시 반환"하는 API가 아니라, 이벤트 발행 완료를 표현하는 Observable 객체를 반환해준다.

<br>
<br>

### 3. 그럼 "emit 성공"은 어디까지를 의미할까?

---

emit()은 Kafka로 이벤트를 발행하기 위한 API다. 하지만 emit()을 호출했다고 해서 그 즉시 "이벤트가 브로커에 도착했다"고 말할 수는 없다.

여기서 중요한 차이는 emit()의 반환값을 어떻게 다루느냐에 있다.

```ts
this.client.emit(topic, payload);
```

위와 같이 emit()을 단순히 호출만 한 경우, 이 코드는 **"이벤트 발행을 시도했다"** 의미에 가깝다. 전송 과정에서 오류가 발생하더라도 그 실패는 Observable 내부에서 처리되며 호출한 쪽에서는 이를 인지하지 못할 수 있다.

반면, 다음과 같이 emit()의 결과를 기다리면 의미가 달라진다.

```ts
import { lastValueFrom } from 'rxjs';

await lastValueFrom(this.client.emit(topic, payload));
```

emit()이 반환하는 Observable은 한 번 결과를 방출하고 complete 되는 단발 스트림이기 때문에, `firstValueFrom` 또는 `lastValueFrom`을 사용해 전송 결과를 기다릴 수 있다.

- emit()만 호출한 경우 → "이벤트를 발행했다"
- emit()이 반환한 Observable 객체를 구독한 경우 → "이벤트가 브로커까지의 전송이 에러 없이 완료되었다"

라고 이해하는 편이 훨씬 정확하다.

<br>
<br>

### 4. emit 결과를 기다려야 하는 경우는 언제일까?

---

그렇다면 자연스럽게 이런 질문이 생긴다.

- 그렇다면 우리는 언제 emit()의 결과를 기다려야 하고, 언제는 굳이 기다리지 않아도 될까?

이 질문에 대한 답은 Kafka의 특성이 아니라, 우리 코드가 전송 결과를 어떻게 사용하고 있는지에 달려 있다.

<!-- 삽화 필요 -->

<br>
<br>

#### 4-1. 결과를 기다리지 않아도 되는 경우

---

다음과 같은 상황이라면, emit()의 결과를 굳이 기다리지 않아도 큰 문제가 없다.

- 이벤트가 단순히 "알림" 성격인 경우
- 전송 실패가 발생해도 치명적이지 않은 경우
- 실패 여부를 별도의 모니터링이나 재처리로 보완하고 있는 경우

예를 들면 다음과 같다.

- 사용자 행동 로그 수집
- 통계용 이벤트 발행
- 실패하더라도 비즈니스 흐름에 직접적인 영향을 주지 않는 비동기 작업

이런 경우에는 이벤트 발행 자체가 핵심 로직이 아니기 때문에, emit()을 **fire-and-forget** 처럼 사용해도 충분히 합리적이다.

<br>
<br>

#### 4-2. 결과를 반드시 기다려야 하는 경우

---

반대로, 다음과 같은 경우라면 emit()의 결과를 기다리지 않는 것은 위험해질 수 있다.

- 이벤트 발행 성공 여부에 따라 상태를 변경하는 경우
- 전송 실패 시 재시도, 보상 처리가 필요한 경우
- "이 이벤트는 반드시 전달되어야 한다"는 비즈니스 요구사항이 있는 경우

예를 들어 이런 코드가 있다고 가정해보자.

```ts
this.client.emit(topic, payload);
order.setPublished();  // 주문 상태 변경
```

이 코드에서 `setPublished()`는 "주문 이벤트가 정상적으로 발행되었다"는 의미로 주문 상태를 변경하는 로직이라고 가정해보자.

emit()의 결과를 기다리지 않는다면 다음과 같은 상황이 발생할 수 있다.

- Kafka 전송은 실패했지만 주문은 이미 "발행 완료" 상태로 변경됨
- 이후 재시도 대상에서도 제외됨

즉, 전송 실패를 인지하지 못한 채 상태만 앞서 나가는 문제가 생길 수 있다.

```ts
import { lastValueFrom } from 'rxjs';

await lastValueFrom(this.client.emit(topic, payload));
order.setPublished();
```

이런 경우에는 위와 같이 emit()의 결과를 명시적으로 기다리는 것이 더 안전하다.

다만, 한 가지는 분명히 짚고 넘어가야 한다. emit()의 결과를 기다린다고 해서 컨슈머의 처리 성공까지 보장되는 것은 아니다.

<br>
<br>

### 5. send vs emit — 우리는 왜 emit을 선택했을까?

---

emit()의 결과를 await 한다고 하면 자연스럽게 이런 질문이 떠오른다.

> "그렇다면 send()를 사용하는 게 더 적절하지 않을까?"

<br>

send()와 emit()은 모두 메시지를 전송하는 API처럼 보이지만, 두 메서드는 전혀 다른 통신 모델과 의도를 전제로 한다.

send()는 상대 서비스의 처리를 전제로 한 **request-response** 방식의 통신이다.

```ts
const result = await this.client.send(pattern, payload);
```

이 방식에서는,

- 요청을 보낸 쪽이 상대 서비스의 응답을 기다리고
- 그 응답을 기준으로 다음 로직을 결정한다.

즉, 두 서비스는 강하게 결합된다.

반면 emit()은 응답을 기대하지 않는 **event-driven** 방식의 통신이다.

```ts
this.client.emit(topic, payload);
```

emit()은,

- "어떤 일이 발생했다"는 사실을 알릴 뿐
- 누가 이 이벤트를 처리할지는 알지 못하고
- 처리 결과 역시 알 필요가 없다

이 차이는 이벤트 기반 DDD 관점에서 더욱 명확해진다. 이벤트는 "다른 컨텍스트가 알아야 할 사실"을 전달하는 역할이지, "무언가를 처리하라고 지시하는 명령"이 아니다.

SNS 마케팅 주문 이벤트 역시 마찬가지였다. 주문 서비스는 "주문이 생성되었다"는 사실을 알릴 뿐, 처리를 누가 담당할지, 언제 어떻게 처리할지는 각각의 컨텍스트(사내 서버 혹은 외부 공급자)의 책임이다.

이런 상황에서 send()를 사용하면 주문 서비스는 자연스럽게 다른 서비스의 처리 결과를 기다리게 되고, 아키텍처가 자연스럽게 **request-response** 형태로 기울 가능성도 생긴다.

우리는 이를 피하고 싶었다.

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-12-20/BACKEND/emit.png"/>
<br>

그래서 선택한 방식이 emit()을 사용하되, 필요할 때만 전송 결과를 await 하는 구조였다.

이 방식은

- 이벤트 기반 구조를 유지하면서
- 최소한의 전송 책임만 확인하고
- 이후의 처리는 각 컨텍스트에 위임할 수 있게 해준다

emit() + await는 send()를 대체하기 위한 선택이라기보다는, 이벤트 기반 아키텍처에서 책임 경계를 조금 더 분명히 하기 위한 선택에 가까웠다.

<br>
<br>

## 🤔 Understanding

지금까지 살펴본 내용을 정리하면 다음과 같다.

| 구분        | emit()                     | emit() + await             | send()           |
| --------- | -------------------------- | -------------------------- | ---------------- |
| 메시지 전달 방식     | Event-driven               | Event-driven               | Request-response |
| 응답 기대     | ❌                       | ❌                     | ⭕            |
| await 의미  | 사용하지 않음                    | 전송 실패 여부 확인                | 처리 결과 수신         |
| 전송 성공 의미  | 발행 시도                      | 전송이 에러 없이 완료됨              | 상대 서비스 처리 완료     |
| 컨슈머 처리 보장 | ❌                          | ❌                          | ⭕                |
| 서비스 간 결합도 | 낮음                         | 낮음                         | 높음               |
| DDD 관점    | Domain / Integration Event | Domain / Integration Event | Command          |
| 추천 사용처    | 로그, 알림, 통계                 | 상태 변경이 수반되는 이벤트            | 동기 처리 필요 시       |

<br>

이 표에서 보듯, await를 사용한다고 해서 메시지 전달 방식 자체가 달라지는 것은 아니다. emit() + await 역시 여전히 이벤트 기반 방식이고, 우리가 확인하는 책임의 범위만 조금 달라질 뿐이다.

Kafka 기반의 이벤트 발행에서 “메시지를 보냈다”는 표현은 생각보다 여러 상태를 포함하고 있다.

- emit()을 단순히 호출했는지,
- emit()의 결과를 기다렸는지,
- 혹은 send()를 선택했는지에 따라

확인할 수 있는 범위와 책임의 무게는 조금씩 달라진다.

<br>
<br>

이벤트 기반 구조에서 메시지는 무언가를 처리해 달라는 요청이라기보다는, 어떤 일이 발생했다는 사실을 알리는 쪽에 가깝다.

우리 팀은 이 사실을 전달하는 역할까지만 맡고, 그 이후의 처리는 각 컨텍스트에 자연스럽게 맡기고 싶었다. 그래서 send()보다는 emit()을 선택했고, 상태 변경이 필요한 경우에만 전송 결과를 한 번 더 확인하는 방식을 택했다.

이 글이 Kafka와 NestJS를 처음 접하는 개발자에게는 전송의 의미를 한 번쯤 생각해보는 계기가 되고, 이미 이벤트 기반 구조를 사용하고 있는 팀에게는 각자의 선택을 돌아보는 참고 자료 정도가 되면 좋겠다.