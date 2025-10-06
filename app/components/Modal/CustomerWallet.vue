<script lang="ts" setup>
import { useErrorModal } from '~/composables/ui/useErrorModal';

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'reward-claimed', value: boolean): void;
}>();

interface WalletData {
  businessName: string;
  rewardLabel: string;
  punches: number;
  rewardGoal: number;
  primaryColor: string;
}

const props = defineProps<{
  modelValue: boolean;
  walletData: WalletData;
}>();

const client = useSupabaseClient<Database>();
const business = useState<Tables<'business'> | null>('business_data');
const customerWallet = useState<Tables<'wallet'> | null>('customer_wallet');
const { showError } = useErrorModal();

const visible = ref<boolean>(props.modelValue);

const rewardClaimable = computed(() => props.walletData.punches >= props.walletData.rewardGoal);

const decrementPunches = async () => {
  if (!props.walletData || !business.value || !customerWallet.value) {
    showError({ message: 'Business context is missing. Cannot update punches.' });
    return;
  }

  if (props.walletData.punches > 0) {
    props.walletData.punches -= 1;
    customerWallet.value.punches = props.walletData.punches;
  }

  try {
    const { error } = await client.from('wallet').update({ punches: customerWallet.value?.punches }).eq('business_id', business.value.id);
    if (error) throw error;
    const eventResult = await client.from('events').insert({
      type: 'remove',
      wallet_id: customerWallet.value.id,
      new_punches: customerWallet.value.punches || 0,
      delta: -1
    });
    if (eventResult.error) throw eventResult.error;
  } catch (error) {
    showError({ message: 'Failed to update punches. Please try again.' });
  }
};

const incrementPunches = async () => {
  if (!props.walletData || !business.value || !customerWallet.value) {
    showError({ message: 'Business context is missing. Cannot update punches.' });
    return;
  }

  if (props.walletData.punches < props.walletData.rewardGoal) {
    props.walletData.punches += 1;
    customerWallet.value.punches = props.walletData.punches;
  }

  try {
    const { error } = await client.from('wallet').update({ punches: customerWallet.value?.punches }).eq('business_id', business.value.id);
    if (error) throw error;
    const eventResult = await client.from('events').insert({
      type: 'add',
      wallet_id: customerWallet.value.id,
      new_punches: customerWallet.value.punches || 0,
      delta: 1
    });
    if (eventResult.error) throw eventResult.error;
  } catch (error) {
    showError({ message: 'Failed to update punches. Please try again.' });
  }
};

const claimReward = async () => {
  if (!props.walletData || !business.value || !customerWallet.value || !rewardClaimable.value) {
    showError({ message: 'Business context is missing. Cannot claim reward.' });
    return;
  }

  if (props.walletData.punches === props.walletData.rewardGoal) {
    props.walletData.punches = 0;
    customerWallet.value.punches = 0;
  } else {
    showError({ message: 'Not enough punches to claim reward.' });
    return;
  }

  try {
    const { error } = await client.from('wallet').update({ punches: customerWallet.value?.punches }).eq('business_id', business.value.id);
    if (error) throw error;
    const eventResult = await client.from('events').insert({
      type: 'redeem',
      wallet_id: customerWallet.value.id,
      new_punches: customerWallet.value.punches || 0,
      delta: -props.walletData.rewardGoal
    });
    if (eventResult.error) throw eventResult.error;
    visible.value = false;
    emit('update:modelValue', false);
    emit('reward-claimed', true);
  } catch (error) {
    showError({ message: 'Failed to claim reward. Please try again.' });
  }
};

watch(
  () => props.modelValue,
  (newVal) => {
    visible.value = newVal;
  }
);

watch(() => visible.value, (newVal) => {
  if (newVal !== props.modelValue) {
    emit('update:modelValue', newVal);
  }
});
</script>

<template>
  <Dialog v-model:visible="visible" closable pt:root:class="!border-0 !w-[80%]" pt:mask:class="backdrop-blur-md">
    <template #container="{ closeCallback }">
      <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded">
        <header class="flex justify-between w-full mb-4">
          <h2 class="text-2xl text-start">Customer's Card</h2>
          <Icon @click="closeCallback" name="gg:close" size="2rem" />
        </header>

        <section class="scanner-canvas font-bold text-2xl block mb-2 mt-6">
          <UIWallet mode="compact" :card-data="walletData" />
        </section>

        <section class="actions">
          <Button class="w-full" severity="secondary" @click="decrementPunches">
            <Icon name="gg:math-minus" size="1.7rem" />
            Punch
          </Button>
          <Button class="w-full" @click="incrementPunches">
            <Icon name="gg:math-plus" size="1.7rem" />
            Punch
          </Button>
          <Button class="claim-btn w-full" :disabled="!rewardClaimable" @click="claimReward">Claim Reward</Button>
        </section>
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
button {
  font-size: 1.1rem;
  padding: 1rem;
}

.scanner-canvas {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  position: relative;
}

.actions {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.claim-btn {
  grid-column: span 2;
  background-color: #ffd700;
  border: 1px solid #ffd700;
  color: #c2410c;
  font-weight: 500;

  &:disabled {
    background: #ffe866;
    color: #444444;
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
