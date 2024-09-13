<template>
  <section class="pt-20 pb-12">
    <HomeIcons />
    <h1
      class="text-4xl sm:text-6xl lg:text-7xl tracking-tight text-gray-800 font-bold text-center font-display max-w-4xl mx-auto"
    >
      The No Nonsense
      <span
        class="inline-flex flex-col h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] sm:h-[calc(theme(fontSize.6xl)*theme(lineHeight.tight))] lg:h-[calc(theme(fontSize.7xl)*theme(lineHeight.tight))] overflow-hidden"
      >
        <ul
          class="block text-left leading-tight [&_li]:block animate-text-slide-5"
        >
          <li>Nuxt</li>
          <li>Next</li>
          <li>Astro</li>
          <li>Vue</li>
          <li>React</li>
          <li aria-hidden="true">Nuxt</li>
        </ul>
      </span>
      <span class="block"> AI SaaS Kit</span>
    </h1>
    <div class="mt-8">
      <div
        class="max-w-max mx-auto rounded-xl bg-gray-100 ring-4 ring-gray-500/10 border p-1 space-y-2"
      >
        <BuyButton
          label="Buy Now for $149"
          class="flex items-center justify-center w-full"
          size="md"
          rounded="lg"
        />
        <div class="p-1">
          <div class="flex items-center gap-2">
            <Icon name="i-ph-sparkle-duotone" class="h-5 w-6" />
            <p class="text-gray-800">
              <span class="font-semibold">$100 off</span> for the first 100
              Customers
            </p>
          </div>
          <div class="flex items-center gap-2 mt-2">
            <UProgress
              :value="count"
              size="md"
              class="flex-1"
              aria-label="Progress of the offer"
            />
            <span class="text-xs text-gray-500">{{ count }}/100 used</span>
          </div>
        </div>
      </div>
    </div>
    <HomeTestimonial />
  </section>
</template>

<script setup>
defineProps({
  count: {
    type: Number,
    default: 0,
  },
});
</script>

<style>
.animate-text-slide-5 {
  animation: text-slide 12.5s cubic-bezier(0.83, 0, 0.17, 1) infinite;
}

@keyframes text-slide {
  0%,
  16% {
    transform: translateY(0%);
  }
  20%,
  36% {
    transform: translateY(-16.66%);
  }
  40%,
  56% {
    transform: translateY(-33.33%);
  }
  60%,
  76% {
    transform: translateY(-50%);
  }
  80%,
  96% {
    transform: translateY(-66.66%);
  }
  100% {
    transform: translateY(-83.33%);
  }
}
</style>
