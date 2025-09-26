<script lang="ts" setup>
useHead({
  title: 'My Wallets - Punchly',
  meta: [{ name: 'description', content: 'View and manage your loyalty cards on Punchly' }]
});

// Placeholder data - replace with your actual data
const wallets = ref([
  {
    id: 1,
    businessName: "Joe's Coffee Shop",
    punches: 8,
    rewardGoal: 10,
    rewardLabel: "Free Large Coffee",
    primaryColor: "#8B4513",
    logo: "/images/logo/punchly-logo.png"
  },
  {
    id: 2,
    businessName: "Pizza Palace",
    punches: 3,
    rewardGoal: 5,
    rewardLabel: "Free Personal Pizza",
    primaryColor: "#DC143C",
    logo: "/images/logo/punchly-logo.png"
  },
  {
    id: 3,
    businessName: "Smoothie Station",
    punches: 12,
    rewardGoal: 8,
    rewardLabel: "Free Large Smoothie",
    primaryColor: "#32CD32",
    logo: "/images/logo/punchly-logo.png"
  }
]);

const searchQuery = ref('');
const isLoading = ref(false);

// Leave empty for your integration
const handleSearch = () => {
  // Your search logic here
};

const onWalletClick = (wallet: any) => {
  // Your wallet click logic here
  console.log('Wallet clicked:', wallet);
};
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
          <InputText 
            v-model="searchQuery"
            placeholder="Search businesses..."
            class="search-input"
            @input="handleSearch"
          />
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
      <Card 
        v-for="wallet in wallets" 
        :key="wallet.id"
        class="wallet-card"
        @click="onWalletClick(wallet)"
      >
        <template #content>
          <div class="wallet-content">
            <!-- Business Logo & Info -->
            <div class="wallet-header">
              <Avatar 
                :image="wallet.logo" 
                size="large" 
                shape="circle"
                class="business-logo"
              />
              <div class="business-info">
                <h3 class="business-name">{{ wallet.businessName }}</h3>
                <p class="reward-label">{{ wallet.rewardLabel }}</p>
              </div>
            </div>

            <!-- Progress Section -->
            <div class="progress-section">
              <div class="progress-info">
                <span class="punches">{{ wallet.punches }}</span>
                <span class="separator">/</span>
                <span class="goal">{{ wallet.rewardGoal }}</span>
              </div>
              <ProgressBar 
                :value="(wallet.punches / wallet.rewardGoal) * 100" 
                class="progress-bar"
                :style="{ '--primary-color': wallet.primaryColor }"
              />
              <p class="progress-text">
                {{ wallet.rewardGoal - wallet.punches > 0 
                  ? `${wallet.rewardGoal - wallet.punches} more to go!` 
                  : 'Reward ready!' 
                }}
              </p>
            </div>

            <!-- Status Badge -->
            <div class="status-badge">
              <Tag 
                v-if="wallet.punches >= wallet.rewardGoal"
                value="Reward Ready!" 
                severity="success" 
                icon="material-symbols:check-circle"
              />
              <Tag 
                v-else
                :value="`${wallet.rewardGoal - wallet.punches} punches left`" 
                severity="info"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- Empty State -->
    <div v-if="!isLoading && wallets.length === 0" class="empty-state">
      <div class="empty-icon">
        <Icon name="material-symbols:wallet" size="4rem" />
      </div>
      <h3>No wallets found</h3>
      <p>Start collecting loyalty points by visiting participating businesses!</p>
      <Button 
        label="Find Businesses" 
        icon="material-symbols:search"
        class="find-businesses-btn"
      />
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
</style>