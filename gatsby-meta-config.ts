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
        'Node.js와 TypeScript를 기반으로 B2B·B2C 서비스를 개발해 온 5년 차 백엔드 개발자로, 주문·결제·환불처럼 정합성이 중요한 도메인과 대용량 조회 및 배치 처리 경험을 쌓았습니다. 월평균 약 23만 건의 주문을 처리하는 서비스에서 주문 생명주기와 외부 공급자 연동을 표준화하고, 주문 옵션 조회 p99를 25.3초에서 0.58초로 단축했습니다. 또한 MAU 약 2만 명의 플랫폼에서는 기존 API 계약과 사용자 흐름을 유지하며 Next.js API Routes를 NestJS로 서비스 중단 없이 이관하고, 관리자 조회와 데이터 마이그레이션의 성능·안정성을 개선했습니다. 최근에는 AI Agent가 저장소 규칙과 도메인 맥락, 테스트·리뷰 기준을 참조하도록 개발 환경을 구성하고, 설계 검토부터 구현, 검증, PR 작성까지의 작업 흐름을 표준화해 개발 속도와 변경 안전성을 함께 관리하고 있습니다.',
      ],
      projects: portfolioProjects,
      experiences: [
        {
          mark: 'SD',
          logo: '/smiledragon.png',
          logoBackground: '#ff874b',
          company: '스마일드래곤주식회사',
          period: '2025.07 - 재직 중',
          duration: '1년 2개월',
          employmentType: '정규직',
          role: 'Backend Engineer',
          level: '사원',
          current: true,
          projects: [
            {
              period: '2026.06 - 현재',
              title: '체험뷰 백엔드 마이그레이션 및 서비스 고도화',
              summary:
                'MAU 약 2만 명의 체험단 플랫폼에서 기존 API 계약과 사용자 흐름을 유지하며 Next.js API Routes를 NestJS로 서비스 중단 없이 점진 이관했습니다. 이관 이후에도 신규 기능 개발과 유지보수를 이어가며 관리자 조회 성능을 개선하고 주문·환불·알림 도메인의 정합성을 강화하고 있습니다.',
              bullets: [
                'Next.js API Routes에 혼재한 도메인 규칙과 DB 접근을 CQRS와 도메인 모델로 재구성했습니다. 기존 API 계약과 주요 사용자 시나리오를 테스트로 먼저 명세하고, 테스트를 통과하도록 구현과 리팩토링을 반복했습니다. 구·신 서버의 요청을 단계별로 전환해 기존 사용자 흐름을 중단하지 않고 NestJS로 이관했습니다.',
                '437만 건 규모의 관리자 조회에서 JOIN·정렬 병목을 관측했습니다. 관계별 선행 조회와 검색 인덱스를 적용한 후 SigNoz 트레이스와 대시보드로 p50을 9.63초에서 92ms로, p95를 약 30초에서 888ms로, p99를 약 30초에서 1.91초로 개선한 결과를 확인했습니다.',
                '일 약 8만 회 호출되는 캠페인 목록의 쿼리 로그에서 요청당 25회의 쿼리가 실행되는 병목을 관측했습니다. 연관 데이터를 건별로 조회하는 N+1 구조를 원인으로 확인하고 복합 인덱스와 일괄 조회를 적용했습니다. 적용 전후의 쿼리 로그를 비교해 요청당 호출 횟수가 25회에서 2회로 줄어든 것을 확인했습니다.',
                'DB 상태 변경과 외부 알림 서비스 호출을 하나의 트랜잭션으로 묶을 수 없어 부분 실패 시 정합성이 깨질 수 있었습니다. 트랜잭션 Outbox로 상태 변경과 이벤트 기록을 같은 트랜잭션에 포함하고, 폴링 워커에서 외부 호출과 재시도를 처리했습니다. 고유 제약과 멱등 처리로 재시도 중 중복 알림 적재도 방지했습니다.',
                'DB 마이그레이션 과정에서 약 5,500건의 레거시 데이터를 한 번에 갱신하면 장기 트랜잭션과 잠금이 발생할 수 있었습니다. 이를 줄이기 위해 500건 단위의 멱등 크론으로 데이터를 이관하고, 기능 플래그와 회차별 커밋, 작업 완료 후 크론 제거 절차를 함께 설계했습니다.',
                '환불 정합성을 개선하기 위해 즉시·배치 환불 경로가 동일 주문을 중복 처리할 수 있는 조건을 분석했습니다. 목표 환불액에서 누적 환불액을 뺀 차액만 지급하는 증분 모델을 적용하고, 최초 취소 시각과 KST 리뷰 마감 경계를 도메인 규칙으로 통일했습니다.',
              ],
            },
            {
              period: '2026.02 - 2026.06',
              title: '진콘(Gincon) MSA 백엔드 아키텍처 및 이벤트 처리 구조 설계',
              summary:
                '회원, 프로필, 커뮤니티, 포인트, 캠페인 서비스의 책임과 데이터 소유권을 나누고, 서비스 간 이벤트 계약과 실패 처리 기준을 공동 설계했습니다.',
              bullets: [
                '서비스별 이벤트 발행·소비 규격이 달라 변경 시 호환성 문제가 발생할 수 있었습니다. 이벤트 이름, 페이로드, 버전 규칙을 공통 이벤트 계약으로 정의해 Git 서브모듈에서 관리하고, 이벤트 스키마 검증을 CI에 연결해 발행자와 소비자의 규격 불일치를 병합 전에 검증했습니다.',
                'Kafka 기반 비동기 처리에서 데이터 변경과 이벤트 발행 사이의 유실·중복 가능성을 줄이기 위해 Outbox·Inbox, 멱등 처리, 재시도, 실패 이벤트 격리를 적용했습니다. 이벤트 발행 이력을 보존하고 재처리 API를 구성해 실패한 Kafka 이벤트를 운영자가 안전하게 재처리할 수 있게 했습니다.',
                '서비스 간 동기 호출로 결합도와 장애 전파 가능성이 커지는 문제를 줄이기 위해 Kafka 이벤트 흐름을 중심으로 MSA 간 상태를 동기화했습니다. 각 서비스가 필요한 상태를 자체 저장소에서 관리하도록 구성하고, 변경 이력과 상태 재구성이 필요한 기능에는 Event Sourcing을 선별 적용해 이벤트 재생으로 상태를 복원할 수 있게 했습니다.',
                '서버별 CI 규칙과 검증 범위가 달라 변경 품질을 일관되게 확인하기 어려웠습니다. lint, 단위 테스트, 빌드 규칙을 공통 CI 파이프라인으로 통합하고 E2E 테스트를 도입했습니다. 테스트 데이터와 외부 환경을 도메인별로 격리해 병렬 실행 기반을 마련하고 평균 실행 시간을 67.9% 단축했습니다.',
              ],
            },
            {
              period: '2025.08 - 2026.02',
              title: '마케팅24 주문 처리 백엔드 고도화',
              summary:
                '월평균 약 23만 건의 SNS 마케팅 주문을 처리하는 플랫폼에서 주문 상태 전이, 외부 공급자 연동, 조회 성능, 이벤트 정합성을 개선했습니다.',
              bullets: [
                '주문 유형과 외부 공급자별 상태가 달라 실패, 환불, 재처리 기준이 일관되지 않던 문제를 주문 생명주기 모델과 도메인 규칙으로 통합했습니다. 주문 상태와 후속 처리 기준을 일관되게 관리할 수 있게 했습니다.',
                '상품 옵션, 쿠폰, 결제, 포인트 조회의 N+1과 불필요한 JOIN을 조회 목적별로 분리해 주문 옵션 조회 p99를 25.3초에서 0.58초로 97.7% 단축했습니다.',
                '주문 상태 변경과 Kafka 이벤트 발행을 각각 직접 처리하면서 한쪽만 성공해 데이터와 이벤트가 불일치할 수 있어, Kafka Outbox로 DB 트랜잭션 내 이벤트 기록과 비동기 발행, 재시도를 구성했습니다. 이벤트 유실 가능성을 낮추고 주문 상태와 이벤트의 정합성을 강화했습니다.',
                'AI Agent가 운영 지표를 조회할 수 있도록 SigNoz MCP를 연결하고, 배포 전후의 호출량, 평균 응답 시간, p99, 에러율을 비교해 이상 징후를 알림으로 공유했습니다.',
                'AI Agent를 실무에 적용하면서 생성 코드의 품질 편차와 기존 API 회귀 가능성을 줄이기 위해 저장소 규칙, 도메인 맥락, 테스트·리뷰 기준을 AI가 참조할 작업 맥락으로 구조화했습니다. 계획 수립, 구현, 테스트, 정적 검사, 리뷰를 5단계 검증 흐름으로 연결해 코드 작성부터 PR까지 동일한 품질 기준을 적용했습니다.',
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
          duration: '3년 3개월',
          employmentType: '정규직',
          role: 'Backend Engineer',
          level: '선임',
          projects: [
            {
              title: 'B2B 채용·검사 솔루션 백엔드 개발 및 운영 고도화',
              bullets: [
                '고객사마다 검사 콘텐츠와 결과 구조, 외부 연동 규격이 달라 신규 도입 시 개별 구현이 반복되는 문제를 확인했습니다. 요구사항을 조율해 문제, 응답, 채점, 결과 모델과 B2B API를 공통 규격으로 표준화하여 고객사별 요구를 동일한 구조 안에서 수용할 수 있게 했습니다.',
                '검색 응답 지연의 원인을 분석해 대량 텍스트에 대한 LIKE 검색이 DB 병목임을 확인했습니다. 검색 책임을 Elasticsearch로 분리해 응답 속도를 약 4배 개선했습니다.',
                '배포 때마다 발생하는 서비스 중단과 롤백 부담을 줄이기 위해 Docker Compose로 구·신 버전을 병렬 운영하고 트래픽을 전환하는 블루·그린 배포 전략을 적용했습니다. 배포 중단을 줄이고 문제 발생 시 기존 버전으로 전환할 수 있는 구조를 마련했습니다.',
                '장애 발생 시 개별 로그만으로 요청 흐름과 병목 지점을 연결하기 어려웠습니다. 로그·메트릭·트레이스를 통합해 요청 단위로 원인을 추적할 수 있는 관측 환경을 마련했습니다.',
                '동기 PDF 생성이 API 요청을 점유해 응답 지연과 서버 부하가 발생했습니다. PDF 생성을 Puppeteer Cluster와 Bull Queue 기반의 비동기 병렬 처리로 분리해 요청 처리와 문서 생성의 실행 경계를 나눴습니다.',
              ],
            },
            {
              title: '온라인 화상 감독 인적성 검사 플랫폼 신규 개발 및 비용 최적화',
              bullets: [
                '기존 외부 솔루션으로는 비대면 검사의 실시간 감독과 운영 요구를 충족하기 어려웠습니다. WebSocket과 WebRTC를 활용한 P2P 화상 감독 기능을 신규 개발해 필요한 감독 흐름을 자체 플랫폼에 구현했습니다.',
                'uPrism 의존으로 기능 변경과 운영 통제가 제한되고 연간 약 8,000만 원의 라이선스 비용이 발생했습니다. 핵심 기능을 자체 플랫폼으로 전환해 운영 주도권을 확보하고 해당 비용을 절감했습니다.',
                '대용량 녹화 파일이 서버를 경유하면서 서버 부하와 네트워크 비용이 증가했습니다. AWS S3 직접 업로드로 전송 경로를 단축하고, Lambda와 EventBridge로 녹화 리소스 관리 과정을 자동화했습니다.',
              ],
            },
            {
              title: 'Electron 기반 부정행위 방지 검사 애플리케이션 개발 및 운영 표준화',
              bullets: [
                '브라우저만으로는 응시자 PC 환경을 제어하기 어려워 Electron 기반 멀티플랫폼 전용 애플리케이션을 개발했습니다. 듀얼 모니터 감지와 특정 프로그램 차단 기능을 구현해 부정행위 방지 정책을 클라이언트에서 일관되게 적용했습니다.',
                '클라이언트별 배포와 오류 대응 기준이 달라 운영에 시간이 들었습니다. 자동 업데이트와 오류 로그 수집 형식을 표준화하고, 배포 설정과 빌드 산출물을 테스트로 검증해 버전 관리와 장애 재현, 배포 품질을 개선했습니다.',
              ],
            },
          ],
        },
      ],
      activities: [
        {
          period: '2026.01 - 현재',
          title: '요즘 IT 작가',
          description:
            '요즘IT과 기술 블로그에 이벤트 기반 시스템, 성능 최적화, AI 개발 워크플로우의 선택 근거와 트레이드오프를 기록합니다.',
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
              url: 'https://app.notion.com/p/514bf92a6e9c825786c08191bec90409?source=copy_link',
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
          category: 'Infrastructure & Observability',
          items: ['AWS', 'Docker', 'Kubernetes', 'Argo CD', 'SigNoz', 'Grafana'],
        },
        {
          category: 'AI-Assisted Development',
          items: ['Claude Code', 'Codex'],
        },
      ],
      education: [
        {
          period: '2021.06 - 2022.01',
          course: 'Full Immersive 34th',
          institution: 'Code States',
        },
      ],
      certifications: [
        {
          issued: '2025.06',
          title: 'SQL 개발자',
          type: '자격증',
          issuer: '한국데이터산업진흥원',
        },
        {
          issued: '2025.03',
          title: 'AWS Certified Solutions Architect - Associate',
          type: '자격증',
          issuer: 'AWS',
        },
        {
          issued: '2012.06',
          title: '정보처리산업기사',
          type: '자격증',
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
