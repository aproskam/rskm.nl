export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'rskm.nl',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
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

  privateRuntimeConfig: {
    storyblokAccessToken: process.env.STORYBLOK_ACCESS_TOKEN,
    storyblokCacheProvider: process.env.STORYBLOK_CACHE_PROVIDER,
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
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://go.nuxtjs.dev/content
    ['storyblok-nuxt'],
    ['@nuxtjs/markdownit', { html: true, injected: true }],
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  // content: {},

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
