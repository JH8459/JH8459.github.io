module.exports = {
  title: `blog.jh8459.com`,
  description: `JH 개발일기`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://blog.jh8459.com`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `JH8459/JH8459.github.io`, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: 'G-B02DJ4ZW5E', // Google Analytics Tracking ID
  author: {
    name: `김정현`,
    bio: {
      role: `백엔드 개발자`,
      description: ['노력에 가치를 두는', '능동적으로 일하는', '필요한 것을 만드는'],
      thumbnail: 'sample.gif', // Path to the image in the 'asset' folder
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
          post: '/gatsby-starter-zoomkoding-introduction',
          github: 'https://github.com/JH8459/JH8459.github.io',
          demo: 'https://blog.jh8459.com',
        },
      },
      {
        date: '2022.04 ~',
        activity: '(주) ACG 백엔드 개발자 포지션 입사',
        links: {
          post: '/gatsby-starter-zoomkoding-introduction',
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
        title: '개발 블로그 테마 개발',
        description:
          '개발 블로그를 운영하는 기간이 조금씩 늘어나고 점점 많은 생각과 경험이 블로그에 쌓아가면서 제 이야기를 담고 있는 블로그를 직접 만들어보고 싶게 되었습니다. 그동안 여러 개발 블로그를 보면서 좋았던 부분과 불편했던 부분들을 바탕으로 레퍼런스를 참고하여 직접 블로그 테마를 만들게 되었습니다.',
        techStack: ['gatsby', 'react'],
        thumbnailUrl: 'blog.png',
        links: {
          post: '/gatsby-starter-zoomkoding-introduction',
          github: 'https://github.com/zoomkoding/zoomkoding-gatsby-blog',
          demo: 'https://www.zoomkoding.com',
        },
      },
    ],
  },
};
