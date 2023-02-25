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
      description: ['노력에 가치를 두는', '능동적으로 일하는', '필요한 것을 만드는'],
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
        title: '웨딩 청첩장 풀스택 프로젝트 개발',
        description:
          '웹 프로그래밍 개발이 점점 익숙해지며 실제로 "내가 필요한걸 직접 구현해 보는건 어떨까?"라는 생각은 점점 부풀려져서 제 이야기를 담고 있는 청첩장 사이트를 직접 만들어보고 싶게 되었습니다. 그동안 여러 결혼식에 초대받았을 때 받았던 청첩장들을 돌아 보면서 좋았던 부분과 불편했던 부분들을 바탕으로 참고하여 직접 나만의 청접장을 만들게 되었습니다.',
        techStack: ['react', 'react-native', 'nestjs', 'mysql'],
        thumbnailUrl: 'project-wedding.jpg',
        links: {
          post: '/',
          github: 'https://github.com/JH8459/Wedding-Invitation',
          demo: 'https://wedding.jh8459.com',
        },
      },
    ],
  },
};
