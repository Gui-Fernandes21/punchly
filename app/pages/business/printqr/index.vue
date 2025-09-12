<script lang="ts" setup>
useHead({
  title: 'Print Store QR Code - Punchly',
  meta: [{ name: 'description', content: 'Print the QR code for your store on Punchly' }]
});
</script>

<template>
  <section>
    <div class="scanner-container">
      <header>
        <h1>Store QR</h1>
        <p>Print or download the QR code for your store to display at your location.</p>
      </header>
      <div class="qr-card">
        <img src="/images/qr-demo.png" alt="Store QR Code" class="mx-auto mb-4" />

        <Divider />

        <div class="link">
          <Icon name="material-symbols:download-rounded" size="1.7rem" />
          Download PNG
        </div>
        <div class="link">
          <Icon name="material-symbols:print" size="1.7rem" />
          Print
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
header > h1 {
  font-size: 24px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}
header > p {
  font-size: 14px;
  color: #717171;
  font-family: 'Open Sans', sans-serif;
}
.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #00000020;

  z-index: -1;
}
.qr-card {
  position: relative;
  z-index: 2;

  width: 100%;
  padding: 2rem 1rem;
  margin: 1rem 0;

  background: #fff;
  border-radius: 8px;

  text-align: center;

  font-size: 1.6rem;
  font-weight: 600;
}
.link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin: 10px;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  color: var(--text-color);

  font-size: 16px;
  font-weight: 400;
  cursor: pointer;

  transition: background-color 0.2s;

  &:hover {
    background-color: #f9f9f9;
  }
}
</style>
