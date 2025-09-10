<script lang="ts" setup>
import { ref } from 'vue';

const selectedColor = ref('');

const availableColors = ['#4A90E2', '#00A3AD', '#34C759', '#000000', '#6E84A3', '#2F3136', '#F5A623', '#E53935', '#D00280', '#795548', '#8E8E93', '#E5E5EA', '#D87D4A', '#4A00E0', '#0A2540', '#2E7D32', '#14ABB7', '#BB62FF'];

const handleColorSelect = (color: string) => {
  selectedColor.value = color;
};

defineExpose({
  selectedColor,
  handleColorSelect
});
</script>

<template>
  <section>
    <div class="swatch-grid">
      <div v-for="color in availableColors" :key="color" class="swatch" :style="{ backgroundColor: color }" @click="handleColorSelect(color)">
        <div v-if="selectedColor === color" class="checkmark">✓</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  width: 100%;
  margin: 2rem 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 1rem;
}
.swatch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: 0.5rem;
  width: 100%;
  place-items: center;
}

.swatch {
  width: 2rem;
  height: 2rem;
  position: relative;
  border-radius: 4px;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: white;
}

</style>
