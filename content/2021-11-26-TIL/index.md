---
emoji: 📚
title: 무료 도메인 주소를 이용한 AWS HTTPS 인증
date: '2021-11-26'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

- 기존에 EC2, S3, RDS를 통해 배포한 <a href="https://jh8459.github.io/til/21.10.29.til/" target="_blank">웹 애플리케이션</a>(21.10.29 TIL 참조)을 무료 도메인(Freenom)으로 배포하는 Advanced한 삽질 과정을 백엔드/프론트엔드 영역을 나누어 포스팅 해보려 한다.

  > **주의!** CloudFront에서 AWS 인증서 검증은 us-east-1(버지니아 북부) 인증서만 검증이 된다.

- s3와 CloudFront는 글로벌 지역으로 배포가 되고 ec2와 ELB는 지역 리전으로 나뉘어진다.

- 클라이언트는 글로벌 리전에서 작동하므로 리전에 영향을 받진 않을 듯 하고, 서버가 탑재될 ELB 서울리전으로 두고(_<a target="https://www.cloudping.info/" target="_blank">CloudPing.info</a>를 통한 속도 검증 결과 리전마다 속도차이가 명확히 있다._) 개발환경을 구성하는게 서버의 응답속도 때문에 이점이 있을 듯 한데 인증서 문제 때문에 골머리가 아팠다...

- 이를 간단히 해결하기 위해서 배포된 <a href="https://cmarket.cf" target="_blank">https://cmarket.cf</a> 는 us-east-1 리전에서 웹서버가 작동하게 하여(_CloudFront(클라이언트)와 ELB(서버) 인증서가 모두 us-east-1 동일한 인증서 1개로 해결가능_)간단히 해결하였다.

<br>
<br>

### 1. 무료 도메인 HTTPS AWS 배포 - 백엔드

---

<br>
<br>

#### 1-1. 도메인 발급

---

- 도메인 주소를 이용하여 HTTPS 인증방식을 사용하려면 우선 도메인을 발급받아야 한다.

- AWS에서도 Route 53을 통한 도메인 구매가 가능하지만.. 비용부담이 발생하기도 하고 실제 상업사이트나 프로젝트/포트폴리오 목적이 아닌 학업 목적이기 때문에 무료 도메인 사이트인 <a href="https://www.freenom.com/en/index.html?lang=en" target="_blank">Freenom</a>에서 도메인 발급 후, 해당 도메인을 이용하였다.

  ![스크린샷, 2021-11-29 22-26-24](https://user-images.githubusercontent.com/83164003/143876151-e7fed5c2-1b13-4d57-b97f-47440d364cde.png)

  무료 도메인은 예고없이 사라지거나 로그인이 안되는(?)등 종잡을 수 없는 문제가 발생 할 수 있으므로..이런 부분은 감안하고 학습목적 정도로만 사용하도록 하는게 알맞은 사용방향이라 생각한다.

- <a href="http://cmarket.cf/" target="_blank">cmarket.cf</a> 주소로 도메인을 발급 받았으며 최초 발급 후 도메인에 접속하면 DNS 설정도 안된 빈 도메인이기 때문에 아래와 같은 에러코드를 받을 수 있다.

  ![스크린샷, 2021-11-29 22-23-51](https://user-images.githubusercontent.com/83164003/143876050-43d949bd-e541-4507-acee-b59782c602f5.png)

<br>
<br>

#### 1-2. ELB 생성

---

<br>
<br>

##### ELB란?

---

- AWS에서 설명하는 ELB는 다음과 같다.

  ![스크린샷, 2021-12-02 17-26-39](https://user-images.githubusercontent.com/83164003/144385209-49c0bca7-99bf-4d70-ad9a-d8bf0a76f3e8.png)

  단순한 로드 밸런서\* 역할 외에도 인증서 관리등 HTTPS 인증방식 지원까지 겸하고 있는 만능 서비스이다.

  > **로드 밸런서**란?
  >
  > 하나의 인터넷 서비스가 발생하는 트래픽이 많을 때 여러 대의 서버가 분산처리하여 서버의 로드율 증가, 부하량, 속도저하 등을 고려하여 적절히 분산처리하여 해결해주는 서비스.

<br>
<br>

- ELB 서비스가 왜 필요한지 개념을 알았으니, AWS EC2 메뉴중 로드밸런서로 들어가 보자.

  ![스크린샷, 2021-11-29 22-37-16](https://user-images.githubusercontent.com/83164003/143878331-14740d1a-92f8-4bdb-8c93-ce3d7e468979.png)

- 로드밸런서를 생성하려보니 여러 유형을 선택 할 수 있는 선택창이 나온다.

  ![스크린샷, 2021-12-02 17-36-07](https://user-images.githubusercontent.com/83164003/144386594-d626749f-2e92-4e78-ade4-6c52c1c7509d.png)

  우리는 HTTPS 인증 방식을 이용할 예정이니 1번을 선택하자.

- 로드 밸런서 이름을 정한 뒤,

  ![스크린샷, 2021-12-02 17-37-32](https://user-images.githubusercontent.com/83164003/144386771-94d61e1d-5c20-413f-bc13-cd119bdbdd75.png)

  네트워크 맵핑에서는 가용 영역을 모두 체크해주자.

  ![스크린샷, 2021-12-02 17-38-35](https://user-images.githubusercontent.com/83164003/144386995-f2e95a20-928a-400d-b4c0-ea5629603a37.png)

  그리고 리스너\* 를 추가해 주어야 한다.

  > **리스너**란?
  >
  > 짧게 말해 리스너란, 구성한 프로토콜 및 포트를 사용해서 연결 요청을 확인하는 프로세스이다.

  <br>
  <br>

  - 리스너의 구성된 프로토콜/포트로 요청이 왔을때 대상그룹으로 연결(?)해주는 프로세스 같다. ~~(확실하지 않다...)~~

  ![스크린샷, 2021-12-02 17-42-54](https://user-images.githubusercontent.com/83164003/144387585-52909c76-7f0e-463f-8792-8d27ea0a532f.png)

  리스너가 추가되면 각 리스너에 타겟 그룹을 설정해줘야 한다.

- 현재 배포하려는 웹 애플리케이션은 클라이언트와 서버가 토큰을 로컬스토리지에 담아 **HTTP**프로토콜로 데이터를 주고받고 있다.

  ![스크린샷, 2021-12-02 17-51-26](https://user-images.githubusercontent.com/83164003/144389226-eddc00a7-e610-4849-9db7-4bd16edf329e.png)

  그렇기 때문에 클라이언트 ⮕ 로드밸런서로 HTTPS 요청이 와도 인스턴스(웹서버)에는 HTTP 프로토콜로 전달해 주어야 서버에서 클라이언트의 요청에 알맞는 응답 결과를 반환 할 수 있다.

- 그러므로 HTTP/HTTPS 두 리스너는 모두 HTTP 80포트로 인스턴스 연결이 이뤄지게끔 타겟 대상을 설정 해주자.

  ![스크린샷, 2021-12-02 18-00-00](https://user-images.githubusercontent.com/83164003/144390493-66a4eb97-b839-49f0-b3d9-7715ef867dfd.png)

  그리고 상태검사에서는 성공코드를 201번으로 변경하여 대상타겟을 생성해주자.

  ![스크린샷, 2021-12-02 18-02-42](https://user-images.githubusercontent.com/83164003/144390985-cc3aec51-cf97-4647-bc2a-5f207e2c4c53.png)

- 이제 로드밸런서가 외부 클라이언트로부터 HTTP/HTTPS 요청이 왔을 때 인스턴스로 이동하는 과정은 모두 완성하였다. 이제 인증서를 등록해 주어야 한다.

  ![스크린샷, 2021-12-02 18-06-03](https://user-images.githubusercontent.com/83164003/144411410-47d3a10f-8b12-4c79-bd58-c97656cfec51.png)

  HTTPS 프로토콜을 이용하려면 신뢰할 수 있는 기관에서 발급받은 인증서로 통해 통신이 이뤄진다. AWS에서는 ACM(_AWS에서 제공하는 인증서_)를 권장하고 있으며, 기존 사용하던 인증서가 있다면 해당 인증서를 import 해주어서 로드밸런서에 인증서를 등록해줄수도 있다.

  AWS에서도 무료로 인증서 발급을 해주기도하고, 권장하는 방법이기 때문에 새로 발급해서 사용하기로 하였다.

<br>
<br>

#### 1-3. ACM을 통한 인증서 발급

---

- AWS에서 발급 가능한 인증서를 만들기 위해 우선 **새 인증서 요청** 버튼으로 진입 후 요청을 눌러준다.

  ![스크린샷, 2021-12-02 20-46-27](https://user-images.githubusercontent.com/83164003/144416238-157f4c2d-0eaa-4374-b5c6-b2f9356992ff.png)

  퍼블릭 인증서 요청을 선택한 뒤 다음 버튼을 누르면, 도메인 이름과 검증 방식을 설정해 준다.

  ![스크린샷, 2021-12-02 20-48-33](https://user-images.githubusercontent.com/83164003/144416552-6a6e340d-d5a2-4276-b512-c9f6a11330e0.png)

  도메인 이름에 다른이름을 추가한 이유는 서버/클라이언트 각각 다른 도메인으로 배포하기 위함이다. (서버는 server.cmarket.cf 로 배포하였다.)

  Freenom에서 발급 받은 도메인 앞에 와일드카드(`*`)를 입력하여 도메인이름을 설정하였다.

  그리고 검증방식은 DNS 방식을 선택해주자. ~~(이게 간편하다고 하더라..)~~

- 조금 기다린 뒤 인증서 ID를 눌러보면 CNAME 값이 생성된 것을 볼 수 있다.

  ![스크린샷, 2021-11-30 01-31-46](https://user-images.githubusercontent.com/83164003/143906637-868b596f-7209-491e-becf-7347fe2e9ffd.png)

  그 뒤 Manage Freenom DNS 로 이동해 준다.

  ![스크린샷, 2021-12-02 20-56-02](https://user-images.githubusercontent.com/83164003/144420586-a718cd8f-3a36-4078-b4ca-49bcf92bc503.png)

  > AWS Route 53에서 발급받은 도메인이라면 레코드 추가하기로 간편하게 Route 53에서 DNS 검증이 가능하지만, 무료 도메인을 발급 받은 상황이기때문에 Freenom DNS로 가서 설정을 변경해줘야 한다.

  <br>
  <br>

- TYPE을 CNAME 으로 변경해 준 뒤, AWS에서 확인한 CNAME 이름과 값을 넣어주고 저장해준다.

  그 후 ACM으로 와서 검증이 끝날 때 까지(_5~10분정도 소요되었다._) 기다려주면 아래와 같은 인증서 발급 완료 안내를 확인 할 수 있다.

![스크린샷, 2021-11-30 01-45-32](https://user-images.githubusercontent.com/83164003/143908476-0a484866-aafa-4382-8d04-2099ea5ef71f.png)

- 생성 중이던 로드밸런서에 발급받은 인증서를 넣고 생성을 완료한다.

<br>
<br>

#### 1-4. Freenom ⬌ Route 53 연결

---

<br>
<br>

##### Route 53란?

---

- 우선 Route 53은 AWS에서 제공하는 DNS(Domain Name Service)이다.

  그 외에도 도메인과 관련된 여러가지 서비스를 제공한다. 간략히 DNS 개념만 언급하자면 IP로 도메인을 기억하기는 힘들기때문에 사람이 기억하기 이름 형태로 변환해주는 시스템이다.

- 이제 Freenom DNS 검증은 완료되었다, AWS에서 해당 도메인을 사용하기 위해서 Freenom Nameservers 설정을 변경해 주자.

  ![스크린샷, 2021-11-30 02-02-27](https://user-images.githubusercontent.com/83164003/143911244-7cb509e0-6b6a-4406-a120-eed04b5f6317.png)

  위 사진 영역에 Route 53에서 호스팅 영역을 생성 후 NS 에 해당하는 라우팅 대상을 맵핑해서 넣어주면 된다.

  ![스크린샷, 2021-11-30 02-13-28](https://user-images.githubusercontent.com/83164003/143912771-bbaacb32-af5e-439c-9bfe-b2bcc58eabc6.png)

- 이제 Freenom에서 발급 받은 무료 도메인(cmarket.cf)은 AWS Certificate Manager을 받기 위한 DNS 검증도 끝났으며, Route 53 호스팅 영역에도 연결이 되었다.

<br>
<br>

#### 1-5. Route 53 ⬌ ELB 연결

---

- Route 53도 도메인과 연결되어 있으며 ELB도 인스턴스에 연결되어 있는 상태이다. 이 둘을 연결만 해주면 도메인에서도 인스턴스 접근이 가능하다.

  Route 53 메뉴로 가서 레코드 한줄만 써주도록 하자.

  서버를 도메인에 등록할텐데, 인증서 발급시 와일드카드(`*`)로 주었기 때문에 서버의 도메인은 원하는 이름을 주어도 가능하다.

  아래 사진과 같이 레코드를 생성해주었다.

  ![스크린샷, 2021-12-02 21-24-45](https://user-images.githubusercontent.com/83164003/144421521-15fd77de-474f-41dc-a80e-caeb95d46b3b.png)

<br>
<br>

#### 1-6. 연결 확인

---

- 이제 server.cmarket.cf 도메인을 브라우저 검색창에 검색한다면, AWS의 Route 53의 DNS서비스를 통하여 ELB에 접근하게된다.

  ELB에서는 트래픽을 자동으로 분산 시켜서 HTTPS/HTTP 을 요청을 리스너를 통하여 HTTP/80번 포트로 EC2 인스턴스 접근을 허용시킨다.

- EC2에 서버가 켜져있다면 endpoint `/` 로 접근이 될것이므로,

  ```js
  app.get('/', (req, res) => {
    res.status(201).send('Hello World');
  });
  ```

  따라서 <a href="https://server.cmarket.cf/" target="_blank">https://server.cmarket.cf</a> 도메인 검색시 아래와 같은 결과가 확인된다.

  ![스크린샷, 2021-12-02 21-30-26](https://user-images.githubusercontent.com/83164003/144422316-8d6ed790-125f-4959-9243-dfc05ca6d63a.png)

  해당 도메인에 AWS에서 발급받은 인증서가 유효하게 작동하는 HTTPS 서버 도메인이 완성되었다.

<br>
<br>

### 2. 무료 도메인 HTTPS AWS 배포 - 프론트엔드

---

<br>
<br>

#### 2-1. S3 버킷 엔드포인트 수정

---

- 기존 버킷에 등록된 빌드 파일은 HTTP로 서버와 클라이언트간 통신이 이뤄지고 있었다.

  ![스크린샷, 2021-12-02 17-51-26](https://user-images.githubusercontent.com/83164003/144423691-019196bd-2cbc-44cc-980a-ffbb4bcaf39b.png)

  ACM을 이용한 HTTPS 인증방식이 이뤄질 수 있도록 클라이언트의 `.env` 파일을 수정하여 엔드포인트를 https://server.cmarket.cf 로 변경해 준 뒤 다시 빌드하여 버킷에 다시 업로드 해주었다.

#### 2-2. CloudFront 배포 생성 (S3 ⬌ CloudFront 연결)

---

- 버킷으로는 인증서를 이용한 HTTPS 인증방식이 불가능하기 때문에, S3를 CloudFront에 연결해 주어야 한다.
- 우선 CloudFront 생성하기로 진입 후 원본 도메인에서 기존 S3 버킷을 선택해 준다.

  ![스크린샷, 2021-12-02 21-44-21](https://user-images.githubusercontent.com/83164003/144424581-a9dadcea-be3f-44b8-ae39-066b504c9c07.png)

- 기본 캐시동작에서 뷰어 프로토콜 정책은 Redirect HTTP to HTTPS 로 선택해 준다

  ![스크린샷, 2021-12-02 21-44-42](https://user-images.githubusercontent.com/83164003/144424748-0520949f-381d-4a7f-85fb-de731eb71af1.png)

- 그 다음 설정에서 CNAME은 도메인으로 쓸 cmarket.cf를 입력 해 준뒤, 미리 생성해 둔 인증서(us-east-1)를 등록해준다.

  ![스크린샷, 2021-12-02 21-47-37](https://user-images.githubusercontent.com/83164003/144425006-75cb095b-c14f-4952-9612-c23a98770d90.png)

  **인증서는 반드시 미국 동부(버지니아 북부) 리전(us-east-1)에 있어야 합니다.**

  _이 문구 때문에 사실 서울 리전을 한번 갈아 엎고 미국 동부 리전에서 다시 시작하였다..._ ~~장난..??~~

  그리고 계속하여 설정에서 기본값 루트 객체를 index.html으로 수정해준 뒤 배포 생성을 완료해준다.

  ![스크린샷, 2021-12-02 21-51-06](https://user-images.githubusercontent.com/83164003/144425488-f118043d-d44a-4f3b-9009-e2209377cf22.png)

- 그 뒤 배포 상태가 **활성화 됨**으로 확인되면, 배포 아이디 클릭 후 오류 페이지로 접근 하여 사용자 정의 오류 응답을 작성해 준다.

  ![스크린샷, 2021-12-02 21-53-28](https://user-images.githubusercontent.com/83164003/144425878-f7959699-d29e-4781-b084-deb136799673.png)

  에러코드 403번과 404번 모두 오류 응답 200번 코드로 응답 페이지는 /index.html 으로 설정 해준다.

  ![스크린샷, 2021-12-02 21-55-05](https://user-images.githubusercontent.com/83164003/144426098-da4a7eb7-7f6b-427a-9eeb-bf419f61a804.png)

  이제 클라이언트도 유효한 인증서를 기반으로 HTTPS 인증방식으로 서버와 통신할 수 있게 배포가 되었다.

<br>
<br>

#### 2-3. Route 53 ⬌ CloudFront 연결

---

- 사실 Cloudfront 배포가 성공하였다면, AWS에서 제공하는 유효한 도메인이 발급이 된다.

  ![스크린샷, 2021-12-02 22-00-11](https://user-images.githubusercontent.com/83164003/144426871-9e5f9d34-31d3-4d11-a8d1-983a157e2a38.png)

  다만..~~(이쁘지 않다..)~~ 애써 발급받은 도메인을 놀리기엔 아깝지 않은가? ELB를 도메인과 연결시켰듯이 클라이언트가 담긴 Cloudfront 또한 Route 53에서 별칭 레코드를 생성해주자.

- Route 53의 호스팅 영역으로 간뒤, 레코드 생성을 아래와 같이 해준다.

  ![스크린샷, 2021-12-02 22-03-59](https://user-images.githubusercontent.com/83164003/144427560-b399fcf4-9bd4-43bd-b70c-c526445fc57b.png)

  cmarket.cf 도메인 주소를 클라이언트가 보여지는 영역으로 쓸 것이므로 이름값은 따로 주지 않았다.

<br>
<br>

#### 2-4. 연결 확인

---

- 이제 클라이언트/서버가 모두 HTTPS 인증방식으로 내가 원하는 도메인으로 발급이 모두 완료되었다.

  ![cmarket cf](https://user-images.githubusercontent.com/83164003/144428894-aff7f1f8-2401-42aa-8298-8f79ad67dc4f.gif)

  리스너를 HTTP/HTTPS 방식 모두 지원하기 때문에 도메인에 배포한 HTTPS 방식의 통신도 지원하며, S3 버킷에서 HTTP 환경으로 클라이언트를 구동시켜도 모두 서버와 원활히 통신이 가능하다.

<br>
<br>

## 🤔 Understanding

- AWS...너무 어렵다.

  단순히 인스턴스 올리고 버킷에 객체 업로드 하고 RDS로 DB 생성 후 연동하는건 정말 걸음마 단계였던거 같다.

- 원래 해당 스프린트는 Advanced 과정으로 코드스테이츠에는 Route 53에서 도메인을 구매 후 진행하라 일러준다.

  학습과정에서 적게는 9$ 이상씩 지불하기가 아깝기도 하고.. AWS에서 지원하지 않는 외부 도메인을 사용해서 Route 53에서 등록하는 과정까지 학습과정에서는 모두 좋은 경험이라 생각든다.

- 마음에 안드는 부분은 CloudFront 배포가 무조건 us-east-1 리전에서만 가능하기때문에 EC2 인스턴스도 억지로 서울 리전을 버리고 us-east-1 리전으로 강제 이주하였다..

  서두에 말했듯이, 미국지역 리전의 응답속도와 서울 리전의 응답속도는 하늘과 땅차이 였다.

  ![스크린샷, 2021-12-02 19-54-25](https://user-images.githubusercontent.com/83164003/144410348-669abeb7-67a6-413f-95bf-4e4373125150.png)

  위와 같이 엄청난 속도차이가 있다.~~(역시 인터넷 속도는 한국)~~ 서울 리전에 서버를 두고 다시 배포해보는 과정을 생각해봐야 겠다. (이렇게 되면 클라이언트/서버 각각 인증서가 리전이 다른데 유효할지 의문이 든다..)

  찜찜하지만.. 우선 초기에 목표로 둔 내가 원하는 도메인에 HTTPS 인증방식으로 배포하는게 성공해서 잠은 푹 잘 수 있을듯 하다.

<br>
<br>

```toc

```
