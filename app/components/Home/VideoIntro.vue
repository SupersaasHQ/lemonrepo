<template>
  <div class="py-12 px-4 relative">
    <div class="relative max-w-6xl mx-auto">
      <div class="text-center">
        <h2
          class="mx-auto max-w-xl text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 font-display"
        >
          How Lemonrepo works?
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-gray-600 text-2xl">
          Get started with Lemonrepo in just 3 minutes.
        </p>
      </div>
      <div class="relative">
        <Icon
          name="i-logos-youtube-icon"
          class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-12 h-12 drop-shadow"
        />
        <NuxtImg
          src="https://i.ytimg.com/vi/MFAmnD5InIo/maxresdefault.jpg"
          alt="Supersaas Video Intro"
          class="max-w-3xl mx-auto mt-8 rounded-xl overflow-hidden cursor-pointer metal-shadow"
          sizes="sm:50vw md:400px"
          @click="isOpen = true"
        />
      </div>
      <UModal
        v-model="isOpen"
        :ui="{ width: 'sm:max-w-3xl', container: 'items-center' }"
      >
        <iframe
          class="rounded-lg overflow-hidden mx-auto w-full aspect-video max-w-3xl"
          src="https://www.youtube.com/embed/MFAmnD5InIo?si=wq7q8tzPzpCGJSDG&autoplay=1"
          title="YouTube video player"
          frameborder="0"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </UModal>
    </div>
  </div>
</template>

<script setup>
const isOpen = ref(false);
</script>
