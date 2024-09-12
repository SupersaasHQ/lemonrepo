<template>
  <div class="flex flex-col items-center gap-2">
    <div
      class="h-14 w-14 sm:h-20 sm:w-20 rounded-xl sm:rounded-2xl border-4 border-white metal-shadow flex items-center justify-center text-white"
      :class="color"
    >
      <Icon :name="icon" class="h-6 w-6 sm:h-9 sm:w-9" />
    </div>
    <p class="text-[10px] sm:text-xs text-gray-500">{{ label }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});
</script>
