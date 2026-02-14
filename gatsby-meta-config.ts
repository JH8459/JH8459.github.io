import dotenv from 'dotenv';

dotenv.config();

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
  about: {
    summary: string[] | string;
    careers: Array<{
      date?: string;
      label?: string;
      status?: string;
      activity?: string;
      posts?: Array<{
        title?: string;
        thumbnail?: string;
        publishedAt?: string;
        url?: string;
      }>;
      links?: Record<string, string>;
    }>;
    education: Array<{
      date?: string;
      title?: string;
      institution?: string;
      links?: Record<string, string>;
    }>;
    certifications: Array<{
      issued?: string;
      expires?: string;
      title?: string;
      issuer?: string;
      credentialId?: string;
      links?: Record<string, string>;
    }>;
    openSource: Array<{
      title?: string;
      description?: string;
      date?: string;
      links?: Record<string, string>;
    }>;
    externalActivities: Array<{
      title?: string;
      description?: string;
      date?: string;
      links?: Record<string, string>;
    }>;
    projects: Array<{
      title?: string;
      description?: string;
      techStack?: string[];
      thumbnailUrl?: string;
      links?: Record<string, string>;
    }>;
  };
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
      {
        title: '프로그래머스 프로필 뱃지 자동 생성 봇',
        description:
          '알고리즘 문제 풀이 동기부여를 위해 프로그래머스에서 제공하는 API를 활용하여 프로필 뱃지를 자동으로 생성해주는 봇을 개발하였습니다. Github Action을 활용하여 백준 허브에 연동된 저장소가 변경될 때 마다 호출되어 프로필 뱃지를 자동으로 업데이트 되도록 구성하였습니다.',
        techStack: ['NodeJS', 'NestJS', 'Github', 'Github Action'],
        thumbnailUrl: 'project-programmers.jpg',
        links: {
          post: 'https://blog.jh8459.com/2024-12-22-PROJECT/',
          github: 'https://github.com/JH8459/PROGRAMMERS-BADGE',
        },
      },
      {
        title: 'LOTTERY 🍀',
        description:
          '반복되는 복권 당첨 정보를 손 쉽게 제공 할 수 없을까라는 생각으로 시작하게된 프로젝트입니다. 단순히 복권 당첨 결과만 제공하는 것이 아닌, 당첨 정보를 기반으로 한 통계 정보를 간단한 사용 방법으로 이메일 정기 구독 방식과 슬랙 앱 설치 방식으로 제공합니다.',
        techStack: ['NodeJS', 'Express', 'NestJS', 'React', 'Docker', 'Redis'],
        thumbnailUrl: 'project-lottery.png',
        links: {
          post: 'https://blog.jh8459.com/2024-07-01-PROJECT/',
          github: 'https://github.com/JH8459/LOTTERY',
          demo: 'https://lottery.jh8459.com/',
        },
      },
      {
        title: '모바일 청첩장',
        description:
          '"개발자가 모바일 청첩장을 외부업체에 맡겨..??"라는 단순한 한가지 생각으로 시작하게된 모바일 청첩장 개발은 (백엔드 개발자 에겐) 쉽지 않았습니다. 이 또한 추억이라 생각하며 아내와 함께 기획부터 개발까지 완성하여 지인들에게 공유한 실제 모바일 청첩장 개발 히스토리를 소개합니다.',
        techStack: ['React', 'Kakao API'],
        thumbnailUrl: 'project-wedding.jpg',
        links: {
          github: 'https://github.com/JH8459/WEDDING-INVITATION-LETTER',
        },
      },
      {
        title: '슬랙 사내 도서 리스트 채팅 봇',
        description:
          '웹 프로그래밍 개발이 점점 익숙해지며 실제로 "내가 필요한걸 직접 구현해 보는건 어떨까?"라는 생각은 점점 부풀려져서 업무하는 동안 자주 사용하는 슬랙 메신저와 노션을 활용해서 (주)ACG 사내 도서 리스트(노션DB 활용) 기능과 도서 대출 기록 기능을 제공하는 채팅 봇을 개발해보았습니다.',
        techStack: ['NodeJS', 'Express', 'Slack API', 'Notion API'],
        thumbnailUrl: 'project-slack.jpg',
        links: {
          post: 'https://blog.jh8459.com/2023-05-01-PROJECT/',
          github: 'https://github.com/JH8459/SLACK-LUNCH-BOT',
        },
      },
    ],
  },
};

export default metaConfig;
