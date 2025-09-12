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
    redirect: false
  }
});
