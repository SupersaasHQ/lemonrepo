<template>
  <div class="relative isolate flex min-h-svh w-full flex-col">
    <AdminHeader
      :store-avatar-url="store.avatar_url"
      :store-name="store.name"
    />
    <main class="flex flex-1 flex-col pb-2 lg:px-2">
      <NuxtPage :store="store" />
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "admin",
  layout: "admin",
});

const { data: store } = await useFetch("/api/admin/store");
</script>
