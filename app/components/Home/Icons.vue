<template>
  <div class="flex items-center justify-center gap-2 sm:gap-3 mb-12">
    <IconCard
      v-for="item in items"
      :key="item.label"
      :icon="item.icon"
      :color="item.color"
      :label="item.label"
      :rotate="item.rotate"
      :class="item.class"
    />
  </div>
</template>

<script setup>
const items = [
  {
    icon: "ph:chat-teardrop-duotone",
    color: "bg-red-500",
    label: "AI Chat",
    rotate: "-rotate-6",
    class: "-rotate-12 translate-y-5",
  },
  {
    icon: "ph:image-square-duotone",
    color: "bg-indigo-500",
    label: "Text to Image",
    rotate: "-rotate-3",
    class: "-rotate-6 translate-y-1",
  },
  {
    icon: "ph:smiley-sticker-duotone",
    color: "bg-green-500",
    label: "AI Bots",
    rotate: "rotate-0",
    class: "",
  },
  {
    icon: "ph:microphone-duotone",
    color: "bg-teal-500",
    label: "Text to Voice",
    rotate: "rotate-3",
    class: "rotate-6 translate-y-1",
  },
  {
    icon: "ph:google-photos-logo-duotone",
    color: "bg-purple-500",
    label: "Image Training",
    rotate: "rotate-6",
    class: "rotate-12 translate-y-5",
  },
];
</script>
