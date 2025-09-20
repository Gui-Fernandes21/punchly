<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  }
});

const counter = ref(props.modelValue);

const handleIncrement = () => {
  counter.value++;
};

const handleDecrement = () => {
  if (counter.value > 0) {
    counter.value--;
  }
};

defineExpose({
  counter,
});
</script>

<template>
  <section class="counter-container">
    <div class="sub-action" @click="handleDecrement">-</div>
    <div class="counter">{{ counter }}</div>
    <div class="add-action" @click="handleIncrement">+</div>
  </section>
</template>

<style scoped>
.counter-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.counter {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;

  padding: 0.5rem 1rem;

  border: 1px solid #ccc;
  border-radius: 6px;
}

.sub-action,
.add-action {
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  font-size: 1.5rem;
  user-select: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: #14ABB7;
  transition: background-color 0.3s;
}

.sub-action:hover,
.add-action:hover {
  background-color: #17c4d0;
}
</style>