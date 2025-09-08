<script setup>
import { ref, watch } from 'vue';

const route = useRoute();
const home = { icon: 'pi pi-home', to: '/' };
const breadcrumbRoutes = ref([]);

function setBreadcrumbRoutes() {
  if (route.meta.breadcrumb) {
    const routeMetaBreadcrumb = (route.meta.breadcrumb || []).filter(breadcrumb => !!breadcrumb);
    breadcrumbRoutes.value = routeMetaBreadcrumb;
    return;
  }

  breadcrumbRoutes.value = route.fullPath
    .split('/')
    .filter((item) => item !== '')
    .filter((item) => isNaN(Number(item)))
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1));
}

watch(
  () => route.path,
  () => {
    setBreadcrumbRoutes();
  },
  { immediate: true }
);
</script>

<template>
  <nav class="layout-breadcrumb">
    <ol>
      <li>
        <router-link v-if="breadcrumbRoutes.length > 0" :to="home.to" style="color: inherit">
          <i :class="home.icon"></i>
        </router-link>
      </li>
      <template v-for="(breadcrumbRoute, i) in breadcrumbRoutes" :key="breadcrumbRoute">
        <li v-if="!!breadcrumbRoute" class="layout-breadcrumb-chevron">/</li>
        <li>
          <NuxtLink v-if="!!breadcrumbRoute?.to" :to="breadcrumbRoute.to">
            {{ breadcrumbRoute?.label }}
          </NuxtLink>
          <span v-else>
            {{ breadcrumbRoute }}
          </span>
        </li>
      </template>
    </ol>
  </nav>
</template>
