// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@vite-pwa/nuxt"],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    config: {
      theme: {
        extend: {
          fontFamily: {
            rajdhani: ['Rajdhani', 'sans-serif'],
            barlow: ['Barlow', 'sans-serif'],
          },
          colors: {
            ow: {
              orange: '#F5A623',
              'orange-dark': '#E0941A',
            }
          },
          borderRadius: {
            '4xl': '2rem',
          }
        }
      }
    }
  },

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap'
        }
      ]
    }
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Timer PS',
      short_name: 'Timer PS',
      description: 'Aplikasi timer untuk rental PlayStation',
      theme_color: '#F5A623',
      background_color: '#F5A623',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/'
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,txt,png,svg}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  }
})