// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@vesp/nuxt-fontawesome',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/seo'
  ],

  seo: {
    baseUrl: 'https://timetabled.pages.dev',
    og: {
      title: 'Stop Guessing, Start Connecting | TimeTabled',
      description:
        'Let TimeTabled find the overlap in your timetables, so you can focus on what really matters—time spent together.',
      image: '/banner.png',
      type: 'website',
      url: 'https://timetabled.pages.dev'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'index,follow' }
    ]
  },

  googleFonts: {
    families: {
      'Space Grotesk': [400, 700]
    },
    preload: true,
    display: 'swap'
  },

  colorMode: {
    preference: 'system',
    dataValue: 'theme',
    classSuffix: ''
  },

  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }],
    exposeConfig: true
  },

  fontawesome: {
    icons: {
      solid: [
        'rocket',
        'fire',
        'arrow-left',
        'user',
        'envelope',
        'arrow-right',
        'table-columns',
        'xmark',
        'pen-to-square',
        'check',
        'user-pen',
        'angle-up',
        'angle-down',
        'arrow-up-right-from-square',
        'plus',
        'star',
        'arrow-up',
        'people-group',
        'circle-question',
        'id-badge',
        'table-cells',
        'filter',
        'clock',
        'caret-right',
        'share-nodes'
      ],
      brands: ['google', 'github', 'x-twitter'],
      regular: ['star']
    }
  },

  compatibilityDate: '2024-07-03'
})
