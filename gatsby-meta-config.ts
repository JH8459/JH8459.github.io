import dotenv from 'dotenv';
import type { AboutMetadata, ProjectItem } from './src/types/about';

dotenv.config();

const portfolioProjects: ProjectItem[] = [
  {
    title: 'PROGRAMMERS-BADGE-V2',
    period: '2026.03 - 2026.06',
    description:
      '프로그래머스 프로필 정보를 뱃지 이미지와 Markdown 코드로 제공하는 Chrome 확장 프로그램을 개발했습니다.',
    bullets: [
      'V1은 저장소 포크, PAT 발급, GitHub Actions 설정이 필요해 초기 사용 과정이 복잡했습니다. Chrome 확장 프로그램에서 프로필 정보를 불러오는 방식으로 재설계해 별도 저장소 연동 없이 뱃지를 생성할 수 있게 했습니다.',
      'API, Web, Manifest V3 확장 프로그램과 공통 계약 패키지를 pnpm·Turbo 모노레포로 구성했습니다. NestJS CQRS로 기능 책임을 분리하고 Zod 런타임 검증으로 애플리케이션 경계의 요청·응답 규격을 확인했습니다.',
      '패키지 간 변경으로 발생할 수 있는 회귀를 줄이기 위해 GitHub Actions에서 lint, typecheck, 단위 테스트, E2E와 API 커버리지를 검증했습니다. 검증 통과 후 API·Web·Chrome Web Store로 배포하는 과정을 자동화하고 확장 프로그램 v0.1.1을 출시했습니다.',
    ],
    techStack: [
      'TypeScript',
      'NestJS',
      'Zod',
      'pnpm',
      'Turbo',
      'Chrome Extension',
      'GitHub Actions',
    ],
    thumbnailUrl: 'project-programmers-v2.png',
    thumbnailFit: 'contain',
    thumbnailBackground: '#ffffff',
    links: {
      homepage: 'https://programmers-badge.jh8459.com/',
      github: 'https://github.com/JH8459/programmers-badge-v2',
      post: '',
      demo: '',
      chromeExtension:
        'https://chromewebstore.google.com/detail/programmers-badge-v2/nfaknmfniiemabicmcbdkajapapdglaf?authuser=0&hl=ko',
    },
  },
  {
    title: 'LOTTERY 🍀',
    period: '2024.01 - 2025.04',
    description:
      '복권 정보를 직접 확인해야 하는 번거로움을 줄이기 위해 당첨 결과와 통계를 이메일 정기 구독과 Slack 앱으로 제공한 개인 프로젝트입니다.',
    bullets: [
      '수집 작업이 API 장애와 무관하게 정해진 시간에 실행되어야 했습니다. Express 크롤링 서버와 NestJS API 서버의 실행 경계를 분리하고, 최신 회차 정보는 Redis에 캐싱해 반복적인 DB 조회를 줄였습니다.',
      '단위 테스트만으로는 DB, Redis, 외부 API가 연결된 전체 흐름을 검증하기 어려웠습니다. MariaDB와 Redis를 테스트 컨테이너로 구성하고 사용자 알림 직전까지 검증하는 E2E 테스트를 GitHub Actions의 빌드·배포 선행 단계로 자동화했습니다.',
      'EC2 운영 비용을 줄이기 위해 Docker Compose 기반 서비스를 Synology NAS로 이전했습니다. GitHub Actions와 Docker Hub로 이미지 빌드·배포 파이프라인을 구성해 개인 서버에서도 동일한 컨테이너 배포 흐름을 유지했습니다.',
    ],
    techStack: ['Node.js', 'NestJS', 'React', 'Docker', 'Redis'],
    thumbnailUrl: 'project-lottery.png',
    thumbnailBackground: '#ffffff',
    links: {
      post: 'https://blog.jh8459.com/2024-07-01-PROJECT/',
      github: 'https://github.com/JH8459/LOTTERY',
      demo: 'https://lottery.jh8459.com/',
    },
  },
];

/**
 * @description 사이트 메타 정보를 담는 구조
 */
interface MetaConfig {
  title: string;
  description: string;
  language: string;
  siteUrl: string;
  ogImage: string;
  comments: {
    giscus: {
      repo: string;
      repoId: string;
      category: string;
      categoryId: string;
    };
  };
  googleTrakingId?: string;
  firebaseApiKey?: string;
  firebaseAuthDomain?: string;
  firebaseDatabaseURL?: string;
  firebaseProjectId?: string;
  firebaseStorageBucket?: string;
  firebaseMessagingSenderId?: string;
  firebaseAppId?: string;
  author: {
    name: string;
    bio: {
      role: string;
      description: string[];
      thumbnail: string;
    };
    social: {
      github?: string;
      linkedIn?: string;
      yozmIt?: string;
      email?: string;
    };
  };
  about: AboutMetadata;
}

const metaConfig: MetaConfig = {
  title: `JH's Engineering Notes`,
  description: `Architecture decisions, event-driven systems, observability, and knowledge sharing`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://blog.jh8459.com`,
  ogImage: `/og-image-v2.png`, // Path to your in the 'static' folder
  comments: {
    giscus: {
      repo: `JH8459/JH8459.github.io`,
      repoId: 'R_kgDOI03HgA',
      category: 'Comments',
      categoryId: 'DIC_kwDOI03HgM4CtuXL',
    },
  },
  googleTrakingId: process.env.GOOGLE_TRAKING_ID, // Google Analytics Tracking ID
  firebaseApiKey: process.env.FIREBASE_API_KEY, // Firebase Web API Key
  firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN, // Firebase Web Auth Domain
  firebaseDatabaseURL: process.env.FIREBASE_DATABASE_URL, // Firebase Realtime Database URL
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID, // Firebase Project ID
  firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET, // Firebase Storage Bucket
  firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID, // Firebase Messaging Sender ID
  firebaseAppId: process.env.FIREBASE_APP_ID, // Firebase App ID
  author: {
    name: `김정현`,
    bio: {
      role: `백엔드 개발자`,
      description: ['소통에 가치를 두는', '능동적으로 일하는', '필요한 것을 만드는'],
      thumbnail: '/thumbnail.gif', // Path to the image in the 'static' folder
    },
    social: {
      github: `https://github.com/JH8459`,
      linkedIn: `https://www.linkedin.com/in/jh8459/`,
      yozmIt: `https://yozm.wishket.com/magazine/@JH8459/`,
      email: `kk_ong2233@naver.com`,
    },
  },

  // metadata for About Page
  about: {
    summary: [
      '안녕하세요. 백엔드 엔지니어 김정현입니다.',
      '',
      'Node.js/TypeScript 생태계를 중심으로, 단일 구조 서비스를 도메인 단위로 분리하고 이벤트 기반 아키텍처(DDD · CQRS · Kafka Outbox · 이벤트 소싱)로 확장해 왔습니다. 개발–배포–관측–장애 대응까지 전 과정을 직접 다루며, “기능을 빠르게 만드는 것”보다 “쉽게 흔들리지 않는 구조”를 좋아합니다.',
      '',
      '최근에는 실무에서의 시행착오와 설계 기준을 글로 구조화해 더 많은 독자에게 전달하는 일에도 힘을 쏟고 있습니다. 기술 블로그에 꾸준히 기록해 온 내용을 바탕으로, 더 넓은 독자층과 공유하고 싶어 요즘IT에도 기고하며 선택의 이유 · 트레이드오프 · 결과를 솔직하게 전하고 있습니다.',
      '',
      '[제가 주로 다루는 것들]',
      '',
      '- Event-driven architecture: Kafka Outbox, 비동기 흐름 설계, 데이터 정합성/트랜잭션 안정성',
      '- Architecture: DDD, CQRS(조회/명령 분리), 이벤트 소싱',
      '- Observability/Operations: 로그 · 메트릭 · 트레이스 연계, 병목/에러 지점 추적',
      '- Delivery/Platform: Docker, GitHub Actions CI/CD, Kubernetes + Argo CD(GitOps) 운영 경험',
    ],
    resume: {
      role: 'Backend Engineer',
      experience: '5년 차 백엔드 개발자',
      phone: '+82 10 9092 8459',
      email: 'kk_ong2233@naver.com',
      introduction: [
        'Node.js와 TypeScript로 B2B와 B2C 서비스를 개발해 온 5년 차 백엔드 엔지니어입니다. 기획 단계부터 사용자와 관리자의 업무 흐름에서 문제를 찾고, 해결 방향과 기능의 동작 기준을 구체화해 설계·구현·운영 개선까지 맡는 프로덕트 엔지니어로 일합니다. 캠페인·댓글 검수처럼 AI를 업무에 연결할 때는 자동화 범위와 사람의 판단이 필요한 지점을 구분하고, 관리자의 검토·제어·예외 처리를 포함한 Human-in-the-Loop 흐름을 설계합니다.',
        '운영 환경의 로그·메트릭·트레이스와 실행 계획을 근거로 병목과 장애 원인을 찾고, 데이터베이스와 비동기 처리 구조를 개선해 운영 안정성을 높여 왔습니다. 원인이 사용 중인 오픈소스 라이브러리에 있다면 최소 재현 사례와 버전별 검증 결과로 범위를 좁혀 제보하고, 수정에도 기여합니다. 외부 서비스 연동에는 실패를 전제로 Outbox·멱등 처리·재시도 예산·서킷 브레이커를 적용해 장애가 인접한 흐름으로 번지지 않도록 설계합니다.',
        '서비스를 분리할 때는 경계와 데이터 소유권, 이벤트 계약, 실패 복구 경로를 함께 설계합니다. 새로운 기술은 문제 해결에 필요한 만큼 선택하고, AI 기능과 개발 과정에도 사람이 검증하고 운영 지표로 개선할 수 있는 흐름을 남깁니다.',
      ],
      projects: portfolioProjects,
      experiences: [
        {
          mark: 'SD',
          logo: '/smiledragon.png',
          logoBackground: '#ff874b',
          company: '스마일드래곤주식회사',
          period: '2025.07 - 현재',
          duration: '',
          employmentType: '정규직',
          role: 'Backend Engineer',
          level: '',
          current: false,
          projects: [
            {
              period: '2026.06 - 현재',
              title: '체험뷰 백엔드 마이그레이션 및 서비스 고도화',
              summary:
                'MAU 약 2만 명의 체험단 플랫폼에서 AI 검수와 관리자 MCP App을 개발하고, 광고 노출 집계·백엔드 이관·조회 성능과 배포 안정성을 개선하고 있습니다.',
              bullets: [
                '일평균 300~400건의 캠페인 검수를 AI 기반으로 전환하는 기능을 기획·설계·구현했습니다. 관리자가 검수 기준을 버전별로 관리·활성화하고, 전용 DB 대기열·워커의 AI 판정 결과와 규칙에 따라 자동 승인·반려하도록 구현해 검수 작업 시간을 약 1/10로 줄였습니다. 일 승인 상한을 적용하고, 확인이 필요한 건은 사람 검수로 남기도록 설계했습니다.',
                '관리자가 ChatGPT·Claude에서 자연어로 관리자 데이터를 조회할 수 있는 MCP App을 설계·구현했습니다. AI가 호출할 수 있는 API를 허용된 조회 기능으로 제한하고, 응답의 개인정보를 서버에서 마스킹하며 관리자별·전체 분당 호출 상한을 두었습니다. OAuth 기반으로 요청마다 인증 토큰이 해당 MCP 서버용으로 발급됐는지, 필요한 접근 권한이 있고 만료되지 않았는지 확인하도록 구현했습니다.',
                '광고주의 캠페인 성과 추적을 위한 스폰서 배너 노출을 서명·봇 필터로 검증하고, Redis 원자 연산으로 30분간 중복을 억제한 뒤 Kafka·Consumer Inbox로 멱등 적재했습니다. 실패 보상과 최근 3일 재집계로 지연 도착·부분 실패에도 일별 성과의 정합성을 유지했습니다.',
                '기존 API 계약과 핵심 사용자 시나리오를 회귀 테스트로 명세화한 뒤 NestJS 기반 v2 API를 개발했습니다. 기존 데이터는 처리량과 전환 일정을 기준으로 청크 단위 마이그레이션 작업을 설계·검증해 서비스 중단 없이 이관했습니다.',
                '캠페인 신청 목록 조회에서 약 437만 행의 중간 결과와 N+1 쿼리가 발생하는 병목을 찾아, JOINED populate를 관계별 SELECT_IN 조회로 바꾸고 서브쿼리·복합 인덱스·일괄 조회를 적용했습니다. 운영 트레이스 기준 응답 시간은 p50 9.63초→92ms(99.0%), p95 약 30초→888ms(97.0%), p99 약 30초→1.91초(93.6%)로 단축했습니다. 하루 약 8만 회 호출되는 목록 API의 요청당 쿼리를 25회에서 4회로 줄였습니다. 약 16만 건의 데이터로 테스트해 핵심 쿼리의 조회 행 수가 164,313건에서 22건으로 줄어든 것을 확인했습니다.',
                '사용자 안내 메일 배치가 최대 약 53분간 실행돼 작업을 오래 점유하던 구조를 Outbox·워커 기반 비동기 처리로 전환했습니다. 영구 실패와 재시도 가능한 오류를 구분하고, 발송 직전 수신처를 조회해 개인정보 삭제 조건을 반영했습니다.',
                'Kubernetes와 Argo CD의 롤링 배포 중 종료 신호 직후 진행 중인 요청과 크론이 중단되는 위험을 확인해, NestJS graceful shutdown과 Helm 종료 대기 설정을 적용하고 요청과 작업이 완료된 뒤 서버가 종료되도록 개선했습니다.',
              ],
            },
            {
              period: '2025.08 - 2026.02 · 2026.08 - 2026.09',
              title: '마케팅24 주문 처리 및 AI 댓글 검수 시스템 고도화',
              summary:
                '월평균 약 23만 건의 주문이 발생하는 SNS 마케팅 플랫폼에서 주문 생명주기와 여러 외부 대행사 연동을 표준화했습니다.',
              bullets: [
                '고객이 작성한 후기·홍보 문구를 참여자에게 배정하는 댓글 주문에서, 문제 댓글 하나로 주문 전체가 중단되던 흐름을 Gemini 기반 AI 검수와 댓글별 비동기 처리 구조로 변경했습니다. AI 판정과 관리자 최종 차단을 분리해 위험 댓글만 보류하고 정상 댓글은 계속 배정되도록 구현했으며, 판정 결과·실패·대기 시간을 OpenTelemetry·SigNoz로 계측했습니다.',
                '외부 공급자 연동의 반복 실패가 정상 주문 처리를 지연시켜 Redis 기반 서킷 브레이커를 자동 주문 건별로 도입했습니다. 같은 건의 네트워크 오류가 5회 누적되면 5분간 호출을 건너뛰고, 재시도가 무의미한 오류는 집계에서 제외했습니다. Redis 장애 시에는 차단 없이 통과시켜 보호 장치가 정상 주문을 막지 않도록 했습니다.',
                '주문 유형별 상태와 전이 조건을 도메인 규칙으로 모델링하고, 실패·환불·재처리를 하나의 주문 생명주기로 통합했습니다. 유형마다 흩어져 있던 후속 처리 기준을 통일해 관리자가 일관된 규칙에 따라 주문을 복구할 수 있도록 했습니다.',
                '여러 외부 대행사의 주문을 내부 주문 모델과 상태 체계로 통합하고, 재전송·주문번호·URL·상품 변경 API를 시나리오별로 분리했습니다. 외부 대행사 주문 접수와 진행 상태 확인 요청은 DB Outbox에 적재한 뒤 Kafka로 비동기 전달하고, 발행 성공 여부를 기록해 미발행 메시지를 재처리하도록 구성했습니다. Consumer Inbox로 중복 소비에 대응해 대행사 주문 연동의 실패 복구 경로를 마련했습니다.',
                '주문 API와 외부 대행사 API 연동의 배포 검증에 SigNoz MCP를 연결한 AI Agent 워크플로를 구성했습니다. 에이전트가 저장소 규칙·테스트·리뷰 기준을 작업 맥락으로 참조하고, SigNoz의 호출량·응답 시간·p99·오류율을 배포 전후로 비교하도록 해 코드 검증과 운영 지표 확인을 연결했습니다.',
              ],
            },
            {
              period: '2026.02 - 2026.06',
              title: '진콘(Gincon) MSA 백엔드 아키텍처 및 이벤트 처리 구조 설계',
              summary:
                '회원, 프로필, 커뮤니티, 포인트, 캠페인 서비스의 책임과 데이터 소유권을 나누고, 서비스 간 이벤트 계약과 실패 처리 기준을 공동 설계했습니다.',
              bullets: [
                '서비스마다 이벤트 규격이 달라 변경 시 발행자와 소비자의 호환성이 깨질 위험이 있어, 회원·포인트 등 도메인 상태 변화 이벤트의 이름과 페이로드, 버전 규칙을 도메인 이벤트 계약으로 정의해 Git 서브모듈로 관리하고 CI 스키마 검증으로 규격 불일치를 병합 전에 차단했습니다.',
                'Kafka 기반 비동기 처리에서 데이터 변경과 이벤트 발행 사이의 유실과 중복 소비 가능성이 있어, Outbox와 Inbox, 멱등 처리와 실패 이벤트 격리를 적용하고 실패 이력 조회와 재처리 API를 구성해 운영 복구 경로를 마련했습니다.',
                '서비스 간 동기 호출이 늘어나면서 결합도와 장애 전파 위험이 커져, Kafka 이벤트로 상태를 동기화하고 각 서비스가 필요한 데이터를 직접 소유하도록 구성했으며, 상태 재구성이 필요한 기능에는 Event Sourcing을 적용해 이벤트 재생으로 복원할 수 있도록 했습니다.',
                '서비스마다 검증 규칙과 테스트 환경이 달라 변경 품질을 일관되게 확인하기 어려워, lint와 단위 테스트 및 빌드를 공통 CI로 통합하고 E2E 테스트 환경을 도메인별로 격리해 병렬 실행 기반을 마련했으며 평균 실행 시간을 67.9% 단축했습니다.',
              ],
            },
            {
              period: '2025.07 - 2025.08',
              title: '뷰업 계정 및 본인인증 백엔드 고도화',
              summary:
                '계정 API 전환과 NICE 본인인증 모듈 재구성을 통해 외부 인증 연동의 안정성과 유지보수성을 개선했습니다.',
              bullets: [
                '계정 API를 v2로 이관하는 과정에서 기존 프런트엔드와 서비스의 연동 계약이 깨질 위험이 있어, 회원가입과 계정 복구, 재인증 및 계정 조회 API를 단계적으로 전환하고 에러 코드와 리다이렉트 정책을 정비해 호환성을 유지했습니다.',
                'NICE 본인인증의 토큰 발급과 암호화, 결과 복호화 및 검증 로직이 Facade에 집중되어 변경 영향이 커, 책임을 UseCase와 Command로 분리하고 레거시 계정과 임시 사용자 데이터 처리 규칙을 정비해 인증 상태의 불일치 가능성을 낮췄습니다.',
              ],
            },
          ],
        },
        {
          mark: 'ACG',
          logo: '/acg.png',
          logoBackground: '#ffffff',
          company: '(주)에이시지알',
          period: '2022.04 - 2025.06',
          duration: '',
          employmentType: '정규직',
          role: 'Backend Engineer',
          level: '',
          projects: [
            {
              title: 'B2B 채용·검사 솔루션 백엔드 개발 및 운영 고도화',
              bullets: [
                '고객사마다 검사 콘텐츠와 결과 구조, 외부 연동 규격이 달라 신규 도입 때마다 개별 구현이 반복돼, 요구사항을 조율해 문제와 응답, 채점 및 결과 모델과 B2B API를 공통 규격으로 표준화하고 고객사별 요구를 동일한 구조 안에서 수용할 수 있도록 했습니다.',
                '대량 텍스트를 LIKE로 검색하면서 데이터가 늘어날수록 응답이 지연돼, 검색 책임을 Elasticsearch로 분리하고 DB 병목을 줄여 응답 속도를 약 4배 개선했습니다.',
                '배포 때마다 서비스 중단과 롤백 부담이 발생하고 개별 로그만으로는 장애 요청의 흐름을 추적하기 어려워, Docker Compose 기반 블루 그린 배포와 로그, 메트릭, 트레이스 관측 환경을 구성해 문제 발생 시 원인을 추적하고 기존 버전으로 전환할 수 있도록 했습니다.',
              ],
            },
            {
              title: '온라인 화상 감독 인적성 검사 플랫폼 신규 개발 및 비용 최적화',
              bullets: [
                '기존 외부 솔루션으로는 비대면 검사의 실시간 감독과 운영 요구를 충족하기 어려워, WebSocket과 WebRTC를 활용한 P2P 화상 감독 기능을 신규 개발하고 필요한 감독 흐름을 자체 플랫폼에 구현했습니다.',
                'uPrism에 의존하면서 기능 변경과 운영 통제가 제한되고 연간 약 8,000만 원의 라이선스 비용이 발생해, 핵심 기능을 자체 플랫폼으로 전환하고 운영 주도권을 확보하는 동시에 해당 비용을 절감했습니다.',
                '대용량 녹화 파일이 서버를 경유하면서 서버 부하와 네트워크 비용이 증가해, AWS S3 직접 업로드로 전송 경로를 분리하고 Lambda와 EventBridge로 녹화 리소스 관리 과정을 자동화했습니다.',
              ],
            },
            {
              title: 'Electron 기반 부정행위 방지 검사 애플리케이션 개발 및 운영 표준화',
              bullets: [
                '브라우저만으로는 응시자 PC 환경을 제어하기 어려워, Electron 기반 멀티플랫폼 애플리케이션에 듀얼 모니터 감지와 특정 프로그램 차단 기능을 구현하고 부정행위 방지 정책의 통제 범위를 넓혔습니다.',
                '클라이언트마다 배포와 오류 대응 기준이 달라 버전 관리와 장애 재현의 부담이 커져, 자동 업데이트와 오류 로그 수집 형식을 표준화하고 배포 설정과 빌드 산출물을 테스트로 검증해 운영과 배포의 안정성을 높였습니다.',
              ],
            },
          ],
        },
      ],
      activities: [
        {
          period: '2026.09 - 현재',
          title: '오픈소스 기여',
          description:
            '사용 중인 라이브러리의 문제를 재현·제보하고, 코드·테스트·문서 개선에 참여합니다.',
          projects: [
            {
              title: 'MikroORM',
              bullets: [
                '조회·컬럼 매핑 오류를 최소 테스트로 재현·제보해 메인테이너의 수정 반영으로 이어졌습니다.',
              ],
              links: [
                {
                  label: 'ISSUE (임베디드 컬럼 매핑 오류) #8292',
                  url: 'https://github.com/mikro-orm/mikro-orm/issues/8292',
                },
                {
                  label: 'PR (하위 쿼리 처리 개선) #8590',
                  url: 'https://github.com/mikro-orm/mikro-orm/pull/8590',
                },
              ],
            },
            {
              title: 'Supertest',
              bullets: [
                'macOS의 테스트 서버 주소 바인딩 오류를 수정하고 회귀 테스트를 추가해 v7.3.1에 반영했습니다.',
              ],
              links: [
                {
                  label: 'PR (테스트 서버 주소 바인딩 수정) #907',
                  url: 'https://github.com/forwardemail/supertest/pull/907',
                },
              ],
            },
            {
              title: 'OpenTelemetry JS',
              bullets: [
                'CommonJS·ESM 혼용 시 Express 계측이 누락되는 조건과 해결 방법을 공식 문서에 추가했습니다.',
              ],
              links: [
                {
                  label: 'PR (CommonJS·ESM 계측 가이드 보완) #7212',
                  url: 'https://github.com/open-telemetry/opentelemetry-js/pull/7212',
                },
              ],
            },
          ],
        },
        {
          period: '2026.01 - 현재',
          title: '요즘 IT 작가',
          description:
            '요즘IT과 기술 블로그에 이벤트 기반 시스템과 AI 개발 워크플로의 비용·검증 기준, 기술 선택의 트레이드오프를 기록합니다.',
          links: [
            {
              label: '요즘IT 작가 페이지',
              url: 'https://yozm.wishket.com/magazine/@JH8459/',
            },
          ],
        },
        {
          period: '2023.03 - 2023.08 · 2026.03 - 현재',
          title: '백엔드 커리어 멘토',
          description:
            '코드스테이츠와 코드잇의 부트캠프 수료생을 대상으로 백엔드 개발자 취업에 필요한 이력서·포트폴리오·기술 면접을 코칭했습니다.',
          links: [
            {
              label: '코드잇 멘토 소개 페이지',
              url: 'https://sprint-page.codeit.kr/career_program',
            },
          ],
        },
      ],
      skills: [
        {
          category: 'Backend',
          items: ['Node.js', 'TypeScript', 'NestJS', 'Express', 'Next.js', 'REST API'],
        },
        {
          category: 'Data & Messaging',
          items: ['Apache Kafka', 'RabbitMQ', 'MySQL', 'PostgreSQL', 'Redis', 'Elasticsearch'],
        },
        {
          category: 'Reliability',
          items: [
            'Outbox·Inbox',
            'Idempotency',
            'Retry Budget',
            'Circuit Breaker',
            'Observability',
            'State Machine',
          ],
        },
        {
          category: 'Infrastructure & Observability',
          items: ['AWS', 'Docker', 'Kubernetes', 'Argo CD', 'SigNoz', 'Grafana'],
        },
        {
          category: 'AI-Assisted Development',
          items: ['AI Agent', 'MCP', 'MCP Server', 'Claude Code', 'Codex'],
        },
      ],
      education: [
        {
          period: '2021.06 - 2022.01',
          course: 'Full Immersive 34th',
          institution: 'Code States',
        },
        {
          period: '2014.03 - 2016.02',
          course: '게임공학 전공 · 중퇴 (2014년 학사 편입)',
          institution: '한국산업기술대학교',
        },
        {
          period: '2009.03 - 2014.02',
          course: '멀티미디어학 전공 · 졸업 · 학점은행제 학사 학위 (3.84 / 4.5)',
          institution: '동국대학교 전산원',
        },
      ],
      certifications: [
        {
          issued: '2025.06',
          title: 'SQL 개발자',
          type: '',
          issuer: '한국데이터산업진흥원',
        },
        {
          issued: '2025.03',
          title: 'AWS Certified Solutions Architect - Associate',
          type: '',
          issuer: 'AWS',
        },
        {
          issued: '2012.06',
          title: '정보처리산업기사',
          type: '',
          issuer: '한국산업인력공단',
        },
      ],
      links: [
        { label: 'GitHub', url: 'https://github.com/JH8459' },
        { label: 'Blog', url: 'https://blog.jh8459.com/' },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jh8459/' },
      ],
    },
    careers: [
      // =====       [Career Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        label: '',
        status: '',
        activity: '',
        links: {
          homepage: '',
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2022.04 ~ 2025.06',
        label: '정규직',
        activity: '에이시지알 - B.E Developer',
        links: {
          homepage: 'https://www.acghr.co.kr/',
          post: 'https://blog.jh8459.com/2022-04-01-RETROSPECT/',
        },
      },
      {
        date: '2023.03 ~ 2023.08',
        label: '프리랜서',
        activity: '코드스테이츠 - Career Mentor',
        links: {
          homepage: 'https://www.codestates.com/',
        },
      },
      {
        date: '2026.03 ~ 2026.05',
        label: '프리랜서',
        activity: '코드잇 - Career Mentor',
        links: {
          homepage: 'https://sprint-page.codeit.kr/career_program',
        },
      },
      {
        date: '2025.07 ~ ',
        label: '정규직',
        status: 'ongoing',
        activity: '스마일드래곤 - B.E Developer',
        links: {
          homepage: 'https://www.smiledragon.co.kr/',
          post: 'https://blog.jh8459.com/2025-12-08-RETROSPECT/',
        },
      },
      {
        date: '2026.01 ~ ',
        label: '프리랜서',
        status: 'ongoing',
        activity: '위시켓 - 요즘IT 작가',
        links: {
          homepage: 'https://yozm.wishket.com/magazine/@JH8459/',
        },
        posts: [
          {
            title: '이벤트 기반 MSA, AI 시대엔 더 비싸진다고요?',
            thumbnail: 'https://yozm.wishket.com/media/news/3839/thumbnail.png',
            publishedAt: '2026-07-08T09:00:17+09:00',
            url: 'https://yozm.wishket.com/magazine/detail/3839/',
          },
          {
            title: 'cURL은 왜 버그 바운티를 끝냈을까?',
            thumbnail: 'https://yozm.wishket.com/media/news/3668/thumbnail.jpg',
            publishedAt: '2026-03-23T09:00:17+09:00',
            url: 'https://yozm.wishket.com/magazine/detail/3668/',
          },
          {
            title: "AI로 빨리 만드는 팀보다 '덜 흔들리는' 팀이 이기는 이유",
            thumbnail: 'https://yozm.wishket.com/media/news/3625/thumbnail.png',
            publishedAt: '2026-02-25T14:00:17+09:00',
            url: 'https://yozm.wishket.com/magazine/detail/3625/',
          },
          {
            title: 'AI로 코드는 빨리 나오는데, 왜 출시는 그대로일까?',
            thumbnail: 'https://yozm.wishket.com/media/news/3600/image6.png',
            publishedAt: '2026-02-10T09:00:17+09:00',
            url: 'https://yozm.wishket.com/magazine/detail/3600/',
          },
        ],
      },
    ],

    education: [
      {
        date: '2021.06 ~ 2022.01',
        title: 'Full Immersive 34th',
        institution: 'Code States',
        links: {
          homepage: 'https://www.codestates.com/',
          post: 'https://blog.jh8459.com/2022-01-28-RETROSPECT/',
        },
      },
    ],

    certifications: [
      {
        issued: '2012년 6월',
        title: '정보처리산업기사',
        issuer: '한국산업인력공단 (HRD Korea)',
        credentialId: '12631000237D',
      },
      {
        issued: '2025년 3월',
        expires: '2028년 3월',
        title: 'AWS Certified Solutions Architect - Associate',
        issuer: 'Amazon Web Services (AWS)',
        credentialId: '498395076',
        links: {
          post: 'https://blog.jh8459.com/2025-03-09-RETROSPECT/',
        },
      },
      {
        issued: '2025년 6월',
        title: 'SQL 개발자',
        issuer: '한국데이터산업진흥원',
        credentialId: 'SQLD-057011200',
        links: {
          post: 'https://blog.jh8459.com/2025-06-27-RETROSPECT/',
        },
      },
    ],

    openSource: [
      // =====     [Open Source Sample and Structure]     =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        title: '',
        description: '',
        date: '',
        links: {
          homepage: '',
          github: '',
          post: '',
          demo: '',
          googlePlay: '',
          appStore: '',
        },
      },
      // ========================================================
      // ========================================================
    ],

    externalActivities: [
      // ===== [External Activities Sample and Structure] =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        title: '',
        description: '',
        date: '',
        links: {
          homepage: '',
          github: '',
          post: '',
          demo: '',
          googlePlay: '',
          appStore: '',
        },
      },
      // ========================================================
      // ========================================================
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          homepage: '',
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      ...portfolioProjects,
    ],
  },
};

export default metaConfig;
