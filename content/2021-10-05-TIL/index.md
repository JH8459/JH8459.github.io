---
emoji: 📚
title: Linux 사용권한, Linux 환경변수
date: '2021-10-05'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. Linux 사용권한

---

<br>
<br>

#### 1-1. 터미널 파일 및 폴더 생성 명령어

---

- `mkdir`명령어로 `linux`이름의 폴더를 생성하고 `nano` (리눅스 기반 오픈소스 편집 프로그램)를 통해 `helloworld.js` 파일을 생성 한 후 명령어 `ls -l` 을 프롬프트에 입력하고 Enter(엔터 키)를 누르면 다음과 같은 출력 결과를 얻을 수 있다.

  ![스크린샷, 2021-10-05 11-41-11](https://user-images.githubusercontent.com/83164003/135951898-0d2e1da8-ee9e-459e-8674-446e85a38400.png)

  터미널에 출력된 결과 중에서, 가장 왼쪽의 표현을 살펴보면, 파일 helloworld.js는 `-rw-r--r--` 이라고 출력되었고, 폴더 linux는 `drwxr-xr-x` 라고 출력되었다.

  이 표현의 첫 시작인 `-` 와 `d` 는 각각 not directory와 directory를 나타낸다. 폴더이면 `d`로, 파일이면 `-` 로 표현한다. 이어지는 `r`, `w`, `x`는 각각 read permission, write permission, execute permission으로 읽기 권한, 쓰기 권한, 실행 권한을 나타낸다. 3번에 걸쳐 나타나는 이유는 사용자와 그룹, 나머지에 대한 권한을 표시하기 때문이다.

  파일 `helloworld.js`의 권한은 `rw- rw- r--` 으로, 소유자는 읽기와 쓰기가 가능하고, 다른 사용자 그룹은 읽기만 가능하다는 의미이며, 폴더 `linux`의 권한은 `rwx rwx r-x` 으로, 소유자는 읽기와 쓰기, 실행이 가능하고, 다른 사용자 그룹은 읽기와 실행만 가능함을 뜻한다.

  ![211005_121241_1](https://user-images.githubusercontent.com/83164003/135961418-475647af-07e6-41b1-8b20-0deb8541b209.jpg)

<br>
<br>

#### 1-2. User, Group, and Other

---

1. **User** : user는 파일의 소유자이다. 기본적으로 파일을 만든 사람이 소유자가 된다. 소유자(Owner)라 부르기도 한다.

2. **Group** : group에는 여러 user가 포함될 수 있다. 그룹에 속한 모든 user는 파일에 대한 동일한 group 액세스 권한을 갖는다. 많은 사람이 파일에 액세스해야 하는 프로젝트가 있다고 가정하면, 각 user에게 일일이 권한을 할당하는 대신에 모든 user를 group에 추가하고, 파일에 group 권한을 할당할 수 있다.

3. **Other** : 파일에 대한 액세스 권한이 있는 다른 user이다. 파일을 만들지 않은 다른 모든 user를 의미한다. 따라서 other 권한을 설정하면, 해당 권한을 global 권한 설정이라고 볼 수도 있다.

<br>
<br>

#### 1-3. chmod

---

- 명령어 `chmod`는 폴더나 파일의 읽기, 쓰기, 실행 권한을 변경할 수 있다.

  OS에 로그인한 사용자와, 폴더나 파일의 소유자(Owner)가 같을 경우에 명령어 `chmod` 로 폴더나 파일의 권한을 변경할 수 있다.

  만약 OS에 로그인한 사용자와, 폴더나 파일의 소유자가 다를 경우(Other)에는 관리자 권한을 획득하는 명령어 `sudo` 를 이용해 폴더나 파일의 권한을 변경할 수 있다.

- 명령어 `chmod`로 권한을 변경하는 방식은 두 가지가 있다.

  - 첫 번째는 더하기(`+`), 빼기(`-`), 할당(`=`)과 액세서 유형을 표기해서 변경하는 **Symbolic method**,

  - 두 번째는 rwx를 3 bit로 해석하여, 숫자 3자리로 권한을 표기해서 변경하는 **Absolute form**이다.

- **Symbolic method**는 액세스 클래스, 연산자, 액세스 타입으로 구분한다.

  | Access class         | Operator             | Access Type |
  | -------------------- | -------------------- | ----------- |
  | u (user)             | + (add access)       | r (read)    |
  | g (group)            | - (remove access)    | w (write)   |
  | o (other)            | = (set exact access) | x (execute) |
  | a (all: u, g, and o) |

  ```
  chmod g-r filename # removes read permission from group
  chmod g+r filename # adds read permission to group
  chmod g-w filename # removes write permission from group
  chmod g+w filename # adds write permission to group
  chmod g-x filename # removes execute permission from group
  chmod g+x filename # adds execute permission to group
  chmod o-r filename # removes read permission from other
  chmod o+r filename # adds read permission to other
  chmod o-w filename # removes write permission from other
  chmod o+w filename # adds write permission to other
  chmod o-x filename # removes execute permission from other
  chmod o+x filename # adds execute permission to other
  chmod u+x filename # adds execute permission to user
  ```

  ```
  chmod a=rw helloworld.js # -rw-rw-rw-
  chmod u= helloworld.js # ----rw-rw-
  chmod a+rx helloworld.js # -r-xrwxrwx
  chmod go-wx helloworld.js # -r-xr--r--
  chmod a= helloworld.js # ----------
  chmod u+rwx helloworld.js # -rwx------
  ```

- **Absolute form**은 숫자 7까지 나타내는 3 bits의 합으로 표기한다. 사용자, 그룹, 또는 다른 사용자나 그룹마다 `rwx` 가 나타나고, 각 영역의 boolean 값으로 표기할 수 있다.

  | Permission  | Number |
  | ----------- | ------ |
  | Read (r)    | 4      |
  | Write (w)   | 2      |
  | Execute (x) | 1      |

  ```
  # u=rwx (4 + 2 + 1 = 7), go=r (4 + 0 + 0 = 4)
    chmod 744 helloworld.js # -rwxr--r--
  ```

<br>
<br>

### 2. Linux 환경변수

---

- Linux 기반의 운영체제의 PC에는 시스템 자체에 전역변수를 설정할 수 있다. 그리고 시스템에 설정한 전역변수를 환경변수라고 한다.

  명령어를 이용해 환경변수를 설정및 활용할 수 있다.

- 프로그래밍 도중 API key와 같이 공개할 수 없는 정보가 코드에 포함될 경우, 네트워크를 통해 API key가 공개될 수 있다.

  이런 일을 방지하기 위해서 API key를 PC에 저장해두고 사용해야 보안에 취약하지 않게 프로그램을 설계할수 있다.

  JavaScript에서 변수에 문자열을 할당하는 것처럼, API key를 PC에서 사용하는 변수에 할당하고 Javascript 코드에서 해당 환경변수를 호출하여 사용하는게 보안을 지키며 프로그래밍을 할 수 있는 방법이다.

<br>
<br>

#### 2-1. export: 환경변수 확인하기 && 환경변수 임시 적용

---

- Linux 운영체제에는 이미 많은 환경변수가 설정되어 있다.

  터미널에 명령어 `export` 를 입력해, 기록된 환경변수를 확인할 수 있다.

  ![스크린샷, 2021-10-05 14-43-43](https://user-images.githubusercontent.com/83164003/135967010-c4676d69-c2dd-4245-b710-f57836e15ede.png)

- 명령어 `export` 를 이용하면, 새로운 환경변수를 추가할 수 있다.

  이 때 등호 표시(Equal sign, =) 앞뒤에는 반드시 공백이 없어야 하며, 명령어 `echo` 와 함께 환경변수를 입력하면, 환경변수의 값을 확인할 수 있다. 이때 환경변수의 앞에는 달러사인($)을 입력하여, 변수라는 뜻을 터미널에 전달해야 확인이 가능하다.

  ![스크린샷, 2021-10-05 14-50-27](https://user-images.githubusercontent.com/83164003/135967694-1d3b1a32-b7b2-4a1a-b87d-15c75e783902.png)

  위와 같은 방법으로 할당한 환경변수들은 `unset [환경변수명]` 명령어를 통해 비활성화 할 수 있다. 또한 해당 환경변수들은 재시작시 자동으로 비활성화가 되는 **임시적용** 상태이다.

<br>
<br>

#### 2-2. dotenv: 자바스크립트에서 환경변수 사용하기

---

- npm 모듈 `dotenv`를 사용하면, 자바스크립트에서 환경변수를 사용할 수 있다. `npm init` 을 입력후 `npm i dotenv` 를 입력해 모듈을 설치한다.

  설치한 `dotenv` 모듈을 이용해 환경변수에 접근할 수 있다. Node.js의 내장 객체 `process.env`를 이용하면 명령어 `export` 로 확인한 내용과 동일한 내용을 객체로 출력한다.

  ![스크린샷, 2021-10-05 15-28-09](https://user-images.githubusercontent.com/83164003/135971634-ea8cc9fe-f98b-423b-8bc8-ae7c7a5c56a1.png)

<br>
<br>

#### 2-3. .env: Node.js에서 환경변수 영구 적용

---

- **2-1**에서 언급하였지만 명령어 `export` 로 적용한 환경변수는 현재 사용 중인 터미널에서만 임시로 사용이 가능하며 재시작시 초기화된다.

  환경변수를 Linux 운영체제에 영구적으로 저장하는 방법은 여러 가지가 있지만, Node.js에서는 파일 `.env`를 만들어 저장하는 방법이 보편적이다.

  다시 정리하자면, `dotenv` 모듈을 통하여 자바스크립트로 Node.js의 내장 객체 `process.env`를 이용하여 Linux PC 환경변수에 접근할 수 있다. (이때 `process.env`를 콘솔창을 통해 확인해보면 `export`명령어와 같은 환경변수를 객체 형태로 확인 가능하다.) 그리고 `.env`파일에 원하는 환경변수를 입력 한 뒤 저장 후 모듈 `dotenv`를 이용하면, 파일 `.env`에 저장한 환경변수를 조회할 수 있게된다.

  ![스크린샷, 2021-10-05 15-54-18](https://user-images.githubusercontent.com/83164003/135974561-eb916cef-1743-4d7a-a0ea-729f182bdfd4.png)

  이와 같은 과정들을 토대로 환경변수를 이용해 API key, DB password와 같이 민감한 정보를 저장하고 관리할 수 있으며, 그뿐만 아니라 서로 다른 PC 또는 여러 `.env` 파일에서, 같은 변수 이름에 다른 값을 할당할 수 있다.

<br>
<br>

## 🤔 Understanding

- Linux 환경에서의 환경변수를 사용하는 목적은 로컬PC에서만 사용되어야 하는 정보(ex. API Key, DB password...)를 프로그램 코드에 심지 않고 환경변수에 심은 뒤 해당 환경변수를 JS 환경에서 사용할 수 있게되는게 주된 목적이라 생각된다.

  프로그램 코드에 해당 데이터값을 심고 배포한다면, 해당 데이터들이 노출될 우려가 있으므로 보안에 취약해진다.

- 아직 실사용 경험이 없어서 정확히 `.env` 파일에 어떤식으로 해당 데이터값들을 심어서 사용하는지 감을 잡기가 어렵다. 우선 사용목적과 프로세스는 확실히 학습하였다.

<br>
<br>

```toc

```
