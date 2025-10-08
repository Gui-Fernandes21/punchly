<script setup lang="ts">
import { computed, ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';

const { isDarkTheme } = useLayout();

const stats = ref(null);
const features = ref(null);
const FAQ = ref(null);
const contact = ref(null);

useHead({
  title: 'Punchly - Digital Loyalty Cards Made Simple',
  meta: [{ name: 'description', content: 'Transform your business with digital loyalty cards. Punchly helps businesses create, manage, and track customer loyalty programs with ease.' }]
});

useSeoMeta({
  title: 'Digital Loyalty Cards for Small Businesses',
  description: 'Replace paper punch cards with QR rewards. Scan, stamp, redeem.',
  twitterCard: 'summary_large_image',
  ogImage: {
    url: 'https://punchly.co/__og-image__/image/og.png',
    width: 1200,
    height: 600,
    alt: 'Punchly - Digital Loyalty Cards Made Simple'
  }
});

defineOgImageComponent('Landing', {
  eyebrow: 'Introducing',
  title: 'Punchly - Digital Loyalty Cards Made Simple',
  subtitle: 'Replace paper punch cards with QR rewards. Scan, stamp, redeem.',
  badge: 'MVP',
  url: 'punchly.co'
});

definePageMeta({
  layout: 'full-page'
});

const toast = useToast();
const route = useRoute();
const config = useRuntimeConfig();

const waitlistModal = ref(false);
const successModal = ref(false);
const openHamburger = ref(false);

const initialValues = ref({
  message: '',
  email: '',
  name: ''
});

const text = 'Replace paper punch cards with QR-based rewards.';
const e = (s: string) => encodeURIComponent(s);

const backgroundStyle = computed(() => {
  let path = '/svg/landing/';
  let image = isDarkTheme.value ? 'line-effect-dark.svg' : 'line-effect.svg';

  return { 'background-image': `url(${path + image})` };
});

const url = computed(() => new URL(route.fullPath, config.public.appUrl).toString());

// Common share links
const links = computed(() => ({
  linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${e(url.value)}`,
  x: `https://twitter.com/intent/tweet?url=${e(url.value)}&text=${e(text)}`,
  whatsapp: `https://wa.me/?text=${e(text)}%20${e(url.value)}`,
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${e(url.value)}`
}));

function toggle() {
  openHamburger.value = !openHamburger.value;
}

function onDocClick(e: MouseEvent) {
  // close when clicking outside
  const m = document.getElementById('landing-menu');
  const b = document.getElementById('landing-trigger');
  if (m && b && !m.contains(e.target as Node) && !b.contains(e.target as Node)) openHamburger.value = false;
}

function openWaitlistModal() {
  waitlistModal.value = true;
}

function navigateToDashboard() {
  navigateTo('/');
}

function scrollTo(element: HTMLElement | null) {
  setTimeout(() => {
    element?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }, 200);
}

const resolver = ref(
  zodResolver(
    z.object({
      message: z.string().min(1, { message: 'Message is required.' }),
      email: z.string().email({ message: 'Email is invalid.' }),
      name: z.string().min(1, { message: 'Name is required.' })
    })
  )
);

function onFormSubmit({ valid }: { valid: boolean }) {
  console.log('test');
  if (!valid) {
    toast.add({ severity: 'error', summary: 'Form is invalid.', life: 3000 });
    return;
  }

  const { error } = useFetch('https://formspree.io/f/xkgqvroe', {
    method: 'POST',
    body: initialValues.value
  });

  if (error.value) {
    return toast.add({ severity: 'error', summary: 'Error sending message.', life: 3000 });
  }

  toast.add({ severity: 'success', summary: 'Message sent successfully!', life: 3000 });

  initialValues.value = { message: '', email: '', name: '' };
}

function handleSuccess() {
  successModal.value = true;
  waitlistModal.value = false;
}

onMounted(() => document.addEventListener('click', onDocClick));
onBeforeUnmount(() => document.removeEventListener('click', onDocClick));
</script>

<template>
  <div class="bg-surface-50 dark:bg-surface-950 min-h-screen">
    <div class="landing-wrapper">
      <div :style="backgroundStyle" class="bg-no-repeat bg-cover bg-bottom">
        <div class="flex items-center justify-between px-8 sm:px-20 py-12">
          <a @click="navigateToDashboard" class="cursor-pointer flex items-center gap-3">
            <img src="/images/logo/punchly-logo.png" alt="Punchly Logo" class="h-20 w-20" />
            <!-- <span class="brand-name text-2xl font-bold" style="color: #14abb7">Punchly</span> -->
          </a>
          <div class="relative">
            <Button rounded class="cursor-pointer lg:!hidden select-none w-12 h-12 !text-color !mt-0" id="landing-trigger" @click="toggle">
              <i class="pi pi-bars !text-2xl"></i>
            </Button>

            <Transition enter-from-class="opacity-0 scale-95" enter-active-class="transition duration-150 ease-out transform" leave-to-class="opacity-0 scale-95" leave-active-class="transition duration-100 ease-in transform">
              <div id="landing-menu" v-show="openHamburger" class="lg:block absolute right-0 top-auto lg:static shadow lg:shadow-none w-60 lg:w-auto bg-slate-50 lg:bg-slate-50 dark:lg:bg-slate-950 origin-top p-4 lg:p-0" style="border-radius: 14px">
                <ul class="flex flex-col lg:flex-row m-0 p-0 list-none text-xl lg:text-base">
                  <li>
                    <a
                      class="block p-4 cursor-pointer text-muted-color hover:text-color transition-colors duration-300"
                      @click="scrollTo(features)"
                      v-styleclass="{ selector: '#landing-menu', leaveActiveClass: 'animate-fadeout', leaveToClass: 'hidden' }"
                      >FEATURES</a
                    >
                  </li>
                  <li>
                    <a
                      class="block p-4 cursor-pointer text-muted-color hover:text-color transition-colors duration-300"
                      @click="scrollTo(stats)"
                      v-styleclass="{ selector: '#landing-menu', leaveActiveClass: 'animate-fadeout', leaveToClass: 'hidden' }"
                      >HOW IT WORKS</a
                    >
                  </li>
                  <li>
                    <a class="block p-4 cursor-pointer text-muted-color hover:text-color transition-colors duration-300" @click="scrollTo(FAQ)" v-styleclass="{ selector: '#landing-menu', leaveActiveClass: 'animate-fadeout', leaveToClass: 'hidden' }"
                      >FAQ</a
                    >
                  </li>
                  <li>
                    <a
                      class="block p-4 cursor-pointer text-muted-color hover:text-color transition-colors duration-300"
                      @click="scrollTo(contact)"
                      v-styleclass="{ selector: '#landing-menu', leaveActiveClass: 'animate-fadeout', leaveToClass: 'hidden' }"
                      >Contact Us</a
                    >
                  </li>
                  <!-- <li>
                    <a class="block p-4 cursor-pointer text-muted-color hover:text-color transition-colors duration-300" @click="navigateToLogin">SIGN IN</a>
                  </li> -->
                </ul>
              </div>
            </Transition>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row gap-8 items-center justify-between px-8 py-10 xl:py-20 overflow-hidden">
          <div class="flex-1 animate-fadein animate-duration-1000">
            <span class="inline-flex items-center rounded-full bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200 px-3 py-1 mb-4 text-xs font-medium">Pre‑Launch</span>
            <h1 class="header-font font-bold text-5xl lg:text-7xl mt-2 mb-4 block">Digital Loyalty Cards</h1>
            <h2 class="header-font font-bold text-5xl lg:text-7xl mt-0 mb-8 block" style="color: #14abb7">Made Simple</h2>
            <p class="text-font text-xl lg:text-2xl mb-8 leading-normal text-muted-color">We’re building the easiest loyalty card platform for small businesses. Be the first to get early access.</p>
            <div class="flex gap-4 flex-wrap justify-center lg:justify-start items-center lg:items-start">
              <Button label="Join the Pre-Launch" @click="openWaitlistModal" style="background-color: #14abb7; border-color: #14abb7" class="xl:w-auto text-white"></Button>
            </div>
          </div>
          <div class="flex-1">
            <img alt="Punchly App Preview" src="/images/pages/app-in-phone_nobg.png" class="animate-fadeinright animate-ease-in-out animate-duration-1000 w-full rounded-2xl" />
          </div>
        </div>
        <div ref="stats" class="p-8 sm:p-20">
          <div class="flex flex-col items-center mb-16">
            <span class="font-bold text-muted-color text-xl mb-4">How It Works</span>
            <h2 class="header-font font-bold text-5xl lg:text-6xl my-0 text-center">Simple Steps to Success</h2>
          </div>
          <div class="flex flex-col xl:flex-row justify-center gap-8">
            <div class="bg-zinc-50 text-center py-7 px-5 shadow" style="border-radius: 14px">
              <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style="background-color: #14abb7">
                <Icon name="material-symbols:store" class="text-white text-4xl" />
              </div>
              <div class="text-xl text-muted-color mb-4">Step 1</div>
              <h3 class="mt-0 mb-4 font-bold text-4xl">Create Your Loyalty Card</h3>
              <p class="leading-normal mb-8 text-muted-color">Set up your business profile and customize your loyalty card design in <strong>minutes</strong>.</p>
              <!-- <Button icon="pi pi-arrow-right" label="Get Started" class="p-button-text" iconPos="right" style="color: #14abb7"></Button> -->
              <div class="mt-8 xl:pt-8 flex justify-center">
                <img alt="intro image" src="/svg/landing/create-store.svg" class="w-[50%]" />
              </div>
            </div>
            <div class="flex flex-col md:flex-row xl:flex-col gap-8">
              <div class="flex-1 bg-zinc-50 flex flex-col xl:flex-row xl:items-center justify-between py-7 px-5 shadow gap-8" style="border-radius: 14px">
                <div class="flex-1 text-center xl:text-right">
                  <img alt="intro image" src="/svg/landing/share-qr.svg" class="w-[60%] mx-auto" />
                </div>
                <div class="text-center xl:text-right flex-1">
                  <div class="text-xl text-muted-color mb-4">Step 2</div>
                  <h3 class="mt-0 mb-4 font-bold text-4xl">Share QR Code</h3>
                  <p class="leading-normal mb-8 text-muted-color">Print and display your unique QR code for customers to scan and join your loyalty program.</p>
                  <!-- <Button icon="pi pi-arrow-right" label="Learn More" class="p-button-text" iconPos="right" style="color: #14abb7"></Button> -->
                </div>
              </div>
              <div class="flex-1 bg-zinc-50 flex flex-col xl:flex-row xl:items-center justify-between py-7 px-5 shadow gap-8" style="border-radius: 14px">
                <div class="text-center xl:text-left flex-1">
                  <div class="text-xl text-muted-color mb-4">Step 3</div>
                  <h3 class="mt-0 mb-4 font-bold text-4xl">Reward Customers</h3>
                  <p class="leading-normal mb-8 text-muted-color">Punch cards digitally and watch customer loyalty grow with automated rewards.</p>
                  <!-- <Button icon="pi pi-arrow-right" label="See Rewards" class="p-button-text" iconPos="right" style="color: #14abb7"></Button> -->
                </div>
                <div class="flex-1 text-center xl:text-right">
                  <img alt="intro image" src="/svg/landing/reward-customers.svg" class="w-[80%] mx-auto" />
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
              <!-- <Button icon="pi pi-arrow-right" label="View Analytics" class="p-button-text" iconPos="right" style="color: #14abb7"></Button> -->
              <div class="mt-8 xl:pt-8 flex justify-center">
                <img alt="intro image" src="/svg/landing/tracking-analytics.svg" class="w-[75%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref="features" class="px-8 sm:px-20 py-20 bg-zinc-50">
        <div class="text-center mb-16">
          <h2 class="header-font font-bold text-5xl lg:text-6xl mb-4">Why Choose Punchly?</h2>
          <p class="text-xl text-muted-color max-w-2xl mx-auto">Everything you need to build lasting customer relationships through digital loyalty programs.</p>
        </div>
        <div id="features" class="flex flex-col lg:flex-row justify-evenly gap-8">
          <div>
            <div class="p-6 flex items-center justify-center mb-8" style="border-radius: 14px; border-top-left-radius: 5rem; background: #14abb7aa">
              <Icon name="material-symbols:rocket-launch" class="text-white text-[6rem] lg:text-8xl" />
            </div>
            <h3 class="header-font mt-0 mb-4 font-bold text-4xl">Quick Setup</h3>
            <p class="leading-normal text-muted-color">Get your loyalty program running in under 5 minutes. No technical knowledge required.</p>
          </div>
          <div class="my-4 lg:my-0">
            <div class="p-6 flex items-center justify-center mb-8" style="border-radius: 14px; background: #14abb7aa">
              <Icon name="fa-solid:recycle" class="text-white text-[6rem] lg:text-8xl" />
            </div>
            <h3 class="header-font mt-0 mb-4 font-bold text-4xl">Eco-Friendly</h3>
            <p class="leading-normal text-muted-color">Customers can access their loyalty cards anytime, anywhere through their smartphones.</p>
            <p class="leading-normal text-muted-color"><strong>No more lost cards!</strong></p>
          </div>
          <div>
            <div class="p-6 flex items-center justify-center mb-8" style="border-radius: 14px; border-bottom-right-radius: 5rem; background: #14abb7aa">
              <Icon name="material-symbols:security" class="text-white text-[6rem] lg:text-8xl" />
            </div>
            <h3 class="header-font mt-0 mb-4 font-bold text-4xl">Secure & Reliable</h3>
            <p class="leading-normal text-muted-color">Enterprise-grade security ensures customer data is protected.</p>
          </div>
        </div>
      </div>

      <div class="px-8 sm:px-20 py-20 bg-surface-50 dark:bg-surface-950 xl:flex xl:items-start xl:justify-start flex-wrap gap-8 items-center justify-center">
        <div class="flex-1">
          <div class="text-4xl lg:text-5xl font-bold mb-4">Be an Early Adopter</div>
          <p class="text-xl text-muted-color">We’re validating Punchly with a limited group of businesses. Join the waitlist to unlock:</p>
          <ul class="mt-4 space-y-3 text-slate-700">
            <li class="flex items-start gap-3"><i class="pi pi-check mt-1 text-emerald-500"></i> Priority onboarding and feature input</li>
            <li class="flex items-start gap-3"><i class="pi pi-check mt-1 text-emerald-500"></i> Founding discount at launch</li>
            <li class="flex items-start gap-3"><i class="pi pi-check mt-1 text-emerald-500"></i> Access to private beta updates</li>
          </ul>
        </div>
        <div class="flex gap-4">
          <Button label="Join the waitlist" @click="openWaitlistModal" class="text-lg px-6 py-3 w-full xl:w-auto !mt-6" />
        </div>
      </div>

      <div ref="FAQ" class="px-8 sm:px-20 py-20 bg-zinc-50">
        <div class="text-center mb-16">
          <h2 class="font-bold text-5xl lg:text-6xl mb-4">FAQ</h2>
        </div>
        <div class="flex flex-col lg:flex-row justify-center gap-8 w-full">
          <Accordion value="0" class="w-full lg:w-2/3">
            <AccordionPanel value="0">
              <AccordionHeader>When does the beta start?</AccordionHeader>
              <AccordionContent>
                <p class="m-0">We’re inviting the first cohort on a rolling basis as we validate the core experience.</p>
              </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="1">
              <AccordionHeader>Is there a free trial?</AccordionHeader>
              <AccordionContent>
                <p class="m-0">Early adopters receive a founding discount and trial when we launch publicly.</p>
              </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="2">
              <AccordionHeader>Who is Punchly for?</AccordionHeader>
              <AccordionContent>
                <p class="m-0">Local businesses like cafés, gyms, salons, and boutiques that want simple, QR‑based loyalty.</p>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>
      </div>

      <div ref="contact" class="px-8 xl:px-20 py-20 bg-surface-50 dark:bg-surface-950 xl:flex xl:items-start xl:justify-start flex-wrap gap-8 items-center justify-center">
        <div class="text-center mb-16">
          <h2 class="font-bold text-5xl lg:text-6xl mb-4">Contact Us</h2>
        </div>
        <div class="mx-auto flex flex-col lg:flex-row justify-center gap-8 w-full xl:w-[80%]">
          <div class="hide-on-mobile">
            <img src="/svg/landing/contact-open-letter.svg" alt="contact us" class="mb-8 mx-auto xl:w-[85%]" />
          </div>

          <Form v-slot="$form" @submit="onFormSubmit" :initial-values="initialValues" :resolver="resolver" class="w-full xl:w-[60%]">
            <h2 class="text-xl text-muted-color mb-8">Have questions or want to learn more? Reach out to our team—we're here to help!</h2>
            <div class="field mb-4">
              <label for="name" class="block text-left mb-2 font-medium">Name <span class="text-red-600">*</span></label>
              <InputText id="name" name="name" type="text" class="w-full" v-model="initialValues.name" />
              <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{ $form.name.error?.message }}</Message>
            </div>
            <div class="field mb-4">
              <label for="email" class="block text-left mb-2 font-medium">Email <span class="text-red-600">*</span></label>
              <InputText name="email" id="email" type="email" class="w-full" v-model="initialValues.email" />
              <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
            </div>
            <div class="field mb-4">
              <label for="message" class="block text-left mb-2 font-medium">Message <span class="text-red-600">*</span></label>
              <Textarea id="message" name="message" rows="5" class="w-full" v-model="initialValues.message"></Textarea>
              <Message v-if="$form.message?.invalid" severity="error" size="small" variant="simple">{{ $form.message.error?.message }}</Message>
            </div>
            <Button type="submit" label="Send Message" class="w-full lg:w-auto" style="background-color: #14abb7; border-color: #14abb7; color: white" />
          </Form>
        </div>
      </div>

      <div class="px-8 sm:px-20 py-20 bg-gray-900 flex flex-col md:flex-row md:items-start gap-8" style="border-top-left-radius: 14px; border-top-right-radius: 14px">
        <div class="flex items-center flex-1">
          <img alt="Punchly Logo" src="/images/logo/punchly-logo.png" class="w-16" />
          <span class="text-white text-5xl font-bold ml-2">Punchly</span>
        </div>
        <div class="rounded-3xl bg-[#0d8c98] text-white p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h4 class="text-2xl lg:text-3xl font-bold">Be first in line</h4>
            <p class="mt-2 text-white/90">Join the pre‑launch waitlist. We’ll email when your invite is ready.</p>
          </div>
          <div class="w-full lg:w-auto">
            <Button label="Join Waitlist" @click="openWaitlistModal" class="w-full lg:w-auto rounded-xl bg-white text-slate-900 border-0 btn-hover" />
          </div>
        </div>
        <!-- <div class="flex-1">
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
          </ul>
        </div>
        <div class="flex-1">
          <div class="text-xl text-gray-400 mb-6">COMPANY</div>
          <ul class="list-none p-0 m-0">
            <li class="mb-4">
              <a class="cursor-pointer text-white text-xl hover:text-gray-300 transition-colors">About Us</a>
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
        </div> -->
        <div class="flex-1">
          <div class="text-xl text-gray-400 mb-6">SHARE US ON</div>
          <div class="flex gap-4 mb-6">
            <a :href="links.whatsapp" class="w-12 h-12 rounded-full flex items-center justify-center" style="background-color: #14abb7">
              <Icon name="ic:baseline-whatsapp" class="text-white text-3xl" />
            </a>
            <a :href="links.x" class="w-12 h-12 rounded-full flex items-center justify-center" style="background-color: #14abb7">
              <i class="pi pi-twitter text-white text-xl"></i>
            </a>
            <a :href="links.facebook" class="w-12 h-12 rounded-full flex items-center justify-center" style="background-color: #14abb7">
              <Icon name="ic:baseline-facebook" class="text-white text-3xl" />
            </a>
            <a :href="links.linkedin" class="w-12 h-12 rounded-full flex items-center justify-center" style="background-color: #14abb7">
              <i class="pi pi-linkedin text-white text-xl"></i>
            </a>
          </div>
          <div class="text-gray-400 text-sm">
            <p class="mb-2">
              © 2025 Punchly developed by FloHaven LLC. <br />
              All rights reserved.
            </p>
            <p class="text-xs">Making loyalty programs simple for everyone.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <PrelaunchWaitListModal v-model="waitlistModal" @success="handleSuccess" />
  <PrelaunchSuccessModal v-model="successModal" />
  <Toast />
</template>

<style scoped>
#features {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 1024px) {
  #features {
    grid-template-columns: 1fr;
  }
  .hide-on-mobile {
    display: none;
  }
}

.btn-hover {
  border: 1px solid transparent;
}

.btn-hover:hover {
  background: transparent;
  border: 1px solid white;
}

.header-font {
  font-family: 'Poppins', sans-serif;
}
.text-font {
  font-family: 'Open Sans', sans-serif;
}
.p-button-text {
  width: auto !important;
}

.brand-name {
  font-family: 'Poppins', sans-serif;
  letter-spacing: 1px;
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
