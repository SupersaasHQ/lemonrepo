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
const testimonials = [
  {
    title: "Super Powerful",
    quote:
      "The stack that Supersaas is built upon is super powerful and easy to work with, especially when used with NuxtHub / Cloudflare. Fayaz has been super helpful in making it work and adopting feedback.",
    author: {
      name: "Tim Pulver",
      description: "Freelancer/Software Engineer",
      avatar: {
        src: "https://pbs.twimg.com/profile_images/985092522329468928/qcfeEMbF_400x400.jpg",
        loading: "lazy",
      },
    },
  },
  {
    title: "Features i would buy it for",
    quote:
      "This is relly well made! especially with features like passkey and hooks for everything. These are the features i would buy it for",
    author: {
      name: "Rishi Mohan",
      description: "Founder, Pika.Style",
      avatar: {
        src: "https://pbs.twimg.com/profile_images/1792311421994147840/ZO_-Kmol_400x400.jpg",
        loading: "lazy",
      },
    },
  },
  {
    title: "Fantastic",
    quote: "👆🏻 As a customer I can confirm, it's fantastic 🔥",
    author: {
      name: "Thomas Sanlis",
      description: "Founder, Unned.best",
      avatar: {
        src: "https://essentials.supersaas.dev/thomas.jpg",
        loading: "lazy",
      },
    },
  },
  {
    title: "Absolute time saver",
    quote:
      "It's an absolute time saver! If you are a freelancer or keep building things, get this! ✨",
    author: {
      name: "Mushtaq Ahmed",
      description: "Senior Product Engineer, Locale.ai",
      avatar: {
        src: "https://pbs.twimg.com/profile_images/1823266963553964032/CTnrLhkL_400x400.jpg",
        loading: "lazy",
      },
    },
  },
  {
    title: "Satisfaction 100%",
    quote: "I’m very satisfied of your boilerplate. Thanks!",
    author: {
      name: "Lilian",
      description: "SoftwareEngineer",
      avatar: {
        src: "",
        loading: "lazy",
      },
    },
  },
  {
    title: "Simple yet awesome",
    quote:
      "I was struggling with implementing payment and auth in my side projects when I found http://supersaas.dev . Its super simple, with all the necessary things bundled together with proper documentation and abstractions. I got to launch my project in a days work and didnt have to think about the logistics of wiring everything up and was just able to concentrate on my core product. If that aint super i dont know what is.. the founder support is again amazing. He got on a call to ensure everything was implemented correctl",
    author: {
      name: "Sooraj",
      description: "Backend Engineer",
      avatar: {
        src: "https://pbs.twimg.com/profile_images/1823407485002113024/6pxHkYUj_400x400.jpg",
        loading: "lazy",
      },
    },
  },
  {
    title: "Love it!",
    quote:
      "Really well made. Great news! Im playing with Supersaas template and its been amazing! Learned a lot. Thinking about starting to build something with it. Love it!",
    author: {
      name: "Alexandr Os",
      description: "Engineer and Foudnder",
      avatar: {
        src: "https://pbs.twimg.com/profile_images/1811928265621229568/ejtIodY5_400x400.jpg",
        loading: "lazy",
      },
    },
  },
  {
    title: "Saving me a shit ton of time",
    quote:
      "Using these for my side project. This is saving me a shit ton of time and effort. Really happy I purchased this.",
    author: {
      name: "Attaullah F",
      description: "Senior Engineer, Congnizant",
      avatar: {
        src: "https://essentials.supersaas.dev/62116.jpg",
        loading: "lazy",
      },
    },
  },
];
</script>

<style></style>
