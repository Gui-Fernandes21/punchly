<script lang="ts" setup>
addRouteMiddleware('fetch-business', async (to, from) => {});

definePageMeta({
  layout: 'card',
  middleware: [
    async function (to, from) {
      const business = useState<Tables<'business'> | null>('business_data');
      if (business.value) return;

      const client = useSupabaseClient<Database>();
      const user = useSupabaseUser();

      const bizId = to.params.business_id as string;

      console.log(bizId);

      if (!user.value) {
        console.warn('User not logged in, cannot fetch business data.');
        return;
      }

      const { data, error } = (await client.from('business').select('*').eq('id', +bizId).single()) as { data: Tables<'business'> | null; error: Error | null };

      if (error) {
        console.error('Error fetching business data:', error);
        return;
      }

      if (!data) {
        console.warn('No business data found for the user.');
        return;
      }

      business.value = data;
    },
    'load-wallet'
  ]
});

useHead({
  title: 'Your Wallet - Punchly',
  meta: [{ name: 'description', content: 'Manage your wallet and transactions on Punchly' }]
});

const business = useState<Tables<'business'> | null>('business_data');
const wallet = useState<Tables<'wallet'> | null>('wallet_data');

const cardData = ref({
  businessName: business.value?.name || '',
  rewardLabel: business.value?.reward_label || '',
  punches: wallet.value?.punches || 0,
  rewardGoal: business.value?.reward_goal || 10,
  primaryColor: business.value?.primary_color || '#14ABB7'
});

const testAuth = () => {
  console.log(business);
};

const logout = async () => {
  const client = useSupabaseClient<Database>();
  const { error } = await client.auth.signOut();
  if (error) {
    console.error('Error during logout:', error);
    return;
  }
  console.log('Logged out successfully');
  window.location.href = '/client/login';
};
</script>

<template>
  <section class="page-container">
    <header>
      <div class="placeholder">
        <div class="logo">
          <img :src="business?.logo_url || '/images/logo/high-quality_punchly-logo.png'" alt="Logo" />
        </div>
      </div>
    </header>

    <section class="main-content">
      <UIWallet mode="full" :card-data="cardData" />
      <div class="actions">
        <Button @click="testAuth">Show QR Code</Button>
        <Button @click="logout">Logout</Button>
      </div>
    </section>

    <app-footer />
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
