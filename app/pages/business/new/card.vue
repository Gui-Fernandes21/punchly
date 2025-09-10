<script lang="ts" setup>
definePageMeta({
  layout: 'auth'
});

useHead({
  title: 'Loyalty Card - Punchly',
  meta: [{ name: 'description', content: 'Customize your loyalty card to continue using Punchly' }]
});

const reward = ref('');
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

      <FloatLabel>
        <InputText size="large" id="reward-label" v-model="reward" type="text" />
        <label for="reward-label">Reward Label</label>
      </FloatLabel>

      <UIRewardCounter ref="rewardCounter" />

      <Button class="btn-submit" type="submit">Create Account</Button>
    </form>

    <footer>
      <p>&copy; 2025 Punchly. All rights reserved.</p>
    </footer>
  </section>
</template>

<style scoped>
section.image {
  margin: 0 0 2.5rem;
}

.image-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.image-container {
  width: 10rem;
  height: 10rem;
  background-color: rgba(240, 240, 240, 0.288);

  border-radius: 50%;
  border-style: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
  
  margin: .5rem 0;
  overflow: hidden;

  z-index: 4;
}
.image-display {
  width: 100%;
  height: 100%;
  z-index: 1;
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
