<template>
  <ScriptLemonSqueezy>
    <NuxtLink
      class="shiny-button bg-black text-white focus:ring-2 focus:ring-black/20 w-full block text-center"
      :href="config.public.productUrl"
      :class="[sizeClass, roundedClass]"
    >
      {{ label }}
      <span v-if="strikeThroughPrice" class="relative ml-1s">
        <span
          class="h-0.5 w-[120%] bg-red-500 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -rotate-12"
        />
        {{ strikeThroughPrice }}
      </span>
    </NuxtLink>
  </ScriptLemonSqueezy>
</template>

<script lang="ts" setup>
const props = defineProps<{
  label: string;
  size: "sm" | "md" | "lg";
  rounded: "sm" | "md" | "lg" | "full";
  strikeThroughPrice?: string;
}>();
const config = useRuntimeConfig();

const sizeClass = computed(() => {
  return {
    sm: "text-sm px-3 py-2",
    md: "text-md px-4 py-3",
    lg: "text-base sm:text-lg px-5 py-3",
  }[props.size];
});

const roundedClass = computed(() => {
  return {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  }[props.rounded];
});
</script>
