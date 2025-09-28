<script setup>
import { computed, ref } from 'vue';

// import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';

const { isDarkTheme } = useLayout();

const router = useRouter();

const stats = ref(null);
const features = ref(null);
const pricing = ref(null);

useHead({
  title: 'Punchly - Digital Loyalty Cards Made Simple',
  meta: [{ name: 'description', content: 'Transform your business with digital loyalty cards. Punchly helps businesses create, manage, and track customer loyalty programs with ease.' }]
});

definePageMeta({
  layout: 'landing'
});

function navigateToLogin() {
  router.push('/login');
}

function navigateToDashboard() {
  router.push('/');
}

const backgroundStyle = computed(() => {
  let path = '/svg/landing/';
  let image = isDarkTheme.value ? 'line-effect-dark.svg' : 'line-effect.svg';

  return { 'background-image': `url(${path + image})` };
});

function scrollTo(element) {
  setTimeout(() => {
    element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }, 200);
}
</script>

<template>
  <div class="bg-surface-50 dark:bg-surface-950 min-h-screen w-screen">
    <div class="landing-wrapper">
      <div :style="backgroundStyle" class="bg-no-repeat bg-cover bg-bottom">
        <div class="flex items-center justify-between px-8 sm:px-20 py-12">
          <a @click="navigateToDashboard" class="cursor-pointer flex items-center gap-3">
            <img src="/images/logo/punchly-logo.png" alt="Punchly Logo" class="h-8 w-8" />
            <span class="text-2xl font-bold" style="color: #14abb7">PUNCHLY</span>
          </a>
          <div class="relative">
            <Button
              rounded
              class="cursor-pointer lg:!hidden select-none w-12 h-12 !text-color"
              v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', leaveToClass: 'hidden', hideOnOutsideClick: 'true' }"
            >
              <i class="pi pi-bars !text-4xl"></i>
            </Button>
            <div
              id="landing-menu"
              class="hidden lg:block absolute right-0 top-auto lg:static z-10 shadow lg:shadow-none w-60 lg:w-auto bg-surface-0 dark:bg-surface-900 lg:bg-surface-50 dark:lg:bg-surface-950 origin-top p-4 lg:p-0"
              style="border-radius: 14px"
            >
              <ul class="flex flex-col lg:flex-row m-0 p-0 list-none text-2xl lg:text-base">
                <li>
                  <a
                    class="block p-4 cursor-pointer font-bold text-muted-color hover:text-color transition-colors duration-300"
                    @click="scrollTo(features)"
                    v-styleclass="{ selector: '#landing-menu', leaveActiveClass: 'animate-fadeout', leaveToClass: 'hidden' }"
                    >FEATURES</a
                  >
                </li>
                <li>
                  <a
                    class="block p-4 cursor-pointer font-bold text-muted-color hover:text-color transition-colors duration-300"
                    @click="scrollTo(stats)"
                    v-styleclass="{ selector: '#landing-menu', leaveActiveClass: 'animate-fadeout', leaveToClass: 'hidden' }"
                    >HOW IT WORKS</a
                  >
                </li>
                <li>
                  <a
                    class="block p-4 cursor-pointer font-bold text-muted-color hover:text-color transition-colors duration-300"
                    @click="scrollTo(pricing)"
                    v-styleclass="{ selector: '#landing-menu', leaveActiveClass: 'animate-fadeout', leaveToClass: 'hidden' }"
                    >PRICING</a
                  >
                </li>
                <li>
                  <a class="block p-4 cursor-pointer font-bold text-muted-color hover:text-color transition-colors duration-300" @click="navigateToLogin">SIGN IN</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row gap-8 items-center justify-between px-8 sm:px-20 py-20 overflow-hidden">
          <div class="flex-1 animate-fadein animate-duration-1000">
            <span class="font-bold text-6xl lg:text-7xl mt-0 mb-8 block">Digital Loyalty Cards</span>
            <span class="font-bold text-6xl lg:text-7xl mt-0 mb-8 block" style="color: #14abb7">Made Simple</span>
            <p class="text-2xl lg:text-3xl mb-8 leading-normal text-muted-color">Transform your business with digital loyalty programs that customers love and businesses trust.</p>
            <div class="flex gap-4 flex-wrap">
              <Button label="GET STARTED FREE" @click="navigateToLogin" style="background-color: #14abb7; border-color: #14abb7" class="text-white"></Button>
              <Button label="VIEW DEMO" severity="secondary" outlined></Button>
            </div>
          </div>
          <div class="flex-1">
            <img alt="Punchly App Preview" src="/images/pages/no-image.png" class="animate-fadeinright animate-ease-in-out animate-duration-1000 w-full rounded-2xl shadow" />
          </div>
        </div>
        <div ref="stats" class="p-8 sm:p-20">
          <div class="flex flex-col items-center mb-16">
            <span class="font-bold text-muted-color text-2xl mb-4">How It Works</span>
            <h2 class="font-bold text-5xl lg:text-6xl my-0 text-center">Simple Steps to Success</h2>
          </div>
          <div class="flex flex-col xl:flex-row justify-center gap-8">
            <div class="bg-zinc-50 text-center py-7 px-5 shadow" style="border-radius: 14px">
              <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style="background-color: #14abb7">
                <Icon name="material-symbols:store" class="text-white text-4xl" />
              </div>
              <div class="text-xl text-muted-color mb-4">Step 1</div>
              <h3 class="mt-0 mb-4 font-bold text-4xl">Create Your Store</h3>
              <p class="leading-normal mb-8 text-muted-color">Set up your business profile and customize your loyalty card design in <strong>minutes</strong>.</p>
              <Button icon="pi pi-arrow-right" label="Get Started" class="p-button-text" iconPos="right" style="color: #14abb7"></Button>
              <div class="mt-8 xl:pt-8 flex justify-center">
                <img alt="intro image" src="/svg/landing/create-store.svg" class="w-[50%]" />
              </div>
            </div>
            <div class="flex flex-col md:flex-row xl:flex-col gap-8">
              <div class="flex-1 bg-zinc-50 flex flex-col xl:flex-row xl:items-center justify-between py-7 px-5 shadow gap-8" style="border-radius: 14px">
                <div class="flex-1 text-center xl:text-right">
                  <img alt="intro image" src="/svg/landing/share-qr.svg" class="w-[75%]" />
                </div>
                <div class="text-center xl:text-right flex-1">
                  <div class="text-xl text-muted-color mb-4">Step 2</div>
                  <h3 class="mt-0 mb-4 font-bold text-4xl">Share QR Code</h3>
                  <p class="leading-normal mb-8 text-muted-color">Print and display your unique QR code for customers to scan and join your loyalty program.</p>
                  <Button icon="pi pi-arrow-right" label="Learn More" class="p-button-text" iconPos="right" style="color: #14abb7"></Button>
                </div>
              </div>
              <div class="flex-1 bg-zinc-50 flex flex-col xl:flex-row xl:items-center justify-between py-7 px-5 shadow gap-8" style="border-radius: 14px">
                <div class="text-center xl:text-left flex-1">
                  <div class="text-xl text-muted-color mb-4">Step 3</div>
                  <h3 class="mt-0 mb-4 font-bold text-4xl">Reward Customers</h3>
                  <p class="leading-normal mb-8 text-muted-color">Punch cards digitally and watch customer loyalty grow with automated rewards.</p>
                  <Button icon="pi pi-arrow-right" label="See Rewards" class="p-button-text" iconPos="right" style="color: #14abb7"></Button>
                </div>
                <div class="flex-1 text-center xl:text-right">
                  <img alt="intro image" src="/svg/landing/reward-customers.svg" class="w-[80%]" />
                </div>
              </div>
            </div>
            <div class="bg-zinc-50 text-center py-7 px-5 shadow" style="border-radius: 14px">
              <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style="background-color: #14abb7">
                <Icon name="material-symbols:analytics-outline" class="text-white text-4xl" />
              </div>
              <div class="text-xl text-muted-color mb-4">Step 4</div>
              <h3 class="mt-0 mb-4 font-bold text-4xl">Track Analytics</h3>
              <p class="line-height-3 mb-5 text-color-secondary">Monitor customer engagement and program performance with detailed insights.</p>
              <Button icon="pi pi-arrow-right" label="View Analytics" class="p-button-text" iconPos="right" style="color: #14abb7"></Button>
              <div class="mt-8 xl:pt-8 flex justify-center">
                <img alt="intro image" src="/svg/landing/tracking-analytics.svg" class="w-[75%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref="features" class="px-8 sm:px-20 py-20 bg-zinc-50">
        <div class="text-center mb-16">
          <h2 class="font-bold text-5xl lg:text-6xl mb-4">Why Choose Punchly?</h2>
          <p class="text-xl text-muted-color max-w-2xl mx-auto">Everything you need to build lasting customer relationships through digital loyalty programs.</p>
        </div>
        <div class="flex flex-col lg:flex-row justify-center gap-8">
          <div>
            <div class="p-12 flex items-center justify-center mb-8" style="border-radius: 14px; border-top-left-radius: 5rem; background: linear-gradient(135deg, #14abb7 0%, #0e8a94 100%)">
              <Icon name="material-symbols:rocket-launch" class="text-white text-6xl lg:text-8xl" />
            </div>
            <h3 class="mt-0 mb-8 font-bold text-4xl">Quick Setup</h3>
            <p class="leading-normal text-muted-color">Get your loyalty program running in under 5 minutes. No technical knowledge required - just simple, intuitive tools.</p>
          </div>

          <div>
            <div class="p-12 flex items-center justify-center mb-8" style="border-radius: 14px; background: linear-gradient(135deg, #14abb7 0%, #0e8a94 100%)">
              <Icon name="material-symbols:mobile-friendly" class="text-white text-6xl lg:text-8xl" />
            </div>
            <h3 class="mt-0 mb-8 font-bold text-4xl">Mobile-First</h3>
            <p class="leading-normal text-muted-color">Designed for smartphones with intuitive touch interfaces. Customers can access their loyalty cards anytime, anywhere.</p>
          </div> 
          <div>
            <div class="p-12 flex items-center justify-center mb-8" style="border-radius: 14px; border-bottom-right-radius: 5rem; background: linear-gradient(135deg, #14abb7 0%, #0e8a94 100%)">
              <Icon name="material-symbols:security" class="text-white text-6xl lg:text-8xl" />
            </div>
            <h3 class="mt-0 mb-8 font-bold text-4xl">Secure & Reliable</h3>
            <p class="leading-normal text-muted-color">Enterprise-grade security ensures customer data is protected. Built on reliable infrastructure for 99.9% uptime.</p>
          </div>
        </div>
      </div>
      <div class="px-8 sm:px-20 py-20 bg-surface-50 dark:bg-surface-950 flex flex-wrap gap-8 items-center justify-between">
        <div class="flex-1">
          <div class="text-4xl lg:text-5xl font-bold mb-4">Ready to Transform Your Business?</div>
          <p class="text-xl text-muted-color">Join thousands of businesses already using Punchly to build customer loyalty.</p>
        </div>
        <div class="flex gap-4">
          <Button label="Start Free Trial" @click="navigateToLogin" style="background-color: #14abb7; border-color: #14abb7" class="text-white text-lg px-6 py-3"></Button>
        </div>
      </div>
      <div ref="pricing" class="px-8 sm:px-20 py-20 bg-surface-0 dark:bg-surface-900">
        <div class="text-center mb-16">
          <h2 class="font-bold text-5xl lg:text-6xl mb-4">Simple, Transparent Pricing</h2>
          <p class="text-xl text-muted-color">Choose the plan that fits your business needs. No hidden fees, cancel anytime.</p>
        </div>
        <div class="flex flex-col lg:flex-row justify-center gap-8 max-w-5xl mx-auto">
          <div class="shadow bg-surface-0 dark:bg-surface-900 p-8 text-center rounded-2xl border-2 border-surface-200 dark:border-surface-700">
            <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style="background-color: #f3f4f6">
              <Icon name="material-symbols:rocket-launch-outline" class="text-4xl" style="color: #14abb7" />
            </div>
            <div class="text-2xl font-bold mb-4">Starter</div>
            <div class="mb-8">
              <span class="text-6xl font-bold" style="color: #14abb7">Free</span>
              <div class="text-lg text-muted-color">Perfect to get started</div>
            </div>
            <Button label="GET STARTED" @click="navigateToLogin" class="w-full mb-8 p-3" style="background-color: #14abb7; border-color: #14abb7"></Button>
            <ul class="list-none p-0 m-0 text-left">
              <li class="flex items-center mb-4">
                <i class="pi pi-check-circle text-xl mr-3" style="color: #14abb7"></i>
                <span>Up to 100 customers</span>
              </li>
              <li class="flex items-center mb-4">
                <i class="pi pi-check-circle text-xl mr-3" style="color: #14abb7"></i>
                <span>1 loyalty program</span>
              </li>
              <li class="flex items-center mb-4">
                <i class="pi pi-check-circle text-xl mr-3" style="color: #14abb7"></i>
                <span>Basic analytics</span>
              </li>
              <li class="flex items-center">
                <i class="pi pi-check-circle text-xl mr-3" style="color: #14abb7"></i>
                <span>Email support</span>
              </li>
            </ul>
          </div>
          <div class="shadow bg-surface-0 dark:bg-surface-900 p-8 text-center rounded-2xl border-2 relative" style="border-color: #14abb7">
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-sm font-bold text-white" style="background-color: #14abb7">MOST POPULAR</div>
            <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style="background-color: #14abb7">
              <Icon name="material-symbols:business-center" class="text-white text-4xl" />
            </div>
            <div class="text-2xl font-bold mb-4">Professional</div>
            <div class="mb-8">
              <span class="text-6xl font-bold" style="color: #14abb7">$29</span>
              <span class="text-xl text-muted-color">/month</span>
              <div class="text-lg text-muted-color">For growing businesses</div>
            </div>
            <Button label="START TRIAL" @click="navigateToLogin" class="w-full mb-8 p-3" style="background-color: #14abb7; border-color: #14abb7"></Button>
            <ul class="list-none p-0 m-0 text-left">
              <li class="flex items-center mb-4">
                <i class="pi pi-check-circle text-xl mr-3" style="color: #14abb7"></i>
                <span>Up to 1,000 customers</span>
              </li>
              <li class="flex items-center mb-4">
                <i class="pi pi-check-circle text-xl mr-3" style="color: #14abb7"></i>
                <span>Unlimited programs</span>
              </li>
              <li class="flex items-center mb-4">
                <i class="pi pi-check-circle text-xl mr-3" style="color: #14abb7"></i>
                <span>Advanced analytics</span>
              </li>
              <li class="flex items-center mb-4">
                <i class="pi pi-check-circle text-xl mr-3" style="color: #14abb7"></i>
                <span>Custom branding</span>
              </li>
              <li class="flex items-center">
                <i class="pi pi-check-circle text-xl mr-3" style="color: #14abb7"></i>
                <span>Priority support</span>
              </li>
            </ul>
          </div>
          <div class="shadow bg-surface-0 dark:bg-surface-900 p-8 text-center rounded-2xl border-2 border-surface-200 dark:border-surface-700">
            <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style="background-color: #f3f4f6">
              <Icon name="material-symbols:enterprise" class="text-4xl" style="color: #14abb7" />
            </div>
            <div class="text-2xl font-bold mb-4">Enterprise</div>
            <div class="mb-8">
              <span class="text-6xl font-bold" style="color: #14abb7">$99</span>
              <span class="text-xl text-muted-color">/month</span>
              <div class="text-lg text-muted-color">For large organizations</div>
            </div>
            <Button label="CONTACT SALES" @click="navigateToLogin" class="w-full mb-8 p-3" style="background-color: #14abb7; border-color: #14abb7"></Button>
            <ul class="list-none p-0 m-0 text-left">
              <li class="flex items-center mb-4">
                <i class="pi pi-check-circle text-xl mr-3" style="color: #14abb7"></i>
                <span>Unlimited customers</span>
              </li>
              <li class="flex items-center mb-4">
                <i class="pi pi-check-circle text-xl mr-3" style="color: #14abb7"></i>
                <span>Multi-location support</span>
              </li>
              <li class="flex items-center mb-4">
                <i class="pi pi-check-circle text-xl mr-3" style="color: #14abb7"></i>
                <span>API access</span>
              </li>
              <li class="flex items-center mb-4">
                <i class="pi pi-check-circle text-xl mr-3" style="color: #14abb7"></i>
                <span>White-label solution</span>
              </li>
              <li class="flex items-center">
                <i class="pi pi-check-circle text-xl mr-3" style="color: #14abb7"></i>
                <span>Dedicated support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="px-8 sm:px-20 py-20 bg-gray-900 flex flex-col md:flex-row md:items-start gap-8" style="border-top-left-radius: 14px; border-top-right-radius: 14px">
        <div class="flex items-center flex-1">
          <img alt="Punchly Logo" src="/images/logo/punchly-logo.png" class="w-16" />
          <span class="text-white text-5xl font-bold ml-2">Punchly</span>
        </div>
        <div class="flex-1">
          <div class="text-xl text-gray-400 mb-6">PRODUCT</div>
          <ul class="list-none p-0 m-0">
            <li class="mb-4">
              <a class="cursor-pointer text-white text-xl hover:text-gray-300 transition-colors">Digital Loyalty Cards</a>
            </li>
            <li class="mb-4">
              <a class="cursor-pointer text-white text-xl hover:text-gray-300 transition-colors">QR Code Generator</a>
            </li>
            <li class="mb-4">
              <a class="cursor-pointer text-white text-xl hover:text-gray-300 transition-colors">Customer Analytics</a>
            </li>
            <li class="mb-4">
              <a class="cursor-pointer text-white text-xl hover:text-gray-300 transition-colors">Reward Management</a>
            </li>
            <li>
              <a class="cursor-pointer text-white text-xl hover:text-gray-300 transition-colors">Mobile App</a>
            </li>
          </ul>
        </div>
        <div class="flex-1">
          <div class="text-xl text-gray-400 mb-6">COMPANY</div>
          <ul class="list-none p-0 m-0">
            <li class="mb-4">
              <a class="cursor-pointer text-white text-xl hover:text-gray-300 transition-colors">About Us</a>
            </li>
            <li class="mb-4">
              <a class="cursor-pointer text-white text-xl hover:text-gray-300 transition-colors">Blog</a>
            </li>
            <li class="mb-4">
              <a class="cursor-pointer text-white text-xl hover:text-gray-300 transition-colors">Help Center</a>
            </li>
            <li class="mb-4">
              <a class="cursor-pointer text-white text-xl hover:text-gray-300 transition-colors">Privacy Policy</a>
            </li>
            <li>
              <a class="cursor-pointer text-white text-xl hover:text-gray-300 transition-colors">Terms of Service</a>
            </li>
          </ul>
        </div>
        <div class="flex-1">
          <div class="text-xl text-gray-400 mb-6">CONNECT</div>
          <div class="flex gap-4 mb-6">
            <a href="#" class="w-12 h-12 rounded-full flex items-center justify-center" style="background-color: #14abb7">
              <Icon name="material-symbols:mail-outline" class="text-white text-xl" />
            </a>
            <a href="#" class="w-12 h-12 rounded-full flex items-center justify-center" style="background-color: #14abb7">
              <i class="pi pi-twitter text-white text-xl"></i>
            </a>
            <a href="#" class="w-12 h-12 rounded-full flex items-center justify-center" style="background-color: #14abb7">
              <i class="pi pi-linkedin text-white text-xl"></i>
            </a>
          </div>
          <div class="text-gray-400 text-sm">
            <p class="mb-2">© 2025 Punchly. All rights reserved.</p>
            <p class="text-xs">Making loyalty programs simple for everyone.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.p-button-text {
  width: auto !important;
}

.landing-wrapper {
  min-height: 100vh;
}

/* Custom scrollbar for smooth sections */
html {
  scroll-behavior: smooth;
}

/* Brand color utilities */
.text-brand {
  color: #14abb7;
}

.bg-brand {
  background-color: #14abb7;
}

/* Hover effects */
.hover-lift {
  transition: transform 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
}

/* Custom animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
