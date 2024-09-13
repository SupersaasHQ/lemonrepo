<template>
  <div class="max-w-5xl mx-auto">
    <h2
      class="text-4xl text-slate-900 font-extrabold font-display text-center mb-4 my-24 lg:my-4 px-4 lg:px-0"
    >
      Are you convinced yet?
      <span class="md:block">Need more features?</span>
    </h2>
    <ClientOnly>
      <Vue3Marquee :duration="180" class="marquee-container">
        <div
          v-for="item in items"
          :key="item"
          class="flex-shrink-0 metal-shadow bg-white rounded-lg px-3 py-2 mx-2 my-2 text-gray-600 font-medium"
        >
          {{ item }}
        </div>
      </Vue3Marquee>
      <Vue3Marquee
        :duration="180"
        direction="reverse"
        class="marquee-container"
      >
        <div
          v-for="item in items"
          :key="item"
          class="flex-shrink-0 metal-shadow bg-white rounded-lg px-3 py-2 mx-2 my-2 text-gray-600 font-medium"
        >
          {{ item }}
        </div>
      </Vue3Marquee>
    </ClientOnly>
  </div>

  <div
    class="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 px-4 lg:px-0"
    ref="target"
  >
    <div
      v-for="experience in experiences"
      :key="experience.title"
      class="rounded-2xl p-8 flex flex-col border-4 border-white metal-shadow text-white"
      :class="getExperienceClasses(experience)"
    >
      <h3 class="text-4xl font-bold tracking-tight font-display mb-8">
        {{ experience.title }}
      </h3>
      <p class="mt-auto text-lg">{{ experience.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { useElementVisibility } from "@vueuse/core";

const target = ref(null);
const targetIsVisible = useElementVisibility(target, {
  threshold: 0.75,
});

const experiences = [
  {
    title: "Always Fresh",
    description:
      "Our codebase is always current and up-to-date. I personally ensure that every piece of code is reviewed before it's published.",
    color: "bg-rose-500",
    initialPosition: "translate-x-0 lg:translate-x-[80px]",
    initialRotate: "rotate-0 lg:rotate-2",
  },
  {
    title: "Best Practices",
    description:
      "I adhere to best practices and standards to guarantee that the codebase remains maintainable and scalable.",
    color: "bg-emerald-500",
    initialPosition: "translate-x-0 lg:translate-x-[40px]",
    initialRotate: "rotate-0 lg:-rotate-2",
  },
  {
    title: "Well Documented",
    description:
      "Thoroughly documented with videos explaining features, making it easy for developers to understand.",
    color: "bg-cyan-500",
    initialPosition: "translate-x-0 lg:translate-x-[-40px]",
    initialRotate: "rotate-0 lg:rotate-2",
  },
  {
    title: "Easy to Customize",
    description:
      "Lemonrepo offers easy customization with sensible abstractions, enabling developers to tailor it to their specific needs.",
    color: "bg-indigo-500",
    initialPosition: "translate-x-0 lg:translate-x-[-80px]",
    initialRotate: "rotate-0 lg:-rotate-2",
  },
];
const items = [
  "Nuxt UI Components",
  "Radix Vue Primitives",
  "Tailwind CSS",
  "Auto Drizzle Studio Support",
  "Nuxt Auth Utils",
  "Nuxt Scripts",
  "Nuxt Fonts",
  "Free Plan Demo",
  "Waitlist Demo",
  "Email Verification Templates",
  "Image Gallery Demo",
  "Clean Codebase",
  "Beautiful UI",
  "Easy to Customize",
  "Beginner Friendly",
  "Dark Mode",
  "Mobile Friendly",
  "Dashboard Demo",
  "Serverless Stack",
  "Rich Documentation",
  "Works on Cloudflare Pages/Workers",
  "Tips to improve production performance",
  "News Letter Signup",
  "Customizable UI",
  "ShadCN Vue Compatible",
  "Zod Validated forms",
  "VueUse Utils",
  "Hashing Utils compatiable with Edge Functions",
  "Filters and Text search examples",
];

const getExperienceClasses = computed(() => (experience) => [
  experience.color,
  !targetIsVisible.value
    ? [experience.initialPosition, experience.initialRotate]
    : null,
  "transition-all duration-500 ease-spring",
]);
</script>

<style scoped>
.marquee-container {
  --mask: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0) 5%,
      rgba(0, 0, 0, 1) 20%,
      rgba(0, 0, 0, 1) 80%,
      rgba(0, 0, 0, 0) 95%,
      rgba(0, 0, 0, 0) 0
    )
    100% 50% / 100% 100%;

  -webkit-mask: var(--mask);
  mask: var(--mask);
}

.ease-spring {
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1.75);
}
</style>
