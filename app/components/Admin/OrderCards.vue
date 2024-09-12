<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <UCard>
      <p class="text-gray-500 text-sm font-bold uppercase">All time sales</p>
      <p class="font-bold text-lg sm:text-xl mt-2">
        {{ totalSales }}
      </p>
    </UCard>
    <UCard>
      <p class="text-gray-500 text-sm font-bold uppercase">All time revenue</p>
      <p class="font-bold text-lg sm:text-xl mt-2">
        {{ formatCurrency(totalRevenue) }}
      </p>
    </UCard>
    <UCard>
      <p class="text-gray-500 text-sm font-bold uppercase">30 day sales</p>
      <p class="font-bold text-lg sm:text-xl mt-2">
        {{ thirtyDaySales }}
      </p>
    </UCard>
    <UCard>
      <p class="text-gray-500 text-sm font-bold uppercase">30 day revenue</p>
      <p class="font-bold text-lg sm:text-xl mt-2">
        {{ formatCurrency(thirtyDayRevenue) }}
      </p>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
const { totalSales, totalRevenue, thirtyDaySales, thirtyDayRevenue } =
  defineProps({
    totalSales: {
      type: Number,
      required: true,
    },
    totalRevenue: {
      type: Number,
      required: true,
    },
    thirtyDaySales: {
      type: Number,
      required: true,
    },
    thirtyDayRevenue: {
      type: Number,
      required: true,
    },
  });

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value / 100);
};
</script>
