import axios from '@nuxtjs/axios'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'rskm.nl',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.APP_DESCRIPTION || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/fonts.scss',
    '~/assets/css/nested-copy.scss',
    '~/assets/css/typography.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/composition-api.js' },
    { src: '~/plugins/storyblok-image-transform.js' },
    { src: '~/plugins/storyblok-rich-text-renderer.js' },
  ],

  publicRuntimeConfig: {
    storyblokAccessToken: process.env.STORYBLOK_ACCESS_TOKEN,
    storyblokCacheProvider: process.env.STORYBLOK_CACHE_PROVIDER,
  },

  privateRuntimeConfig: {
    storyblokAccessToken: process.env.STORYBLOK_ACCESS_TOKEN,
    storyblokCacheProvider: process.env.STORYBLOK_CACHE_PROVIDER,
  },

  // Using Links API (100 entries - no pagination in the example)
  generate: {
    routes(callback) {
      const token = process.env.STORYBLOK_ACCESS_TOKEN
      const version = 'published'
      let cacheVersion = 0
      const toIgnore = ['/', 'en/settings']

      // other routes that are not in Storyblok with their slug.
      const routes = ['/'] // adds / directly
      // Load space and receive latest cache version key to improve performance
      axios
        .get(`https://api.storyblok.com/v1/cdn/spaces/me?token=${token}`)
        .then((spaceRes) => {
          // timestamp of latest publish
          cacheVersion = spaceRes.data.space.version

          // Call for all Links using the Links API: https://www.storyblok.com/docs/Delivery-Api/Links
          axios
            .get(
              `https://api.storyblok.com/v1/cdn/links?token=${token}&version=${version}&cv=${cacheVersion}&per_page=100`
            )
            .then((res) => {
              Object.keys(res.data.links).forEach((key) => {
                if (!toIgnore.includes(res.data.links[key].slug)) {
                  routes.push('/' + res.data.links[key].slug)
                }
              })
              callback(null, routes)
            })
        })
    },
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    [
      'storyblok-nuxt',
      {
        cacheProvider: 'memory',
      },
    ],
    ['@nuxtjs/markdownit', { html: true, injected: true }],
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  // pwa: {
  //   manifest: {
  //     lang: 'en',
  //   },
  // },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  // build: {},

  loading: {
    color: 'blue',
    height: '2px',
  },

  tailwindcss: {
    jit: true,
  },
}
