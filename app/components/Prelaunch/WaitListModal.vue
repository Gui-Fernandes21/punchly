<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { useErrorModal } from '~/composables/ui/useErrorModal';

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'success', value: boolean): void;
}>();

const props = defineProps<{
  modelValue: boolean;
}>();

const { showError } = useErrorModal();

const visible = ref<boolean>(props.modelValue);

const email = ref<string>('');
const bizName = ref<string>('');
const selectedOption = ref<{ label: string; value: 'business' | 'customer' } | null>(null);

const options = ref([
  { label: 'Customer', value: 'customer' },
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

const handleSubmit = async () => {
  const supabase = useSupabaseClient<Database>();

  const { error } = await supabase.from('prelaunch_email').insert([
    {
      email: email.value,
      name: bizName.value,
      role: selectedOption.value?.value || 'customer'
    }
  ]);

  if (error) {
    console.error('Error inserting data:', error);
    showError({ message: 'An error occurred while submitting the form. Please try again later.' });
    return;
  }

  console.log('Data inserted successfully');

  visible.value = false;
  emit('success', true);
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
  <Dialog v-model:visible="visible" modal closable pt:root:class="relative !border-0 !w-[90%] rounded-2xl py-4 shadow-xl xl:max-w-[600px]" pt:mask:class="backdrop-blur-md">
    <template #header>
      <h1 class="text-2xl font-bold">Join the Waitlist</h1>
    </template>

    <section>
      <h3 class="text-lg text-gray-600">Be the first to know when we launch!</h3>
      <Form v-slot="$form" @submit="handleSubmit" :resolver="resolver" class="flex flex-col gap-4 mt-8">
        <div class="form-group">
          <label for="bizName">Name:</label>
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
