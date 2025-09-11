<script setup>
import { computed, ref } from 'vue';

const { 
  onMenuToggle, 
  layoutConfig, 
  tabs, 
  closeTab, 
  isDarkTheme 
} = useLayout();


// const { user } = useUser();
const toast = useToast();
// const router = useRouter();

// const { restaurant } = useRestaurant();

// function onCloseTab(index) {
//   if (tabs.value.length > 1) {
//     if (index === tabs.value.length - 1) router.push(tabs.value[tabs.value.length - 2].to);
//     else router.push(tabs.value[index + 1].to);
//   } else {
//     router.push('/');
//   }
//   closeTab(index);
// }

// const restaurantLogo = computed(() => {
//   if (!restaurant.value) return '/layout/images/menutz-logo.png';
//   return restaurant.value.logo;
// });

const avatar = computed(() => {
  const path = '/layout/images/';

  // let avatar;
  // if (user.value?.photo_url) {
  //   avatar = user.value?.photo_url;
  // } else {
  //   avatar = path + 'menutz-logo.png';
  // }

  return path + 'menutz-logo.png';
});

// const username = computed(() => {
//   return user.value?.display_name ? user.value.display_name : 'Unknown User';
// });

// const userEmail = computed(() => {
//   if (user.value?.email) {
//     return user.value.email;
//   } else {
//     return 'Unknown Email';
//   }
// });

// const userBio = computed(() => {
//   if (user.value?.biography) {
//     return user.value.biography;
//   } else {
//     return 'No bio provided';
//   }
// });

const handleProfile = () => {
  console.log(user.value);
};

const showProfileDrawer = ref(false);
const closeProfileDrawer = () => {
  showProfileDrawer.value = false;
}

</script>

<template>
  <div class="layout-topbar">
    <NuxtLink to="/" class="app-logo">
      <h4 class="font-bold lg:leading-normal leading-normal text-2xl lg:text-6xl mb-5 text-white">
        <span class="font-playwrite text-white text-3xl inline-flex py-3">Menutz</span>
      </h4>
    </NuxtLink>
    
    <button ref="menubutton" class="topbar-menubutton" type="button" @click="onMenuToggle">
      <span></span>
    </button>

    <!-- <img class="restaurant-logo" :src="restaurantLogo" draggable="false" alt="Restaurant's Logo"> -->

    <ul class="topbar-menu">
      <li v-for="(item, i) in tabs" :key="i">
        <NuxtLink :to="item.to" :exact-active-class="'active-route'">
          <span> {{ item.label }}</span>
        </NuxtLink>
        <i class="pi pi-times" @click="onCloseTab(i)"></i>
      </li>
    </ul>

    <Drawer v-model:visible="showProfileDrawer" position="right" class="!w-full md:!w-80 lg:!w-[30rem]">
        <template #header>
          <Avatar :image="avatar" shape="circle" class="size-28"/>
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

    <div class="topbar-profile">
      <img class="topbar-profile-button"  src="/images/logo/punchly-logo.png" alt="">
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
  </div>
</template>

<style scoped>
.restaurant-logo {
  position: absolute;
  left: calc(50% - 3.5rem);
  top: calc(50% - 1.5rem);
  width: 6rem;
  height: 6rem;
  border-radius: 5px;
  object-fit: cover;
  margin-right: 10px;

  border-color: rgb(240, 240, 240);
  border-width: .16rem;
  border-style: solid;

  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}
.topbar-profile {
  background: #fff;
  border-radius: 50%;
  width: 5rem;
}
.topbar-profile-button {
  width: 100%;
  padding: 0 !important;
}
</style>