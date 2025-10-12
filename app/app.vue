<script lang="ts" setup>
import { Analytics } from '@vercel/analytics/nuxt';
import { SpeedInsights } from '@vercel/speed-insights/nuxt';
</script>

<template>
  <NuxtLayout />
  <div class="global-modals">
    <ModalError />
    <Analytics />
    <SpeedInsights />
  </div>
</template>

<style>
* {
  font-family: 'Open Sans', sans-serif;
}

button {
  width: 100%;
  padding: 1rem;
}

@media (max-width: 1024px) {
  .hide-on-mobile {
    display: none;
  }
}

@media (min-width: 1024px) {
  .hide-on-desktop {
    display: none;
  }
}
</style>
