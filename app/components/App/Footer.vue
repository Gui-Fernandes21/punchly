<script setup>
const { isDarkTheme } = useLayout();
const curentYear = new Date().getFullYear();
</script>

<template>
  <div class="layout-footer mt-auto">
    <div class="footer-start"></div>
    <div class="footer-right">
      <div>
        <span class="font-playwrite text-gray-400 text-lg inline-flex py-2">Punchly</span>
        <span class="font-readex text-gray-400 text-sm inline-flex pl-1 py-2">&copy; {{ curentYear }} | Developed by FloHaven LLC</span>
      </div>
      <div></div>
    </div>
  </div>
</template>

<style scoped>
.footer-start > .app-name {
  font-family: 'DM Serif Display', serif;
}
</style>
