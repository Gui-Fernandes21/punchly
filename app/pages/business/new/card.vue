<script lang="ts" setup>
import { useErrorModal } from '~/composables/ui/useErrorModal';

definePageMeta({
  layout: 'card'
});

useHead({
  title: 'Loyalty Card - Punchly',
  meta: [{ name: 'description', content: 'Customize your loyalty card to continue using Punchly' }]
});

const business = useState<Tables<'business'> | null>('business_data');

const errorModal = useErrorModal();
const toast = useToast();
const router = useRouter();

const rewardLabel = ref(business.value?.reward_label || '');
const rewardCounter = ref<number>(business.value?.reward_goal || 1);
const swatch = ref<string>(business.value?.primary_color || '');

const checkSubmission = (): boolean => {
  let error = false;
  if (rewardLabel.value.trim() === '') error = true;
  if (rewardCounter.value <= 0) error = true;
  if (swatch.value.trim() === '') error = true;
  return !error;
};

const handleSubmit = async () => {
  if (!checkSubmission()) {
    console.error('Form submission error:', {
      rewardLabel: rewardLabel.value,
      rewardCounter: rewardCounter.value,
      swatch: swatch.value
    });
    errorModal.showError({
      header: 'Submission Error',
      message: 'Please ensure all fields are filled out correctly before submitting.'
    });
    return;
  }

  if (!business.value) {
    errorModal.showError({
      header: 'Business Data Error',
      message: 'Business data is not available. Please try again later.'
    });
    return;
  }

  const client = useSupabaseClient<Database>();

  const { error } = await client
  .from('business')
  .update({
    reward_label: rewardLabel.value,
    reward_goal: rewardCounter.value,
    primary_color: swatch.value
  })
  .eq('id', business.value.id)
  .select()
  .single();
  
  if (error) {
    console.error('Database update error:', error);
    errorModal.showError({
      header: 'Database Update Error',
      message: 'There was an error updating the business data. Please try again later.'
    });
    return;
  }

  business.value = {
    ...business.value,
    reward_label: rewardLabel.value,
    reward_goal: rewardCounter.value,
    primary_color: swatch.value
  };

  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Loyalty card customized successfully!',
    life: 3000
  });

  router.push('/business/new/welcome');
};
</script>

<template>
  <section class="card-content">
    <header>
      <div class="placeholder">
        <div class="logo">
          <img src="/images/logo/punchly-logo.png" alt="Logo" />
        </div>
      </div>
      <h1>Customize Loyalty Card</h1>
    </header>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <span>Enter a Reward Label</span>
        <FloatLabel class="mt-2" variant="on">
          <label for="reward-label">e.g., “One Free Drink”</label>
          <InputText size="large" id="reward-label" v-model="rewardLabel" type="text" />
        </FloatLabel>
      </div>

      <div class="form-group">
        <span>Set a Reward Goal</span>
        <div class="reward-container">
          <UIRewardCounter v-model="rewardCounter" />
        </div>
      </div>

      <div class="form-group">
        <span>Select your primary color</span>
        <UISwatch v-model="swatch" />
      </div>

      <Button class="btn-submit" type="submit">Create Account</Button>
    </form>

    <AppFooter class="footer" />
  </section>
</template>

<style scoped>
.reward-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.5rem;
}

.form-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 5px;
  margin: 0.4rem 0;

  text-align: start;

  & > span {
    margin-left: 5px;
    color: #717171;
  }
}

header > h1 {
  font-size: 1.9rem;
  text-align: start;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-family: 'Poppins', sans-serif;
}

.placeholder {
  width: 100%;
  height: 5rem;
}
.logo {
  position: absolute;
  top: -5rem;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  & > img {
    width: 11rem;
  }
}
.card-content {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
  margin-top: 1rem;

  gap: 1rem;

  & > span {
    text-align: start;
    width: 100%;
  }
}

.btn-submit {
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
}

.resend {
  color: var(--primary-color);
  font-weight: 600;
  margin-left: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}

::v-deep(.p-floatlabel),
::v-deep(.p-inputtext) {
  width: 100%;
}

::v-deep(.p-inputtext) {
  padding: 1rem;
  font-size: 1.2rem;
}

footer {
  font-size: 11px;
}
</style>
