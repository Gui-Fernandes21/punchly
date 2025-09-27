<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  mode: 'full' | 'compact';
  cardData?: WalletData;
}>();

interface WalletData {
  businessName: string;
  rewardLabel: string;
  punches: number;
  rewardGoal: number;
  primaryColor: string;
}

const walletData = ref<WalletData>({
  businessName: props.cardData?.businessName || '',
  rewardLabel: props.cardData?.rewardLabel || '',
  punches: props.cardData?.punches || 5,
  rewardGoal: props.cardData?.rewardGoal || 10,
  primaryColor: props.cardData?.primaryColor || '#14ABB7'
});

watch(
  () => props.cardData,
  (newData) => {
    if (newData) {
      walletData.value = {
        businessName: newData.businessName,
        rewardLabel: newData.rewardLabel,
        punches: newData.punches,
        rewardGoal: newData.rewardGoal,
        primaryColor: newData.primaryColor
      };
    }
  },
  { immediate: true, deep: true }
);

const punchStyle = (index: number) => {
  let backgroundColor = '#e0e0e0';
  let borderRadius = '50%';
  let color = '#000';

  if (!walletData.value) return { backgroundColor: '#e0e0e0' };
  
  if (index < walletData.value.punches) {
    backgroundColor = walletData.value.primaryColor;
  }

  if (index === walletData.value.rewardGoal - 1 && walletData.value.rewardGoal - walletData.value.punches <= 0) {
    borderRadius = '12px';
    color = '#f2943b';
    backgroundColor = '#fbe082'; // golden color for reward
  }

  return {
    backgroundColor,
    borderRadius,
    color
  };
};

/**
 * GOLDEN COLORS
 * #fbe082
 * #f2943b
 * #f8d79a
 * 
 * Give me bright golden colors for a reward icon
 * - #ffd700
 * - #ffecb3
 */
</script>

<template>
  <section class="wallet" :style="{ borderColor: walletData.primaryColor }">
    <header v-if="props.mode === 'full'" class="wallet-header" :style="{ backgroundColor: walletData.primaryColor }" >
      <h2>{{ walletData.businessName }}</h2>
    </header>
    <div class="content">
      <div class="wallet-grid">
        <div v-for="(n, index) in walletData.rewardGoal" :key="index" class="punch" :style="punchStyle(index)">
          <Icon v-if="n == walletData.rewardGoal" name="material-symbols:featured-seasonal-and-gifts-rounded" size="2.5rem" class="reward-icon"/>
        </div>
      </div>

      <p v-if="props.mode === 'full'">
        Only <strong>{{ walletData.rewardGoal - walletData.punches }}</strong> more punches needed for (a) <br />
        "<strong>{{ walletData.rewardLabel }}</strong>"!
      </p>
    </div>
  </section>
</template>

<style scoped>
section.wallet {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0 ;
}

.content {
  margin: 1rem 0;
  display: grid;
  place-items: center;
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

  & > h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
  }
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
