---
emoji: 📚
title: Repository Pattern
date: '2022-05-25'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

- 최근 NestJS + TypeORM 프레임워크로 서버를 구성하며 공부하고있다.

- TypeORM이 Repository Pattern을 기본으로 지향하고 지원하고 있으며 <a href="https://docs.nestjs.com/techniques/database#repository-pattern" target="_blank">NestJS 공식 문서</a>에도 Repository Pattern을 이용한 설계 방식을 안내하고 있다.

- 나 또한 현재 진행 중인 프로젝트에 공식 문서를 읽고 Repository Pattern를 적용해서 개발을 이어나가고 있다.

- 문득 Repository Pattern가 무엇이고 왜 쓰는거지? 가 궁금해졌고 그 과정을 글로 남겨보려한다.

<br>
<br>

### 1. Repository Pattern

---

- 우선 Repository Pattern은 여러 디자인 패턴 중 하나이다.

  ![overview-1](https://user-images.githubusercontent.com/83164003/170282459-fc4d1f03-ef48-485a-b009-f08abd3b915b.png)<br><br>

- 내가 이해한(?)대로 말하자면 실제 데이터가 있는 장소를 추상화하여 **Repository**로 둔 뒤, 해당 장소에서 데이터를 가져오고 가공하는 업무를 전담한다.

- 그렇기에 클라이언트에서는 내가 원하는 데이터의 출처(Local, Remote)라던지, 원본 데이터 속성등을 알아야할 필요가 없다.

- 그저 특정 요청을 **Repository**에 보내면 가공된 원하는 데이터 얻을 수 있게끔 디자인 패턴을 설계하는 구조가 **Repository Pattern**이다.

<br>
<br>

### 2. 실제 프로젝트 적용 예시

---

- 우선 NestJS 프레임워크 강의를 들으며 작성한 **Repository Pattern**이 적용된 샘플 코드를 가져왔다.

  - _boards.service.ts_

    ```ts
    @Injectable()
    export class BoardsService {
      constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
      ) {}

      /* 전달인자로 CreateBoardDTO를 갖는 보드를 생성하는 createBoard 메서드 선언 */
      createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto); // Repository 패턴 적용
      }

    ...
    ```

  - _boards.repository.ts_

    ```ts
    /* Board Entity를 컨트롤하는 Repository를 선언 */
    @EntityRepository(Board)
    export class BoardRepository extends Repository<Board> {
      /* createBoard 메서드, DB 관련 동작은 Repository에서 수행한다 */
      async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        /* title과 description은 구조분해 할당으로 createBoardDto에서 꺼내어서 사용해준다 */
        const { title, description } = createBoardDto;
        const board = this.create({
          title,
          description,
          status: BoardStatus.PUBLIC, // status값은 BoardStatus.PUBLIC으로 초기화한다
        });
        await this.save(board); // board를 데이터베이스에 저장
        return board; // DB에 저장한 board를 반환한다
      }
    }
    ```

- 간단한 코드지만 **Repository Pattern**이 적용된 걸 볼 수 있다.

- **데이터를 원본 저장소에서 꺼내온 뒤 가공해서 제공하는 장소**(boards.repository.ts)와 그 **데이터를 사용하는 장소**(boards.service.ts)를 분리시킨 디자인 패턴임을 알 수 있다.

- TypeORM에서 기본으로 Repository Pattern을 제공하기 때문에 위와 같은 디자인 패턴을 NestJS + TypeORM 프레임워크 생태계에서는 간단하게 구현할 수 있다는 장점이 있다.

<br>
<br>

### 3. Repository Pattern의 장점?

---

- 우선 어떤 개념이고, 어떻게 쓰이는지는 알았으니 장점을 간단하게 찾아보았다.

  - **데이터 로직을 분리시킬 수 있다.**

    ⇒ _파일 구조부터 분리가 된다._

  - **중앙 집중처리 방식으로, 언제나 일관된 인터페이스로 데이터를 요청할 수 있다.**

    ⇒ _요청을 하는 쪽은 Repository의 사정이 궁금하지도 필요하지도 않다. 언제나 항상 같은 인터페이스로 요청을하고 결과값을 제공받을 수 있다._

  - **단위 테스트를 통해 검증이 가능합니다.**

    ⇒ _테스트 경험은 없지만, 데이터를 가공하고 제공하는 Repository에서만 검증을 추가한다면 응답으로 반환될 데이터값들을 단위 테스트를 먼저 적용시켜 검증이 수월할 거 같다라는 생각은 든다._

  - **새로운 데이터 로직 코드를 쉽게 추가할 수 있습니다.**

    ⇒ _Repository에서만 코드를 추가하거나 수정하여 데이터 로직을 추가하거나 변경할 수 있으므로 큰 장점이다._

<br>
<br>

## 🤔 Understanding

- 그냥 NestJS 공식 문서에서 쓰라해서 썼고, TypeORM에서 기본으로 지원해주니 쓰던 Repository Pattern을 그나마 조금 이해하고 써 볼 수 있게 되었다.

- 앞으로는 데이터를 가공하거나 가져오는 로직을 확실히 Repository 영역에서 수행해주는 쪽으로 조금 더 생각한 뒤 코드로 옮겨가야겠다~ 라는 생각이 들었다.

-규모가 큰 프로젝트일수록 디자인 패턴등 구조 설계부터 중요할거같다라는 생각이 든다.

<br>
<br>

```toc

```
