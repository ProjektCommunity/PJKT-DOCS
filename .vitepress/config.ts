import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // Site metadata
  lang: 'en-US',
  title: 'PJKT:DOCS',
  titleTemplate: ':title | PJKT Documentation',
  description: 'Documentation for developers and booth exhibitors using our tools.',
  
  // Deployment
  base: '/',
  cleanUrls: true,
  
  // Build settings
  srcDir: '.',
  outDir: './.vitepress/dist',
  cacheDir: './.vitepress/cache',
  srcExclude: ['localDocs'],

  // Ignore dead links
  ignoreDeadLinks: true,
  
  // Appearance
  appearance: true,
  lastUpdated: true,

  // Theme configuration
  themeConfig: {
    logo: '/images/logo-mini.png',
    siteTitle: false,
    
    nav: [
      { text: 'Home', link: '/' },
      // {
      //   text: 'Documentation',
      //   items: [
      //     {
      //       text: 'Getting Started',
      //       items: [
      //         { text: 'Introduction', link: '/info/getting-started' },
      //         { text: 'Booth Setup', link: '/booths/' }
      //       ]
      //     },
      //     {
      //       text: 'Reference',
      //       items: [
      //         { text: 'Components', link: '/booths/components' },
      //         { text: 'API Examples', link: '/api-examples' },
      //       ]
      //     }
      //   ]
      // },
      {
        text: 'Donate to PJKT',
        link: 'https://ko-fi.com/pjkt',
        target: '_blank'
      }
    ],

    sidebar: [
      {
        text: 'Core Information',
        items: [
          { text: 'Welcome to PJKT:DOCS', link: '/info/welcome' },
          { text: 'New Representatives Guide', link: '/info/new-representatives' },
          { text: 'Representative FAQ', link: '/info/representative-faq' },
        ]
      },
      {
        text: 'Booths & PJKT SDK',
        items: [
          { text: 'Getting Started', link: '/booths/getting-started' },
          { text: 'Web Booth Creator', link: '/booths/web-booth-creator' },
          { text: 'Getting started with the SDK', link: '/booths/getting-started-with-sdk' },
          { text: 'Booth Specifications', link: '/booths/specifications' },
          { text: 'Buttons & Components', link: '/booths/components' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'discord', link: 'https://discord.com/invite/pjkt' },
      { icon: 'twitter', link: 'https://x.com/PJKT_COM' },
      { icon: 'youtube', link: 'https://www.youtube.com/@PJKT' }
    ],

    search: {
      provider: 'local'
    },

    // Footer
    footer: {
      message: 'Made with 🐦 and ☕.'
    }
  },

  // Head tags
  head: [
    // Standard favicon
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    // Alternative favicon format for better browser support
    ['link', { rel: 'icon', type: 'image/png', href: '/images/logo-mini.png' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    // Open Graph / Discord embed tags
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'PJKT:DOCS' }],
    ['meta', { property: 'og:description', content: 'Documentation for developers and booth exhibitors using our tools.' }],
    ['meta', { property: 'og:image', content: 'https://docs.pjkt.net/images/logo-mini.png' }],
    ['meta', { property: 'og:image:alt', content: 'PJKT:DOCS Logo' }],
    ['meta', { property: 'og:image:width', content: '512' }],
    ['meta', { property: 'og:image:height', content: '512' }],
    ['meta', { property: 'og:site_name', content: 'PJKT:DOCS' }],
    // Discord specific
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:site', content: '@PJKT_COM' }],
    ['meta', { name: 'twitter:title', content: 'PJKT:DOCS' }],
    ['meta', { name: 'twitter:description', content: 'Documentation for developers and booth exhibitors using our tools.' }],
    ['meta', { name: 'twitter:image', content: 'https://docs.pjkt.net/images/logo-mini.png' }]
  ],

  // Markdown config
  markdown: {
    lineNumbers: true,
    breaks: true
  }

  
})