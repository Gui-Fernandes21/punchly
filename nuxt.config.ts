// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/scss/styles.scss', '~/assets/css/tailwind.css', '~/assets/css/main.css'],
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/fonts', '@nuxtjs/supabase', '@primevue/nuxt-module', '@nuxtjs/tailwindcss'],
  primevue: {
    importTheme: { from: '~/theme' }
  },
  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/business/login',
      callback: '/business/dashboard'
    },
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY
  },
  runtimeConfig: {}
});
