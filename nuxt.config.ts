// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@vesp/nuxt-fontawesome',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],

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
        'clock'
      ],
      brands: ['google', 'github', 'x-twitter'],
      regular: ['star']
    }
  },

  compatibilityDate: '2024-07-03'
})
