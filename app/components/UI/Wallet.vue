<script lang="ts" setup>
import { ref } from 'vue';

const walletData = ref({
  businessName: 'Your Business',
  rewardLabel: 'One Free Drink',
  rewardCount: 5,
  totalRewards: 10,
  cardColor: '#14ABB7'
});

defineExpose({});
</script>

<template>
  <section>
    <div class="wallet" :style="{ borderColor: walletData.cardColor }">
      <header class="wallet-header" :style="{ backgroundColor: walletData.cardColor }">
        <h2>{{ walletData.businessName }}</h2>
      </header>
      <div class="content">
        <div class="wallet-grid">
          <div v-for="(n, index) in walletData.totalRewards" :key="index" class="punch" :style="{ backgroundColor: n <= walletData.rewardCount ? walletData.cardColor : '#e0e0e0' }">
            <Icon v-if="n == walletData.totalRewards" name="material-symbols:featured-seasonal-and-gifts-rounded" size="2.5rem" class="reward-icon" />
          </div>
        </div>

        <p>
          Only <strong>{{ walletData.totalRewards - walletData.rewardCount }}</strong> more punches needed for (a) <br />
          "<strong>{{ walletData.rewardLabel }}</strong>"!
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 1rem;
}

.content {
  margin: 1rem 0;
}

.content > p {
  text-align: center;
  margin: 1rem 0 0 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.wallet-header {
  padding: 1rem;
  border-radius: 6px 6px 0 0;
  color: #fff;
  text-align: center;
}

.wallet-grid {
  display: grid;
  grid-template-columns: repeat(3, 5rem);
  row-gap: 10px;
  place-items: center;
  justify-content: center;
}

.punch {
  width: 4rem;
  height: 4rem;
  position: relative;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
}

.reward-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--bg-surface-900);
  opacity: 0.8;
}
</style>
