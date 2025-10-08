<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  badge?: string;
  url?: string;
}
const props = defineProps<Props>();

// Build an absolute URL for the logo so Satori can fetch it reliably
const { origin } = useRequestURL();
const logoSrc = new URL('/images/logo/high-quality_punchly-logo.png', origin).href;
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
      padding: 32px 64px;
      box-sizing: border-box;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      background: linear-gradient(135deg, #0f3440 0%, #126a74 35%, #14abb7 70%);
    "
  >
    <!-- subtle texture -->
    <div
      style="
        position: absolute;
        top: -20%;
        right: -20%;
        bottom: -20%;
        left: -20%;
        background: radial-gradient(600px 600px at 100% 0%, rgba(255, 255, 255, 0.08), transparent 60%), radial-gradient(400px 400px at 0% 100%, rgba(255, 255, 255, 0.06), transparent 60%);
        pointer-events: none;
      "
    ></div>

    <!-- top brand row -->
    <div style="display: flex; align-items: center; justify-content: center; gap: 16px; z-index: 2; position: relative">
      <div style="width: 77px; height: 77px; border-radius: 16px; background: #ffffff; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15)">
        <img :src="logoSrc" alt="Punchly Logo" width="68" height="68" style="display: block; margin-top: 5px; border-radius: 8px" />
      </div>

      <div style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-weight: 800; font-size: 28px; letter-spacing: 0.02em; color: #ffffff">Punchly</div>

      <div
        v-if="badge"
        style="
          margin-left: 12px;
          font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          font-weight: 600;
          font-size: 16px;
          padding: 8px 16px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
        "
      >
        {{ badge }}
      </div>
    </div>

    <!-- core copy -->
    <div style="z-index: 2; max-width: 1000px; position: relative">
      <div v-if="eyebrow" style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-weight: 600; font-size: 24px; color: rgba(255, 255, 255, 0.9); margin-bottom: 12px; letter-spacing: 0.02em">
        {{ eyebrow }}
      </div>

      <h1 style="margin: 0; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-weight: 900; font-size: 62px; line-height: 1.1; letter-spacing: -0.02em; color: #ffffff">
        {{ title }}
      </h1>

      <p
        v-if="subtitle"
        style="margin: 20px 0 0 0; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-weight: 500; font-size: 32px; line-height: 1.3; color: rgba(255, 255, 255, 0.95); letter-spacing: -0.01em"
      >
        {{ subtitle }}
      </p>
    </div>

    <!-- bottom row -->
    <div style="display: flex; align-items: center; justify-content: space-between; z-index: 2; position: relative">
      <div style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-weight: 600; font-size: 24px; color: rgba(255, 255, 255, 0.9); letter-spacing: 0.01em">
        {{ url || 'punchly.co' }}
      </div>
      <div style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-weight: 500; font-size: 18px; color: rgba(255, 255, 255, 0.8)">Digital loyalty cards made simple</div>
    </div>

    <!-- decorative rings -->
    <svg width="1200" height="630" viewBox="0 0 1200 630" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none" aria-hidden="true">
      <defs>
        <pattern id="dots" patternUnits="userSpaceOnUse" width="40" height="40">
          <circle cx="20" cy="20" r="1" fill="rgba(255, 255, 255, 0.1)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" opacity="0.6" />
      <g opacity="0.15" fill="none" stroke="rgba(255, 255, 255, 0.4)">
        <circle cx="1050" cy="520" r="220" stroke-width="1.5" />
        <circle cx="150" cy="120" r="140" stroke-width="1" />
        <circle cx="950" cy="100" r="80" stroke-width="1" />
      </g>
    </svg>
  </div>
</template>
