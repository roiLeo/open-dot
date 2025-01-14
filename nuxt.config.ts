export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/ui',
    '@nuxt/eslint',
    '@pinia/nuxt'
  ],

  ui: { global: true },

  colorMode: {
    preference: 'dark',
    classSuffix: ''
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler'
      }
    }
  },

  compatibilityDate: '2024-11-19'
})