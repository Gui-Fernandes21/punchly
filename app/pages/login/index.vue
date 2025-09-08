<script lang="ts" setup>
import { vMaska } from 'maska/vue';

definePageMeta({
  layout: 'auth'
});

useHead({
  title: 'Login - Punchly',
  meta: [
    { name: 'description', content: 'Login to Punchly' }
  ]
});

const mobile = ref('');

</script>

<template>
  <section>
    <header>
      <div class="placeholder">
        <div class="logo">
          <img src="/images/logo/punchly-logo.png" alt="Logo" />
        </div>
      </div>
      <h1>Welcome To Punchly</h1>
      <p>Enter your mobile number to turn one-time visitors into regulars!</p>
    </header>

    <form>
      <FloatLabel>
        <InputText v-maska="'(###) ###-####'" size="large" id="mobile" v-model="mobile" type="tel" />
        <label for="mobile">Mobile Number</label>
      </FloatLabel>
      <Button type="submit">Get Started</Button>
    </form>

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
section {
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
  width: 100%;

  gap: 1rem;
}

button {
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
}


::v-deep(.p-floatlabel),
::v-deep(.p-inputtext) {
  width: 100%;
}

::v-deep(.p-inputtext) {
  padding: 1.5rem 1rem;
  font-size: 1.2rem;
}
</style>