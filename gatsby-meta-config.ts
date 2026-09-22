import dotenv from 'dotenv';
import type { AboutMetadata, ProjectItem } from './src/types/about';

dotenv.config();

const portfolioProjects: ProjectItem[] = [
  {
    title: 'PROGRAMMERS-BADGE-V2',
    period: '2026.03 - 2026.06',
    description:
      '프로그래머스 프로필 정보를 배지 이미지와 Markdown 코드로 제공하는 Chrome 확장 프로그램을 개발했습니다.',
    bullets: [
      'V1은 저장소 포크, PAT 발급, GitHub Actions 설정이 필요해 초기 사용 과정이 복잡했습니다. Chrome 확장 프로그램에서 프로필 정보를 불러오는 방식으로 재설계해 별도 저장소 연동 없이 배지를 생성할 수 있게 했습니다.',
      'API·Web·Manifest V3 확장 프로그램을 pnpm·Turbo 모노레포로 구성하고 NestJS CQRS와 Zod로 경계를 검증했습니다. GitHub Actions에서 lint·typecheck·테스트를 통과한 API·Web·확장 프로그램을 자동 배포해 v0.1.1을 출시했습니다.',
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
      'MariaDB·Redis 테스트 컨테이너로 사용자 알림 직전까지 E2E로 검증하고, GitHub Actions와 Docker Hub 배포 파이프라인을 구성해 Docker Compose 서비스를 EC2에서 Synology NAS로 이전했습니다.',
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
        'Node.js와 TypeScript를 기반으로 B2B와 B2C 서비스를 개발해 온 5년 차 백엔드 엔지니어입니다. 사용자와 운영자의 실제 흐름을 이해하고, 요구사항을 데이터 모델과 API, 도메인 규칙으로 구체화해 안정적으로 운영되는 제품을 만드는 데 집중합니다.',
        '운영 환경의 로그·메트릭·트레이스와 실행 계획을 근거로 병목과 장애를 찾고, 데이터베이스와 비동기 처리 구조를 개선해 서비스의 운영 안정성을 높여 왔습니다. 외부 연동은 실패를 전제로 Outbox·멱등 처리·재시도 예산·서킷 브레이커를 적용해 장애가 인접한 흐름으로 번지지 않도록 설계합니다.',
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
                'MAU 약 2만 명의 체험단 플랫폼에 기획 단계부터 참여해 백엔드 구조와 운영 흐름의 개선을 주도했습니다. Next.js API Routes 기반 v1의 계약을 유지하며 NestJS 기반 v2를 구축한 뒤 광고 노출·알림·결제처럼 정산과 운영에 연결되는 기능을 지속적으로 고도화하고 있습니다.',
              bullets: [
                '기존 API 계약과 핵심 사용자 시나리오를 회귀 테스트로 명세화한 뒤 NestJS 기반 v2 API를 개발했습니다. 기존 데이터는 처리량과 전환 일정을 기준으로 청크 단위 마이그레이션 작업을 설계·검증해 서비스 중단 없이 이관했습니다.',
                '광고주의 캠페인 성과 추적을 위한 스폰서 배너 노출을 서명·봇 필터로 검증하고, Redis 원자 연산으로 30분간 중복을 억제한 뒤 Kafka·Consumer Inbox로 멱등 적재했습니다. 실패 보상과 최근 3일 재집계로 지연 도착·부분 실패에도 일별 성과의 정합성을 유지했습니다.',
                '캠페인 조회 쿼리를 SELECT_IN·서브쿼리·복합 인덱스로 재설계해 운영자용 신청 목록의 p50을 9.63초에서 92ms로, p99를 약 30초에서 1.91초로 단축했습니다. 하루 약 8만 회 호출되는 목록 API도 N+1을 제거해 쿼리를 25회에서 4회로, 스캔 행을 164,313건에서 22건으로 줄였습니다.',
                '동기 SMTP 호출로 사용자 안내 메일 발송에 최대 약 53분이 걸려, Outbox와 워커 기반 비동기 구조로 전환하고 SMTP 응답을 영구 실패와 재시도 가능 오류로 분류해 불필요한 재시도와 큐 지연을 막았으며, 수신처를 발송 직전에 조회해 개인정보 삭제 조건을 보존했습니다.',
                'Kubernetes와 Argo CD의 롤링 배포 중 종료 신호 직후 진행 중인 요청과 크론이 중단되는 위험을 확인해, NestJS graceful shutdown과 Helm 종료 대기 설정을 적용하고 요청과 작업이 완료된 뒤 서버가 종료되도록 개선했습니다.',
              ],
            },
            {
              period: '2025.08 - 2026.02 · 2026.08 - 2026.09',
              title: '마케팅24 주문 처리 및 AI 댓글 검수 시스템 고도화',
              summary:
                '월평균 약 23만 건의 주문이 발생하는 SNS 마케팅 플랫폼에서 주문 생명주기와 여러 외부 대행사 연동을 표준화했습니다. 상품 후기를 댓글로 작성하는 기능과 Gemini 기반 검수 시스템도 설계·구현해 위험 댓글만 개별 보류하면서 정상 댓글은 계속 집행되는 운영 흐름을 마련했습니다.',
              bullets: [
                '상품 후기 댓글을 검수 대기로 저장한 뒤 Gemini 비동기 워커가 승인·보류·지연 상태로 전이하고 승인된 댓글만 배정하도록 구현했습니다. AI가 보류한 건은 관리자가 최종 차단하는 Human-in-the-Loop 흐름으로 연결하고 판정·실패·지연·대기 시간을 OpenTelemetry·SigNoz로 추적했습니다.',
                '주문 유형마다 달랐던 상태와 후속 처리 기준을 도메인 규칙으로 정의하고 실패·환불·재처리를 하나의 주문 생명주기로 통합해 운영자가 일관된 기준으로 주문을 복구할 수 있도록 했습니다.',
                '여러 외부 대행사의 주문을 내부 주문 모델과 상태 체계로 통합하고 재전송·주문번호·URL·상품 변경 API를 시나리오별로 분리했습니다. SigNoz MCP와 AI Agent로 호출량·응답 시간·p99·오류율을 배포 전후 비교하는 검증 흐름도 정립했습니다.',
                '주문 저장과 Kafka 발행 사이에서 메시지가 빠지거나 중복 처리될 수 있어 Producer Outbox와 Consumer Inbox, 미발행 메시지 재처리 작업을 구성했습니다. 반복 실패하는 공급자는 5회 실패 시 5분간 호출을 멈추되 Redis 장애 때는 정상 주문을 통과시키도록 설계해, 장애 공급자를 격리하면서도 전체 주문 접수는 이어지게 했습니다.',
              ],
            },
            {
              period: '2026.02 - 2026.06',
              title: '진콘(Gincon) MSA 백엔드 아키텍처 및 이벤트 처리 구조 설계',
              summary:
                '회원, 프로필, 커뮤니티, 포인트, 캠페인 도메인을 독립 서비스로 분리하고 데이터 소유권과 이벤트 기반 통신 원칙을 갖춘 MSA 구조를 설계했습니다.',
              bullets: [
                '서비스마다 이벤트 규격이 달라 변경 시 발행자와 소비자의 호환성이 깨질 수 있어, 이벤트 이름, 페이로드, 버전 규칙을 공통 계약으로 정의하고 Git 서브모듈로 관리했습니다. CI에서 스키마 호환성을 검사해 규격 불일치를 병합 전에 차단했습니다.',
                'Kafka 비동기 처리에서 데이터 변경과 이벤트 발행 사이의 유실 및 중복 소비 가능성을 줄이기 위해 Outbox, Inbox, 멱등 처리와 실패 이벤트 격리를 적용했습니다. 실패 이력 조회와 재처리 API도 구성해 운영자가 메시지를 추적하고 복구할 수 있게 했습니다.',
                '서비스 간 동기 호출이 늘며 결합도와 장애 전파 위험이 커지자 Kafka 이벤트로 상태를 동기화하고, 각 서비스가 필요한 데이터를 직접 소유하도록 설계했습니다. 상태 재구성이 필요한 기능에는 Event Sourcing을 적용해 이벤트 재생으로 복원할 수 있게 했습니다.',
                '서비스마다 검증 규칙과 테스트 환경이 달라 변경 품질을 일관되게 확인하기 어려웠습니다. lint, 단위 테스트, 빌드를 공통 CI로 통합하고 도메인별 격리 E2E를 병렬 실행해 평균 실행 시간을 67.9% 단축했습니다.',
              ],
            },
            {
              period: '2025.07 - 2025.08',
              title: '뷰업 계정 및 본인인증 백엔드 고도화',
              summary:
                '계정 API 전환과 NICE 본인인증 모듈 재구성을 통해 외부 인증 연동의 안정성과 유지보수성을 개선했습니다.',
              bullets: [
                '계정 API를 한 번에 교체하면 기존 화면과 서비스의 로그인 흐름이 깨질 수 있어 회원가입·복구·재인증·조회 기능을 단계적으로 전환하고 오류 코드와 이동 규칙을 먼저 고정해 기존 연동의 호환성을 유지했습니다.',
                'NICE 본인인증의 발급·암호화·복호화·검증이 한곳에 모여 변경 영향이 컸던 구조를 역할별로 분리하고 레거시 계정과 임시 사용자의 처리 기준을 정리해 인증 상태가 서로 어긋날 가능성을 낮췄습니다.',
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
              period: '2022.04 - 2025.06',
              title: 'B2B 채용·검사 솔루션 백엔드 개발 및 운영 고도화',
              bullets: [
                'LG·SK·CJ·두산 등 대기업 고객사가 인적성 검사를 온라인에서 운영할 수 있도록 채용·검사 솔루션을 개발하고, 고객사마다 다른 검사 콘텐츠·결과·연동 규격을 공통 데이터 모델과 B2B API로 표준화했습니다.',
                '대량 텍스트를 LIKE로 검색하며 데이터가 늘수록 응답이 지연돼, 검색 책임을 Elasticsearch로 분리하고 DB 병목을 줄여 응답 속도를 약 4배 개선했습니다.',
                'Docker Compose 기반 블루·그린 배포와 로그·메트릭·트레이스 관측을 구성해 중단 없이 배포하고 장애 요청을 추적·롤백할 수 있게 했습니다.',
              ],
            },
            {
              period: '2022.04 - 2024.12',
              title: '온라인 화상 감독 인적성 검사 플랫폼 신규 개발 및 비용 최적화',
              bullets: [
                '자체 WebSocket 서버를 개발해 감독자·응시자 간 감독 메시지를 양방향으로 전달하고, WebRTC P2P로 화상 스트림을 연결하는 실시간 감독 흐름을 구현했습니다.',
                'uPrism 외부 솔루션에 의존하던 화상 감독과 녹화 기능을 자체 플랫폼으로 전환해 녹화 영상의 보관·폐기 생명 주기를 자체 정책으로 관리하고, 연간 약 8,000만 원의 라이선스 비용을 절감했습니다.',
                '교시 종료 시 집중되는 녹화 업로드를 S3 presigned URL 직접 업로드로 분리하고 Lambda·EventBridge로 보관을 자동화했습니다. winston 로그와 Grafana 임계 알림으로 원인 추적과 조기 감지 체계도 마련했습니다.',
              ],
            },
            {
              period: '2023.11 - 2024.05',
              title: 'Electron 기반 부정행위 방지 검사 애플리케이션 개발 및 운영 표준화',
              bullets: [
                'Electron 멀티플랫폼 애플리케이션에 듀얼 모니터 감지와 특정 프로그램 차단을 구현해 브라우저 밖까지 부정행위 방지 범위를 넓혔습니다.',
                '자동 업데이트와 오류 로그 형식을 표준화하고 배포 설정·빌드 산출물을 테스트해 고객사별 배포와 장애 재현을 안정화했습니다.',
              ],
            },
          ],
        },
      ],
      activities: [
        {
          period: '2026.01 - 현재',
          title: '요즘IT 작가',
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
          items: [
            'Node.js',
            'TypeScript',
            'NestJS',
            'Express',
            'REST API',
            'WebSocket·WebRTC',
          ],
        },
        {
          category: 'Data & Messaging',
          items: [
            'Apache Kafka',
            'RabbitMQ',
            'MySQL·MariaDB',
            'PostgreSQL',
            'Redis',
            'Elasticsearch',
            'MikroORM',
          ],
        },
        {
          category: 'Reliability',
          items: [
            'Outbox',
            'Inbox',
            'Idempotency',
            'Retry Budget',
            'Circuit Breaker',
            'State Machine',
            'Observability',
          ],
        },
        {
          category: 'Infrastructure & Observability',
          items: [
            'AWS',
            'Docker',
            'Kubernetes',
            'Argo CD',
            'GitHub Actions',
            'OpenTelemetry',
            'SigNoz',
            'Grafana',
          ],
        },
        {
          category: 'AI-Assisted Development',
          items: ['AI Agent', 'MCP', 'Claude Code', 'Codex'],
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
          course: '게임공학 전공',
          institution: '한국산업기술대학교',
          status: '중퇴',
          description: '2014년 학사 편입 후 중도 퇴학',
        },
        {
          period: '2009.03 - 2014.02',
          course: '멀티미디어학 전공',
          institution: '동국대학교 전산원',
          status: '졸업',
          description: '학점은행제 학사 학위 수여 (3.84 / 4.5)',
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
