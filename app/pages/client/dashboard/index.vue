<script lang="ts" setup>
definePageMeta({
  layout: 'default'
});

useHead({
  title: 'Your Wallet - Punchly',
  meta: [{ name: 'description', content: 'Manage your wallet and transactions on Punchly' }]
});


const testAuth = () => {
  const session = useSupabaseSession();
  const user = useSupabaseUser();
  console.log('Session:', session.value);
  console.log('User:', user.value);
}

const logout = async () => {
  const client = useSupabaseClient<Database>();
  const { error } = await client.auth.signOut();
  if (error) {
    console.error('Error during logout:', error);
    return;
  }
  console.log('Logged out successfully');
  window.location.href = '/client/login';
}
</script>

<template>
  <section class="page-container">

    <section class="main-content">
      <!-- <UIWallet mode="full" /> -->
      <div class="actions">
        <Button @click="testAuth">Show QR Code</Button>
        <Button @click="logout">Logout</Button>
      </div>
    </section>

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
footer {
  margin-top: 1rem;
}
.main-content {
  width: 100%;
  height: 100%;
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
}
.actions {
  width: 100%;
  margin-top: 1rem;
}
.page-container {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
header > h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-family: 'Poppins', sans-serif;
}
button {
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
  font-size: 1.1rem;
}

::v-deep(.p-floatlabel),
::v-deep(.p-inputtext) {
  width: 100%;
}

::v-deep(.p-inputtext) {
  padding: 1rem;
  font-size: 1.2rem;
}
</style>
