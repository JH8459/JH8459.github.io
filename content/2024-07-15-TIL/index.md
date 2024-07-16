---
emoji: 📚
title: 테스트 커버리지 (Feat. SLASH 21)
date: '2024-07-15'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

---

**「Clean Code」** 9장(단위 테스트)에서 테스트 코드의 중요성을 읽고나서 막연히 이런 생각을 마음속 깊은 곳에 담아 두긴했었다.

> <a href="https://blog.jh8459.com/2023-04-09-BOOK/" target="_blank">📌 <strong>「Clean Code」</strong> 단위 테스트 독서 후기</a>

<br>
<p align="center"><strong>"테스트 코드는 충분히 학습하고 도입해봐야지"</strong></p>
<br>

조그만 영역이라도 테스트 코드를 우선 작성해보자라는 생각으로 프로젝트에 도입해보았다. 그 과정에서 느낀점은 <strong>"사소한 테스트라도 분명한 의미는 있다."</strong> 이었다.

실제로 사내 비즈니스 요구사항으로 <a href="https://www.electronjs.org/" target="_blank"><strong>Electron</strong></a> 프레임워크를 사용하여 데스크탑 어플리케이션을 배포하는 과정 중 사소한 휴먼-에러를 방지하고자 간단한 테스트 코드를 작성해서 팀 내에 공유해본 경험이 있다.

- 데스크탑 어플리케이션에 사용할 아이콘 이미지의 사이즈를 검증하는 테스트 코드

  ```typescript
  describe('electron-builder.yml test', () => {
    // electron-builder.yml 파일을 읽어와서 데이터를 파싱
    const filePath: string = path.join(__dirname, '../src/electron-builder.yml');
    const fileContents: string = fs.readFileSync(filePath, 'utf8');
    const data: unknown = load(fileContents);
    // mac/win 아이콘 이미지 파일 경로
    const macImagePath: string = (data as Record<string, any>)['mac']['icon'];
    const winImagePath: string = (data as Record<string, any>)['win']['icon'];

    it('icon 이미지 파일이 정사각형이며 크기가 512 X 512 사이즈 이상인가?', async () => {
      // 이미지 파일 메타데이터을 가져와서 가로, 세로 크기를 비교
      const macImageMetaData = await sharp(path.resolve(__dirname, macImagePath)).metadata();
      const winImageMetaData = await sharp(path.resolve(__dirname, winImagePath)).metadata();

      expect(macImageMetaData.width).toBeGreaterThanOrEqual(512);
      expect(macImageMetaData.height).toBeGreaterThanOrEqual(512); 
      expect(macImageMetaData.width).toBe(macImageMetaData.height);

      expect(winImageMetaData.width).toBeGreaterThanOrEqual(512);
      expect(winImageMetaData.height).toBeGreaterThanOrEqual(512); 
      expect(winImageMetaData.width).toBe(winImageMetaData.height);
    });

    // ...(생략)
  }
  ```
<br>

휴먼-에러를 방지하기 위한 간단한 테스트 코드<del>(커버리지는 아직은 사막의 모래알같은 상황이다. 🥲)</del>를 위 예시 외에도 다수 작성하였으며, 내가 부재의 경우에도 가이드 문서에 테스트와 빌드를 하는 과정을 상세히 담아서 팀 내에 공유해본 경험이 있다.

점점 테스트 코드에 대한 관심도가 높아져 관련 서적 그리고 레퍼런스 자료들을 찾기 위해 노력해보았으며, 그 과정 중 느낀점을 공유하고자 이번 포스팅을 남긴다.

<br>
<br>

### 1. 테스트 커버리지 (Test Coverage)

---

우선 테스트 커버리지란 소프트웨어 코드가 얼마나 테스트되고 있는지를 나타내는 소프트웨어의 품질 지표이다.

아무래도 테스트 커버리지가 높다라는 의미는 의도치 않은 사이드 이펙트가 발생할 확률이 적다라는 뜻이며, 이는 사용자가 신뢰할 수 있는 소프트웨어라는 뜻이다.

자주쓰는 `jest`라는 테스트 라이브러리에서는 간단한 명령어로 아래와 같은 테스트 커버리지를 보고서 형식(CLI 출력 형태로도 가능하다.)으로 받아볼 수 있다.

<br>

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-07-15-TIL/jest.png"/>
<br>
<center><strong>현재 개발중인 사이드 프로젝트의 테스트 커버리지 2.44%..🥲</strong></center><br><br>

우선 하반기는 테스트 코드를 조금 더 깊이 학습해보고 해당 사이드 프로젝트의 테스트 커버리지를 충분한 수치까지 목표를 잡고 리팩토링을 진행해보려한다.

그 <strong>"충분한"</strong>의 기준을 잡기 위해 여러 레퍼런스를 찾아보았다.

<br>
<br>

### 2. 테스트 커버리지 100%

---

여러 레퍼런스를 찾는 도중 <strong>SLASH21</strong>에서 토스뱅크 서버 개발자인 이응준님의 <a href="https://toss.im/slash-21/sessions/1-6" target="_blank">테스트 커버리지 100%</a> 영상을 보고 <strong>"충분한"</strong>의 기준을 결정하였다.

<br><center><iframe width="560" height="315" src="https://www.youtube.com/embed/jdlBu2vFv58?si=hn9E3KSIDO53WaKR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></center><br>

위 영상은 테스트 커버리지 100%(인스트럭션 기준)까지 달성한 과정을 자세히 설명해주는 영상이며 요약하자면 아래와 같다.

- 총 커밋의 23% 가량은 테스트 코드에 할애하였다.
- 테스트 커버리지가 특정 지점에 도달하는 시점부터는 테스트 커버리지가 낮으면 배포가 안되게하여 테스트 커버리지의 높은 수준을 강제화하였다.
- 높은 수준의 테스트 커버리지로 인하여 배포와 리팩토링을 과감히 진행하였다.
- 테스트 속도 개선 경험. (이 과정에서 JVM의 깊은 영역까지 학습 해보실 수 있었던것 같다.)
- 빠른 테스트 실행을 위한 장비 교체. <del>(당일 구매 요청 후 장비 수령이라니 토스의 의사 결정 절차가 부럽다. 😂)</del>

<br>

이 영상의 핵심 포인트는 당연하게도 <strong>"100%"</strong>이다. 그리고 테스트 커버리지를 맹신하지 말라는 당부도 전한다.

- 이 테스트 코드는 올바른 테스트일까?

  ```typescript
  describe('+ 연산자를 -로 변경해도 통과하는데, 이는 올바른 테스트인가?', () => {
    const sum = (a: number, b: number) => a + b;

    it('sum 함수가 정상적으로 작동하는가?', async () => {
      expect(sum(1, 0)).toBe(1);
      // 1 + 0 = 1
      // 1 - 0 = 1
    });

    it('sum 함수가 정상적으로 작동하는가?', async () => {
      expect(sum(0, 0)).toBe(0);
      // 0 + 0 = 0
      // 0 - 0 = 0
    });
  });
  ```

<br>
<br>

## 🤔 Understanding

---

상반기에는 사이드 프로젝트의 "구현" 부분을 진행해보았다. 하반기 목표는 이 사이드 프로젝트 중 부족한 기술 영역을 하나씩 채워보고자 한다.

첫번째 요소로 선택한건 테스트 코드와 테스트 자동화 부분이다.

위 목표를 달성하기 위해서 <strong>"충분한"</strong> 기준의 테스트 커버리지를 먼저 정하는 것이 중요하다. (여러 레퍼런스를 찾아보려다 좋은 영상을 보고 포스팅까지 남기게 되었다. 👍)

비록 작은 사이드 프로젝트지만 높은 수준의 테스트 커버리지와 테스트 자동화에 대한 학습과 구현을 마치면 또 다시 포스팅을 남겨보도록하겠다.

<br>
<br>

```toc

```
