<template>
  <div class="grid grid-cols-1 gap-x-8 gap-y-10 pb-12 md:grid-cols-3 border-b">
    <div>
      <h2 class="text-base font-semibold leading-7">{{ title }}</h2>
      <p class="mt-1 text-sm leading-6 text-gray-400">
        {{ description }}
      </p>
    </div>

    <div
      class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  description: string;
}>();
</script>
