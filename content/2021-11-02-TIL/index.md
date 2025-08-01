---
emoji: 📚
title: Docker, 컨테이너와 VM의 비교
date: '2021-11-02'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. Docker

---

- 도커(Docker)는 쉽게 애플리케이션을 추상화 하고, 컨테이너 방식으로 실행할 수 있게 해주는 리눅스 컨테이너기반의 오픈소스 가상화 플랫폼중 가장 대표적인 종류 중 하나이다

<br>
<br>

#### 1-1. 리눅스 컨테이너

---

<center><img src="https://user-images.githubusercontent.com/83164003/139808345-7b0f1906-f1f1-4b49-a936-ab22be21dc37.png"></center><br>

- 개발자들은 개별적인 로컬 환경에서 작업하며 특정하게 설정된 환경을 사용하고 있으며, 현재 개발 중인 애플리케이션은 특정 라이브러리, 종속성 및 파일에 의존하고 있다.

  이러한 애플리케이션을 배포할때 임의의 환경에서도 애플리케이션이 작동되게 하고, 품질 검사를 통과하고, 큰 문제나 수정 없이 애플리케이션을 배포하려면 **리눅스 컨테이너(LXC)** 를 사용해야 한다.

- 컨테이너는 다음 세가지의 자원을 독립적으로 격리하며 소유하고 있다.

  - 프로세스

    - 특정 컨테이너에서 작동하는 프로세스는 기본적으로 그 컨테이너 안에서만 액세스할 수 있다.

    - 컨테이너 안에서 실행되는 프로세스는 다른 컨테이너의 프로세스에게 영향을 줄 수 없다.

  - 네트워크

    - 기본으로 컨테이너 하나에 하나의 IP 주소가 할당되어 있다.

  - 파일 시스템

    - 컨테이너 안에서 사용되는 파일 시스템은 구획화되어 있다. 그래서 해당 컨테이너에서의 명령이나 파일 등의 액세스를 제한할 수 있다.

- 요약하자면, 리눅스 컨테이너란 애플리케이션이 의존성, 네트워크 환경, 파일 시스템에 구애받지 않고 실행될 수 있도록 만든 애플리케이션 상자이다.

<br>
<br>

#### 1-2. 이미지

---

- 실행되는 모든 컨테이너는 이미지로부터 생성된다.

- 이미지는 컨테이너 실행에 필요한 파일과 설정값등을 포함하고 있으며, 상태값을 가지지 않고 변하지 않는다(Immutable).

<br>
<br>

#### 1-3. Docker CLI

---

- <a href="https://docs.docker.com/engine/reference/commandline/container_run/" target="_blank">공식문서</a>를 통해 Docker Image 및 Container를 다루는 방법을 학습하였다.

- `danielkraic`이 올린 이미지 `asciiquarium` 예시.

  ```javascript
  docker container run -it --rm danielkraic/asciiquarium:latest
  ```

  ![ezgif-2-d2c8d5e087b7](https://user-images.githubusercontent.com/83164003/139811648-6f3d6411-5c3a-4a28-96a5-608917578ec4.gif)

<br>
<br>

### 2. 컨테이너와 VM의 비교

---

- 컨테이너 기술과 가상 머신(VM)은 둘 다 프로세스, 네트워크, 파일 시스템을 격리할 수 있다는 장점을 공유하지만, 이 둘의 작동원리는 많이 다르다.

  VM(가상머신 `ex.에뮬레이터`)을 만들고 실행하는 과정이 많은 컴퓨팅 자원을 필요로 하지만, 도커는 한 호스트 컴퓨터에 여러 개의 컨테이너를 띄워도 크게 컴퓨터에 무리가 가지 않는 장점이 있다.

  ![스크린샷, 2021-11-02 17-34-22](https://user-images.githubusercontent.com/83164003/139812480-0a9ca1b1-8071-4816-8a0b-d252a12d7eb1.png)

  VM의 구성 요소에 OS가 존재하는데 비해, 오른쪽의 도커 컨테이너에는 OS를 포함하고 있지 않다. 도커라는 플랫폼 위에 컨테이너들이 올라가 있고, 그 아래 호스트 OS가 존재하고있다.

  이를 통해, 각 컨테이너는 호스트 OS의 커널(Kernel, 시스템 콜과 같이 OS의 핵심 기능을 구현한 프로그램)을 공유하고 있음을 짐작할 수 있다. 즉, 도커는 애플리케이션을 컨테이너화해서 실행하는 데에 주 목적이 있으므로, VM과 다르게 컨테이너에 OS를 올려서 사용하지 않기에 리소스가 적다. 호스트 OS의 입장에서 본다면 컨테이너 하나는 프로세스 하나에 불과하다.

<br>
<br>

## 🤔 Understanding

- 도커를 왜 쓰는지 이유는 확실히 알았다.

  서로 다른 배포환경에서 특정 환경에 종속되지 않고 개발과 배포를 원활히 이뤄질 수 있게 해주는 하나의 생태계이다.

<br>
<br>

```toc

```
