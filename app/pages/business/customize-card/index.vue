<script lang="ts" setup>
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
const toast = useToast();

useHead({
  title: 'Print Store QR Code - Punchly',
  meta: [{ name: 'description', content: 'Print the QR code for your store on Punchly' }]
});

const initialValues = ref({
  rewardLabel: '',
  email: '',
  subject: ''
});

const resolver = ref(
  zodResolver(
    z.object({
      rewardLabel: z.string().min(1, { message: 'Reward Label is required.' }),
      email: z.string().email({ message: 'Email is invalid.' }),
      subject: z.string().min(1, { message: 'Subject is required.' })
    })
  )
);
const onFormSubmit = ({ valid }: { valid: boolean }) => {
  if (valid) {
    toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
  }
};
</script>

<template>
  <section>
    <div class="scanner-container">
      <header>
        <h1>Customize Loyalty Card</h1>
        <!-- <p>If you have any questions or need assistance, feel free to reach out!</p> -->
      </header>

      <Form v-slot="$form" class="form flex flex-col gap-4" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit">
        <div class="form-group">
          <header>
            <h2>Reward Description</h2>
          </header>
          <FloatLabel class="flex flex-col gap-1" variant="in">
            <label for="reward-label" class="text-lg">e.g., “One Free Drink”</label>
            <InputText name="reward-label" style="resize: none" />
            <Message v-if="$form['reward-label']?.invalid" severity="error" size="small" variant="simple">{{ $form['reward-label'].error?.message }}</Message>
          </FloatLabel>
        </div>

        <div class="form-group">
          <header>
            <h2>Reward Goal</h2>
            <p>Number of punches required for reward.</p>
          </header>
          <Divider class="my-2" />
          <UIRewardCounter />
        </div>

        <div class="form-group">
          <header>
            <h2>Select a primary color</h2>
          </header>
          <UISwatch />
        </div>

        
        <Button type="submit" severity="primary" label="Save Changes" />
      </Form>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
header > h1 {
  font-size: 24px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}
header > p {
  font-size: 12px;
  color: #777777;
  font-weight: 400;
  font-family: 'Open Sans', sans-serif;
}
.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #00000020;

  z-index: -1;
}
.form {
  position: relative;
  z-index: 2;

  width: 100%;
  margin: 1rem 0;

  text-align: center;

  font-size: 1.6rem;
  font-weight: 600;
}
.form-group {
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  
  text-align: left;

  & > header > h2 {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
}
button {
  padding: 1rem;
  font-size: 1.1rem;
}
.link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin: 10px;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  color: var(--text-color);

  font-size: 16px;
  font-weight: 400;
  cursor: pointer;

  transition: background-color 0.2s;

  &:hover {
    background-color: #f9f9f9;
  }
}
</style>
