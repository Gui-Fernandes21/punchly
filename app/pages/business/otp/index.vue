<script lang="ts" setup>
definePageMeta({
  layout: 'card'
});

useHead({
  title: 'Verify Phone - Punchly',
  meta: [{ name: 'description', content: 'Verify your phone number to continue using Punchly' }]
});

const otp = ref('');
</script>

<template>
  <section>
    <header>
      <div class="placeholder">
        <div class="logo">
          <img src="/images/logo/punchly-logo.png" alt="Logo" />
        </div>
      </div>
      <h1>Verify Phone</h1>
      <p>We have sent a 4-digit code to your mobile number.</p>
    </header>

    <form>
      <FloatLabel>
        <InputOtp size="large" id="otp" v-model="otp" type="tel" />
        <!-- <label for="otp">OTP</label> -->
      </FloatLabel>
      <span>
        Didn't receive the code?
        <a class="resend" href="#">resend</a>
      </span>
      <Button type="submit">Verify</Button>
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
header > h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-family: 'Poppins', sans-serif;
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

  & > span {
    text-align: start;
    width: 100%;
  }
}

button {
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
</style>
