---
emoji: 📚
title: 객체 코플릿
date: '2021-08-02'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. 객체 코플릿

---

- 객체는 배열과 다르게 순서성을 가지지 않으며, 묶음으로 된 데이터에 이름을 붙혀, 의미를 부여할 수 있다.

  배열또한 각 값이 하나의 변수로 묶인 데이터이지만, 각 index가 어떤 정보를 갖고 있는지 알아야지 해당 값에 접근이 용이하다.

  - 객체는 **키쌍값(key-value pair)** 으로 이루어져 있다.

    ![스크린샷, 2021-08-02 23-44-58](https://user-images.githubusercontent.com/83164003/127880037-885d3350-4f00-4c36-8f49-2acfd0da353b.png)

    <br>

- 객체의 값을 사용하거나 추가할 땐 _Dot notation_, _Bracket notation_ 방식을 사용한다

- 할당된 키와 값을 지울 땐 _delete_ 키워드를 이용해 삭제가 가능하다.

- 객체 안에 특정한 키가 있는지 확인이 필요할 땐, _in_ 연산자를 이용하여 확인한다.

- `for ... in` : 상속된 열거 가능한 속성들을 포함하여 객체에서 문자열로 키가 지정된 모든 열거 가능한 속성에 대해 반복합니다.

  ```javascript
    for (variable in object) { ... }
  ```

  - `variable` : 매번 반복마다 다른 속성이름(Value name)이 변수(variable)로 지정됩니다.

  - `object` : 반복작업을 수행할 객체로 열거형 속성을 가지고 있는 객체.

    > **Note**: for...in은 인덱스의 순서가 중요한 Array에서 반복을 위해 사용할 수 없습니다.

<br>
<br>

### 2. Github 블로그 이사

---

- 블로그를 velog에서 git에서 jekyll 환경으로 세팅하는 블로그로 변경해보았다.

- <a href = "https://honbabzone.com/jekyll/start-gitHubBlog/" target = "_blank">https://honbabzone.com/</a> 해당 블로그를 통해서 `minimal-mistakes` 테마를 이용하여 세팅을 해보았다. 우선 불필요한 포스팅을 줄이고 오늘 배운 내용 및 시간을 어떻게 보냈는지, 어떤점을 느끼고 발전했는지에 대한 부분만 짚고 넘어갈 예정이다.

<br>
<br>

## 🤔 Understanding

- ~~어렵다... git blog ..~~ 8.1 ~ 8.2, 이틀동안 지금 챕터진행 말고 블로그 셋팅 씨름한 덕에 포스트 commit 하고 푸쉬할 수 있게되었다.

  물론 지금 테마 및 셋팅이 맘에 드는건 아니지만, 일단 나중으로 미루고 포스팅이 우선인듯하여 우선 급하게 셋팅을 마무리 지었다.

- 추후 상단 nav에 위치한 메뉴버튼들을 좌측 사이드바로 옮기고 싶다. 스크롤에 반응하는 author\_ profile 목록은 그렇게 유용하진 않는듯하다..

- 사소한거지만.. html 구조파악에 시간이 너무 오래걸렸다. 셋팅 위한 한글 포스팅도 많이 없는 상황이다 (상단에 올려둔 _7271kim_ 님의 블로그 세팅이 거의 대중화(?)되었다고 보면 될 듯하다. 우선은 천천히 코드및 구조를 뜯어보며 변경해보는거로 미뤄둬야겠다.

<br>
<br>

```toc

```
