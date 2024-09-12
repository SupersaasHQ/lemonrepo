<template>
  <header class="flex items-center px-4">
    <div class="py-2.5 lg:hidden">
      <button
        aria-label="Toggle menu"
        class="menu-toggle relative flex h-8 w-8 items-center justify-center rounded-full border bg-white hover:bg-gray-100 flex-shrink-0"
        :class="{ active: mobileMenu }"
        @click="toggleMobileMenu"
      >
        <div
          class="menu-bar absolute h-[1.5px] w-[15px] translate-y-[-3px] bg-gray-700 transition-all duration-200 ease-out"
          data-position="top"
        />
        <div
          class="menu-bar absolute h-[1.5px] w-[15px] translate-y-[3px] bg-gray-700 transition-all duration-200 ease-out"
          data-position="bottom"
        />
      </button>
    </div>
    <div class="min-w-0 flex-1">
      <nav class="flex flex-1 items-center gap-4">
        <div class="flex items-center gap-2">
          <UAvatar :src="storeAvatarUrl" />
          <p>{{ storeName }}</p>
        </div>
        <div
          aria-hidden="true"
          class="max-lg:hidden h-6 w-px bg-gray-950/10 dark:bg-white/10"
        />
        <UHorizontalNavigation
          :links="menuItems"
          class="max-lg:hidden"
          :ui="{ base: 'py-5', active: 'after:bg-black dark:after:bg-white' }"
        />
        <div aria-hidden="true" class="-ml-4 flex-1" />
        <div class="flex items-center gap-2">
          <UButton
            icon="i-ph-sign-out-duotone"
            variant="ghost"
            color="gray"
            size="lg"
            @click="logout"
          />
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
const mobileMenu = ref(false);
const toggleMobileMenu = () => {
  document.body.style.overflow = mobileMenu.value ? "auto" : "hidden";
  mobileMenu.value = !mobileMenu.value;
};

defineProps({
  storeAvatarUrl: {
    type: String,
    required: true,
  },
  storeName: {
    type: String,
    required: true,
  },
});
const menuItems = [
  {
    label: "Orders",
    to: "/admin",
    exact: true,
    exactHash: true,
  },
  {
    label: "Customers",
    to: "/admin/customers",
    exact: true,
    exactHash: true,
  },
  {
    label: "Settings",
    to: "/admin/settings",
    exact: true,
    exactHash: true,
  },
];

const { clear, fetch: refreshSession } = useUserSession();

const logout = async () => {
  await clear();
  await refreshSession();
  return navigateTo("/");
};
</script>
