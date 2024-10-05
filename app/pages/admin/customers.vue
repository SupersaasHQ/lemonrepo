<template>
  <AdminPageContainer title="Customers">
    <template #actions>
      <div
        class="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full py-1.5 px-2.5 text-xs"
      >
        <p class="text-gray-500 dark:text-gray-400">Mask User Data</p>
        <UToggle v-model="maskUserData" />
      </div>
    </template>
    <AdminCustomersTable
      :customers="customers || []"
      :loading="status === 'pending'"
      :mask-user-data="maskUserData"
    />
  </AdminPageContainer>
</template>

<script lang="ts" setup>
const { data: customers, status } = useFetch("/api/admin/customers");
const maskUserData = ref(true);
</script>
