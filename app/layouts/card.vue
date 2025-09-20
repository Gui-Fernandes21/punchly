<template>
  <div class="layout-container">
    <div class="layout-card mt-4">
      <NuxtPage></NuxtPage>
    </div>
    <Toast position="bottom-right" />

    <ConfirmDialog style="width: 80% !important" />
  </div>
</template>

<style scoped>
.layout-container {
  background-color: #f1f1f1;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.layout-card {
  position: relative;
  width: 30%;
  height: fit-content;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;

  box-shadow: 0px 0px 15px #0785906d;
}

@media (max-width: 768px) {
  .layout-card {
    width: 90vw;
    height: fit-content;
    padding: 12px;
  }
}
</style>
