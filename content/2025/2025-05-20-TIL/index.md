---
emoji: 📚
title: Grafana + Prometheus + Loki 환경에서 Agents는 어떻게 설계해야 할까?
date: '2025-05-20'
author: JH8459
categories: TIL
---

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-05-20-TIL/thumbnail.png"/>

<br>

## 통합 모니터링 환경 구축기

이전 포스팅 중 AWS EC2에서 개인 서버로 마이그레이션을 진행한 과정을 소개한적이 있다.

> [📌 EC2에서 NAS로, 개인 서버 CI/CD 자동화](https://blog.jh8459.com/2025-03-31-PROJECT/)에서는 EC2 환경에서 Synology NAS로 이전하며 개인 서버에 어플리케이션을 마이그레이션한 경험을 작성했다.

<br/>

하지만 마이그레이션 이후 AWS에서 기본으로 제공되던 CloudWatch와 같은 모니터링 도구들이 사라지면서 시스템이 정상적으로 동작하고 있는지, 리소스는 충분한지, 예기치 못한 에러가 발생하고 있진 않은지를 실시간으로 파악할 수 없게되었다.

단순히 “배포되었다”는 사실만으로는 서비스의 안정성을 보장할 수 없다는 것을 다시금 실감했고 직접 모니터링 시스템을 구축해야 한다는 필요성이 명확해졌다.

이번 포스팅에서는 **Grafana + Prometheus + Loki** 스택을 기반으로 여러 서버가 존재하는 사내 환경에서는 어떻게 모니터링 시스템을 구성했는지, 반대로 단일 서버에 여러 네트워크가 존재하는 NAS 환경에서는 어떤 방식으로 적용했는지 그리고 각 환경에서 사용된 에이전트들의 구성 방식과 차이점은 무엇이었는지를 기록으로 남겨보려 한다.

<br>
<br>

### 1. 여러대의 서버 통합 모니터링

---

내가 속한 조직은 인프라를 온프레미스 기반으로 운영하고 있었고 여러 대의 Linux 서버에 다양한 서비스가 분산되어 실행되고 있었다. 하지만 분산된 서비스의 수가 많아질수록 서버마다 개별적으로 리소스나 로그 상태를 확인하는 방식에는 한계가 분명했다.

- 어떤 서버의 리소스가 과부하인지 직관적으로 파악하기 어렵다.
- 특정 시간대에 발생한 장애나 예외 로그를 서버별로 일일이 확인해야 한다.
- 모니터링 방식이 서버 수에 비례해 관리 비용도 함께 늘어난다.

<br>

이 문제를 해결하기 위해 각 Linux 서버에 다음과 같은 **Agent**를 설치하고 중앙에서 수집하는 방식을 채택했다.

- `node_exporter`: 시스템의 CPU, Memory, Disk 등 자원 정보를 수집
- `cadvisor`: Docker 기반 컨테이너의 상태를 메트릭 단위로 수집
- `mysql_exporter`: 데이터베이스 연결 수, 쿼리 처리량 등의 성능 정보 수집
- `promtail`: 컨테이너 내부 로그를 Loki에 전송

<br>
<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-05-20-TIL/idc.jpg"/>

<center>IDC에 Linux 서버가 추가되더라도 손쉽게 확장가능하다. 👍</center>
<br><br>

각 서버는 Grafana + Prometheus + Loki를 실행하고 있는 서버와 동일한 네트워크(Private Networ)로 구성되어 있으므로 결과적으로 모든 서버의 상태와 중요 서비스들의 로그와 **메트릭(metric)*** 들을 하나의 Grafana 대시보드에서 확인할 수 있는 통합 모니터링 환경을 완성할 수 있었다.

<br>

> 📊 메트릭이란?
>
> 메트릭(metric)은 시스템이나 애플리케이션의 상태를 숫자 형태로 표현한 시간열 데이터(time-series data)를 의미한다.
> 예를 들어 CPU 사용률, 메모리 사용량, 네트워크 트래픽처럼 시간에 따라 변화하는 값들을 주기적으로 수집한 것이 메트릭에 포함된다.

<br>
<br>

### 2. 단일 서버 모니터링

---

반면 개인 프로젝트들은 NAS 한 대 위에 여러 개의 Docker 기반 프로젝트를 올려 운영하기 때문에 컨테이너 간 네트워크 구성과 모니터링 방식에 대해 많은 고민이 필요했다.

특히, 하나의 서버 안에서 모든 컨테이너의 리소스와 로그를 통합 대시보드로 집계하려면 **Agent**마다 다른 수집 방식을 먼저 이해해야 했다.

예를 들어 `mysqld-exporter`는 DB 내부에 직접 TCP 연결을 시도하는 방식으로 동작한다. 이 구조에서는 Agent와 DB 컨테이너가 동일한 Docker 네트워크에 존재하지 않으면 정상적인 수집이 불가능하다.

> 이로 인해 해당 Agent는 `monitoring_network`와 `lottery_network` 두 네트워크에 모두 연결해야만 정상적으로 작동했다.

<br>
<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-05-20-TIL/nas.jpg"/>

<center><strong>mysql-exporter</strong>는 두 네트워크에 모두 편입되어야한다.</center>
<br><br>

반면, `cadvisor`나 `promtail`은 컨테이너 내부 접속 없이도 데이터를 수집할 수 있다. 이들은 네트워크 연결이 아니라 NAS 자체의 파일 시스템과 Docker 소켓을 마운트하는 방식으로 동작한다. 즉, 컨테이너의 리소스 사용량이나 로그를 직접 읽어오기만 하면 되기 때문에 별도의 네트워크 설정 없이도 모든 컨테이너를 관측할 수 있다.

```yaml
# volumes을 마운트하여 모든 컨테이너의 리소스와 로그를 수집
volumes:
  - /:/rootfs:ro
  - /var/run/docker.sock:/var/run/docker.sock:ro
  - /var/lib/docker/:/var/lib/docker:ro
```

<br>

이처럼 Agent마다 수집 방식이 다르기 때문에 단일 서버라고 해서 무조건 단순하게 구성할 수 있는 건 아니었다. 네트워크 기반 수집이 필요한 Agent는 네트워크 설계가 필요하고, 호스트 기반 수집이 가능한 Agent는 적절한 볼륨 마운트가 필요하다.

이러한 구조적 이해를 바탕으로, NAS 환경에서도 Grafana 대시보드 하나로 모든 컨테이너 상태를 모니터링할 수 있는 환경을 완성할 수 있었다.

<br>
<br>

## 🤔 Understanding

개인 프로젝트에 사용한 모니터링 도구들의 자세한 코드 구성이나 `docker-compose.yml` 파일은 <a href="https://github.com/JH8459/MONITORING-STACK" target="_blank">Github 링크</a>로 대체하겠다.

이번 포스팅에서는 보유한 자원(Linux 서버가 여러대인지 혹은 단일 서버 구성인지)에 따라 어떻게 모니터링 시스템을 구성해야하는지에 대해 고민한 흔적을 공유해보고자 포스팅을 남긴다.

<br>
<br>

