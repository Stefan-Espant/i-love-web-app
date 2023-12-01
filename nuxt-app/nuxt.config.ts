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
    title: 'I love web blog',
  },  
}
})