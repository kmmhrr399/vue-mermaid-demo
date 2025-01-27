import createApp from './app.js'

import authService from './service.auth.js'
import databaseService from './service.database.js'
import firestoreService from './service.firestore.js'

const appConfig = {"apiKey":"AIzaSyAyrY2hF5HzW4BuUeXv7vtKHVycCqHlxfs","authDomain":"nuxtmermaidmarkdown.firebaseapp.com","databaseURL":"https:\u002F\u002Fnuxtmermaidmarkdown-default-rtdb.asia-southeast1.firebasedatabase.app","projectId":"nuxtmermaidmarkdown","storageBucket":"nuxtmermaidmarkdown.appspot.com","messagingSenderId":"639760450256","appId":"1:639760450256:web:c1ddf3f9b61636f8b894d5","measurementId":"G-SQQWMJ6TP2"}

export default async (ctx, inject) => {
  const { firebase, session } = await createApp(appConfig, ctx)

  let servicePromises = []

  if (process.server) {
    servicePromises = [
      authService(session, firebase, ctx, inject),
    databaseService(session, firebase, ctx, inject),
    firestoreService(session, firebase, ctx, inject),

    ]
  }

  if (process.client) {
    servicePromises = [
      authService(session, firebase, ctx, inject),
      databaseService(session, firebase, ctx, inject),
      firestoreService(session, firebase, ctx, inject),

    ]
  }

  const [
    auth,
    database,
    firestore
  ] = await Promise.all(servicePromises)

  const fire = {
    auth: auth,
    database: database,
    firestore: firestore
  }

    inject('fireModule', firebase)
    ctx.$fireModule = firebase

  inject('fire', fire)
  ctx.$fire = fire
}

function forceInject (ctx, inject, key, value) {
  inject(key, value)
  const injectKey = '$' + key
  ctx[injectKey] = value
  if (typeof window !== "undefined" && window.$nuxt) {
  // If clause makes sure it's only run when ready() is called in a component, not in a plugin.
    window.$nuxt.$options[injectKey] = value
  }
}