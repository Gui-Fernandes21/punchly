<template>
  <section ref="pricing" class="px-8 sm:px-20 py-20 bg-zinc-50 dark:bg-surface-900">
    <div class="text-center mb-16">
      <h2 class="font-bold text-5xl lg:text-6xl mb-4">Simple, Transparent Pricing</h2>
      <p class="text-xl text-muted-color">Choose the plan that fits your business needs. No hidden fees, cancel anytime.</p>
    </div>
    <div class="flex flex-col lg:flex-row justify-center gap-8 mx-auto">
      <div class="shadow bg-surface-0 dark:bg-surface-900 py-8 px-16 text-center rounded-2xl border-2 border-surface-200 dark:border-surface-700">
        <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style="background-color: #f3f4f6">
          <Icon name="material-symbols:rocket-launch-outline" class="text-4xl" style="color: #14abb7" />
        </div>
        <div class="text-2xl font-bold mb-4">Starter</div>
        <div class="mb-8">
          <span class="text-6xl font-bold" style="color: #14abb7">Free</span>
          <div class="text-lg text-muted-color">Perfect to get started</div>
        </div>
        <Button label="Start for free" class="w-full mb-8 p-3" style="background-color: #14abb7; border-color: #14abb7"></Button>
        <ul class="list-none p-0 m-0 text-left">
          <li class="flex items-center mb-4">
            <i class="pi pi-check-circle text-xl mr-3" style="color: #14abb7"></i>
            <span>Up to 25 customers</span>
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
      <div class="shadow bg-surface-0 dark:bg-surface-900 py-8 px-16 text-center rounded-2xl border-2 relative" style="border-color: #14abb7">
        <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-sm font-bold text-white" style="background-color: #14abb7">MOST POPULAR</div>
        <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style="background-color: #14abb7">
          <Icon name="material-symbols:business-center" class="text-white text-4xl" />
        </div>
        <div class="text-2xl font-bold mb-4">Professional</div>
        <div class="mb-8">
          <span class="text-6xl font-bold" style="color: #14abb7">$19</span>
          <span class="text-xl text-muted-color">/month</span>
          <div class="text-lg text-muted-color">For growing businesses</div>
        </div>
        <Button label="Start for free" class="w-full mb-8 p-3" style="background-color: #14abb7; border-color: #14abb7"></Button>
        <ul class="list-none p-0 m-0 text-left">
          <li class="flex items-center mb-4">
            <i class="pi pi-check-circle text-xl mr-3" style="color: #14abb7"></i>
            <span>Up to 200 customers</span>
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
      <div class="shadow bg-surface-0 dark:bg-surface-900 py-8 px-16 text-center rounded-2xl border-2 border-surface-200 dark:border-surface-700">
        <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style="background-color: #f3f4f6">
          <Icon name="material-symbols:enterprise" class="text-4xl" style="color: #14abb7" />
        </div>
        <div class="text-2xl font-bold mb-4">Expert</div>
        <div class="mb-8">
          <span class="text-6xl font-bold" style="color: #14abb7">$49</span>
          <span class="text-xl text-muted-color">/month</span>
          <div class="text-lg text-muted-color">For large organizations</div>
        </div>
        <Button label="Start for free" class="w-full mb-8 p-3" style="background-color: #14abb7; border-color: #14abb7"></Button>
        <ul class="list-none p-0 m-0 text-left">
          <li class="flex items-center mb-4">
            <i class="pi pi-check-circle text-xl mr-3" style="color: #14abb7"></i>
            <span>Unlimited customers</span>
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
  </section>
</template>
