<script setup lang="ts">
import type { DetectedBarcode } from 'nuxt-qrcode';

const emit = defineEmits<{
  (e: 'scan:success', data: any): void;
  (e: 'scan:error', error: any): void;
}>();

const result = ref<string[]>();
const state = reactive({
  errorMsg: '',
  error: false
});

function onDetect(detectedCodes: DetectedBarcode[]) {
  result.value = detectedCodes.map((code) => {
    console.log(code.rawValue);

    return code.rawValue;
  });

  emit('scan:success', result.value[0]);
}

function onError(err: Error) {
  state.error = true;
  state.errorMsg = `[${err.name}]: ${err.message}`;
}
</script>

<template>
  <div v-if="!state.error">
    <QrcodeStream @error="onError" @detect="onDetect" />
  </div>
  <div v-else>
    <h3>
      {{ state.errorMsg }}
    </h3>
    <button @click="state.error = false">reset</button>
  </div>
</template>

<style scoped>
div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>