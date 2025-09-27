<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const props = defineProps<{
  modelValue: boolean;
}>();

const business = useState<Tables<'business'> | null>('business_data');

const visible = ref<boolean>(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    visible.value = newVal;
  },
  { immediate: true }
);

watch(
  () => visible.value,
  (newVal) => {
    if (newVal !== props.modelValue) {
      emit('update:modelValue', newVal);
    }
  },
  { immediate: true }
);
</script>

<template>
  <Dialog v-model:visible="visible" :closable="true" pt:root:class="!border-0 !w-[80%]" pt:mask:class="backdrop-blur-md">
    <template #container="{ closeCallback }">
      <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded">
        <header class="flex justify-between w-full mb-4">
          <h2 class="text-2xl text-start">Reward Claimed!</h2>
          <Icon @click="closeCallback" name="gg:close" size="2rem" />
        </header>

        <section class="main-section font-bold text-2xl block mb-2 mt-6 text-center">
          <img src="/svg/party-popper-3D.svg" alt="Party Popper" class="w-32 h-32 mb-4" />
          <p class="text-sm mt-2">You have successfully claimed (a):</p>
          <span
            >"<strong>{{ business?.reward_label }}</strong
            >"</span
          >
          <p class="text-sm mt-1">Don't forget to add it to the customer's order!</p>
        </section>

        <section class="actions">
          <Button class="w-full" @click="closeCallback" label="Close" />
        </section>
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
.actions {
  width: 100%;
}
.main-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
