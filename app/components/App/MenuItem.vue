<script setup>
import { nextTick, onBeforeMount, ref, watch } from 'vue';

const route = useRoute();
const router = useRouter();

const { layoutConfig, layoutState, setActiveMenuItem, onMenuToggle, setMenuStates, setStaticMenuMobile, isHorizontal, isDesktop, isOverlay, isStatic, isSlim, isSlimPlus, openTab } = useLayout();

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
  index: {
    type: Number,
    default: 0
  },
  root: {
    type: Boolean,
    default: true
  },
  parentItemKey: {
    type: String,
    default: null
  }
});

const isActiveMenu = ref(false);
const itemKey = ref(null);
const subMenuRef = ref(null);
const menuItemRef = ref(null);

onBeforeMount(() => {
  itemKey.value = props.parentItemKey ? props.parentItemKey + '-' + props.index : String(props.index);

  const activeItem = layoutState.activeMenuItem;

  isActiveMenu.value = activeItem === itemKey.value || activeItem ? activeItem.startsWith(itemKey.value + '-') : false;
  // handleRouteChange(route.path);
});

watch(
  () => isActiveMenu.value,
  () => {
    const rootIndex = props.root ? props.index : parseInt(`${props.parentItemKey}`[0], 10);
    const overlay = document.querySelectorAll('.layout-root-submenulist')[rootIndex];
    const target = document.querySelectorAll('.layout-root-menuitem')[rootIndex];

    if ((isSlim.value || isSlimPlus.value || isHorizontal.value) && isDesktop) {
      nextTick(() => {
        calculatePosition(overlay, target);
      });
    }
  }
);

watch(
  () => layoutState.activeMenuItem,
  (newVal) => {
    isActiveMenu.value = newVal === itemKey.value || newVal.startsWith(itemKey.value + '-');
  }
);

watch(
  () => layoutConfig.menuMode,
  () => {
    isActiveMenu.value = false;
  }
);

watch(
  () => layoutState.overlaySubmenuActive,
  (newValue) => {
    if (!newValue) {
      isActiveMenu.value = false;
    }
  }
);
watch(
  () => route.path,
  (newPath) => {
    if (!(isSlim.value || isSlimPlus.value || isHorizontal.value) && props.item.to && props.item.to === newPath) {
      setActiveMenuItem(itemKey);
    } else if (isSlim.value || isSlimPlus.value || isHorizontal.value) {
      isActiveMenu.value = false;
    }
  }
);

function handleRouteChange(newPath) {
  if (!(isSlim.value || isSlimPlus.value || isHorizontal.value) && props.item.to && props.item.to === newPath) {
    setActiveMenuItem(itemKey);
  } else if (isSlim.value || isSlimPlus.value || isHorizontal.value) {
    isActiveMenu.value = false;
  }
}

// watch(() => route.path, handleRouteChange);

async function itemClick(event, item) {
  if (item.disabled) {
    event.preventDefault();
    return;
  }

  if ((item.to || item.url) && (layoutState.staticMenuMobileActive || layoutState.overlayMenuActive)) {
    onMenuToggle();
    if (item.to) {
      await router.push(item.to);
    }
  }

  if (item.command) {
    item.command({ originalEvent: event, item: item });
  }

  // add tab
  if (event.metaKey && item.to && (!item.data || !item.data.fullPage)) {
    // router.push(item.to);
    openTab(item);
    event.preventDefault();
  }

  if (item.items) {
    if (props.root && isActiveMenu.value && (isSlim.value || isSlimPlus.value || isHorizontal.value)) {
      setMenuStates(false);

      return;
    }

    setActiveMenuItem(isActiveMenu.value ? props.parentItemKey : itemKey);

    if (props.root && !isActiveMenu.value && (isSlim.value || isSlimPlus.value || isHorizontal.value)) {
      setMenuStates(true);
      isActiveMenu.value = true;

      removeAllTooltips();
    }
  } else {
    if (!isDesktop) {
      setStaticMenuMobile();
    }

    if (isSlim.value || isSlimPlus.value || isHorizontal.value) {
      setMenuStates(false);

      return;
    }

    setActiveMenuItem(itemKey);
  }
}

function onMouseEnter() {
  if (props.root && (isSlim.value || isSlimPlus.value || isHorizontal.value) && isDesktop) {
    if (!isActiveMenu.value && layoutState.menuHoverActive) {
      setActiveMenuItem(itemKey);
    }
  }
}

function removeAllTooltips() {
  const tooltips = document.querySelectorAll('.p-tooltip');
  tooltips.forEach((tooltip) => {
    tooltip.remove();
  });
}

function calculatePosition(overlay, target) {
  if (overlay) {
    const { top } = target.getBoundingClientRect();
    const vHeight = window.innerHeight;
    const oHeight = overlay.offsetHeight;
    const topbarEl = document.querySelector('.layout-topbar');
    const topbarHeight = topbarEl?.offsetHeight || 0;
    // reset
    overlay.style.top = '';
    overlay.style.left = '';

    if (isSlim || isSlimPlus) {
      const topOffset = top - topbarHeight;
      const height = topOffset + oHeight + topbarHeight;
      overlay.style.top = vHeight < height ? `${topOffset - (height - vHeight)}px` : `${topOffset}px`;
    }
  }
}

function checkActiveRoute(item) {
  return route.path === item.to;
}
</script>

<template>
  <li ref="menuItemRef" :class="{ 'layout-root-menuitem': root, 'active-menuitem': isStatic || isOverlay ? !root && isActiveMenu : isActiveMenu }">
    <div @click="itemClick($event, item, index)" v-if="root && item.visible !== false" class="layout-menuitem-root-text">
      <i :class="item.icon" class="layout-menuitem-root-icon"></i>
      <span>{{ item.label }}</span>
    </div>
    <NuxtLink
      v-if="(!item.to || item.items) && item.visible !== false"
      :to="item.url"
      @click="itemClick($event, item, index)"
      :class="item.class"
      :target="item.target"
      tabindex="0"
      @mouseenter="onMouseEnter"
      v-tooltip.hover="isSlim && root && !isActiveMenu ? item.label : null"
    >
      <i :class="item.icon" class="layout-menuitem-icon"></i>
      <span class="layout-menuitem-text">{{ item.label }}</span>
      <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items"></i>
    </NuxtLink>
    <NuxtLink
      v-if="item.to && !item.items && item.visible !== false"
      @click="itemClick($event, item, index)"
      :class="[item.class, { 'active-route': checkActiveRoute(item) }]"
      tabindex="0"
      :to="item.to"
      @mouseenter="onMouseEnter"
      v-tooltip.hover="(isSlim || isSlimPlus) && root && !isActiveMenu ? item.label : null"
    >
      <i :class="item.icon" class="layout-menuitem-icon"></i>
      <span class="layout-menuitem-text">{{ item.label }} </span>
      <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items"></i>
    </NuxtLink>

    <ul ref="subMenuRef" :class="{ 'layout-root-submenulist': root }" v-if="item.items && item.visible !== false">
      <AppMenuItem v-for="(child, i) in item.items" :key="child" :index="i" :item="child" :parentItemKey="itemKey" :root="false"></AppMenuItem>
    </ul>
  </li>
</template>

<style scoped>
.layout-menuitem-root-icon {
  font-size: 2rem;
}
.layout-menuitem-root-text {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  font-weight: 400 !important;
  cursor: pointer;
  user-select: none;

  text-transform: none !important;

  border: 1px solid #fff;
  border-radius: 8px;
  margin: 0.5rem 0;
  padding: 0.5rem 1rem !important;

  & > span {
    font-size: 18px !important;
    font-family: 'Poppins', sans-serif !important;
  }
}
.layout-root-menuitem {
  display: flex;
  flex-direction: column;
  position: relative;
}
</style>
