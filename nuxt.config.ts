export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/ui',
    '@pinia/nuxt'
  ],

  ui: { global: true },

  colorMode: {
    preference: 'dark',
    classSuffix: ''
  },

  compatibilityDate: '2024-11-19'
})