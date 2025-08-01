---
emoji: 📚
title: Amazon Web Service, AWS 배포 실습
date: '2021-10-29'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. Amazon Web Service

---

- 웹 서비스 배포를 위한 방법으로 가상화 기술(가상의 컴퓨터를 대여)을 사용하는 클라우드 컴퓨팅을 사용할 수 있다.

- 클라우드 컴퓨팅 서비스 중 가장 유명한 것이 Amazon Web Service(AWS)이다.

<br>
<br>

#### 1-1. Cloud Computing

---

- 클라우드 등장 이전의 방식은 흔히 말하는 전산실 등에 컴퓨터를 배치하고 인터넷을 연결하여 서비스를 제공했다.

  <center><img src="https://user-images.githubusercontent.com/83164003/144698139-d85f1899-2867-4e66-9ddd-e045bd12bfde.jpeg"/></center><br>

  하지만 이러한 경우 서버가 요청에 대한 수용 능력이 한계에 도달한다면 같은 공간에 서버를 추가하거나 서버의 성능을 업그레이드하는 방식을 채택해야한다.

- 이러한 방식의 문제는 몇가지 문제점을 가지고 있다.

  1. **주기적인 관리가 필요** : 흔히 말하는 서버실에는 종종 고장이 나거나 인터넷과 연결이 되지 않는 얘기치 못한 문제가 생기기도 한다.<br>
     이런 상황이 발생한다면 규모가 작은 서버라도 이를 해결하기 위한 인력 및 비용이 불가피하게 투입되어야 문제 해결이 가능하다.

  2. **공간의 한계** : 둘째로 발생하는 문제점은 물리적인 공간의 문제점이다. 서버실이라는 공간에 컴퓨터를 배치해 두고 발생하는 트래픽에따라 서버를 추가하는 방식으로 서버의 수용 능력을 향상해야하지만, 트래픽이 매우 많아지는 경우 물리적인 공간에 제약이 생길수가 있다.

- 이러한 물리적인 문제점들을 극복하기 위하여 나온 개념이 서버의 자원과 공간, 및 네트워크 환경을 외부로 부터 제공을 빌려 받아 사용하는 **클라우드 컴퓨팅**이다.

<br>
<br>

#### 1-2. 클라우드의 등장

---

- 앞서 말한 서버의 자원과 공간, 및 네트워크 환경을 빌려주는 곳을 데이터 센터라 일컫는다. (이러한 환경을 **온프레미스**라 부르며, 반대 개념인 **오프프레미스**는 위에서 말한 서버실같은 환경을 말한다.)

  ![스크린샷, 2021-12-04 14-24-55](https://user-images.githubusercontent.com/83164003/144698437-cb81a76c-a0ae-4be8-bf98-f587e7316ecd.png)

- 클라우드 컴퓨팅은 앞서 설명한 데이터센터같은 온프레미스 환경과 비슷한 역할을 하지만, 물리적인 컴퓨터가 아닌 가상 컴퓨터를 대여한다는 점이 다르다.

- 온프레미스 환경과 다르게 가상화(Virtualization) 기술을 가진 클라우딩 컴퓨터가 갖는 이점은 다음과 같다.

  1. 사용이 필요할 때마다 컴퓨팅 능력을 유연하게 조절할 수 있다.
  2. 이용기간에 따라 고정적인 비용이 들어가는 온프레미스(정액제)와는 달리 사용한 만큼의 요금(정량제)만 지불이 가능하다.

<br>
<br>

#### 1-3. 클라우드의 단점

---

- 앞서 말한 장점이 뚜렷한 클라우드 컴퓨팅이지만, 이러한 환경에도 단점은 존재한다.

- 클라우드 제공자(AWS,Google 등..)의 환경에 문제가 있을 경우 해당 서비스 사용자들이 모두 영향을 받는다.

  ![쿠키런 장애](https://user-images.githubusercontent.com/83164003/144698955-79fd690a-ac53-4241-a7f8-3c4f3d3d9298.jpg)

  클라우드 서비스에 100% 의존하는 경우, 운영 환경 자체가 클라우드 제공자에게 종속되어 버리므로 클라우드 서비스에 문제가 생기면 내가 배포하고 관리하는 환경에도 영향이 미친다.

<br>
<br>

#### 1-4. 클라우드의 목표

---

- 이러한 클라우드의 목표는 모든 것을 서비스화하는 것을 목표로 한다.

  ![스크린샷, 2021-12-04 14-49-04](https://user-images.githubusercontent.com/83164003/144699128-fba05602-dc78-4b98-aa28-482a49df20d1.png)

  대표적인 클라우드 서비스의 형태는 SaaS, IaaS, PaaS 세 가지이다.

  1. **SaaS** (Software as a Service)

  - 클라우드 제공자가 당장 사용 가능한 소프트웨어를 제공하는 경우 대부분 SaaS에 해당한다.
  - 드롭박스, 구글드라이브, 넷플릭스 등

  2. **PaaS** (Platform as a Service)

  - 클라우드 제공자가 데이터베이스, 개발 플랫폼까지 제공하는 경우 대부분 PaaS에 해당한다.
  - Oracle Cloud 플랫폼 등

  3. **IaaS** (Infrastructure as a Service)

  - 클라우드 제공자가 가상 컴퓨터까지 제공하는 경우 대부분 IaaS에 해당한다.
  - AWS 등

<br>
<br>

### 2. AWS 배포 실습

---

- 클라우드 컴퓨팅의 개념에 대해서는 학습했으니, 실제 웹 애플리케이션을 배포하는 과정을 간단히 실습해보자.

<br>
<br>

#### 2-1. 백엔드 배포

---

- AWS에서 서버 배포시 다음과 같은 과정이 필요하다.

  - EC2 콘솔을 통해 EC2 인스턴스를 생성해야 한다.
  - 간단한 서버 애플리케이션을 생성하고 EC2 인스턴스에 코드를 배포해야 한다.
  - 서버를 실행시키고 브라우저에서 서버에 접속할 수 있어야 한다.

<br>
<br>

##### EC2 인스턴스 생성

---

- AWS 메뉴에서 EC2 서비스를 검색하고 접속하여 인스턴스 시작 버튼을 클릭하여 인스턴스 생성을 시작하자.

  ![스크린샷, 2021-12-04 15-30-52](https://user-images.githubusercontent.com/83164003/144700723-1894003b-df7b-473e-850b-e5338ce795bc.png)

- 용도에 맞게 AMI를 선택하는 과정이다. 호환성 이슈 및 프리티어 지원여부를 고려하여 ubuntu 18.04 버전을 선택해주자.

  ![스크린샷, 2021-12-04 15-54-09](https://user-images.githubusercontent.com/83164003/144700759-56e500b3-fb45-4f2e-b189-eb21bec1216b.png)

- 인스턴스 유형을 선택하는 과정이다. 생성하는 인스턴스의 CPU, RAM, 용량에 대한 선택이 가능하지만.. 프리티어가 지원되는 유형을 선택하자. ~~(램 1GB실화..??)~~

  ![스크린샷, 2021-12-04 15-56-28](https://user-images.githubusercontent.com/83164003/144700808-a896fbdd-5503-4758-8419-61b55a5ec6ba.png)

- 검토 및 시작 버튼을 클릭하면 이제 인스턴스를 원격으로 제어하기 위해서 보안키를 선택하거나(기존의 키가 있는 경우) 새로 생성하라는 안내화면이 나온다.

  ![스크린샷, 2021-12-04 16-01-01](https://user-images.githubusercontent.com/83164003/144700959-43b75f01-a9e6-4985-b543-f6525b25a22e.png)

  키 페어 다운로드를 해준뒤 내 로컬 PC환경에 보관해주자.

  해당 과정으로 생성되는 키로 인스턴스를 SSH\* 연결을 통해 원격으로 제어할 수 있다.

  > **SSH 프로토콜**이란?
  >
  > SSH는 서로 다른 PC가 인터넷과 같은 Public Network를 통해 통신을 할 때 보안상 안전하게 통신을 하기 위한 통신 규약이다.
  >
  > 주고받는 데이터를 암호화해서 해당 키 페어를 가지지 않은 사람은 통신되는 데이터를 알아볼 수 없기 때문에 보안상 안전한 통신 방법이다.

- 인스턴스 생성 마지막 단계에서 다운로드 한 파일은 SSH 통신을 위한 키 페어 중 프라이빗 키가 기록된 파일이다. (.pem 확장자를 가지고 있다.)

  해당 키 페어 파일은 EC2 인스턴스에 원격으로 연결을 할때 사용하는 암호가 담긴 파일이므로 외부에 노출안되게 관리에 유념해야한다.

- 이제 해당 키를 이용하여 SSH 원격 연결로 생성한 인스턴스로 들어가 보자.<br>
  생성한 인스턴스의 아이디를 누르면 인스턴스 상세정보를 볼 수 있다.

  ![스크린샷, 2021-12-04 16-09-02](https://user-images.githubusercontent.com/83164003/144701274-8beecce2-e522-43ad-b4c8-0769c5674cd3.png)

  그 뒤 연결 탭을 누르면 인스턴스에 접속하는 옵션들을 선택할 수 있게된다.

  ![스크린샷, 2021-12-04 16-16-59](https://user-images.githubusercontent.com/83164003/144701333-eca5e982-dc85-430b-a505-0f6f0ac08bfb.png)

  우린 SSH 방식으로 연결할 예정이므로 SSH 클라이언트 탭을 눌러 준다.

  ![스크린샷, 2021-12-04 16-18-19](https://user-images.githubusercontent.com/83164003/144701373-07137bd2-a4c3-4f25-a6d2-16819ce12f76.png)

- SSH프로토콜을 이용하면 로컬 터미널 환경으로 클라우드 컴퓨팅 인스턴스와 연결이 가능하다.<br>
  다만, 다운로드했던 키 페어 파일(.pem)이 누구나 접근할 수 있는 권한이 부여되어 있다면 인스턴스는 연결을 거부한다.

  그러므로 다운로드 했던 키 페어 파일이 위치의 디렉토리 위치에서 터미널 환경으로 해당 키 페어 파일의 권한을 수정해준다.

  ![스크린샷, 2021-12-04 16-21-01](https://user-images.githubusercontent.com/83164003/144701462-f4a77d39-8ffb-400c-b005-5f7caf2a29a5.png)

  키 페어 파일(.pem)의 권한을 수정하지 않은 경우, 권한이 너무 open 되어 있다는 경고 메시지와 함께 접속이 거절된다.

- 이제 키 페어를 알맞은 권한으로 사용하여 SSH 프로토콜 환경으로 EC2 인스턴스로 원격 접속이 가능하게 모두 설정이 완료되었다.

  ![스크린샷, 2021-12-04 16-25-49](https://user-images.githubusercontent.com/83164003/144701564-dba0f2fd-5448-4861-8a05-857c0ad6bd23.png)

  위 명령어를 통해 내 로컬 디렉토리(키페어가 들어있는 디렉토리)에서 터미널 환경에서 인스턴스로 접속을 시도하면 아래와 같은 인스턴스 원격 접속 화면을 볼 수 있다.

  ![스크린샷, 2021-12-04 16-25-28](https://user-images.githubusercontent.com/83164003/144701568-d58f3d8e-3442-4173-8605-57d8bec8e23f.png)

<br>
<br>

##### VSCode를 이용한 SSH 원격 접속

---

- 위와 같이 터미널 환경으로도 인스턴스에 접속하여 충분히 조작이 가능하지만 불편하다.

  아무래도 GUI를 통한 사용자에게 편한 조작방식과는 거리가먼 명령어로만 작동하는 방식이기때문이다.

- VSCode 확장 툴인 **Remote Development**를 이용하면, 편리하게 SSH 원격 접속이 가능하다.

  ![스크린샷, 2021-12-04 16-32-03](https://user-images.githubusercontent.com/83164003/144701685-13cb8b99-819b-4e55-ad09-76acab052d54.png)

  위의 두 확장 툴을 받아주면, VSCode 좌측 툴에 다음과 같은 원격 탐색기 아이콘이 생성된 걸 확인할 수 있다.

  <center><img src="https://user-images.githubusercontent.com/83164003/144701727-bf2ea8a2-923c-4af9-8a80-8deb59c595e5.png"/></center>

- 이제 SSH Configure 로 가서 원격접속을 위한 설정을 해주자

  ![스크린샷, 2021-12-04 16-42-57](https://user-images.githubusercontent.com/83164003/144701931-6d64efc3-b774-4cad-bb1d-9f03ad3c0166.png)

  - **Host** : 원하는 아무 Host 명을 입력해주자, VSCode에서 구분하기 위한 이름이다.
  - **HostName** : EC2 퍼블릭 DNS, 원격 접속할 EC2 인스턴스의 주소이다.
  - **User** : 서버 접속 계정명을 입력해주자.
  - **IdentityFile** : .pem 키 페어가 담긴 디렉토리 위치를 입력해주자.

- 올바르게 SSH 환경 설정이 완료되면 VSCode에서 EC2 인스턴스로 원격 접속이 가능하게 된다.

  ![스크린샷, 2021-12-04 16-51-37](https://user-images.githubusercontent.com/83164003/144702113-29bd3c71-b164-43d7-bfe0-c70f25359286.png)

  로컬 터미널 환경보다는 ~~훨씬~~ 편하게 폴더 및 파일 수정을 할 수 있게 된다.

<br>
<br>

##### EC2 인스턴스 상에서 서버 실행

---

- 이제 생성된 EC2 인스턴스는 ubuntu 18.04 운영체제가 탑제된 텅텅 빈 가상 PC이다.

  해당 인스턴스를 서버가 구동될 수 있는 개발환경을 구성하여 인스턴스에서 서버를 구동시키는 방식은 로컬 개발환경을 구축하는 방식과 동일하므로 생략하도록 하겠다.

- Github Repository에서 가져올 서버환경을 간략히 설명하자면, HTTP 방식으로 80번 포트를 사용하는 서버이며, 각 엔드포인트로의 요청은 다음과 같이 처리된다.

  - `/` : GET 요청

  ```js
  app.get('/', (req, res) => {
    res.status(201).send('Hello World');
  });
  ```

  응답코드 201번으로 'Hello World' 응답 메세지를 보내주는 간단한 구조이다.

  - `/signin` : POST 요청

    ```js
    app.post('/signin', (req, res) => {
      const { username, password } = req.body;
      if (username === '김코딩' && password === '1234') {
        const accessToken = jwt.sign({ username }, 'secretKey', { expiresIn: '1days' });
        res.status(201).send(accessToken);
      } else {
        res.status(401).send('Login Failed');
      }
    });
    ```

    `req.body`에 담긴 username, password가 각각 '김코딩', '1234'인 경우 `accessToken`을 생성하여 (유효기간 1일) 응답코드에 토큰을 담아 전달해주는 구조이다.

  - `/status` : GET 요청

    ```js
    app.get('/status', authToken, (req, res) => {
      if (req.username) {
        // jwt 토큰이 존재할 경우 데이터베이스 연결 여부 조회
        db.query('use test', (err) => {
          if (err) {
            return res.status(200).send({
              isLogin: true,
              isConnectedToDatabase: false,
            });
          }
          return res.status(200).send({
            isLogin: true,
            isConnectedToDatabase: true,
          });
        });
      }
    });
    ```

    로그인에 성공시 DB 연결 여부에따라 다른 결과를 보여주는 마지막 엔드포인트이다.

- 위 accessToken은 로컬 스토리지에 담기며, 인증서 없이 80번 포트에서 HTTP 방식으로 서버가 구동되는 구조를 확인하였다.

<br>
<br>

##### Security Group

---

- 이제 서버를 VSCode SSH 원격 접속환경에서 실행시켜주면 80번 포트로 작동하는 걸 확인 할 수 있다.

  ![스크린샷, 2021-12-06 21-03-56](https://user-images.githubusercontent.com/83164003/144842989-885e45e8-6253-4840-9a3e-70cb38ba9534.png)

  AWS EC2 인스턴스로 접속하여 부여된 퍼블릭 IPv4 DNS 주소로 접근을 하면 다음과 같은 도메인 접속 불가 에러코드를 확인 할 수 있다.

  ![스크린샷, 2021-12-06 20-58-52](https://user-images.githubusercontent.com/83164003/144843062-c3626eaf-28e0-488e-a854-c328b2b4e425.png)

  아직 인스턴스 외부 접근을 위한 **보안 그룹** 설정을 하지 않았기 때문이다.

- 보안 그룹(Security Group)은 우리가 AWS에서 임대한 인스턴스의 가상 방화벽이다.

  인스턴스로 들어가는 트래픽을 제어하는 인바운드 설정과 인스턴스에서 나가는 트래픽을 제어하는 아웃바운드 설정 두가지 보안그룹 설정이 존재한다.

- 아웃바운드의 default값은 EC2 인스턴스에서 외부로 나가는 모든 트래픽이 허용되므로, 우리는 외부에서 접근하는 인바운드 설정만 해주면된다.

  현재 인스턴스의 보안그룹으로 들어가주자.

  ![스크린샷, 2021-12-06 21-13-26](https://user-images.githubusercontent.com/83164003/144844163-2a4c413b-9cb5-443f-a0f0-cabc9acca5da.png)

  인바운드/ 인바운드 규칙 편집을 클릭 후 다음과 같이 80번 포트의 인바운드 규칙을 설정해준다.

  ![스크린샷, 2021-12-06 21-15-10](https://user-images.githubusercontent.com/83164003/144844679-54838d26-e4c0-48b8-819c-63b59f54d749.png)

  이제 인스턴스에서 서버가 켜진 상태에서 다시 퍼블릭 IPv4 DNS 주소로 접속시 'Hello World' 문구를 확인 할 수 있다.

  ![스크린샷, 2021-12-06 21-21-45](https://user-images.githubusercontent.com/83164003/144845244-a7759042-6b95-4734-a2db-86e47bfafa49.png)

<br>
<br>

##### 서버 백그라운드 실행

---

- SSH 프로세스는 강제 종료 시(로컬 환경 터미널 종료시), EC2 상의 프로세스도 같이 종료된다.

  그러므로 우리는 SSH 프로세스가 종료되더라도 서버가 EC2 백그라운드에서 작동하게끔 프로그램을 실행해줘야 한다.

- Linux/Unix 계열 운영체제에서는 `&`라는 키워드를 붙여서 프로그램 실행시 백그라운드 실행으로 만들어줄 수 있다.

  ```
  $ node index.js &
  ```

  위 명령어를 사용하여 서버를 작동시켜주자

  - 반대로 서버를 종료하고 싶다면 kill 명령을 통해 백그라운드에서 실행중인 프로세스를 종료할 수도 있다.

<br>
<br>

#### 2-2. 프론트엔드 배포

---

- 프론트엔드는 S3 버킷을 이용하여 클라이언트가 담긴 정적 웹 사이트를 호스팅 해주어야 한다.

<br>
<br>

##### S3 버킷 생성

---

- 이제 AWS 홈페이지의 S3 버킷으로 접속 후, 버킷만들기로 버킷을 생성해 주자.

  ![스크린샷, 2021-12-06 21-38-12](https://user-images.githubusercontent.com/83164003/144847449-208d76c3-4155-4c3e-98a5-4781b88caf4c.png)

  버킷이름을 설정해줘야한다.<br>
  다만, 한 리전에는 하나의 버킷이름만 생성이 가능하다. 중복이 불가능하므로 고유한 버킷명을 적어주고 별다른 설정없이 인스턴스와 같은 리전에서 버킷을 생성해 주자.

- 이제 만들어진 버킷의 이름을 클릭하여 속성 메뉴로 진입 후, 정적 웹 사이트 호스팅 메뉴로 들어가 아래와 같이 수정해 준다.

  ![스크린샷, 2021-12-06 21-41-05](https://user-images.githubusercontent.com/83164003/144847908-0d550aa1-58e6-4628-8f92-3054ed94fb0e.png)

  정적 웹사이트 호스팅을 활성화를 버튼을 눌러주면, 인덱스 문서등 여러 옵션 선택창이 나온다.

  해당 버킷 웹 사이트 주소에 처음 접속했을 때 보일 기본 페이지를 지정해주는 옵션과 혹시 모를 오류 발생 시 메인 페이지를 반환하기 위해서 **index.html**을 기입해 준다.

- 이제 클라이언트를 담을 S3 버킷이 완성되었다. 버킷 속성 메뉴 진입 후 버킷 웹 사이트 엔드포인트로 접속하면 이제 우리가 만든 버킷 영역으로 접속이 가능하다.

  --![스크린샷, 2021-12-06 21-46-35](https://user-images.githubusercontent.com/83164003/144848531-bef2e5b4-849c-4e68-9ed8-4663c8f69c42.png)

  이제 버킷에 정적 웹 페이지 파일을 아직 업로드 하고, 퍼블릭 액세스 설정 변경과 정책 생성을 해주면 클라이언트가 웹 상에 호스팅되게 된다.

<br>
<br>

##### 버킷에 웹 페이지 파일 업로드

---

- 우선 `im-sprint-practice-deploy`/`client`/`.env.example` 파일을 VSCode SSH 환경으로 접속하여 서버의 주소(퍼블릭 IPv4 DNS 주소)로 환경변수 설정을해준다.
- 환경 변수 관련 설정이 완료 후, client 디렉토리에서 터미널 `npm run build` 명령어를 통해 빌드 파일을 생성해주자.

  <center><img src="https://user-images.githubusercontent.com/83164003/144846947-945598bf-cf0d-4e6c-8553-8cd8e08f5206.png"/></center><br>

  빌드가 성공하면, 위와 같은 폴더가 생성된다.

  이 빌드된 파일들을 버킷에 올려주어야 한다.

- 이전에 생성한 S3 버킷의 ID 클릭 후 객체 메뉴의 업로드를 선택해 준다.

  ![스크린샷, 2021-12-06 21-52-48](https://user-images.githubusercontent.com/83164003/144849536-07c7600d-a8f1-46a0-ba5f-84fd21368ac4.png)

  위와 같은 화면이 나오면 방금 빌드된 폴더를 업로드 해준다.

  EC2 인스턴스에서 빌드된 파일을 로컬환경으로 가져오려면 VSCode SSH 연결이 되어있다면 이동할 디렉토리 우클릭 후 다운로드하여 로컬환경으로 가져올 수 있다.

  <center><img src="https://user-images.githubusercontent.com/83164003/144849810-2c2ef28e-b132-4ba1-b7d8-1fc509388a3e.png"/></center>

- 이제 버킷에 웹 페이지 파일까지 모두 완료되었으니, 버킷으로 접근 권한 설정과 버킷 정책 생성을 해주어야 한다.

<br>
<br>

##### 버킷 권한 설정

---

- 이제 버킷 메뉴중 권한 메뉴로 들어 간 뒤, 퍼블릭 액세스 차단(버킷 설정) 편집을 해 준다.

  ![스크린샷, 2021-12-06 21-58-35](https://user-images.githubusercontent.com/83164003/144850311-b24597c9-cb40-453a-bc2d-bca7f2bdfa58.png)

  모든 퍼블릭 액세스 차단 옵션의 체크 박스를 해제해 준다.

  그리고 이제 버킷 정책을 설정해 주어야 한다.<br>
  버킷 정책 편집 버튼으로 들어 간 뒤 버킷 ARN을 복사 후 버킷 정책 생성기로 들어간다.

  ![스크린샷, 2021-12-06 22-02-02](https://user-images.githubusercontent.com/83164003/144850714-ab4956d8-44cc-400e-b88f-049715b544d1.png)

  정책 생성기에 접속 후 아래 사진과 같이 정책을 생성해 준다.

  ![스크린샷, 2021-12-06 22-03-25](https://user-images.githubusercontent.com/83164003/144850969-0fae56c2-dd48-4ce4-9088-e7214f893f60.png)

  위에서 부터 차례대로 `S3 Bucket Policy` 선택 후 Effect는 Allow로 기본으로 체크되어 있다.

  Principal은 `*`을 입력 해 준 뒤, Actions에서는 `GetObject`1가지 액션만 선택한다.

  마지막으로 Amazon Resource Name (ARN)은 미리 복사한 내 버킷 ARN을 복사 후 `/*`를 뒤에 붙여서 입력해 준뒤 정책을 생성해준다.

- 생성된 정책을 내 버킷 정책에 붙여넣기로 넣어 준 뒤,

  ![스크린샷, 2021-12-06 22-09-59](https://user-images.githubusercontent.com/83164003/144851729-9f691a45-7f36-4b3d-9890-11b4a0d6dd9d.png)

  EC2 인스턴스에서 서버가 접속중인 상태에서 버킷 엔드포인트로 접속해 주면 다음과 같은 화면을 확인 할 수 있다.

  <img width="795" alt="wUMGKH3xh-1618474509693" src="https://user-images.githubusercontent.com/83164003/144852123-c05b18d2-5899-42fb-96c6-33b9b4bc30ff.png">
  <img width="746" alt="ssWhmZWQO-1618474630640" src="https://user-images.githubusercontent.com/83164003/144852104-07bddf18-a447-42a7-92eb-d2551b95fc2b.png">

<br>
<br>

#### 2-3. 데이터베이스 연결

---

- MySQL 데이터베이스 엔진을 사용하는 DB 인스턴스를 생성한 뒤 EC2 인스턴스와 해당 DB를 연결하는 과정으로 완성된다.

<br>
<br>

##### RDS 인스턴스 생성

---

- AWS RDS 메뉴로 진입 후 데이터베이스를 생성해주자.

  ![스크린샷, 2021-12-06 22-24-58](https://user-images.githubusercontent.com/83164003/144853927-fe77299c-62c3-4a32-84ef-e2cf0e54a8ed.png)

  엔진옵션은 MySQL을 선택 후 프리티어로 선택한다.

  ![스크린샷, 2021-12-06 22-26-49](https://user-images.githubusercontent.com/83164003/144854149-c8db7da3-c542-47fe-995c-a3f7398ed993.png)

  자격증명 옵션에서는 마스터 사용자 이름 설정과 8자리 이상의 사용자 비밀번호를 설정해 주자. (마스터 사용자 이름과 비밀번호는 나중에 데이터베이스를 연결할 때 쓰이는 정보이다.)

  ![스크린샷, 2021-12-06 22-29-10](https://user-images.githubusercontent.com/83164003/144854487-8193fb95-f817-40b9-8ac8-97b98d0d4d73.png)

  연결 옵션에서는 퍼블릭 액세스를 "예"로 변경해 준 뒤,

  ![스크린샷, 2021-12-06 22-30-28](https://user-images.githubusercontent.com/83164003/144854619-38337e5f-cee5-49d3-9f05-cebc0a56a7d5.png)

  추가구성으로 가서 포트번호를 13306번으로 변경해 주었다. (흔히 사용되는 3306번 포트 대신, 포트번호 노출을 방지하려는 목적으로 13306번 포트를 사용하였다.)

  ![스크린샷, 2021-12-06 22-31-38](https://user-images.githubusercontent.com/83164003/144854825-e076124f-a9cf-4829-b8a0-7199f379ac2c.png)

  마지막으로 서버에서 연결된 DB 초기값이 test 이름이므로 초기 데이터베이스 명칭을 test로 주었다. (생략 후 MySQL 접속 후 CREATE DATABASE test를 실행해 주어도 된다.)

- 위 과정을 마치면 DB 생성이 진행된다.

  생성이 모두 완료되는데 시간은 2~30분정도 소요되는듯 하다.

- 생성이 완료되면 DB 인스턴스 아이디 클릭 후 연결&보안의 DB 엔드포인트 주소를 복사해준다.

  ![스크린샷, 2021-12-06 22-35-26](https://user-images.githubusercontent.com/83164003/144855391-157d300c-7948-487f-bea5-37e4061615ed.png)

  MySQL이 설치된 환경에서 `mysql -u [마스터 이름] --host [엔드포인트 주소] -P 13306(포트번호) -p` 명령어를 입력 후 마스터 사용자 이름과 비밀번호를 입력하면 DB 인스턴스로 접속이 가능하다.

  ![스크린샷, 2021-12-06 22-40-02](https://user-images.githubusercontent.com/83164003/144856074-398eb02c-788f-4140-ab9e-28f0e70db7f7.png)

  초기 데이터베이스인 test가 확인되면 완료이다.

<br>
<br>

##### RDS 인스턴스 연결

---

- EC2 인스턴스에서 실행되고 있는 서버는, 그 자체로는 작동하고 있지만, 아직 데이터베이스에 연결은 안되어 있다.

  서버의 환경 설정을 통해서 위에서 생성한 RDS 인스턴스에 접속 하면 클라우드 데이터베이스 test DB를 사용할 수 있다.

- `im-sprint-practice-deploy`/`server`/`db`/`connection.js` 파일을 확인 하면 아래와 같은 코드를 확인 할 수 있다.

  ```js
  const mysql = require('mysql');
  const dotenv = require('dotenv');
  dotenv.config();

  const con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
  });

  con.connect((err) => {
    if (err) {
      con.end();
    }
  });

  module.exports = con;
  ```

- 다시 VSCode SSH 로 접속하여 `im-sprint-practice-deploy`/`server`/`.env.example`를 알맞게 수정해 준 뒤 서버를 재시작하자. (`host`는 생성한 DB 인스턴스의 엔드포인트 주소를 넣어준다.)
- 서버를 다시 구동한 뒤, 클라이언트에서 로그인 하면 다음과 같은 화면을 확인 할 수 있다.

  <img width="634" alt="VJm6oOI7Z-1618494315919" src="https://user-images.githubusercontent.com/83164003/144857364-d63b9472-3a6c-437d-a3cf-08af15e1df17.png">

<br>
<br>

## 🤔 Understanding

- 배포...생각보다 어렵다. 아직 AWS에서 무료로 제공하는 도메인에 호스팅만 해보았다.

  우선 스프린트 내용대로 잘 따라는 해서 문제는 딱히 없었다만, 그 과정을 편하게 하기 위해서 VSCode에서 지원하는 SSH 원격 접속방식을 선택했다.

  확실히 터미널에서만 조작하는 방식보다 마우스를 이용해서 편리하게 조작할 수 있는 GUI 환경이 사람이 쓰기엔 훨씬 편한건 어쩔 수 없는듯하다.

- 원하는 도메인을 구매 후 배포하는 것과 HTTPS 인증방식을 사용하는 배포방식은 나중에 다시 해봐야겠다.

<br>
<br>

```toc

```
