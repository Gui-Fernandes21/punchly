<script setup lang="ts">
import { computed, ref } from 'vue';

const { onMenuToggle, layoutConfig, tabs, closeTab, isDarkTheme } = useLayout();

const route = useRoute();
const business = useState<Tables<'business'> | null>('business_data');

// function onCloseTab(index) {
//   if (tabs.value.length > 1) {
//     if (index === tabs.value.length - 1) router.push(tabs.value[tabs.value.length - 2].to);
//     else router.push(tabs.value[index + 1].to);
//   } else {
//     router.push('/');
//   }
//   closeTab(index);
// }

const businessLogo = computed(() => business.value?.logo_url && route.path.startsWith('/business') ? business.value.logo_url : '/images/logo/high-quality_punchly-logo.svg');

const avatar = computed(() => {
  const path = '/layout/images/';

  // let avatar;
  // if (user.value?.photo_url) {
  //   avatar = user.value?.photo_url;
  // } else {
  //   avatar = path + 'menutz-logo.png';
  // }

  return path + 'unknown-user-nobg.png';
});

// const handleProfile = () => {
//   console.log(user.value);
// };

const showProfileDrawer = ref(false);

const closeProfileDrawer = () => {
  showProfileDrawer.value = false;
};

const handleLogout = async () => {
  const supabase = useSupabaseClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error.message);
  } else {
    useState('customer_wallet', () => null);
    useState('business_data', () => null);
    useState('wallet_data', () => null);

    if (route.path.startsWith('/client')) {
      navigateTo('/client/login');
    } else if (route.path.startsWith('/business')) {
      navigateTo('/business/login');
    }
  }
};
</script>

<template>
  <div class="layout-topbar">
    <button ref="menubutton" class="topbar-menubutton" type="button" @click="onMenuToggle" v-if="route.path.startsWith('/business')">
      <span></span>
    </button>

    <!-- <ul class="topbar-menu">
      <li v-for="(item, i) in tabs" :key="i">
        <NuxtLink :to="item.to" :exact-active-class="'active-route'">
          <span> {{ item.label }}</span>
        </NuxtLink>
        <i class="pi pi-times" @click="onCloseTab(i)"></i>
      </li>
    </ul> -->

    <Drawer v-model:visible="showProfileDrawer" position="right" class="!w-full md:!w-80 lg:!w-[30rem]">
      <template #header>
        <Avatar :image="avatar" shape="circle" class="size-28" />
        <div class="flex flex-col items-center gap-1">
          <!-- <span class="font-readex font-extralight text-3xl">{{ username }}</span>
              <span class="font-readex font-extralight text-md">{{ userEmail }}</span> -->
        </div>
      </template>
      <template #default>
        <p class="font-raleway font-semibold text-lg">About</p>
        <!-- <p class="p-4">{{ userBio }}</p> -->
      </template>
      <template #footer>
        <div class="flex items-center gap-2">
          <NuxtLink to="/settings/profile" class="flex p-2 rounded-border items-center hover:bg-emphasis transition-colors duration-150 cursor-pointer">
            <Button label="Profile Settings" icon="pi pi-cog" class="flex-auto" @click="closeProfileDrawer"></Button>
          </NuxtLink>
        </div>
      </template>
    </Drawer>

    <div class="navigation-container" v-if="!route.path.includes('/dashboard')">
      <NuxtLink to="/business/dashboard" class="navigation-link"> <i class="pi pi-chevron-left"></i> back </NuxtLink>
    </div>



    <div class="topbar-profile" v-if="route.path.includes('/dashboard')">
      <img class="topbar-profile-button" :src="businessLogo" alt="business_logo" />

      <!-- <button type="button" 
        class="topbar-profile-button" 
        @click="showProfileDrawer = true" 
        v-styleclass="{ 
          selector: '@next', 
          enterFromClass: 'hidden', 
          enterActiveClass: 'animate-scalein', 
          leaveToClass: 'hidden', 
          leaveActiveClass: 'animate-fadeout', 
          hideOnOutsideClick: true 
        }"
      >
        <ClientOnly>
        <img alt="avatar" :src="avatar" class="rounded-full" draggable="false" />
          <span class="profile-details">
            <span class="font-raleway font-light text-xl profile-name">{{ username }}</span>
          </span>
          <i class="pi pi-angle-down"></i>
        </ClientOnly>
      </button>     -->
    </div>
    
    <Button class="logout-btn" @click="handleLogout">
      <i class="pi pi-sign-out"></i>
      Sign Out
    </Button>
  </div>
</template>

<style scoped>
.layout-topbar {
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap !important;
}
.logout-btn {
  margin: 0;
  display: block;
  width: auto;

  border: 1px solid #fff;
  background: transparent;

  &:hover, &:focus {
    background: #fff;
    color: #078590;
  }
}
.navigation-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.navigation-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: white;
  background: #078590;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  text-decoration: none;

  font-size: 1.1rem;
}

.topbar-profile {
  background: #fff;
  border-radius: 50%;
  width: 5rem;
  margin: 1rem;
}
.topbar-profile-button {
  width: 100%;
  padding: 0 !important;
}

@media (min-width: 1024px) {
  .layout-topbar {
    height: 6rem;
    padding-left: 0;
  }
}
</style>
