<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const props = defineProps<{
  modelValue: boolean;
}>();

const visible = ref<boolean>(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    visible.value = newVal;
  }
);

watch(visible, (newVal) => {
  if (newVal !== props.modelValue) {
    emit('update:modelValue', newVal);
  }
});
</script>

<template>
  <Dialog v-model:visible="visible" :closable="true" pt:root:class="!border-0 !w-[80%]" pt:mask:class="backdrop-blur-md">
    <template #container="{ closeCallback }">
      <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded">
        <header class="flex justify-between w-full mb-4">
          <h2 class="text-2xl text-start">Customer's Card</h2>
          <Icon @click="closeCallback" name="gg:close" size="2rem" />
        </header>

        <section class="scanner-canvas font-bold text-2xl block mb-2 mt-6">
          <UIWallet mode="compact" />
        </section>

        <section class="actions">
          <Button class="w-full" severity="secondary" @click="closeCallback">
            <Icon name="gg:math-minus" size="1.7rem" />
            Punch
          </Button>
          <Button class="w-full" @click="closeCallback">
            <Icon name="gg:math-plus" size="1.7rem" />
            Punch
          </Button>
          <Button class="claim-btn w-full" disabled label="Claim Reward" @click="closeCallback"></Button>
        </section>
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
button {
  font-size: 1.1rem;
  padding: 1rem;
}

.scanner-canvas {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  position: relative;
}

.actions {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.claim-btn {
  grid-column: span 2;
  background-color: #ffd700;
  border: 1px solid #ffd700;

  &:disabled {
    background: #ffe866;
    color: #444444;
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
