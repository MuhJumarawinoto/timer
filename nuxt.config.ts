// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  ssr: false, // Disable SSR for static build
  nitro: {
    experimental: {
      stripModulePreload: false
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  // Exclude server files for static build
  vite: {
    server: {
      watch: {
        ignored: ['**/server/**']
      }
    }
  }
})
