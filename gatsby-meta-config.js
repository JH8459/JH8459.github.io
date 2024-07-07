require('dotenv').config();

module.exports = {
  title: `blog.jh8459.com`,
  description: `JH 개발일기`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://blog.jh8459.com`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `JH8459/JH8459.github.io`,
    },
  },
  googleTrakingId: process.env.GOOGLE_TRAKING_ID, // Google Analytics Tracking ID
  googlePublisherId: process.env.GOOGLE_PUBLISHER_ID, // Google Adsense Publisher ID
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
      thumbnail: 'thumbnail.gif', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/JH8459`,
      linkedIn: `https://www.linkedin.com/in/%EC%A0%95%ED%98%84-%EA%B9%80-8b7a80237/`,
      email: `kk_ong2233@naver.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
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
        date: '2021.07 ~',
        activity: '개발 시작 & 개인 블로그 운영',
        links: {
          github: 'https://github.com/JH8459',
          demo: 'https://blog.jh8459.com',
        },
      },
      {
        date: '2022.04 ~',
        activity: '(주)ACG / 백엔드 개발자 포지션 입사',
        links: {
          post: 'https://blog.jh8459.com/2022-04-01-RETROSPECT/',
        },
      },
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
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: '슬랙 사내 도서 리스트 채팅 봇 개발',
        description:
          '웹 프로그래밍 개발이 점점 익숙해지며 실제로 "내가 필요한걸 직접 구현해 보는건 어떨까?"라는 생각은 점점 부풀려져서 업무하는 동안 자주 사용하는 슬랙 메신저와 노션을 활용해서 (주)ACG 사내 도서 리스트(노션DB 활용) 기능과 도서 대출 기록 기능을 제공하는 채팅 봇을 개발해보았습니다.',
        techStack: ['NodeJS', 'Express', 'Slack API', 'Notion API'],
        thumbnailUrl: 'project-slack.jpg',
        links: {
          post: 'https://blog.jh8459.com/2023-05-01-PROJECT/',
          github: 'https://github.com/JH8459/SLACK-LUNCH-BOT',
        },
      },
      {
        title: '모바일 청첩장 개발',
        description:
          '"개발자가 모바일 청첩장을 외부업체에 맡겨..??"라는 단순한 한가지 생각으로 시작하게된 모바일 청첩장 개발은 (백엔드 개발자 에겐) 쉽지 않았습니다. 이 또한 추억이라 생각하며 아내와 함께 기획부터 개발까지 완성하여 지인들에게 공유한 실제 모바일 청첩장 개발 히스토리를 소개합니다.',
        techStack: ['React', 'Kakao API'],
        thumbnailUrl: 'project-wedding.jpg',
        links: {
          github: 'https://github.com/JH8459/WEDDING-INVITATION-LETTER',
          demo: 'https://wedding.jh8459.com/',
        },
      },
      {
        title: 'LOTTERY 개발',
        description:
          '반복되는 복권 당첨 정보를 손 쉽게 제공 할 수 없을까라는 생각으로 시작하게된 프로젝트입니다. 단순히 복권 당첨 결과만 제공하는 것이 아닌, 당첨 정보를 기반으로 한 통계 정보를 간단한 사용 방법으로 이메일 정기 구독 방식과 슬랙 앱 설치 방식으로 제공합니다.',
        techStack: ['NodeJS', 'Express', 'NestJS', 'MySQL', 'Redis'],
        thumbnailUrl: 'project-lottery.png',
        links: {
          post: 'https://blog.jh8459.com/2024-07-01-PROJECT/',
          github: 'https://github.com/JH8459/LOTTERY',
          demo: 'https://lottery.jh8459.com/',
        },
      },
    ],
  },
};
