<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRuntimeConfig } from '#imports';
import { useToast } from 'primevue/usetoast';

const props = withDefaults(
  defineProps<{
    title?: string;
    text?: string;
    url?: string;
  }>(),
  {}
);

const route = useRoute();
const runtime = useRuntimeConfig();
const toast = useToast();

const shareUrl = computed(() => props.url || new URL(route.fullPath, runtime.public.appUrl).toString());

const shareData = computed(() => ({
  title: props.title || 'Punchly — Digital loyalty cards for small businesses',
  text: props.text || 'Replace paper punch cards with QR-based rewards. Scan, stamp, redeem.',
  url: shareUrl.value
}));

const canNativeShare = computed(() => typeof navigator !== 'undefined' && 'share' in navigator);

async function onShare() {
  try {
    if (canNativeShare.value) {
      await (navigator as any).share(shareData.value);
      return;
    }
    await navigator.clipboard.writeText(shareUrl.value);
    toast.add({ severity: 'success', summary: 'Link copied', detail: 'You can paste it anywhere', life: 2000 });
  } catch (err) {
    // Fallback fallback (older browsers)
    window.prompt('Copy this link:', shareUrl.value);
  }
}
</script>

<template>
  <Button
    severity="secondary"
    outlined
    size="small"
    class="flex-1 max-w-32 inline-flex items-center gap-2 h-11 px-4 rounded-xl text-white font-medium active:scale-95 transition shadow-md hover:brightness-95"
    type="button"
    @click="onShare"
    aria-label="Share this page"
  >
    <Icon name="material-symbols:share" class="mr-2" />
    <span>Share</span>
  </Button>
</template>
