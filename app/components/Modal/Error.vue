<script lang="ts" setup>
import { useErrorModal } from '~/composables/ui/useErrorModal';

const { errorModalVisible, message, hide } = useErrorModal();
</script>

<template>
  <Teleport to="body">
    <Dialog v-model:visible="errorModalVisible" pt:root:class="!border-0 !w-[80%]" pt:mask:class="backdrop-blur-md">
      <template #container="{ closeCallback }">
        <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded">
          <div class="rounded-full bg-alternative text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20">
            <i class="pi pi-exclamation-triangle !text-4xl"></i>
          </div>
          <span class="font-bold text-2xl block mb-2 mt-6">{{ message.header }}</span>
          <p class="mb-0">{{ message.message }}</p>
          <div class="flex w-full gap-2 mt-6">
            <Button class="w-full" label="Close" @click="hide"></Button>
          </div>
        </div>
      </template>
    </Dialog>
  </Teleport>
</template>

<style scoped>
.bg-alternative,
button {
  background-color: #f5853f;
  border: 1px solid #f5853f;
  color: #fff;
}
</style>
