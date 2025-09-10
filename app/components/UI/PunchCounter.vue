<script lang="ts" setup>
import { ref } from 'vue';

const counter = ref(0);

defineExpose({
  counter
});
</script>

<template>
  <section>
    <div class="sub-action" @click="counter--">-</div>
    <div class="counter">{{ counter }}</div>
    <div class="add-action" @click="counter++">+</div>
  </section>
</template>

<style scoped>
.counter {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

.sub-action,
.add-action {
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.sub-action:hover,
.add-action:hover {
  background-color: #f0f0f0;
}
</style>