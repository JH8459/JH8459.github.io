const metaConfig = require('./gatsby-meta-config');

module.exports = {
  siteMetadata: metaConfig,

  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(({ node }) => {
                return {
                  title: node.frontmatter.title,
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  author: node.frontmatter.author,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ 'content:encoded': node.html }],
                };
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { frontmatter: { date: DESC } },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                        author
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: '블로그 RSS Feed',
            match: '^/content/', // content 경로를 사용하는 경우
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-firebase-v9.0',
      options: {
        credentials: {
          apiKey: metaConfig.firebaseApiKey,
          authDomain: metaConfig.firebaseAuthDomain,
          databaseURL: metaConfig.firebaseDatabaseURL,
          projectId: metaConfig.firebaseProjectId,
          storageBucket: metaConfig.firebaseStorageBucket,
          messagingSenderId: metaConfig.firebaseMessagingSenderId,
          appId: metaConfig.firebaseAppId,
        },
      },
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: metaConfig.googleTrakingId,
        head: true,
        anonymize: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: metaConfig.title,
        short_name: metaConfig.title,
        description: metaConfig.description,
        lang: `en`,
        display: `standalone`,
        start_url: `/`,
        icon: `static/favicon.png`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 720,
              linkImagesToOriginal: false,
              backgroundColor: 'transparent',
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {
                // TypeScript
                ts: 'typescript',
                tsx: 'tsx',
                // JavaScript (explicit)
                js: 'javascript',
                // Shells
                sh: 'bash',
                shell: 'bash',
                zsh: 'bash',
                console: 'shell-session',
                ps1: 'powershell',
                pwsh: 'powershell',
                // Data / Config
                yml: 'yaml',
                dotenv: 'properties',
                env: 'properties',
                // Docker
                dockerfile: 'docker',
                docker: 'docker',
                // Build / Docs
                make: 'makefile',
                md: 'markdown',
                // Web / APIs
                gql: 'graphql',
              },
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: 'superscript',
                  extend: 'javascript',
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false,
              },
              escapeEntities: {},
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
  ],
};
