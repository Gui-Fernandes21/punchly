<script lang="ts" setup>
import { useErrorModal } from '~/composables/ui/useErrorModal';

definePageMeta({
  layout: 'card'
});

useHead({
  title: 'Check Your Email - Punchly',
  meta: [{ name: 'description', content: 'Check your email for the verification link.' }]
});

const { showError } = useErrorModal();
const route = useRoute();

onMounted(async () => {
  if (!route.query.code) return;
  if (route.query.error_description) {
    showError({ message: route.query.error_description as string });
    return;
  }
  if (route.query.error) {
    showError({ message: route.query.error as string });
    return;
  }

  const email = route.query.email as string;
  const type = route.query.type as any;
  const code = route.query.code as string | undefined;

  try {
    const result = await $fetch('/api/auth/register-client', {
      method: 'post',
      body: { email, type, code }
    });
    console.log('Success:', result);
    navigateTo('/client/wallet');
  } catch (error) {
    window.history.replaceState({}, '', '/');
    console.error('Error during code exchange:', error);
    showError({ message: 'Failed to verify email. Please try logging in again.' });
  }
});
</script>

<template>
  <section>
    <header>
      <div class="placeholder">
        <div class="logo">
          <img src="/images/logo/high-quality_punchly-logo.png" alt="Logo" />
        </div>
      </div>
      <h1>Check Your Email</h1>
    </header>

    <div class="container">
      <p>Please check your email for the verification link.</p>
    </div>

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

.container {
  text-align: center;
  margin: 2rem 0;

  font-size: 18px;
  color: var(--text-gray-400);
}

.footer {
  margin-top: 0;
}
</style>
