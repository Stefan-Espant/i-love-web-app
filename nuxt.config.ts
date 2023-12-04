export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/styles/global.css'],
  runtimeConfig: {
    public: {
      datoCmsToken: process.env.datoCmsToken,
    },
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
