<script setup lang="ts">
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

watch(
  () => visible.value,
  (newVal) => {
    if (newVal !== props.modelValue) {
      emit('update:modelValue', newVal);
    }
  }
);
</script>

<template>
  <Dialog v-model:visible="visible" modal :closable="false" pt:root:class="relative !border-0 !w-[90%] rounded-2xl py-6 shadow-xl xl:max-w-[500px]" pt:mask:class="backdrop-blur-md">
    <section class="text-center px-2">
      <!-- Success Icon -->
      <!-- <div class="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center">
        <Icon name="logos:partytown-icon" class="text-white text-[5rem]" />
      </div> -->

      <!-- Main Success Message -->
      <h1 class="text-3xl font-bold mb-4" style="color: #14abb7">You're In! 🎉</h1>

      <h2 class="text-xl text-gray-800 mb-6 leading-relaxed">Welcome to the Punchly family!</h2>

      <!-- What Happens Next -->
      <div class="bg-gray-50 rounded-xl p-6 mb-6 text-left">
        <h3 class="font-semibold text-lg mb-4 flex items-center gap-2">
          <Icon name="material-symbols:schedule" style="color: #14abb7" />
          What happens next?
        </h3>
        <ul class="space-y-3 text-gray-700">
          <li class="flex items-start gap-3">
            <div class="w-2 h-2 rounded-full mt-2 flex-shrink-0" style="background-color: #14abb7"></div>
            <span>You'll be the <strong>first to know</strong> when we launch</span>
          </li>
          <li class="flex items-start gap-3">
            <div class="w-2 h-2 rounded-full mt-2 flex-shrink-0" style="background-color: #14abb7"></div>
            <span>Get <strong>exclusive early access</strong> to Punchly features</span>
          </li>
          <li class="flex items-start gap-3">
            <div class="w-2 h-2 rounded-full mt-2 flex-shrink-0" style="background-color: #14abb7"></div>
            <span>Receive <strong>special launch discounts</strong> and offers</span>
          </li>
        </ul>
      </div>

      <!-- Social Sharing Encouragement -->
      <div class="border-t border-gray-200 pt-6">
        <p class="text-gray-600 mb-4">Help us spread the word! Share Punchly with other business owners who could benefit from digital loyalty programs.</p>

        <div class="flex gap-3 justify-center mb-6">
          <UIShareButton />
        </div>
      </div>

      <!-- Thank You Message -->
      <p class="text-sm text-gray-500 leading-relaxed">Thank you for believing in our vision to make loyalty programs simple and effective for every business. We can't wait to show you what we've been building!</p>

      <!-- Close Button -->
      <div class="mt-6">
        <Button label="Got it, thanks!" @click="visible = false" class="w-full py-3 text-white font-semibold" style="background-color: #14abb7; border-color: #14abb7" />
      </div>
    </section>
  </Dialog>
</template>

<style scoped>
.logo {
  position: absolute;
  background: white;
  border-radius: 50%;
  top: -1rem;
  left: 50%;
  transform: translate(-50%, -50%);
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 1rem;
}
button {
  margin-top: auto !important;
}
</style>
