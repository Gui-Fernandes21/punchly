<script lang="ts" setup>
import type { DetectedBarcode } from 'nuxt-qrcode';

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'scan:success', data: any): void;
  (e: 'scan:error', error: any): void;
}>();

const props = defineProps<{
  modelValue: boolean;
}>();

const result = ref<string[]>();
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

const handleError = (error: any) => {
  console.error('Scanner error:', error);
  emit('scan:error', error);
};

const handleScanSuccess = (detectedCodes: DetectedBarcode[]) => {
  result.value = detectedCodes.map((code) => {
    return code.rawValue;
  });
  console.log('Scanned data:', result.value);
  emit('scan:success', result.value);
};
</script>

<template>
  <Dialog v-model:visible="visible" pt:root:class="!border-0 !w-[80%]" pt:mask:class="backdrop-blur-md">
    <template #container="{ closeCallback }">
      <div class="flex flex-col justify-center items-center p-8 bg-surface-0 dark:bg-surface-900 rounded">
        <header>
          <h2 class="text-2xl font-bold text-start">Loyalty Card Scanner</h2>
        </header>

        <div class="scanner-canvas font-bold text-2xl block mb-2 mt-6">
          <UtilsQrDetector @scan:success="handleScanSuccess" @scan:error="handleError" />
          <img class="scan-guide" src="/svg/scanner-borders.svg" alt="Borders of the Scanner" />
        </div>

        <p class="my-6">Scan Customer's QR Code</p>

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
.scanner-canvas {
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 400px;
  max-height: 400px;
  background: #000;
  border-radius: 8px;
  position: relative;
  overflow: hidden;

  display: grid;
  place-items: center;
}

.scan-guide {
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  object-fit: cover;
  pointer-events: none;
}
</style>
