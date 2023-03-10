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
  ga: 'G-B02DJ4ZW5E', // Google Analytics Tracking ID
  author: {
    name: `김정현`,
    bio: {
      role: `백엔드 개발자`,
      description: ['소통에 가치를 두는', '능동적으로 일하는', '필요한 것을 만드는'],
      thumbnail: 'thumbnail.gif', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/JH8459`,
      linkedIn: `https://www.linkedin.com/in/jeonghyun-kim-8b7a80237`,
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
      {
        date: '2023.03 ~',
        activity: '코드스테이츠 수료생 멘토 활동',
        links: {
          post: '/',
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
        title: '슬랙 맛집 리스트 채팅 봇 개발',
        description:
          '웹 프로그래밍 개발이 점점 익숙해지며 실제로 "내가 필요한걸 직접 구현해 보는건 어떨까?"라는 생각은 점점 부풀려져서 업무하는 동안 자주 사용하는 슬랙 메신저와 노션을 활용해서 (주)ACG 근처 용산구 맛집 리스트(노션DB 활용) 기능과 평점 서비스 기능을 제공하는 채팅 봇을 개발해보았습니다.',
        techStack: ['nestjs', 'slack', 'notion'],
        thumbnailUrl: 'project-slack.jpg',
        links: {
          post: '/',
          github: 'https://github.com/JH8459/SLACK-LUNCH-BOT',
        },
      },
    ],
  },
};
