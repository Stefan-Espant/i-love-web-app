export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/styles/global.css'],
  runtimeConfig: {
    public: {
      datoCmsToken: process.env.datoCmsToken,
    },
  },
  routeRules: {
    '/**': { isr: 60 },
    '/static': { isr: true },
    '/prerendered': { prerender: true },
    '/dynamic': { isr: false },
    '/redirect': { redirect: '/static' },
    '/headers': { headers: { 'x-magic-of': 'nuxt and vercel' } },
    '/spa': { ssr: false },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'nl',
      },
      title: 'I love web blog',
    },
  }
});
