---
emoji: 📚
title: 내부망 도메인 접속 실패 이유와 해결 방법
date: '2025-06-30'
author: JH8459
categories: TIL
thumbnail: https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-06-30-TIL/thumbnail.png
---

![github-blog.png](../../../assets/common/til.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

현재 개인 프로젝트 운영 목적으로 사용 중인 NAS에서 배포한 도메인으로 접속하려는데, 맥북에서는 잘 열리던 사이트가 윈도우 노트북에선 아무리 해도 열리지 않았다.  

같은 와이파이를 쓰는 맥북에서는도메인이 잘 열리는데, 윈도우 노트북에서는 접속이 전혀 되지 않았다. (심지어 `nslookup`으로 DNS 변환 과정을 수동으로 테스트해봐도 전혀 문제가 없었다.)

결론적으로, 도메인 접속 문제의 원인은 <strong><u>DNS 해석 결과가 내부망에 적절하지 않게 작동했기 때문</u></strong>이다. 내부에 있는 NAS를 공인 IP로 접근하려다 보니, NAT Loopback 미지원 환경(특히 윈도우)에서는 접속이 실패할 수밖에 없었다.

이런 상황이 발생하는 이유와 해결 과정을 간단히 기록으로 남기고자 이번 포스팅을 남긴다.

<br>
<br>

### 1. 문제가 발생한 이유

---

두 기기 모두 동일한 공유기를 사용하고 있고, IP 대역도 똑같은 내부망에 있는데 왜 한쪽만 접속이 안 되었을까?

도메인 접속 뿐만아니라 `curl`, `Test-NetConnection` 모두 실패했다. 

처음엔 DNS 설정이 바뀌었는지 의심했다. 따라서 `nslookup` 명령어로 접근이 안되고 있는 도메인을 확인해보니 아래와 같이 큰 문제없는 공인 IP 주소(116.xx.xx.xx)가 반환되었다.

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-06-30-TIL/nslookup.png"/>

<center>즉, 도메인 이름은 잘 해석되고 있다. 🤔</center><br><br>


결국 원인은 DNS가 아니라 <strong>해석된 IP가 "공인 IP"였다</strong>는 점에 있었다.

즉, 내 도메인이 운영되는 서버(NAS)가 내부망에 있지만, 외부에서 접근하는 방식(공인 IP)으로 NAS에서 운영되고 있는 어플리케이션으로 접근하려다 보니 공유기나 운영체제의 정책에 따라 연결이 차단되어 접속에 실패했던 것이다.

> 🔄️ **NAT Loopback**이란?
>
> 내부망에 있는 클라이언트가 외부 IP(예: 116.xxx.xxx.xxx)를 통해 같은 내부망에 있는 서버에 접속하려고 할 때, 공유기가 그 트래픽을 다시 내부로 되돌려주는 기능이다.

<br>
<br>

### 2. 해결 방법

---

Mac OS에선 내부망 도메인 접속을 시도하더라도 유연하게 라우팅을 알아서 해주지만 윈도우 환경이라면 아래와 같은 조치가 필요하다.

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-06-30-TIL/nas.png"/>

<center>우선 NAS의 내부 IP 주소를 확인해야한다.</center><br><br>

1. 메모장을 관리자 권한으로 실행한다.
2. `hosts` 파일을 수정한다. 

    > C:\Windows\System32\drivers\etc\hosts

3. 도메인을 내부 IP로 직접 지정

    > 192.168.xxx.xxx lottery.jh8459.com

    ``` text
    # Copyright (c) 1993-2009 Microsoft Corp.
    #
    # This is a sample HOSTS file used by Microsoft TCP/IP for Windows.
    #
    # This file contains the mappings of IP addresses to host names. Each
    # entry should be kept on an individual line. The IP address should
    # be placed in the first column followed by the corresponding host name.
    # The IP address and the host name should be separated by at least one
    # space.
    #
    # Additionally, comments (such as these) may be inserted on individual
    # lines or following the machine name denoted by a '#' symbol.
    #
    # For example:
    #
    #      102.54.94.97     rhino.acme.com          # source server
    #       38.25.63.10     x.acme.com              # x client host

    # localhost name resolution is handled within DNS itself.
    #	127.0.0.1       localhost
    #	::1             localhost
    192.168.xxx.xxx lottery.jh8459.com
    ```

<br>
<br>

요약하자면, 특정 도메인에 접속시 공인 IP가 아닌 내부 IP주소로 직접 지정하여 도메인 접근을 가능하게 해주었다.

`hosts` 파일을 저장한 직후, 브라우저에서 해당 도메인으로 접속해보면 공인 IP를 거치지 않고 NAS의 내부 IP로 직접 연결되어 정상적으로 페이지가 열린다.

<br>
<br>

## 🤔 Understanding

네트워크 참 어렵다. 😮‍💨

집에 서버를 직접 구축해서 도메인까지 올려본 경험이 없어서 도메인이 가리키는 IP가 공인 IP인지, 내부 IP인지에 따라 네트워크 레벨의 동작을 완전히 바꾼다는 점은 모르고 있었다.

덕분에, 같은 네트워크를 사용하더라도 도메인 접속시 사용하는 운영체제나 공유기 설정에 따라서 다르게 동작할 수 있다는 점을 인지하였다.

한번 설정해두면 다신 겪어보진 않을 이슈일거 같기에 기록으로 남겨둔다.

<br>
<br>