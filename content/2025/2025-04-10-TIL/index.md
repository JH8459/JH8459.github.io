---
emoji: 📚
title: NestJS + TypeORM 트랜잭션을 다룰 때 반드시 피해야 할 패턴
date: '2025-04-10'
author: JH8459
categories: TIL
---

![github-blog.png](../../../assets/common/til.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

현재 사내 프레임워크는 NestJS를 사용하고 있으며 클라이언트에게 요청을 받고 응답을 반환하는 **Controller** 클래스와 비즈니스 로직을 담당하는 **Service** 클래스 그리고 최종적으로 데이터베이스에 CRUD 작업을 담당하는 **Repository** 클래스를 사용하는 계층형 아키텍처로 구성하여 사용하고 있다.

단순한 단일 **INSERT**, **UPDATE**를 넘어서, **“모든 작업이 성공해야만 커밋하고, 하나라도 실패하면 전부 롤백”** 되어야 하는 비즈니스 구조는 빈번히 일어난다. <del>(이러한 상황은 실무에서 꽤나 자주 마주친다. 🥲)</del>

이런 경우 **Service** 클래스의 하나의 메서드 안에서 여러 개의 DB 작업을 처리해야 할 때 `typeorm`을 활용해서 트랜잭션을 사용하고 있다.

꼭 이렇게 사용해야만 한다는건 아니지만, 이 점은 꼭 주의해야할 패턴에 대해 느낀점이 있다. 오늘은 이를 간략하게 기록으로 남겨보려한다.

<br>
<br>

### 1. 트랜잭션이란?

---

사실, 우리가 흔히 말하는 트랜잭션(Transaction)은 그다지 어려운 개념이 아니라 "하나의 작업 단위"다.

따라서 데이터베이스 입장에서는 이 작업 단위가 **전부 성공하면 커밋(commit)**, 하나라도 실패하면 **전부 롤백(rollback)** 되어야 한다는 원자성(Atomicity)을 보장해야 한다.

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-04-10-TIL/transaction.png"/>

<center>A, B, C가 개별 작업이 아니라 <strong>하나의 작업 단위</strong>인 경우 트랜잭션 흐름도</center><br><br>

만약, <u><strong>"비회원 유저의 상품 주문 시나리오"</strong></u>가 비즈니스 모델에 필요하다면 이를 단계별로 작성해보면 아래의 흐름으로 구성해볼 수 있다.

> 1. 비회원 유저는 회원가입 없이 구매를 하기 위해 이름, 이메일 정보를 입력한다.
> 2. 상품 구매 정보를 저장한다.
> 3. 추후 구매 정보 추적을 위해 비회원 구매 이력 로그를 저장한다.

<br>
<br>

각각 단계는 개별 작업이 아니므로 하나의 작업 단위로 묶어서 바라봐야 한다.

> 재고 부족으로 구매에 실패하였으나 구매 이력이 남는다면..?? 👀

<br>
<br>

따라서, 이 단계들을 트랜잭션으로 묶어 하나의 작업으로 바라봐야하며 이를 코드로 작성해보면 아래와 같이 구성할 수 있다. (흐름을 이해하기 위한 예시코드이므로 간략히 작성해보았다.)

- **GuestOrderService** 클래스

  ```typescript
  @Injectable()
  export class GuestOrderService {
    constructor(
      private readonly guestOrderRepository: GuestOrderRepository,
      private readonly dataSource: DataSource,
    ) {}

    /**
     * 비회원 유저의 상품 주문 요청 처리
     * - A. 유저 정보 저장
     * - B. 주문 정보 저장
     * - C. 주문 로그 기록
     * 모든 과정이 성공해야만 트랜잭션 커밋
     */
    async processGuestOrder(): Promise<void> {
      // 트랜잭션 시작
      await this.dataSource.transaction(async (manager: EntityManager) => {
        const guestInfo = {
          name: '홍길동',
          email: 'guest@example.com',
        };

        // A. 유저 정보 저장
        const guestUser = await this.guestOrderRepository.createGuestUser(manager, guestInfo);

        const orderInfo = {
          guestUserId: guestUser.id,
          productName: '무선 키보드',
          quantity: 1,
        };

        // B. 주문 정보 저장
        await this.guestOrderRepository.createProductOrder(manager, orderInfo);

        const logInfo = {
          message: `비회원 주문 발생 (ID: ${guestUser.id})`,
          createdAt: new Date(),
        };

        // C. 주문 로그 기록
        await this.guestOrderRepository.createOrderLog(manager, logInfo);
      });
    }
  }
  ```

- **GuestOrderRepository** 클래스

  ```typescript
  @Injectable()
  export class GuestOrderRepository {
    /**
    * 비회원 유저 정보 저장
    */
    async createGuestUser(
      manager: EntityManager,
      userInfo: Partial<GuestUserEntity>,
    ): Promise<GuestUserEntity> {
      const repo = manager.getRepository(GuestUserEntity);
      const user = repo.create(userInfo);

      return await repo.save(user);
    }

    /**
    * 주문 정보 저장
    */
    async createProductOrder(
      manager: EntityManager,
      orderInfo: Partial<ProductOrderEntity>,
    ): Promise<ProductOrderEntity> {
      const repo = manager.getRepository(ProductOrderEntity);
      const order = repo.create(orderInfo);

      return await repo.save(order);
    }

    /**
    * 주문 로그 기록
    */
    async createOrderLog(
      manager: EntityManager,
      logInfo: Partial<OrderLogEntity>,
    ): Promise<void> {
      const repo = manager.getRepository(OrderLogEntity);
      const log = repo.create(logInfo);
      
      await repo.save(log);
    }
  }
  ```
<br>
<br>

위 예시는 하나의 트랜잭션 컨텍스트에서 여러 작업(A, B, C 단계)을 진행하는 예시이다. 비즈니스 모델은 Service에서 담당하고 있으며 트랜잭션 제어를 위해 **EntityManager**를 레포지토리의 각 메서드에 전달하여 작업을 나누되 전체 흐름은 Service에서 제어하도록 구성해보았다.

이 처럼 트랜잭션 처리는 단순히 기술적인 개념을 넘어서 **“실제로 실패하면 어떤 데이터가 남는가?”** 를 고민하는 문제라 생각한다.

위 예시처럼 하나의 주문 요청에서 유저, 주문, 로그가 모두 성공해야만 저장되는 구조는 안정적인 서비스 운영을 위한 기본이 된다.

<br>
<br>

### 2. 트랜잭션의 특징과 피해야할 패턴

---

트랜잭션의 흐름은 기본적으로 순차적이다. 위에서 예시를 들었지만 A → B → C 작업 순서대로 실행되고 중간에 하나라도 실패하면 롤백이 되어야한다.

> 트랜잭션은 단순히 여러 작업을 하나로 묶는 것이 아니라 **하나의 일관된 흐름으로 실행되어야 하는 작업 집합**이다. 즉, 트랜잭션은 **A 작업이 끝난 뒤 B, 그 다음 C**와 같이  **"순차적으로 실행되는 흐름"을 전제로 설계**되어있다.

<br>
<br>

특히 주의해야할 패턴은 `Promise.all()`과 같은 **여러 비동기 작업을 동시에 실행**하는 병렬 처리 방식이다.

이 패턴은 각 작업의 결과가 성공이든 실패든 동시에 진행되며 서로의 실행 결과를 기다리지 않기 때문에 트랜잭션이 의도한 **순차적 흐름**이 무너지고 실패와 커밋 타이밍이 엇갈리면서 데이터 정합성 문제가 발생할 수 있다.

예시를 들어보자면 다음과 같은 상황이 발생할 수 있다.

- **GuestOrderService** 클래스 → `Promise.all()` 문법 적용

  ```typescript
  @Injectable()
  export class GuestOrderService {
    constructor(
      private readonly guestOrderRepository: GuestOrderRepository,
      private readonly dataSource: DataSource,
    ) {}

    /**
     * 비회원 유저의 상품 주문 요청 처리
     * - A. 유저 정보 저장
     * - B. 주문 정보 저장
     * - C. 주문 로그 기록
     * 모든 과정이 성공해야만 트랜잭션 커밋
     */
    async processGuestOrder(): Promise<void> {
      // 트랜잭션 시작
      await this.dataSource.transaction(async (manager: EntityManager) => {
        await Promise.all([
          // A. 유저 정보 저장 → 성공 ✅
          await this.guestOrderRepository.createGuestUser(manager, guestInfo);
          // B. 주문 정보 저장 → 실패 ❌
          await this.guestOrderRepository.createProductOrder(manager, orderInfo);
          // C. 주문 로그 기록 → 이미 실행됨 😱
          await this.guestOrderRepository.createOrderLog(manager, logInfo);
        ]);
      });
    }
  }
  ```

<br>
<br>

위 예시 코드의 실행 결과 기대값은 아래와 같다.

> 1. B에서 에러가 발생하더라도 C가 이미 실행되어 DB에 영향을 줬을 가능성이 존재한다.
> 2. ROLLBACK 타이밍이 어긋나므로 데이터 정합성이 깨진다.

<br>
<br>

위 코드를 실제로 `typeorm`의 로깅 기능을 활성화 한 뒤 실행해보면 `query: ROLLBACK` 로그 이후에도 이미 실행되어 진행 중인 쿼리 로그가 찍히고 있음을 확인 할 수 있다. (아래 로그는 같은 환경을 구성하여 출력해본 예시이다.)

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-04-10-TIL/log.png"/>

<center><u><strong>query: ROLLBACK</strong></u> 로그 이후에도 이미 실행된 쿼리 로그들을 확인할 수 있다. 🥲</center><br><br>

즉, **트랜잭션은 비동기 처리를 허용**하지만 병렬 실행을 전제로 하지 않는다. 내부 흐름은 "차례차례 실행될 것"이라는 가정 위에 작동하므로 사용에 유의해야한다.

<br>
<br>

## 🤔 Understanding

성능을 위해 병렬로 처리하고 싶은 욕구는 항상 생기지만 트랜잭션이 개입되는 순간 안정성 vs 성능의 균형을 따져야 한다. <del>(코드의 문제는 에러로 끝나지만, 데이터 문제는 비즈니스 모델 신뢰성에 영향을 준다.. 😂)</del>

이번 포스팅을 정리하면서 단순히 비즈니스 요구사항에 따라 트랜잭션을 적용하는 것에서 그치지 않고 **트랜잭션을 중심으로 Repository 구조를 어떻게 설계해야 하는지**, 그리고 나아가 별도 트랜잭션 관리 도구 도입 여부까지 고민해보는 계기가 되었다.

아래의 고민들은 아직 정리가 안되어서 추후 포스팅으로 남길 수 있으면 남겨보도록해야겠다.

> 1. 트랜잭션을 고려한 Repository 디자인 패턴 검토
> 2. 별도 라이브러리 도입 검토 (typeorm-transactional)

<br>
<br>

