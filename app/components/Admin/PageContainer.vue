<template>
  <div
    class="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-gray-950/5 dark:lg:bg-gray-900 dark:lg:ring-white/10"
  >
    <div class="">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold">{{ title }}</h1>
        <slot name="actions" />
      </div>
      <hr
        role="presentation"
        class="my-6 w-full border-t border-gray-950/10 dark:border-white/10"
      />
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
