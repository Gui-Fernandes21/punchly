<script lang="ts" setup>
useHead({
  title: 'Print Store QR Code - Punchly',
  meta: [{ name: 'description', content: 'Print the QR code for your store on Punchly' }]
});
</script>

<template>
  <section>
    <div class="scanner-container">
      <header>Scan Loyalty Card</header>
      <div class="scanner">
        <Icon class="icon" name="material-symbols:qr-code-scanner-rounded" size="4rem" />
        Open Scan
      </div>
    </div>

    <Divider class="my-6" />

    <div class="metrics-container">
      <header>Business Metrics</header>
      <div class="metrics-grid">
        <div class="active-wallets">
          <div class="row">
            <Icon class="metrics-icon" name="material-symbols:account-balance-wallet-outline" size="2rem" />
            <span class="value">1,356</span>
          </div>
          <div class="row">
            <p>Active Wallets</p>
          </div>
        </div>
        <div class="stamps-today">
          <div class="row">
            <Icon class="metrics-icon" name="lucide:stamp" size="2rem" />
            <span class="value">5</span>
          </div>
          <div class="row">
            <p>Stamps Given Today</p>
          </div>
        </div>
        <div class="rewards-claimed">
          <div class="row">
            <Icon class="metrics-icon" name="material-symbols:rewarded-ads-outline" size="2rem" />
            <span class="value">10</span>
          </div>
          <div class="row">
            <p>Rewards Claimed</p>
          </div>
        </div>
      </div>
    </div>

    <Divider class="my-6" />

    <div class="manage-container">
      <header>Manage Program</header>
      <div class="options-container">
        <div class="link">
          <Icon name="material-symbols:download-rounded" size="2rem" />
          Print Store QR Code
        </div>
        <div class="link">
          <Icon name="material-symbols:edit-outline-rounded" size="2rem" />
          Customize Loyalty Card
        </div>
        <div class="link">
          <Icon name="material-symbols:contact-support-outline" size="2rem" />
          Contact Support
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
.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #00000020;

  z-index: -1;
}
.scanner {
  position: relative;
  z-index: 2;

  width: 100%;
  padding: 3rem 1rem;
  margin: 1rem 0;

  background: var(--primary-color);
  border-radius: 8px;

  text-align: center;
  color: #fff;

  font-size: 1.6rem;
  font-weight: 600;
}
.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1rem 0;

  & > div {
    padding: 1rem;
    background: var(--surface-card);
    border-radius: 8px;
    height: 8rem;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
.metrics-icon {
  color: #ff5555;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;

  & > span.value {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--text-color);
  }

  & > p {
    font-size: 0.8rem;
    color: #717171;
    margin: 0;
  }
}

.options-container {
  padding: 10px;
  margin: 1rem 0;
  background: #fff;
  border-radius: 8px;

  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);

  & > .link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    margin: 10px;
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    color: var(--text-color);

    cursor: pointer;

    transition: background-color 0.2s;

    &:hover {
      background-color: #f9f9f9;
    }
  }
}
</style>
