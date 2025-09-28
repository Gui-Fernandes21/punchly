<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue';

const { layoutConfig, layoutState, watchSidebarActive, unbindOutsideClickListener } = useLayout();

onMounted(() => {
  watchSidebarActive();
});

onBeforeUnmount(() => {
  unbindOutsideClickListener();
});

const containerClass = computed(() => {
  return [
    {
      'layout-light': layoutConfig.layoutTheme === 'colorScheme' && !layoutConfig.darkTheme,
      'layout-dark': layoutConfig.layoutTheme === 'colorScheme' && layoutConfig.darkTheme,
      'layout-primary': !layoutConfig.darkTheme && layoutConfig.layoutTheme === 'primaryColor',
      'layout-slim': layoutConfig.menuMode === 'slim',
      'layout-slim-plus': layoutConfig.menuMode === 'slim-plus',
      'layout-static': layoutConfig.menuMode === 'static',
      'layout-overlay': layoutConfig.menuMode === 'overlay',
      'layout-overlay-active': layoutState.overlayMenuActive,
      'layout-mobile-active': layoutState.staticMenuMobileActive,
      'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static'
    }
  ];
});
</script>

<template>
  <NuxtPage></NuxtPage>
</template>

<style lang="scss"></style>
