<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  badge?: string;
  url?: string;
}
defineProps<Props>();
</script>

<template>
  <!-- 1200 x 630 canvas -->
  <div
    style="
      width: 1200px;
      height: 630px;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 64px;
      color: #fff;
      background: radial-gradient(1200px 630px at -10% -30%, #126a74 0%, rgba(20, 171, 183, 0.4) 30%, rgba(0, 0, 0, 0) 60%), linear-gradient(135deg, #0f3440 0%, #14abb7 70%);
    "
  >
    <!-- subtle texture -->
    <div
      style="position: absolute; inset: -20%; background: radial-gradient(600px 600px at 100% 0%, rgba(255, 255, 255, 0.06), transparent 60%), radial-gradient(400px 400px at 0% 100%, rgba(255, 255, 255, 0.05), transparent 60%); filter: blur(0.5px)"
    />

    <!-- top brand row -->
    <div style="display: flex; align-items: center; justify-content: center; gap: 16px; z-index: 1">
      <div style="width: 77px; height: 77px; border-radius: 16px; background: #ffffff; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18)">
        <!-- simple punch/QR motif -->
         <img src="/images/logo/punchly-logo.png" alt="Punchly Logo" class="h-20 w-20 m-0" />
        <!-- <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#14ABB7" />
          <path d="M8 8h2v2H8V8Zm3 0h2v2h-2V8Zm5 0h-2v2h2V8ZM8 11h2v2H8v-2Zm5 0h2v2h-2v-2ZM8 14h2v2H8v-2Zm5 3h2v-2h-2v2Z" fill="white" opacity="0.95" />
        </svg> -->
      </div>

      <div style="font-family: Inter, ui-sans-serif, -apple-system, Segoe UI, Roboto, Helvetica, Arial; font-weight: 800; font-size: 28px; letter-spacing: 0.4px">Punchly</div>

      <div v-if="badge" style="margin-left: 12px; font-family: Inter, ui-sans-serif; font-weight: 700; font-size: 18px; padding: 6px 12px; border-radius: 9999px; background: rgba(255, 255, 255, 0.16); border: 1px solid rgba(255, 255, 255, 0.28)">
        {{ badge }}
      </div>
    </div>

    <!-- core copy -->
    <div style="z-index: 1; max-width: 1000px">
      <div v-if="eyebrow" style="font-family: Inter, ui-sans-serif; font-weight: 600; font-size: 24px; opacity: 0.9; margin-bottom: 8px">
        {{ eyebrow }}
      </div>

      <h1 style="margin: 0; font-family: Inter, ui-sans-serif; font-weight: 900; font-size: 72px; line-height: 1.05; letter-spacing: -0.5px; text-shadow: 0 2px 16px rgba(0, 0, 0, 0.25)">
        {{ title }}
      </h1>

      <p v-if="subtitle" style="margin: 16px 0 0 0; font-family: Inter, ui-sans-serif; font-weight: 500; font-size: 34px; line-height: 1.25; opacity: 0.98">
        {{ subtitle }}
      </p>
    </div>

    <!-- bottom row -->
    <div style="display: flex; align-items: center; justify-content: space-between; z-index: 1">
      <div style="font-family: Inter, ui-sans-serif; font-weight: 700; font-size: 26px; opacity: 0.95">
        {{ url || 'punchly.co' }}
      </div>

      <div style="display: flex; align-items: center; gap: 12px">
        <div style="width: 10px; height: 10px; border-radius: 9999px; background: #ffffff"></div>
        <div style="font-family: Inter, ui-sans-serif; font-weight: 600; font-size: 24px; opacity: 0.92">QR-based customer loyalty</div>
      </div>
    </div>

    <!-- decorative rings -->
    <svg width="1200" height="630" viewBox="0 0 1200 630" style="position: absolute; inset: 0; z-index: 0" aria-hidden="true">
      <g opacity="0.18" fill="none" stroke="white">
        <circle cx="1050" cy="520" r="220" stroke-width="1.5" />
        <circle cx="150" cy="120" r="140" stroke-width="1" />
      </g>
    </svg>
  </div>
</template>
