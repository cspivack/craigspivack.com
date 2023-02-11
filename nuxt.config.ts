import GoogleFontsModule from '@nuxtjs/google-fonts'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { name: 'description', content: 'just a personal site for craig spivack' }
      ],
    },
  },
  css: [
    '@/assets/scss/main.scss'
  ],
  imports: {
    dirs: ['composables', 'stores'],
  },
  modules: [
    GoogleFontsModule,
    ['@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
    '@nuxt/image-edge',
    '@nuxt/content',
  ],
  content: {
    documentDriven: true,
    highlight: {
      theme: 'monokai',
      preload: ['nginx', 'php']
    }
  },
  googleFonts: {
    preconnect: true,
    prefetch: true,
    preload: true,
    display: 'swap',
    families: {
      'Nunito Sans': {
        wght: [400, 600],
        ital: [400, 600]
      },
      'Prata': {
        wght: [400],
        ital: [400]
      },
    }
  },
})
