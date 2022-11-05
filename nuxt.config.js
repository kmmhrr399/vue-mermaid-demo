import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/vue-mermaid', '~/plugins/vue-simple-context-menu',
  { src: '@/plugins/vue-mavon-editor', ssr: false},
],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    //'@nuxt/postcss8',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [  '@nuxtjs/firebase',],
  firebase: {
    // options
    config: {
      apiKey: "AIzaSyDj0iJjFlV-NbF0LZKJcEMBAKVzA-JF6ok",
      authDomain: "vuemermaidmarkdown1.firebaseapp.com",
      databaseURL: "https://vuemermaidmarkdown1-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "vuemermaidmarkdown1",
      storageBucket: "vuemermaidmarkdown1.appspot.com",
      messagingSenderId: "843442527675",
      appId: "1:843442527675:web:6e75820d1903377939f89e",
      measurementId: "G-0QHG8DC1N2"
    },
    services: {
      auth: true, // Just as example. Can be any other service.
      database: true
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev) {
               config.devtool = 'inline-cheap-module-source-map'
             }
    }
  }
}
