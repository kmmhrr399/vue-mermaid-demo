import colors from 'vuetify/es5/util/colors'
import { firestore } from './plugins/firebase'

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
  { src: '@/plugins/vue-mavon-editor', ssr: false},//{ src: "@/plugins/persistedstate.js", ssr: false },
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
  modules: [  '@nuxtjs/firebase','@nuxtjs/axios','@nuxtjs/pwa',],
  firebase: {
    // options
    config: {
      apiKey: "AIzaSyAyrY2hF5HzW4BuUeXv7vtKHVycCqHlxfs",
      authDomain: "nuxtmermaidmarkdown.firebaseapp.com",
      databaseURL: "https://nuxtmermaidmarkdown-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "nuxtmermaidmarkdown",
      storageBucket: "nuxtmermaidmarkdown.appspot.com",
      messagingSenderId: "639760450256",
      appId: "1:639760450256:web:c1ddf3f9b61636f8b894d5",
      measurementId: "G-SQQWMJ6TP2"
    },
    services: {
      auth: true, // Just as example. Can be any other service.
      database: true,
      firestore:true
    },
  },
    axios: {
      // proxy: true
      credentials: true
    },

    pwa: {
      manifest: {
        lang: 'ja',
      },
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
