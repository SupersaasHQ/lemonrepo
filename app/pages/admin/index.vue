<template>
  <AdminPageContainer title="Orders">
    <template #actions>
      <div
        class="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full py-1.5 px-2.5 text-xs"
      >
        <p class="text-gray-500 dark:text-gray-400">Mask User Data</p>
        <UToggle v-model="maskUserData" />
      </div>
    </template>
    <div class="space-y-4">
      <AdminOrderCards
        :total-sales="store.total_sales"
        :total-revenue="store.total_revenue"
        :thirty-day-sales="store.thirty_day_sales"
        :thirty-day-revenue="store.thirty_day_revenue"
      />
      <AdminOrdersChart :orders="orders || []" />
      <AdminOrdersTable
        :orders="orders || []"
        :loading="status === 'pending'"
        :mask-user-data="maskUserData"
      />
    </div>
  </AdminPageContainer>
</template>

<script setup>
const maskUserData = ref(true);
const props = defineProps({
  store: {
    type: Object,
    required: true,
  },
});

const { data: orders, status } = await useFetch("/api/admin/orders", {
  server: false,
  lazy: true,
});
</script>
