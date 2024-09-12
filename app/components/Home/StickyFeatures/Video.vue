<template>
  <div
    class="h-92 w-full relative rounded-xl overflow-hidden ring-8 ring-gray-500/10"
  >
    <video
      autoplay=""
      loop=""
      muted=""
      playsinline=""
      class="h-full w-full object-cover"
    >
      <source :src="src" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
});
</script>
