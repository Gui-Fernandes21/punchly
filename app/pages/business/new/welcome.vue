<script lang="ts" setup>
definePageMeta({
  layout: 'card'
});

useHead({
  title: 'Welcome - Punchly',
  meta: [{ name: 'description', content: 'Welcome to Punchly' }]
});
</script>

<template>
  <section>
    <header>
      <div class="placeholder">
        <div class="logo">
          <img src="/images/logo/punchly-logo.png" alt="Logo" />
        </div>
      </div>
      <h1>Welcome To Punchly!</h1>
    </header>

    <section class="main-content">
      <div class="text-container">
        <p>Thank you for choosing to partner with us.</p>
        <p>Your business is now part of the Punchly network, making it easier than ever to reward customers and keep them coming back.</p>

        <Divider style="width: 40%" />

        <p>Log in to your dashboard to set up your rewards and start engaging customers today.</p>
        <p>— The Punchly Team</p>
      </div>

      <Button type="submit">Go to Dashboard</Button>
    </section>

    <footer>
      <p>&copy; 2025 Punchly. All rights reserved.</p>
    </footer>
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

.main-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 2rem;
  padding: 0 1rem;
}

section {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
}

.text-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* padding: 0 1rem; */
  text-align: center;

  gap: 1rem;
}

::v-deep(.p-floatlabel),
::v-deep(.p-inputtext) {
  width: 100%;
}

::v-deep(.p-inputtext) {
  padding: 1.5rem 1rem;
  font-size: 1.2rem;
}

footer {
  font-size: 11px;
}

button {
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
}
</style>
