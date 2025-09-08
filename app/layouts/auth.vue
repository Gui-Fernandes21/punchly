<script setup>

</script>

<template>
  <div class="layout-container" >
    <div class="layout-card">
      <NuxtPage></NuxtPage>
    </div>
    <Toast position="bottom-right" />
  </div>
</template>

<style scoped>
.layout-container {
  background-color: #F1F1F1;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.layout-card {
  position: relative;
  width: 90vw;
  height: 80vh;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;

  box-shadow: 0px 0px 15px #078490;
}

</style>