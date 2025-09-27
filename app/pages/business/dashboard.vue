<script lang="ts" setup>
useHead({
  title: 'Dashboard - Punchly',
  meta: [{ name: 'description', content: 'Your business operations dashboard on Punchly' }]
});

definePageMeta({
  middleware: ['new']
});

// COMPOSABLES
const business = useState<Tables<'business'> | null>('business_data');
const customerWallet = useState<Tables<'wallet'> | null>('customer_wallet');
const client = useSupabaseClient<Database>();

// STATE
const scannerOpen = ref(false);
const modalCustomerCardOpen = ref(false);
const activeWalletsCount = ref(0);
const stampsTodayCount = ref(0);
const rewardsClaimedCount = ref(0);

// COMPUTED
const walletData = computed(() => {
  const data = {
    businessName: business.value?.name || '',
    rewardLabel: business.value?.reward_label || '',
    punches: customerWallet.value?.punches || 0,
    rewardGoal: business.value?.reward_goal || 10,
    primaryColor: business.value?.primary_color || '#14ABB7'
  };
  return data;
});

// METHODS
function handleOpenScanner() {
  scannerOpen.value = !scannerOpen.value;
}

const handleScanSuccess = async (data: string) => {
  console.log('Scan successful:', data);
  if (!data) {
    console.error('Invalid scan data:', data);
    return;
  }

  if (!business.value) {
    console.error('No business context available for scanning.');
    return;
  }

  /**
   * EXAMPLE DATA STRING EXPECTED
   * wallet::id=50&userId=1
   */

  const splitString = data.split('::');
  if (!splitString || !splitString[0] || splitString[0].trim() !== 'wallet') {
    console.error('Invalid scan code:', splitString[0]);
    return;
  }

  const [walletId, userId] = splitString[1]?.split('&').map((part) => part.split('=')[1]) || [];

  if (!walletId || !userId) {
    console.error('Invalid wallet or user ID:', walletId, userId);
    return;
  }

  const { data: walletData, error } = await client.from('wallet').select('*').eq('id', +walletId).eq('client_id', +userId).eq('business_id', +business.value?.id).single();

  if (error) {
    console.error('Error fetching wallet data:', error);
    return;
  }

  if (!walletData) {
    console.error('No wallet data found for the scanned code.');
    return;
  }

  if (!walletData.punches || walletData.punches < 0) {
    console.error('Wallet has invalid punches:', walletData.punches);
    return;
  }

  const updateResult = await client.from('wallet').update({ last_scan_at: new Date().toISOString() }).eq('id', walletData.id);
  const eventResult = await client.from('events').insert({
    type: 'scan',
    wallet_id: walletData.id,
    delta: 0
  });

  if (updateResult.error) {
    console.error('Failed to update last scan time:', updateResult.error);
  } else {
    console.log('Last scan time updated successfully.');
  }

  if (eventResult.error) {
    console.error('Failed to log scan event:', eventResult.error);
  } else {
    console.log('Scan event logged successfully.');
  }

  console.log('Fetched wallet data:', walletData);

  useState<Tables<'wallet'> | null>('customer_wallet', () => walletData);
  scannerOpen.value = false;
  modalCustomerCardOpen.value = true;
};

const loadBusinessMetrics = async () => {
  if (!business.value) return;

  const activeWallets = await client.from('wallet').select('id', { count: 'exact' }).eq('business_id', business.value.id);
  const stampsToday = await client.from('events').select('id, wallet (business_id)', { count: 'exact' }).eq('wallet.business_id', business.value.id).eq('type', 'add').gte('created_at', new Date(new Date().setHours(0, 0, 0, 0)).toISOString());
  const rewardsClaimed = await client.from('events').select('id, wallet (business_id)', { count: 'exact' }).eq('wallet.business_id', business.value.id).eq('type', 'redeem');

  console.log(stampsToday);
  

  activeWalletsCount.value = activeWallets.count || 0;
  stampsTodayCount.value = stampsToday.count || 0;
  rewardsClaimedCount.value = rewardsClaimed.count || 0;
};

onMounted(() => {
  loadBusinessMetrics();
});
</script>

<template>
  <section>
    <div class="scanner-container">
      <header>Scan Loyalty Card</header>
      <div class="scanner" @click="handleOpenScanner">
        <Icon class="icon" name="material-symbols:qr-code-scanner-rounded" size="4rem" />
        Open Scanner
      </div>
      <ModalScanner v-model="scannerOpen" @scan:success="handleScanSuccess" />
      <ModalCustomerWallet v-model="modalCustomerCardOpen" :wallet-data="walletData" />
    </div>

    <Divider class="my-6" />

    <div class="metrics-container">
      <header>Business Metrics</header>
      <div class="metrics-grid">
        <div class="active-wallets">
          <div class="row">
            <Icon class="metrics-icon" name="material-symbols:account-balance-wallet-outline" size="2rem" />
            <span class="value">{{ activeWalletsCount }}</span>
          </div>
          <div class="row">
            <p>Active Wallets</p>
          </div>
        </div>
        <div class="stamps-today">
          <div class="row">
            <Icon class="metrics-icon" name="lucide:stamp" size="2rem" />
            <span class="value">{{ stampsTodayCount }}</span>
          </div>
          <div class="row">
            <p>Stamps Given Today</p>
          </div>
        </div>
        <div class="rewards-claimed">
          <div class="row">
            <Icon class="metrics-icon" name="material-symbols:rewarded-ads-outline" size="2rem" />
            <span class="value">{{ rewardsClaimedCount }}</span>
          </div>
          <div class="row">
            <p>Rewards Claimed</p>
          </div>
        </div>
      </div>
    </div>

    <Divider class="my-6" />

    <div class="manage-container">
      <header>Manage Program</header>
      <div class="options-container">
        <NuxtLink to="/business/printqr" class="link">
          <Icon name="material-symbols:download-rounded" size="1.5rem" />
          Print Store QR Code
        </NuxtLink>
        <NuxtLink to="/business/customize-card" class="link">
          <Icon name="material-symbols:edit-outline-rounded" size="1.5rem" />
          Customize Loyalty Card
        </NuxtLink>
        <NuxtLink to="/business/support" class="link">
          <Icon name="material-symbols:contact-support-outline" size="1.5rem" />
          Contact Support
        </NuxtLink>
      </div>
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
.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #00000020;

  z-index: -1;
}
.scanner {
  position: relative;
  z-index: 2;

  width: 100%;
  padding: 3rem 1rem;
  margin: 1rem 0;

  background: var(--primary-color);
  border-radius: 8px;

  text-align: center;
  color: #fff;

  font-size: 1.6rem;
  font-weight: 600;
}
.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1rem 0;

  & > div {
    padding: 1rem;
    background: var(--surface-card);
    border-radius: 8px;
    height: 8rem;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
.metrics-icon {
  color: #ff5555;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;

  & > span.value {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--text-color);
  }

  & > p {
    font-size: 0.8rem;
    color: #717171;
    margin: 0;
  }
}

.options-container {
  padding: 10px;
  margin: 1rem 0;
  background: #fff;
  border-radius: 8px;

  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);

  & > .link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    margin: 10px;
    border: 1px solid #f0f0f0;
    border-radius: 5px;

    font-size: 1rem;
    color: var(--text-color);

    cursor: pointer;

    transition: background-color 0.2s;

    &:hover {
      background-color: #f9f9f9;
    }
  }
}
</style>
