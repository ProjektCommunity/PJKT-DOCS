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
  
  // Appearance
  appearance: true,
  lastUpdated: true,

  // Theme configuration
  themeConfig: {
    logo: '/images/logo-mini.png',
    siteTitle: false,
    
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Documentation',
        items: [
          {
            text: 'Getting Started',
            items: [
              { text: 'Introduction', link: '/info/getting-started' },
              { text: 'Booth Setup', link: '/booths/' }
            ]
          },
          {
            text: 'Reference',
            items: [
              { text: 'Components', link: '/booths/components' },
              { text: 'API Examples', link: '/api-examples' },
            ]
          }
        ]
      },
      {
        text: 'Donate to PJKT',
        link: 'https://ko-fi.com/pjkt',
        target: '_blank'
      }
    ],

    sidebar: [
      {
        text: 'Rep Information',
        items: [
          { text: 'Booth Stuff', link: 'booths/index' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'Booths',
        items: [
          { text: 'Getting Started', link: 'booths/gettings-started' },
          { text: 'Booth Specifications', link: '/api-examples' }
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
      message: 'Made with 🐦 and ☕'
    }
  },

  // Head tags
  head: [
    ['link', { rel: 'icon', href: '/images/logo-mini.png' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'PJKT:DOCS' }],
    ['meta', { name: 'og:description', content: 'Documentation for developers and booth exhibitors using our tools.' }],
    ['meta', { name: 'og:image', content: '/images/logo-mini.png' }]
  ],

  // Markdown config
  markdown: {
    lineNumbers: true,
    breaks: true
  }
})