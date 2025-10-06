<script lang="ts" setup>
import { Analytics } from '@vercel/analytics/nuxt';
import { SpeedInsights } from '@vercel/speed-insights/nuxt';
</script>

<template>
  <NuxtLayout>
    <!-- <NuxtPage></NuxtPage> -->
  </NuxtLayout>
  <ModalError />
  <Analytics />
  <SpeedInsights />
</template>

<style>
button {
  width: 100%;
  /* margin-top: 1rem; */
  padding: 1rem;
}

* {
  font-family: 'Open Sans', sans-serif;
}
</style>
