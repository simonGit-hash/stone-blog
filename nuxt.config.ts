import tailwindcss from '@tailwindcss/vite'

export default ({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt'
  ],
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  router: {
    base: '/stone-blog/'
  },
  content: {
    build: {
      markdown: {
        highlight: {
          langs: [
            'c',
            'cpp',
            'java'
          ]
        }
      }
    }
  },
  ui: {
    fonts: false,
    icons: ['lucide', 'simple-icons', 'material-symbols', 'bxl']
  },
  compatibilityDate: '2024-11-01',
  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },
  vite: {
    plugins: [
      tailwindcss()
    ],
    base: process.env.BASE_PATH || '/'
  },
  eslint: {
    config: {
      stylistic: {
        'commaDangle': 'never',
        'braceStyle': '1tbs',
        'vue/html-indent': 'off'
      }
    }
  },
})
