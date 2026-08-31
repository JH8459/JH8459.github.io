import dotenv from 'dotenv';
import type { AboutMetadata, ProjectItem } from './src/types/about';

dotenv.config();

const portfolioProjects: ProjectItem[] = [
  {
    title: 'PROGRAMMERS-BADGE-V2',
    period: '2026.03 - 2026.06',
    description:
      'V1은 연동된 저장소의 변경을 GitHub Actions로 감지해 프로필 뱃지를 자동 업데이트하는 방식이라 저장소 연동과 액션 설정이 필요했습니다. V2는 이 불편을 개선해 크롬 확장 프로그램에서 프로그래머스 프로필 정보를 바로 불러오고, 별도 저장소 연동이나 액션 설정 없이 사용할 수 있는 뱃지 이미지 주소와 마크다운 코드를 제공합니다. 생성된 뱃지는 GitHub 프로필이나 README에 그대로 붙여 넣어 사용할 수 있습니다.',
    techStack: [
      'TypeScript',
      'Monorepo',
      'Server',
      'Web',
      'Browser Extension',
      'GitHub Actions',
      'Codex AI Harness',
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
    title: '프로그래머스 프로필 뱃지 자동 생성 봇 V1',
    period: '2024.12',
    description:
      '알고리즘 문제 풀이 동기부여를 위해 프로그래머스에서 제공하는 API를 활용하여 프로필 뱃지를 자동으로 생성해주는 봇을 개발하였습니다. Github Action을 활용하여 백준 허브에 연동된 저장소가 변경될 때 마다 호출되어 프로필 뱃지를 자동으로 업데이트 되도록 구성하였습니다.',
    techStack: ['Node.js', 'NestJS', 'GitHub', 'GitHub Actions'],
    thumbnailUrl: 'project-programmers.jpg',
    thumbnailBackground: '#ffffff',
    links: {
      post: 'https://blog.jh8459.com/2024-12-22-PROJECT/',
      github: 'https://github.com/JH8459/PROGRAMMERS-BADGE',
    },
  },
  {
    title: 'LOTTERY 🍀',
    period: '2024.01 - 2024.07',
    description:
      '반복되는 복권 당첨 정보를 손 쉽게 제공 할 수 없을까라는 생각으로 시작하게된 프로젝트입니다. 단순히 복권 당첨 결과만 제공하는 것이 아닌, 당첨 정보를 기반으로 한 통계 정보를 간단한 사용 방법으로 이메일 정기 구독 방식과 슬랙 앱 설치 방식으로 제공합니다.',
    techStack: ['Node.js', 'Express', 'NestJS', 'React', 'Docker', 'Redis'],
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
      experience: '4년 이상의 실무 경험',
      phone: '+82 10 9092 8459',
      email: 'kk_ong2233@naver.com',
      introduction: [
        '4년 이상의 실무 경험을 가진 Backend Engineer입니다. 요구사항을 구현하는 데 그치지 않고 서비스의 비즈니스 흐름과 사용자·운영자가 겪는 불편을 이해한 뒤, 이를 도메인 규칙과 데이터 흐름, 운영 가능한 백엔드 구조로 구체화해 왔습니다. 최근에는 MAU 약 2만 명의 체험단 플랫폼 체험뷰를 주로 담당하며, 기존 사용자 흐름을 유지한 채 Next.js API Routes를 독립 NestJS 서버로 무중단 점진 이관하였습니다. 이 과정에서 고빈도 조회와 대규모 데이터 처리, 상태 변경 이후의 비동기 후속 처리까지 서비스 전반의 성능과 안정성을 함께 개선했습니다.',
        '그 외에도 연간 약 275만 건의 마케팅 주문 처리, 이벤트 기반 MSA, B2B 채용·인적성 검사 서비스를 다루며 주문·결제·환불과 외부 공급자 연동, 서비스 간 데이터 전달과 고객사별 연동 규격을 공통 도메인과 API로 표준화했습니다. 문제를 응답시간·호출량·조회 범위·오류율처럼 관측 가능한 지표로 정의하고, 테스트와 APM을 통해 개선 전후를 검증하는 방식을 선호합니다. 요즘은 AI를 코드 생성 도구로만 사용하지 않고, 프로젝트 규칙과 도메인 맥락, 테스트·리뷰 기준을 함께 참조하는 개발 하네스로 활용하고 있습니다. 코드 작성부터 PR까지 검증 과정을 표준화하는 한편, 개인 기술 블로그와 요즘IT 기고를 통해 이벤트 기반 MSA와 AI 개발 경험에서 얻은 선택의 근거와 트레이드오프를 꾸준히 공유하고 있습니다.',
      ],
      projects: portfolioProjects,
      experiences: [
        {
          mark: 'SD',
          logo: '/smiledragon.png',
          logoBackground: '#ff874b',
          company: '스마일드래곤주식회사',
          period: '2025.07 - 재직중',
          duration: '1년 2개월',
          employmentType: '정규직',
          role: 'Backend Engineer',
          level: '사원',
          current: true,
          projects: [
            {
              period: '2026.06 - 2026.08',
              title: '체험뷰 백엔드 마이그레이션 및 서비스 고도화',
              summary:
                'MAU 약 2만 명의 체험단 플랫폼 체험뷰에서 Next.js API Routes를 독립 NestJS 서버로 무중단 점진 이관했습니다. 도메인 정합성과 관리자 업무·고빈도 조회 성능, 비동기 처리 안정성 및 AI 기반 개발 검증 체계를 개선했습니다.',
              bullets: [
                'Next.js API Routes에 도메인 규칙과 DB 접근이 혼재해 경로별 검증 편차와 처리 누락 위험이 있었습니다. 주요 도메인을 CQRS와 도메인 모델로 재구성하고, 기존 API 스펙을 기준으로 작성한 테스트 코드로 호환성을 검증하며 구·신 버전을 병행 운영해 서비스 중단 없이 NestJS 서버로 점진적으로 마이그레이션했습니다.',
                '약 437만 건의 데이터를 갖는 도메인의 관리자 조회 기능에서 비효율적인 JOIN·정렬로 p50 9.63초, p95·p99 약 30초의 병목을 관측했습니다. 관계별 선행 조회와 검색 인덱스를 적용하고 SigNoz로 배포 전후를 검증해 p50 92ms(99% 개선), p95 888ms, p99 1.91초로 개선했습니다.',
                '하루 약 8만 회 호출되는 캠페인 목록에서 N+1 구조로 요청당 25개 쿼리가 호출되는 비효율적인 구조를 관측했습니다. 복합 인덱스와 일괄 조회를 적용해 2번의 쿼리 호출로 조회될 수 있도록 개선하였습니다.',
                '대규모 CSV 내보내기에서 데이터를 한 번에 적재해 처리량에 비례해 메모리 사용량이 증가했습니다. Keyset Pagination과 서버 스트리밍으로 데이터를 분할 처리하고, 데이터 규모별 테스트를 통해 처리 대상이 증가해도 메모리 사용량이 일정하게 유지됨을 확인했습니다.',
                '상태 변경과 알림 적재가 분리되어 부분 실패와 중복 처리 가능성이 있었습니다. 트랜잭션 Outbox와 폴링 워커를 적용하고 Redis Mutex, DB 잠금, 고유 제약과 멱등성을 결합해 실패·재시도 상황에서도 동일한 결과를 보장했습니다.',
                'AI가 생성한 변경도 프로젝트 규칙과 기존 API 호환성을 동일하게 검증할 필요가 있었습니다. 프로젝트 맥락과 테스트·리뷰 기준을 참조하는 개발 하네스를 구성하고 코드 작성부터 PR 생성까지 5단계 검증 흐름을 표준화해 대규모 마이그레이션의 품질을 일관되게 관리했습니다.',
              ],
            },
            {
              period: '2026.02 - 2026.06',
              title: '진콘(Gincon) MSA 백엔드 아키텍처 및 이벤트 처리 구조 설계',
              summary:
                '회원 인증, 프로필, 커뮤니티, 포인트, 캠페인 기능이 여러 백엔드 서비스로 분리된 진콘(Gincon)의 초기 MSA 아키텍처와 공통 이벤트·인증 구조를 공동 설계했습니다. 서비스별 책임과 데이터 소유권을 구분하고, 서비스 간 통신부터 프론트엔드 API와 자동화된 검증까지 공통 기준을 마련했습니다.',
              bullets: [
                '서비스마다 이벤트 규격이 달라 공통 변경 시 여러 저장소를 수정해야 하고, 발행·소비 규격의 불일치도 실행 전에는 발견하기 어려웠습니다. 공통 코드를 Git 서브모듈로 분리하고 정합성 검사 도구를 AI 개발 하네스와 CI에 연결해 이벤트 불일치를 병합 전에 검증했습니다.',
                '데이터 변경과 이벤트 발행이 분리되어 이벤트 유실이나 중복 처리 가능성이 있었습니다. Outbox·Inbox와 멱등성, 재시도, 실패 메시지 격리를 적용하고 재처리 API와 발행 정보를 보존해 실패 후에도 동일한 전달 순서로 복구할 수 있도록 했습니다.',
                '서비스 간 실시간 API 호출로 응답 지연과 장애가 연쇄적으로 전파될 수 있었습니다. 변경 이벤트로 필요한 데이터를 각 서비스에 미리 동기화하고, Event Sourcing은 이력 복원이 필요한 기능에만 적용해 서비스 간 호출과 운영 복잡도를 줄였습니다.',
                '서비스별로 인증을 처리하면 로그아웃·이용 정지·권한 변경이 서로 다르게 반영될 위험이 있었습니다. 인증 서비스를 단일 검증 지점으로 두고 Nginx가 사용자 식별자와 역할을 전달하도록 설계했으며, 사용자·관리자 토큰과 세션을 분리해 역할별 접근 기준을 통일했습니다.',
                'E2E 테스트가 데이터와 외부 환경을 공유해 테스트 간 간섭과 순차 실행이 발생했습니다. 실행 환경을 도메인별로 격리해 CI 병렬 실행 기반을 마련하고 평균 실행시간을 67.9% 단축했습니다.',
              ],
            },
            {
              period: '2025.08 - 2026.02',
              title: '마케팅24 주문 처리 백엔드 고도화',
              summary:
                '연간 약 275만 건, 월평균 약 23만 건의 SNS 마케팅 주문과 약 3.4억 원의 결제액을 처리하는 핵심 거래 플랫폼에서 주문 생명주기, 외부 공급자 연동, 조회 성능, 이벤트 정합성을 주도적으로 개선했습니다.',
              bullets: [
                '주문 유형과 외부 공급자별 상태가 달라 실패, 환불, 재처리 기준이 일관되지 않던 문제를 주문 생명주기 모델과 도메인 규칙으로 통합했습니다. 주문 상태와 후속 처리 기준을 일관되게 관리할 수 있게 했습니다.',
                '상품 옵션, 쿠폰, 결제, 포인트 조회의 N+1과 불필요한 JOIN을 조회 목적별로 분리해 주문 옵션 조회 p99를 25.3초에서 0.58초로 97.7% 단축했습니다.',
                '주문 상태 변경과 Kafka 이벤트 발행을 각각 직접 처리하면서 한쪽만 성공해 데이터와 이벤트가 불일치할 수 있어, Kafka Outbox로 DB 트랜잭션 내 이벤트 기록과 비동기 발행, 재시도를 구성했습니다. 이벤트 유실 가능성을 낮추고 주문 상태와 이벤트의 정합성을 강화했습니다.',
                '동시 주문의 잠금 경합과 중복 처리를 핵심 트랜잭션과 후처리로 분리하고 Redis Mutex, DB 잠금, 고유 제약, 멱등성을 조합했습니다.',
                '배포 후 주문 API와 외부 공급자 연동의 성능 변화를 확인하기 위해 SigNoz MCP로 배포 전후 호출량, 평균 응답시간, p99, 에러율을 비교하고 이상 징후를 알림으로 공유했습니다. 성능 개선과 배포 영향을 실측하는 검증 흐름을 개발 과정에 포함했습니다.',
                'AI 개발 하네스를 개발 흐름에 도입하면서 생길 수 있는 코드 품질과 변경 안전성 편차를 줄이기 위해 프로젝트 컨벤션, 테스트 실행, 자동 검증, 문서와 코드의 일치 여부를 확인하는 5단계 파이프라인을 구성했습니다. 코드 작성부터 리뷰, 테스트, PR까지 동일한 기준을 적용했습니다.',
              ],
            },
            {
              period: '2025.07 - 2025.08',
              title: '뷰업 인증·계정 백엔드 마이그레이션 및 서비스 고도화',
              summary:
                '사용자 인증, 계정 관련 레거시 기능을 NestJS 기반 v2 백엔드로 마이그레이션하며 인증 책임과 레거시 데이터 처리 흐름을 고도화했습니다.',
              bullets: [
                '기존 프런트엔드 계약을 깨뜨리지 않으면서 회원가입, 계정 복구, 재인증, 계정 조회 API를 NestJS v2로 이전하고 에러 코드와 리다이렉트 정책을 정비했습니다.',
                'NICE 본인인증이 하나의 Facade에 집중되어 변경 영향이 커지는 문제를 UseCase와 Command 중심으로 분리해 토큰 발급, 암호화, 복호화, 검증 책임을 명확히 했습니다.',
                '탈퇴, 레거시 계정과 임시 사용자 데이터의 인증 상태 불일치를 줄이기 위해 만료 규칙과 Redis 캐시 흐름을 정비하고 사용하지 않는 v1 API와 데이터를 정리했습니다.',
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
                '고객사별 검사 콘텐츠와 결과 구조, 외부 연동 규격이 달라지는 문제를 요구사항 조율을 통해 문제, 응답, 채점, 결과 모델과 B2B API로 표준화했습니다.',
                'LIKE 검색의 DB 병목을 Elasticsearch로 전환해 검색 응답 속도를 약 4배 이상 개선했습니다.',
                '배포 중단과 롤백 부담을 줄이기 위해 Docker Compose로 구버전과 신버전을 병렬 운영하고 트래픽 전환만 제어하는 무중단 배포 구조를 구축했습니다.',
                '로그만으로 장애 흐름을 추적하기 어려워 로그, 메트릭, 트레이스를 통합하고 요청 단위 원인 분석 환경을 마련했습니다.',
                'PDF 생성으로 인한 요청 지연과 서버 부하를 줄이기 위해 Puppeteer Cluster, Bull Queue 기반 비동기 병렬 처리로 분리했습니다.',
              ],
            },
            {
              title: '온라인 화상 감독 인적성 검사 플랫폼 신규 개발 및 비용 최적화',
              bullets: [
                '외부 솔루션만으로는 비대면 검사의 실시간 감독과 운영 요구를 충족하기 어려워 WebSocket, WebRTC 기반 P2P 화상 감독 기능을 신규 개발했습니다.',
                'uPrism 의존으로 기능 변경과 운영 통제가 제한되는 문제를 자체 플랫폼으로 전환해 연 8,000만 원 이상 비용을 절감했습니다.',
                '대용량 녹화 파일의 서버 경유로 발생하는 부하와 네트워크 비용을 AWS S3 직접 업로드와 Lambda, EventBridge 기반 리소스 관리로 개선했습니다.',
              ],
            },
            {
              title: '부정행위 방지 하드웨어 제어 응용 프로그램 개발',
              bullets: [
                '브라우저만으로 응시자 PC를 제어하기 어려워 Electron 멀티플랫폼 앱을 개발하고 듀얼 모니터 감지, 특정 프로그램 차단 기능을 구현했습니다.',
                '사용자 환경 오류의 재현과 배포 품질 문제를 줄이기 위해 오류 로그 수집과 GitHub Actions 기반 CI/CD, 테스트 자동화를 구축했습니다.',
              ],
            },
          ],
        },
        {
          mark: 'CI',
          logo: '/codeit.png',
          logoBackground: '#ffffff',
          company: '코드잇(codeit)',
          period: '2026.03 - 재직중',
          duration: '6개월',
          employmentType: '프리랜서',
          role: 'Career Mentor',
          current: true,
          projects: [
            {
              period: '2026.03 - 2026.08',
              title: 'Career Mentor',
              summary:
                '코드잇 커리어 프로그램에서 백엔드 개발자 취업을 준비하는 학습자를 대상으로 이력서, 포트폴리오 코칭과 기술·직무 면접 멘토링을 진행했습니다. 학습자의 프로젝트 경험과 강점을 구체적인 성과와 문제 해결 사례로 정리하고, 목표 직무에 맞는 지원 전략을 수립할 수 있도록 실무 관점의 피드백을 제공했습니다.',
            },
          ],
        },
        {
          mark: 'CS',
          logo: '/codestates.jpeg',
          logoBackground: '#ffffff',
          company: '코드스테이츠',
          period: '2023.03 - 2023.08',
          duration: '6개월',
          employmentType: '프리랜서',
          role: 'Career Mentor',
          projects: [
            {
              period: '2023.03 - 2023.08',
              title: 'Career Mentor',
              summary:
                '코드스테이츠 부트캠프 수료생을 대상으로 백엔드 개발자 취업 준비를 지원하는 멘토링 프로그램의 멘토로 활동했습니다. 정기적인 그룹 세션과 1:1 멘토링을 통해 이력서와 프로젝트 경험을 점검하고, 반복적인 피드백을 바탕으로 지원 서류의 완성도를 높일 수 있도록 지원했습니다.',
            },
          ],
        },
      ],
      skills: [
        {
          category: 'Backend',
          items: ['Node.js', 'TypeScript', 'NestJS', 'Express', 'Next.js', 'RESTful Architecture'],
        },
        {
          category: 'Data & Messaging',
          items: ['Apache Kafka', 'RabbitMQ', 'MySQL', 'PostgreSQL', 'Redis', 'ElasticSearch'],
        },
        {
          category: 'Infrastructure & Observability',
          items: [
            'AWS',
            'Docker',
            'Kubernetes',
            'Argo CD',
            'GitHub Actions',
            'Prometheus',
            'Grafana',
          ],
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
          title: 'AWS Solution Architect Associate',
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
        { label: 'Blog', url: 'https://blog.jh8459.com/' },
        { label: '요즘IT', url: 'https://yozm.wishket.com/magazine/@JH8459/' },
        { label: 'Github', url: 'https://github.com/JH8459' },
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
