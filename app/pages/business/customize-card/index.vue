<script lang="ts" setup>
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';

useHead({
  title: 'Print Store QR Code - Punchly',
  meta: [{ name: 'description', content: 'Print the QR code for your store on Punchly' }]
});

const business = useState<Tables<'business'> | null>('business_data');
const toast = useToast();

const initialValues = ref({
  businessName: business.value?.name || 'Your Business Name',
  rewardLabel: business.value?.reward_label || '',
  punches: 4,
  rewardGoal: business.value?.reward_goal || 1,
  primaryColor: business.value?.primary_color || ''
});

const resolver = ref(
  zodResolver(
    z.object({
      rewardLabel: z.string().nonempty({ message: 'Reward Label is required and cannot be empty.' }).min(2, { message: 'Reward Label must be at least 2 characters long.' }),
    })
  )
);

const onFormSubmit = async ({ valid }: { valid: boolean }) => {
  if (!valid) {
    toast.add({ severity: 'error', summary: 'Form is invalid.', life: 3000 });
    return;
  }
  
  if(!business.value) {
    toast.add({ severity: 'error', summary: 'Business data is not available.', life: 3000 });
    return;
  }

  const client = useSupabaseClient<Database>();
  const router = useRouter();

  const { data, error } = await client.from('business').update({
    reward_label: initialValues.value.rewardLabel,
    reward_goal: initialValues.value.rewardGoal,
    primary_color: initialValues.value.primaryColor
  }).eq('id', business.value?.id).select().single();

  if (error) {
    console.error('Error updating business data:', error);
    toast.add({ severity: 'error', summary: 'Error saving changes. Please try again.', life: 3000 });
    return;
  }

  business.value = data;
  toast.add({ severity: 'success', summary: 'Changes saved successfully!', life: 3000 });
  router.push('/business/dashboard');
  

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
            <h2>Preview Loyalty Card</h2>
          </header>
          <Divider class="my-4" />
          <UIWallet mode="full" :cardData="initialValues" />
        </div>

        <div class="form-group">
          <header>
            <h2>Reward Description</h2>
          </header>
          <FloatLabel class="flex flex-col gap-1" variant="on">
            <label for="rewardLabel" class="text-lg">e.g., “One Free Drink”</label>
            <InputText v-model="initialValues.rewardLabel" name="rewardLabel" size="large"  />
            <Message v-if="$form.rewardLabel?.invalid" severity="error" size="small" variant="simple">{{ $form.rewardLabel.error?.message }}</Message>
          </FloatLabel>
        </div>

        <div class="form-group">
          <header>
            <h2 class="!mb-0">Reward Goal</h2>
            <p>Number of punches required for reward.</p>
          </header>
          <Divider class="my-4" />
          <UIRewardCounter v-model="initialValues.rewardGoal" />
          <Message v-if="$form.rewardGoal?.invalid" severity="error" size="small" variant="simple">{{ $form.rewardGoal?.error?.message }}</Message>
        </div>

        <div class="form-group">
          <header>
            <h2>Select a primary color</h2>
          </header>
          <UISwatch v-model="initialValues.primaryColor" />
          <Message v-if="$form.primaryColor?.invalid" severity="error" size="small" variant="simple">{{ $form.primaryColor.error?.message }}</Message>
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
    font-size: 18px;
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
