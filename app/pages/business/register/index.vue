<script lang="ts" setup>
import { useErrorModal } from '~/composables/ui/useErrorModal';

const { showError } = useErrorModal();

definePageMeta({
  layout: 'card'
});

useHead({
  title: 'Register - Punchly',
  meta: [{ name: 'description', content: 'Register for Punchly' }]
});

const email = ref('');
const password = ref('');

const handleSubmit = async () => {
  // Handle form submission logic here
  console.log('Email:', email.value);
  console.log('Password:', password.value);

  const result = await useFetch('/api/auth/register', {
    method: 'POST',
    body: {
      email: email.value,
      password: password.value
    }
  });

  if (result.error.value) {
    console.error('Error:', result.error.value);
    showError({ header: 'Error', message: result.error.value.data?.message || 'An error occurred during registration.' });
    return;
  } else {
    console.log('Success:', result.data.value);
    const router = useRouter();
    router.push('/business/dashboard');
  }
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
      <h1>Welcome To Punchly</h1>
      <p>Enter your email and password to turn one-time visitors into regulars!</p>
    </header>

    <form @submit.prevent="handleSubmit">
      <FloatLabel variant="on">
        <InputText size="large" id="email" v-model="email" type="email" />
        <label for="email">Email Address</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <InputText size="large" id="password" v-model="password" type="password" />
        <label for="password">Password</label>
      </FloatLabel>
      <Button type="submit">Get Started</Button>
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
