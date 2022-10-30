import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _8ba40018 = () => interopDefault(import('../pages/eMark.vue' /* webpackChunkName: "pages/eMark" */))
const _7bade9ea = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _dbfe1386 = () => interopDefault(import('../pages/markdown.vue' /* webpackChunkName: "pages/markdown" */))
const _2f79bc7a = () => interopDefault(import('../pages/marked.vue' /* webpackChunkName: "pages/marked" */))
const _cf2500aa = () => interopDefault(import('../pages/mermaid.vue' /* webpackChunkName: "pages/mermaid" */))
const _0efd3018 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/eMark",
    component: _8ba40018,
    name: "eMark"
  }, {
    path: "/login",
    component: _7bade9ea,
    name: "login"
  }, {
    path: "/markdown",
    component: _dbfe1386,
    name: "markdown"
  }, {
    path: "/marked",
    component: _2f79bc7a,
    name: "marked"
  }, {
    path: "/mermaid",
    component: _cf2500aa,
    name: "mermaid"
  }, {
    path: "/",
    component: _0efd3018,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
