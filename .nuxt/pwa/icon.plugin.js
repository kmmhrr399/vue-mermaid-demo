export default async function (ctx, inject) {
  const icons = {"64x64":"/_nuxt/icons/icon_64x64.ea2607.png","120x120":"/_nuxt/icons/icon_120x120.ea2607.png","144x144":"/_nuxt/icons/icon_144x144.ea2607.png","152x152":"/_nuxt/icons/icon_152x152.ea2607.png","192x192":"/_nuxt/icons/icon_192x192.ea2607.png","384x384":"/_nuxt/icons/icon_384x384.ea2607.png","512x512":"/_nuxt/icons/icon_512x512.ea2607.png","ipad_1536x2048":"/_nuxt/icons/splash_ipad_1536x2048.ea2607.png","ipadpro9_1536x2048":"/_nuxt/icons/splash_ipadpro9_1536x2048.ea2607.png","ipadpro10_1668x2224":"/_nuxt/icons/splash_ipadpro10_1668x2224.ea2607.png","ipadpro12_2048x2732":"/_nuxt/icons/splash_ipadpro12_2048x2732.ea2607.png","iphonese_640x1136":"/_nuxt/icons/splash_iphonese_640x1136.ea2607.png","iphone6_50x1334":"/_nuxt/icons/splash_iphone6_50x1334.ea2607.png","iphoneplus_1080x1920":"/_nuxt/icons/splash_iphoneplus_1080x1920.ea2607.png","iphonex_1125x2436":"/_nuxt/icons/splash_iphonex_1125x2436.ea2607.png","iphonexr_828x1792":"/_nuxt/icons/splash_iphonexr_828x1792.ea2607.png","iphonexsmax_1242x2688":"/_nuxt/icons/splash_iphonexsmax_1242x2688.ea2607.png"}
  const getIcon = size => icons[size + 'x' + size] || ''
  inject('icon', getIcon)
}
