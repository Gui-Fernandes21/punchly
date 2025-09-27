<script lang="ts" setup>
import { useErrorModal } from '~/composables/ui/useErrorModal';

definePageMeta({
  layout: 'card'
});

useHead({
  title: 'Login - Punchly',
  meta: [{ name: 'description', content: 'Login to Punchly' }]
});

const { showError } = useErrorModal();
const route = useRoute();
const supabase = useSupabaseClient<Database>();
const business = useState<Tables<'business'> | null>('business_data');

const email = ref('');
const logoUrl = computed<string>(() => business.value?.logo_url || '/images/logo/high-quality_punchly-logo.png');
const headerCopy = computed<string>(() => business.value ? `${business.value.name} Rewards` : 'Welcome To Punchly');


const handleSubmit = () => {
  if (!email.value) {
    showError({ message: 'Please enter a valid email address.' });
    return;
  }

  const bizId = route.query.bizId as string;
  const config = useRuntimeConfig();

  supabase.auth.signInWithOtp({ email: email.value, options: { emailRedirectTo: `${config.public.appUrl}/client/check-email?=${bizId ? 'bizId=' + bizId : ''}` } }).then(({ error }) => {
    if (error) {
      console.error('Error sending OTP:', error);
      showError({ message: 'Failed to send OTP. Please try again.' });
      return;
    }

    navigateTo('/client/confirm-email');
  });
};

const fetchBusiness = async (): Promise<Tables<'business'> | null> => {
  if (!route.query.bizId) return null;
  const business = useState<Tables<'business'> | null>('business_data');

  if (business.value) return business.value;

  const { data } = await supabase.from('business').select('*').eq('id', +route.query.bizId).single();
  
  return data || null;
};

onMounted(async () => {
  if (route.query.bizId && !business.value) {
    business.value = await fetchBusiness();
  }
});
</script>

<template>
  <section>
    <header>
      <div class="placeholder">
        <div class="logo">
          <img :src="logoUrl" alt="Logo" />
        </div>
      </div>
      <h1>{{ headerCopy }}</h1>
      <p>Enter your email address to start earning rewards!</p>
    </header>

    <form @submit.prevent="handleSubmit">
      <FloatLabel variant="on">
        <InputText size="large" id="email" v-model="email" type="email" />
        <label for="email">Email Address</label>
      </FloatLabel>
      <Button type="submit" :style="{ backgroundColor: business?.primary_color || '#14ABB7', color: '#fff' }">Get Started</Button>
    </form>

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
header {
  margin-bottom: 1rem;
}
header > h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-family: 'Poppins', sans-serif;
}
section {
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
  width: 100%;

  gap: 1rem;

  margin-top: 1rem;
}

button {
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
}

.footer {
  margin-top: 0;
}

::v-deep(.p-floatlabel),
::v-deep(.p-inputtext) {
  width: 100%;
}

::v-deep(.p-inputtext) {
  padding: 1.5rem 1rem;
  font-size: 1.2rem;
}
</style>
