<script setup>
import { ref } from 'vue';

// const { 
//   logout, 
//   triggerLogout 
// } = useFirebaseAuth();

const router = useRouter();

const askLogout = async () => {
  // triggerLogout();
}

const model = ref([
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    to: '/business/dashboard',
  },
  {
    label: 'Customize Loyalty Card',
    icon: 'pi pi-map',
    to: '/business/customize-card',
  },
  {
    label: 'Print Store QR Code',
    icon: 'pi pi-tag',
    to: '/business/printqr',
  },
  {
    label: 'Contact Support',
    icon: 'pi pi-ticket',
    to: '/business/support',
  },
]);
// const settings = ref([
//   {
//     label: 'Configurations',
//     icon: 'pi pi-sliders-v',
//     to: '/configurations',
//   },
//   {
//     label: 'Settings',
//     icon: 'pi pi-cog',
//     to: '/settings',
//   },
//   {
//     label: 'Sign Out',
//     icon: 'pi pi-power-off',
//     command: (ctx) => {
//       askLogout();
//     }
//   }
// ]);

</script>

<template>
  <ul class="layout-menu">
    <div class="menus">
      <template v-for="(item, i) in model" :key="item">
        <AppMenuItem :item="item" root :index="i" />
  
        <li class="menu-separator"></li>
      </template>
    </div>
    <!-- <div class="settings">
      <template v-for="(setting, i) in settings" :key="setting">
        <AppMenuItem :item="setting" root :index="i" />
        <AppMenuItem :item="settings" root :index="model.length" />
  
        <li class="menu-separator"></li>
      </template>

      <li class="menu-separator"></li>
    </div> -->
  </ul>
</template>

<style lang="scss" scoped></style>
