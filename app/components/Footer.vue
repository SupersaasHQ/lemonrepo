<template>
  <div class="p-4">
    <footer class="bg-gray-900 rounded-3xl" aria-labelledby="footer-heading">
      <h2 id="footer-heading" class="sr-only">Footer</h2>
      <div class="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
        <div class="xl:grid xl:grid-cols-3 xl:gap-12">
          <div>
            <div class="flex items-center gap-2 text-white">
              <Logo class="h-7 w-auto" />
              <p>Lemonrepo</p>
            </div>
            <p class="text-white text-sm mt-4">
              The No Nonsense AI SaaS Starter Kit.
            </p>
          </div>
          <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm font-semibold leading-6 text-white">
                  Features
                </h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li v-for="item in navigation.features" :key="item.name">
                    <NuxtLink
                      :href="item.href"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                      >{{ item.name }}</NuxtLink
                    >
                  </li>
                </ul>
              </div>
              <div class="mt-10 md:mt-0">
                <h3 class="text-sm font-semibold leading-6 text-white">
                  Support
                </h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li v-for="item in navigation.support" :key="item.name">
                    <NuxtLink
                      :href="item.href"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                      >{{ item.name }}</NuxtLink
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm font-semibold leading-6 text-white">
                  Resources
                </h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li v-for="item in navigation.resources" :key="item.name">
                    <NuxtLink
                      :href="item.href"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                      >{{ item.name }}</NuxtLink
                    >
                  </li>
                </ul>
              </div>
              <div class="mt-10 md:mt-0">
                <h3 class="text-sm font-semibold leading-6 text-white">
                  Legal
                </h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li v-for="item in navigation.legal" :key="item.name">
                    <NuxtLink
                      :href="item.href"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                      >{{ item.name }}</NuxtLink
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const navigation = {
  features: [
    { name: "Authentication", href: "#" },
    { name: "Database", href: "#" },
    { name: "Payments", href: "#" },
    { name: "Emails", href: "#" },
    { name: "File Storage", href: "#" },
  ],
  support: [
    { name: "Activate License", href: "/activate-license" },
    { name: "Discord", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Email Us", href: "#" },
    { name: "Telegram", href: "#" },
  ],
  resources: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Tools", href: "#" },
    { name: "Self Host", href: "#" },
  ],
  legal: [
    { name: "License", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
};
</script>
