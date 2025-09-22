<script lang="ts" setup>
import { useErrorModal } from '~/composables/ui/useErrorModal';

definePageMeta({
  layout: 'card'
});

useHead({
  title: 'Welcome - Punchly',
  meta: [{ name: 'description', content: 'Welcome to Punchly' }]
});

const router = useRouter();
const errorModal = useErrorModal();

const handleGoToDashboard = async () => {
  const client = useSupabaseClient<Database>();
  const business = useState<Tables<'business'> | null>('business_data');

  if (!business.value) {
    errorModal.showError({
      header: 'Business Data Error',
      message: 'Business data is not available. Please try again later.'
    });
    return;
  }

  const { error } = await client.from('business').update({ onboarded_at: new Date().toISOString() }).eq('id', business.value.id);

  if (error) {
    console.error('Error updating business data:', error);
    errorModal.showError({
      header: 'Update Error',
      message: 'There was an issue updating your business data. Please try again.'
    });
    return;
  }

  router.push('/business/dashboard');
};
</script>

<template>
  <section>
    <header>
      <div class="placeholder">
        <div class="logo">
          <img src="/images/logo/high-quality_punchly-logo.png" alt="Logo" />
        </div>
      </div>
      <h1>Welcome To Punchly!</h1>
    </header>

    <section class="main-content">
      <div class="text-container">
        <p>Thank you for choosing to partner with us.</p>
        <p>Your business is now part of the Punchly network, making it easier than ever to reward customers and keep them coming back.</p>

        <Divider style="width: 40%" />

        <p>Log in to your dashboard to set up your rewards and start engaging customers today.</p>
        <p>— The Punchly Team</p>
      </div>

      <Button @click="handleGoToDashboard">Go to Dashboard</Button>
    </section>

    <AppFooter class="footer" />
  </section>
</template>

<style scoped>
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

header > h1 {
  font-size: 1.9rem;
  text-align: start;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-family: 'Poppins', sans-serif;
}

.main-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 2rem;
  padding: 0 1rem;
}

section {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
}

.text-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 1rem 0;
  text-align: center;

  gap: 2rem;
}

.footer {
  font-size: 11px;
}

button {
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
}
</style>
