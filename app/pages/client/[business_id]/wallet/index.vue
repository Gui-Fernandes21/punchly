<script lang="ts" setup>
definePageMeta({
  layout: 'full-page',
  middleware: [
    async function (to, from) {
      const business = useState<Tables<'business'> | null>('business_data');
      if (business.value) return;

      const client = useSupabaseClient<Database>();
      const user = useSupabaseUser();

      const bizId = to.params.business_id as string;

      if (!user.value) {
        console.warn('User not logged in, cannot fetch business data.');
        return;
      }

      const { data, error } = await client.from('business').select('*').eq('id', +bizId).single();

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

const qrModal = ref(false);

const walletQrCodeString = computed(() => {
  const walletId = wallet.value?.id;
  if (!walletId) {
    console.error('No wallet ID available to generate QR code.');
    return;
  }
  return `wallet::id=${walletId}&userId=${wallet.value?.client_id}`;
});

const openQrModal = () => {
  if (!walletQrCodeString.value) {
    console.error('Cannot open QR modal without a valid QR code string.');
    return;
  }
  qrModal.value = true;
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

const items = ref([
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    command: () => {
      navigateTo('/client/dashboard');
    }
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: () => {
      logout();
    } 
  }
]);
</script>

<template>
  <section class="page-container">
    <nav class="w-full">
      <Menubar :model="items">
        <template #item="{ item, props, hasSubmenu, root }">
          <a v-ripple class="flex items-center" v-bind="props.action">
            <span>{{ item.label }}</span>
            <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
            <i v-if="hasSubmenu" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
          </a>
        </template>
        <template #end>
          <div class="flex items-center gap-2">
            <div class="logo">
              <img :src="business?.logo_url || '/images/logo/high-quality_punchly-logo.png'" alt="Logo" />
            </div>
          </div>
        </template>
      </Menubar>
    </nav>

    <section class="card">
      <header>
        <!-- <div class="placeholder">
          <div class="logo">
            <img :src="business?.logo_url || '/images/logo/high-quality_punchly-logo.png'" alt="Logo" />
          </div>
        </div> -->
      </header>

      <section class="card_main-content">
        <UIWallet mode="full" :card-data="cardData" />
        <div class="actions">
          <Button class="primary" :style="{ backgroundColor: business?.primary_color || '#14ABB7' }" @click="openQrModal"> <Icon name="material-symbols:qr-code" size="1.5rem"/> Present QR Code</Button>
          <div class="secondary flex gap-2 ">
            <Button severity="secondary" @click="navigateTo('client/dashboard')">See All Cards</Button>
            <Button severity="secondary" outlined @click="logout">Logout</Button>
          </div>
        </div>
        <ModalCustomerCode v-model="qrModal" :qr-data="walletQrCodeString || ''" />
      </section>
    </section>

    <app-footer class="mt-4" />
  </section>
</template>

<style scoped>
.card {
  width: 90%;
  max-width: 40rem;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
}
.placeholder {
  width: 100%;
  height: 5rem;
}
.logo {
  /* position: absolute;
  top: -5rem; */
  /* left: 50%; */
  /* transform: translateX(-50%); */
  background: #fff;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  & > img {
    width: 11rem;
  }
}
.navigation {
  position: absolute;
  top: 1rem;
  left: 1rem;
}
.card_main-content {
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
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
header > h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-family: 'Poppins', sans-serif;
}
.actions .primary {
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
}

::v-deep(.p-floatlabel),
::v-deep(.p-inputtext) {
  width: 100%;
}

::v-deep(.p-inputtext) {
  padding: 1rem;
  font-size: 1.2rem;
}

::v-deep(.layout-footer) {
  margin-top: 0 !important;
}
</style>
