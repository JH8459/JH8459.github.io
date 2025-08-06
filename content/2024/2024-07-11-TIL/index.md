---
emoji: 📚
title: 백준 2204번 - 도비의 난독증 테스트 (Java)
date: '2024-07-11'
author: JH8459
categories: TIL
---

![github-blog.png](../../../assets/common/til.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

백준 <a href="https://www.acmicpc.net/problem/2204" target="_blank">2204번</a> 알고리즘 문제 풀이 과정 중 학습한 내용을 간단히 포스팅으로 남기려한다.

<br>
<br>

### 1. 문제

---

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-07-11-TIL/question.png" />

<br>

문제는 어렵지 않았으며 문제 해결을 위한 조건은 다음과 같다.

1. 각 테스트케이스는 정수 n (2 ≤ n ≤ 1000) 으로 시작하며 주어지는 단어의 개수를 뜻한다.
2. 다음 각 n줄은 길이가 최대 20인 단어가 주어지며 대소문자의 구분을 없앴을 때 똑같은 단어는 주어지지 않는다.
3. 마지막 입력은 0이 주어진다.
4. 각 줄에 각 테스트케이스에서 사전상 가장 앞서는 단어를 출력한다.

너무도 간단한 문제였지만 새로 알게된 `Java` 문자열 비교 메서드인 `compareToIgnoreCase`가 있어서 포스팅을 남긴다.

  <br>
  <br>

#### 1-1. 풀이과정

---

크게 두가지 로직을 함수로 구현하여 알고리즘을 구현하였다.

> 1. `List`에 입력되는 단어를 담는다.
> 2. `compareToIgnoreCase` 메서드를 이용하여 정렬 후 첫번째 인자를 반환한다.

<br>

우선 `List`에 입력으로 들어온 단어를 담는 부분을 구현하였다.

  ```java
  while (true){
    int n = Integer.parseInt(br.readLine());  // 테스트케이스 정수를 입력받는다.

    if(n == 0){  // 마지막 입력(0)인 경우 종료
      break;
    }

    List<String> nList = new ArrayList<>();  // List<String> 선언

    for(int i = 0; i < n; i++){
      nList.add(br.readLine());  // 입력되는 단어를 담는다.
    }
  }
  ```

그 후 `nList`에 담긴 값을 대소문자를 제외하고 비교하여 정렬 후 첫번째 값을 반환하고 함수를 종료하였다.

``` java
import java.io.*;
import java.util.*;

public class Main {
  public static void main(String[] args) throws Exception {
    BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

    while (true){
      int n = Integer.parseInt(br.readLine());

      if(n == 0){
        break;
      }

      List<String> nList = new ArrayList<>();

      for(int i = 0; i < n; i++){
        nList.add(br.readLine());
      }

      nList.sort(String::compareToIgnoreCase);
      bw.write(nList.get(0) + "\n");
    }

    bw.flush();
    bw.close();
  }
}
```

<br>
<br>

## 🤔 Understanding

오랫만에 다시 알고리즘 문제 풀이를 손에 잡으려한다.

익숙한 언어인 `JavaScript`로 문제를 풀이했다면 배열에 담고 `toLowerCase()` 메서드로 소문자로 변환한 값들을 `sort`로 정렬하여 문제를 풀었어야 할 문제였다.

`Java` 진영에서는 `compareToIgnoreCase` 한번의 메서드 호출로 문제를 풀이할 수 있다는 점에서 느끼는바가 많았다.

- `Java`에서 제공하는 표준 라이브러리의 방대함
- 제공된 기본 메서드를 사용하게 된다면, 일관된 행동을 보장하므로 협업 시 코드의 예측 가능성이 높을 거란 장점

<br>

하지만, 어떤 원리로 작동하는지 알고 쓰는건 따로 노력하지 않으면 안되기 때문에 편리함에 익숙해지면 본질을 놓칠 수 있다라는 생각이 많이 들었다.

- `compareToIgnoreCase` 메서드 동작 원리

  - `Character.toLowerCase(c1)` 및 `Character.toLowerCase(c2)`를 사용하여 각 문자를 소문자로 변환한 후 비교
  - 첫 번째로 다른 문자가 발견되면 그 차이를 반환
  - 모든 문자가 같으면 문자열의 길이 차이를 반환

  ```java
    public int compareToIgnoreCase(String str) {
      int len1 = value.length;
      int len2 = str.value.length;
      int lim = Math.min(len1, len2);
      char v1[] = value;
      char v2[] = str.value;

      int k = 0;
      while (k < lim) {
          char c1 = v1[k];
          char c2 = v2[k];
          if (c1 != c2) {
              c1 = Character.toLowerCase(c1);
              c2 = Character.toLowerCase(c2);
              if (c1 != c2) {
                  return c1 - c2;
              }
          }
          k++;
      }
      return len1 - len2;
    }
  ```

<br>
<br>

