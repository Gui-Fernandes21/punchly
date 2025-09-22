<script setup lang="ts">
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

const business = useState<Tables<'business'> | null>('business_data');


</script>

<template>
  <ul class="layout-menu">
    <div class="menus">
      <h1 class="text-center text-2xl font-bold text-stone-200 mt-4 mb-12">{{ business?.name }}</h1>
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
