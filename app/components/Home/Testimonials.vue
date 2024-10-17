<template>
  <div class="py-12 px-4 relative">
    <div class="relative max-w-6xl mx-auto">
      <div>
        <h2
          class="max-w-2xl text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 font-display"
        >
          What people are saying about Lemonhub
        </h2>
        <p class="mt-4 max-w-xl text-gray-600 text-2xl">
          50+ developers shipping apps in production using Lemonhub. They seem
          to love it.
        </p>
      </div>
      <div
        id="testimonials"
        class="column-1 md:columns-2 lg:columns-3 gap-8 space-y-8 xl:columns-4 scroll-mt-[calc(var(--header-height)+140px+128px+96px)] mt-12"
      >
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="break-inside-avoid"
        >
          <div class="p-6 metal-shadow bg-white rounded-xl">
            <p
              class="text-lg font-semibold leading-6 before:content-['“'] after:content-['”']"
            >
              {{ testimonial.title }}
            </p>
            <p class="mt-3 text-sm leading-7 text-gray-500">
              {{ testimonial.quote }}
            </p>
            <div class="flex items-center gap-2 mt-4">
              <UAvatar
                :src="testimonial.author.avatar.src"
                :alt="testimonial.author.name"
                size="md"
                loading="lazy"
              />
              <div>
                <p class="text-gray-600 font-medium">
                  {{ testimonial.author.name }}
                </p>
                <p class="text-gray-500 text-xs">
                  {{ testimonial.author.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: testimonials } = useFetch("/api/testimonials")
</script>

<style></style>
