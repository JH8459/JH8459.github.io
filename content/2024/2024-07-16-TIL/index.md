---
emoji: 📚
title: 백준 1764번 - 듣보잡 (Java)
date: '2024-07-16'
author: JH8459
categories: TIL
---

![github-blog.png](../../../assets/common/til.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

백준 <a href="https://www.acmicpc.net/problem/1764" target="_blank">1764번</a> 알고리즘 문제 풀이 과정 중 학습한 내용을 간단히 포스팅으로 남기려한다.

<br>
<br>

### 1. 문제

---

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-07-16-TIL/question.png" />

<br>

문제는 어렵지 않았으나 <strong>시간초과</strong> 부분을 해결하는 과정에서 새로 학습한 부분이 있어 포스팅으로 남긴다.

문제의 요구사항은 아래와 같다.

1. 첫째 줄에 듣도 못한 사람의 수 N, 보도 못한 사람의 수 M이 주어진다.
2. 둘째 줄부터 N개의 줄에 걸쳐 듣도 못한 사람의 이름과, N+2째 줄부터 보도 못한 사람의 이름이 순서대로 주어진다.
3. 이름은 띄어쓰기 없이 알파벳 소문자로만 이루어지며, 그 길이는 20 이하이다.
4. 듣도 못한 사람의 명단에는 중복되는 이름이 없으며, 보도 못한 사람의 명단도 마찬가지이다.
5. 듣보잡의 수와 그 명단을 사전순으로 출력한다.

<br>

해결 과정 자체는 단순하게 풀어나갔으나, `ArrayList`와 `HashSet`의 차이를 알지 못하여 <strong>시간초과</strong>를 겪었다.

<br>
<br>

#### 1-1. 풀이과정

---

처음 시도한 알고리즘의 구현 단계는 아래와 같다.

> 1. 첫줄로 입력받은 n, m 사이즈를 갖는 두 `ArrayList`를 선언한다.
> 2. nList에 n개의 입력을 담는다.
> 3. mList에는 nList에 포함된 값인지 확인 후 담는다.

<br>

해당 결과물로 만든 코드는 아래와 같으며, (아래 코드는 오답이다.) <strong>시간초과</strong>의 이유로 통과하지 못하였다.

```java
import java.io.*;
import java.util.*;

public class Main {
  public static void main(String[] args) throws Exception {
    BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

    StringTokenizer st = new StringTokenizer(br.readLine());
    int n = Integer.parseInt(st.nextToken());
    int m = Integer.parseInt(st.nextToken());

    ArrayList<String> nList = new ArrayList<>();
    ArrayList<String> mList = new ArrayList<>();

    // nList에 n개의 입력을 담는다.
    for (int i = 0; i < n; i++) {
      nList.add(br.readLine());
    }

    // mList는 nList의 포함여부에 따라 m개 중 일부의 입력을 담는다.
    for (int i = 0; i < m; i++) {
      String s = br.readLine();

      if(nList.contains(s)){
        mList.add(s);
      }
    }

    // 사전순으로 정렬
    Collections.sort(mList);

    // 순차 출력
    bw.write(mList.size() + "\n");

    for (String s : mList) {
      bw.write(s + "\n");
    }

    bw.flush();
    bw.close();
  }
}
```

<br>

알고리즘 상으로는 문제점이 보이지 않아 원인을 파악하기 위해 `ArrayList`의 `contains()` 메서드를 찾다가 아래의 게시글에서 원인을 찾아내었다.

> <a href="https://hanul-dev.netlify.app/java/list,-set-%EC%96%B4%EB%96%A4-%EA%B2%83%EC%9D%84-%EC%93%B0%EB%8A%94-%EA%B2%83%EC%9D%B4-%EC%9C%A0%EB%A6%AC%ED%95%9C%EA%B0%80/" target="_blank">📌 List, Set 어떤 것을 쓰는 것이 유리한가</a>

<br>
<br>

#### 1-2. 해결과정

---

위 게시글을 간략하게 요약한 내용은 아래와 같다. (너무도 친절하게도 직접 `contains()` 메서드를 토대로 `ArrayList`와 `HashSet`의 속도 차이를 측정 후 비교 분석까지 해주셨다.)

> 1. `ArrayList`는 중복을 허용하고 순서를 보장하여 데이터를 저장하고 배열과 같이 인덱스로 내부의 객체를 관리한다. 따라서 특정 위치의 데이터에 접근하는 속도가 빠르다. 하지만, 특정 위치(i)에 삽입을 할 때는 i + 1 번 데이터부터 끝까지의 데이터를 한 칸씩 이동해야 하기 때문에 느리고, 삭제 또한 마찬가지이다. 또한, `contains()` 메소드 실행 시 처음 순차적으로 데이터 탐색을 진행하면서 값을 찾기 때문에 시간이 오래 걸린다.
> 2. `HashSet`은 비선형 구조로 순서가 없고 인덱스도 존재하지 않는다. 또한, 중복을 자동으로 제거해준다. 데이터를 있는지 확인할 때는 모든 데이터를 찾아보는 것이 아니라 데이터를 key로 순서와 상관없이 바로 확인한다.

<br>

위 내용을 토대로 풀이과정을 수정하였고 원하는 결과를 얻었다. (첫번째 리스트인 nList를 `HashSet` 자료구조로 변경하였다.)

``` java
import java.io.*;
import java.util.*;

public class Main {
  public static void main(String[] args) throws Exception {
    BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

    StringTokenizer st = new StringTokenizer(br.readLine());
    int n = Integer.parseInt(st.nextToken());
    int m = Integer.parseInt(st.nextToken());

    HashSet<String> nSet = new HashSet<>();
    ArrayList<String> mList = new ArrayList<>();

    // nSet에 n개의 입력을 담는다.
    for (int i = 0; i < n; i++) {
      nSet.add(br.readLine());
    }

    // mList는 nSet의 포함여부에 따라 m개 중 일부의 입력을 담는다.
    for (int i = 0; i < m; i++) {
      String s = br.readLine();

      if(nSet.contains(s)){
        mList.add(s);
      }
    }

    // 사전순으로 정렬
    Collections.sort(mList);

    // 순차 출력
    bw.write(mList.size() + "\n");

    for (String s : mList) {
      bw.write(s + "\n");
    }

    bw.flush();
    bw.close();
  }
}
```

<br>
<br>

## 🤔 Understanding

이런 유형의 문제가 많은데, 상황마다 적절한 자료구조를 사용하는 것이 알고리즘 문제를 잘 풀어낼 수 있는 가장 빠른 지름길이다. <del>(그러려면 많은 알고리즘을 알고있어야한다..🥲)</del>

적어도 이번 계기로 인하여 순서를 보장하고 중복을 허용해야하는 경우와 순서를 보장할 필요가 없는 경우를 고려해서 자료구조를 선택할 수 있게되었다.

앞으로는 구현부터 무작정 진행하기보다는 문제의 본질을 먼저 찾아낼 수 있는 안목을 길러봐야겠다.

<br>
<br>

