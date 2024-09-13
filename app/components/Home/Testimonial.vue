<template>
  <div class="mt-8">
    <UCarousel
      ref="carouselRef"
      v-slot="{ item }"
      :items="testimonials"
      :ui="{ item: 'basis-full flex items-center justify-center' }"
      class="w-96 mx-auto overflow-hidden"
    >
      <div class="flex items-center justify-center gap-2 px-5">
        <UAvatar
          :src="item.avatar"
          alt="Joseph Salim"
          size="xs"
          loading="lazy"
        />
        <p class="text-sm text-gray-500">{{ item.text }}</p>
      </div>
    </UCarousel>
  </div>
</template>

<script setup>
const testimonials = [
  {
    name: "Fayaz Ahmed",
    avatar: "https://github.com/fayazara.png",
    text: "👆🏻 As a customer I can confirm, it's fantastic 🔥",
  },
  {
    name: "Juno Guiera",
    avatar: "https://github.com/juniormc.png",
    text: "Really satisfied with the product.",
  },
  {
    name: "Nazish Khan",
    avatar: "https://i.pravatar.cc/400?img=47",
    text: "Best Purchase of the the month!",
  },
  {
    name: "Jonas K",
    avatar: "https://i.pravatar.cc/400?img=3",
    text: "Best AI Kit I've ever used!",
  },
];

const carouselRef = ref();

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return;

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0);
    }

    carouselRef.value.next();
  }, 3000);
});
</script>
