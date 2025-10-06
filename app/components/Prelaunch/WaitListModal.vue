<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const props = defineProps<{
  modelValue: boolean;
}>();

const visible = ref<boolean>(props.modelValue);

const email = ref<string>('');
const bizName = ref<string>('');
const selectedOption = ref<string | null>(null);

const options = ref([
  { label: 'Customer', value: 'personal' },
  { label: 'Business', value: 'business' }
]);

const resolver = ref(
  zodResolver(
    z.object({
      email: z.string({ message: 'Invalid email address.' }).nonempty({ message: 'Email is required and cannot be empty.' }).email({ message: 'Invalid email address.' }),
      bizName: z.string({ message: 'Business Name is required and cannot be empty.' }).nonempty({ message: 'Business Name is required and cannot be empty.' }).min(3, { message: 'Business Name must be at least 3 characters long.' }),
      selectedOption: z.object({ label: z.string(), value: z.string() }).nullable().refine((val) => val !== null, { message: 'Please select an option.' })
    })
  )
);

const handleSubmit = () => {
  // Handle form submission logic here
  console.log('Email:', email.value);
  console.log('Selected Option:', selectedOption.value);
  // Close the modal after submission
  visible.value = false;
};

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
  <Dialog v-model:visible="visible" modal closable pt:root:class="relative !border-0 !w-[85%]" pt:mask:class="backdrop-blur-md">
    <template #header>
      <h1 class="text-2xl font-bold">Join the Waitlist</h1>
    </template>

    <section>
      <h3 class="text-lg text-gray-600">Be the first to know when we launch!</h3>
      <Form v-slot="$form" @submit.prevent="handleSubmit" :resolver="resolver" class="flex flex-col gap-4 mt-8">
        <div class="form-group">
          <label for="bizName">Business Name:</label>
          <InputText name="bizName" type="text" v-model.trim="bizName" />
          <Message v-if="$form.bizName?.invalid" severity="error" size="small" variant="simple">{{ $form.bizName.error?.message }}</Message>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <InputText name="email" type="email" placeholder="example@domain.com" v-model.trim="email" />
          <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
        </div>
        <div class="form-group">
          <label for="custom">I am a:</label>
          <SelectButton v-model="selectedOption" name="selectedOption" :invalid="$form.selectedOption?.invalid" :options="options" optionLabel="label" dataKey="value" aria-labelledby="custom">
            <template #option="slotProps">
              <span>{{ slotProps.option.label }}</span>
            </template>
          </SelectButton>
          <Message v-if="$form.selectedOption?.invalid" severity="error" size="small" variant="simple">{{ $form.selectedOption.error?.message }}</Message>
        </div>
        <Button type="submit" @click="true">Join</Button>
      </Form>
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
