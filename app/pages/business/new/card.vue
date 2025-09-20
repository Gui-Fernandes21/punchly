<script lang="ts" setup>
definePageMeta({
  layout: 'card'
});

useHead({
  title: 'Loyalty Card - Punchly',
  meta: [{ name: 'description', content: 'Customize your loyalty card to continue using Punchly' }]
});

const business = useState<Tables<'business'> | null>('business_data');

const rewardLabel = ref('');
const rewardCounter = ref<number>(business.value?.reward_goal || 0);
const swatch = ref<string>(business.value?.primary_color || '');



</script>

<template>
  <section class="card-content">
    <header>
      <div class="placeholder">
        <div class="logo">
          <img src="/images/logo/punchly-logo.png" alt="Logo" />
        </div>
      </div>
      <h1>Customize Loyalty Card</h1>
    </header>

    <form>
      <div class="form-group">
        <span>Enter a Reward Label</span>
        <InputText placeholder="e.g., “One Free Drink”" size="large" id="reward-label" v-model="rewardLabel" type="text" />
      </div>

      <div class="form-group">
        <span>Set a Reward Goal</span>
        <div class="reward-container">
          <UIRewardCounter v-model="rewardCounter" />
        </div>
      </div>

      <div class="form-group">
        <span>Select your primary color</span>
        <UISwatch v-model="swatch" />
      </div>

      <Button class="btn-submit" type="submit">Create Account</Button>
    </form>
    
    <AppFooter class="footer" />
  </section>
</template>

<style scoped>
.reward-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.5rem;
}

.form-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 5px;
  margin: 0.4rem 0;

  text-align: start;

  & > span {
    margin-left: 5px;
    color: #717171;
  }
}

header > h1 {
  font-size: 1.9rem;
  text-align: start;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-family: 'Poppins', sans-serif;
}

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
.card-content {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
  margin-top: 1rem;

  gap: 1rem;

  & > span {
    text-align: start;
    width: 100%;
  }
}

.btn-submit {
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
}

.resend {
  color: var(--primary-color);
  font-weight: 600;
  margin-left: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}

::v-deep(.p-floatlabel),
::v-deep(.p-inputtext) {
  width: 100%;
}

::v-deep(.p-inputtext) {
  padding: 1rem;
  font-size: 1.2rem;
}

footer {
  font-size: 11px;
}
</style>
