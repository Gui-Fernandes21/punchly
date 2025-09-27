<script lang="ts" setup>
/**
 * Client Dashboard Page
 *
 * IMPROVEMENT NOTES:
 * - Decrease amount of data fetched on initial load for better performance (look at client data fetch).
 */

useHead({
  title: 'My Wallets - Punchly',
  meta: [{ name: 'description', content: 'View and manage your loyalty cards on Punchly' }]
});

// Placeholder data - replace with your actual data
const allWallets = ref([
  {
    id: 1,
    punches: 8,
    business: {
      name: "Joe's Coffee Shop",
      reward_goal: 10,
      reward_label: 'Free Large Coffee',
      primary_color: '#8B4513',
      logo_url: '/images/logo/punchly-logo.png'
    }
  },
  {
    id: 2,
    punches: 3,
    business: {
      name: 'Pizza Palace',
      reward_goal: 5,
      reward_label: 'Free Personal Pizza',
      primary_color: '#DC143C',
      logo_url: '/images/logo/punchly-logo.png'
    }
  },
  {
    id: 3,
    punches: 8,
    business: {
      name: 'Smoothie Station',
      reward_goal: 8,
      reward_label: 'Free Large Smoothie',
      primary_color: '#32CD32',
      logo_url: '/images/logo/punchly-logo.png'
    }
  },
  {
    id: 4,
    punches: 5,
    business: {
      name: 'Burger Barn',
      reward_goal: 10,
      reward_label: 'Free Burger Combo',
      primary_color: '#FF6B35',
      logo_url: '/images/logo/punchly-logo.png'
    }
  },
  {
    id: 5,
    punches: 2,
    business: {
      name: 'Tea Time',
      reward_goal: 6,
      reward_label: 'Free Premium Tea',
      primary_color: '#4ECDC4',
      logo_url: '/images/logo/punchly-logo.png'
    }
  },
  {
    id: 6,
    punches: 7,
    business: {
      name: 'Donut Delights',
      reward_goal: 8,
      reward_label: 'Free Dozen Donuts',
      primary_color: '#FFD93D',
      logo_url: '/images/logo/punchly-logo.png'
    }
  },
  {
    id: 7,
    punches: 10,
    business: {
      name: 'Sushi Express',
      reward_goal: 12,
      reward_label: 'Free Sushi Roll',
      primary_color: '#E74C3C',
      logo_url: '/images/logo/punchly-logo.png'
    }
  },
  {
    id: 8,
    punches: 4,
    business: {
      name: 'Ice Cream Corner',
      reward_goal: 7,
      reward_label: 'Free Sundae',
      primary_color: '#F39C12',
      logo_url: '/images/logo/punchly-logo.png'
    }
  }
]);

const WALLET_QUERY = `
      id,
      punches,
      business!inner (
        id,
        name,
        reward_label,
        reward_goal,
        primary_color,
        logo_url
      )
    `;

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();

const searchQuery = ref('');
const isLoading = ref(false);

// Pagination variables
const currentPage = ref(0);
const itemsPerPage = ref(6);
const totalItems = ref(0);

// Computed property for paginated wallets
const paginatedWallets = computed(() => {
  const start = currentPage.value * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return allWallets.value.slice(start, end);
});

const notFoundSearchCopy = computed(() => {
  if (searchQuery.value.trim() === '') {
    return { header: 'No wallets found.', paragraph: 'Start collecting loyalty points by visiting participating businesses!' };
  } else {
    return { header: `No wallets found for "${searchQuery.value}".`, paragraph: 'Try a different search term.' };
  }
});

// Leave empty for your integration
const handleSearch = () => {
  // Reset to first page when searching
  currentPage.value = 0;
  searchWalletByBusinessName(searchQuery.value);
};

const onPageChange = (event: any) => {
  currentPage.value = event.page;
  // You can add scroll to top or loading logic here
};

const onWalletClick = (wallet: any) => navigateTo(`/client/${wallet.business.id}/wallet/`);
const getProgressPercentage = (wallet: any) => (wallet.punches / wallet.business.reward_goal) * 100;
const getRoundedPercentage = (wallet: any) => Math.min(100, Math.max(0, Math.round(getProgressPercentage(wallet) * 10) / 10));

const searchWalletByBusinessName = async (businessName: string) => {
  if (!businessName.trim()) return fetchAllWallets();

  try {
    const clientResult = await supabase
      .from('client')
      .select('id')
      .eq('auth_id', user.value?.id as string)
      .single();

    if (clientResult.error) throw clientResult.error;

    const { data, error } = await supabase.from('wallet').select(WALLET_QUERY).eq('client_id', +clientResult.data.id).ilike('business.name', `%${businessName}%`);

    if (error) throw error;
    allWallets.value = data as any[];
  } catch (error) {
    console.error('Error searching wallets:', error);
  }
};

const fetchAllWallets = async () => {
  try {
    const clientResult = await supabase
      .from('client')
      .select('id')
      .eq('auth_id', user.value?.id as string)
      .single();

    if (clientResult.error) throw clientResult.error;

    const { data, error } = await supabase.from('wallet').select(WALLET_QUERY).eq('client_id', +clientResult.data.id);

    if (error) throw error;
    allWallets.value = data as any[];
  } catch (error) {
    console.error('Error fetching wallets:', error);
  }
};

// Update total items when wallets change
watch(
  allWallets,
  (newWallets) => {
    totalItems.value = newWallets.length;
  },
  { immediate: true }
);

onMounted(() => {
  fetchAllWallets();
});
</script>

<template>
  <div class="wallets-page">
    <!-- Header -->
    <header class="page-header">
      <h1>My Wallets</h1>
      <p>Manage your loyalty cards</p>
    </header>

    <!-- Search Bar -->
    <div class="search-container">
      <div class="search-wrapper">
        <IconField>
          <InputIcon>
            <Icon name="material-symbols:search" />
          </InputIcon>
          <InputText v-model="searchQuery" placeholder="Search businesses..." class="search-input" @input="handleSearch" />
        </IconField>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <ProgressSpinner size="50" strokeWidth="4" />
      <p class="loading-text">Loading wallets...</p>
    </div>

    <!-- Wallets Grid -->
    <div v-else class="wallets-grid">
      <Card v-for="wallet in paginatedWallets" :key="wallet.id" class="wallet-card" @click="onWalletClick(wallet)">
        <template #content>
          <div class="wallet-content">
            <!-- Business Logo & Info -->
            <div class="wallet-header">
              <Avatar :image="wallet.business.logo_url || '/images/logo/high-quality_punchly-logo.png'" size="large" shape="circle" class="business-logo" />
              <div class="business-info">
                <h3 class="business-name">{{ wallet.business.name }}</h3>
                <p class="reward-label">{{ wallet.business.reward_label }}</p>
              </div>
            </div>

            <!-- Progress Section -->
            <div class="progress-section">
              <div class="progress-info">
                <span class="punches">{{ wallet.punches }}</span>
                <span class="separator">/</span>
                <span class="goal">{{ wallet.business.reward_goal }}</span>
              </div>
              <ProgressBar :value="getProgressPercentage(wallet)" class="progress-bar" :style="{ '--primary-color': wallet.business.primary_color }">{{ getRoundedPercentage(wallet) }}%</ProgressBar>
              <p class="progress-text">
                {{ wallet.business.reward_goal - wallet.punches > 0 ? `${wallet.business.reward_goal - wallet.punches} more to go!` : 'Reward ready!' }}
              </p>
            </div>

            <!-- Status Badge -->
            <div class="status-badge">
              <Tag v-if="wallet.punches >= wallet.business.reward_goal" value="Reward Ready!" severity="success" icon="pi pi-check-circle" />
              <Tag v-else :value="`${wallet.business.reward_goal - wallet.punches} punches left`" severity="info" />
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- Pagination -->
    <div v-if="!isLoading && totalItems > itemsPerPage" class="pagination-container">
      <Paginator :first="currentPage * itemsPerPage" :rows="itemsPerPage" :totalRecords="totalItems" :rowsPerPageOptions="[6, 12, 24]" @page="onPageChange" class="custom-paginator" />
    </div>

    <!-- Empty State -->
    <div v-if="!isLoading && allWallets.length === 0" class="empty-state">
      <div class="empty-icon">
        <Icon name="material-symbols:wallet" size="4rem" />
      </div>
      <h3>{{ notFoundSearchCopy.header }}</h3>
      <p>{{ notFoundSearchCopy.paragraph }}</p>
      <Button label="Find Businesses" icon="material-symbols:search" class="find-businesses-btn" />
    </div>
  </div>
</template>

<style scoped>
.wallets-page {
  max-width: 100%;
}

@media (min-width: 768px) {
  .wallets-page {
    max-width: 1200px;
    padding: 0;
  }
}

/* Header */
.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.page-header p {
  font-size: 1rem;
  color: var(--text-color-secondary);
  margin: 0;
}

/* Search */
.search-container {
  margin-bottom: 2rem;
}

.search-wrapper {
  position: relative;
}

.search-input {
  width: 100%;
  height: 3rem;
  font-size: 1rem;
  border-radius: 12px;
}

/* Loading */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  gap: 1rem;
}

.loading-text {
  font-size: 1rem;
  color: var(--text-color-secondary);
  margin: 0;
}

/* Wallets Grid */
.wallets-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .wallets-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .wallets-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Wallet Card */
.wallet-card {
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 16px;
  border: 1px solid var(--surface-border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.wallet-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.wallet-content {
  padding: 0;
}

/* Wallet Header */
.wallet-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.business-logo {
  flex-shrink: 0;
  border: 2px solid var(--surface-border);
}

.business-info {
  flex: 1;
  min-width: 0;
}

.business-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 0.25rem 0;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.reward-label {
  font-size: 0.875rem;
  color: var(--text-color-secondary);
  margin: 0;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Progress Section */
.progress-section {
  margin-bottom: 1rem;
}

.progress-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.punches {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.separator {
  font-size: 1.25rem;
  color: var(--text-color-secondary);
}

.goal {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--text-color-secondary);
}

.progress-bar {
  margin-bottom: 0.5rem;
  height: 15px;
  border-radius: 4px;
}

.progress-bar :deep(.p-progressbar-value) {
  background: var(--primary-color, var(--primary-500));
}

.progress-text {
  font-size: 0.875rem;
  color: var(--text-color-secondary);
  text-align: center;
  margin: 0;
}

/* Status Badge */
.status-badge {
  display: flex;
  justify-content: center;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
}

.empty-icon {
  margin-bottom: 1rem;
  color: var(--text-color-secondary);
}

.empty-state h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.empty-state p {
  font-size: 1rem;
  color: var(--text-color-secondary);
  margin-bottom: 2rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.find-businesses-btn {
  padding: 0.75rem 2rem;
}

/* Pagination */
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  padding: 1rem 0;
}

.custom-paginator {
  border: none;
  background: transparent;
}

.custom-paginator :deep(.p-paginator-content) {
  flex-wrap: nowrap;
}

.custom-paginator :deep(.p-paginator-pages) {
  gap: 0.5rem;
}

.custom-paginator :deep(.p-paginator-page) {
  min-width: 2.5rem;
  height: 2.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.custom-paginator :deep(.p-paginator-page:hover) {
  background-color: var(--primary-50);
  color: var(--primary-600);
}

.custom-paginator :deep(.p-paginator-page.p-highlight) {
  background-color: var(--primary-500);
  color: white;
  border-color: var(--primary-500);
}

.custom-paginator :deep(.p-paginator-prev),
.custom-paginator :deep(.p-paginator-next) {
  min-width: 2.5rem;
  height: 2.5rem;
  border-radius: 8px;
  margin: 0 0.25rem;
}

.custom-paginator :deep(.p-dropdown) {
  border-radius: 8px;
}

/* Mobile pagination adjustments */
@media (max-width: 640px) {
  .custom-paginator :deep(.p-paginator-rpp-options) {
    display: none;
  }

  .custom-paginator :deep(.p-paginator-pages) {
    gap: 0.25rem;
  }

  .custom-paginator :deep(.p-paginator-page) {
    min-width: 2rem;
    height: 2rem;
    font-size: 0.875rem;
  }

  .custom-paginator :deep(.p-paginator-prev),
  .custom-paginator :deep(.p-paginator-next) {
    min-width: 2rem;
    height: 2rem;
  }
}
</style>
