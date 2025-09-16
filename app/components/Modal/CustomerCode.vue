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
  <Dialog v-model:visible="visible" pt:root:class="!border-0 !w-[80%]" pt:mask:class="backdrop-blur-md">
    <template #container="{ closeCallback }">
      <div class="flex flex-col justify-center items-center p-8 bg-surface-0 dark:bg-surface-900 rounded">
        <header>
          <h2 class="text-2xl font-bold text-start">Your QR Code</h2>
        </header>

        <div class="code-container font-bold text-2xl block mb-2 mt-6">
          <img class="scan-guide" src="/images/qr-demo.png" alt="Customer QR Code" />
        </div>

        <div class="flex w-full gap-2">
          <Button class="w-full" label="Close" @click="closeCallback"></Button>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
.bg-alternative,
button {
  background-color: #f5853f;
  border: 1px solid #f5853f;
  color: #fff;

  font-size: 1.1rem;
  padding: 1rem;
}
header {
  width: 100%;
  text-align: start;
  font-family: 'Poppins', sans-serif;
}
.code-container {
  width: 100%;

  display: grid;
  place-items: center;
}
</style>
