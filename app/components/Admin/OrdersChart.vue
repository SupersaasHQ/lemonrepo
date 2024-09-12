<template>
  <UCard class="!bg-white">
    <div
      v-if="filteredOrders && filteredOrders.length"
      class="mb-4 flex items-center justify-between gap-2"
    >
      <p>
        You've sold {{ filteredOrders.length }} license{{
          filteredOrders.length === 1 ? "" : "s"
        }}, generating {{ formattedTotalAmount }} in revenue.
      </p>
      <USelectMenu
        v-model="selectedFilter"
        :options="filterOptions"
        class="w-40"
      />
    </div>
    <div v-if="filteredOrders && filteredOrders.length">
      <ClientOnly>
        <apexchart
          type="bar"
          height="350"
          :options="chartOptions"
          :series="series"
        />
      </ClientOnly>
    </div>
    <div v-else class="h-[350px] flex items-center justify-center">
      <p>Loading chart data...</p>
    </div>
  </UCard>
</template>

<script setup>
const props = defineProps({
  orders: {
    type: Array,
    required: true,
  },
});

const series = ref([]);
const categories = ref([]);

const filterOptions = [
  "Today",
  "Last 7 days",
  "Last 30 days",
  "Last 3 months",
  "Last 12 months",
  "Month to date",
  "Year to date",
  "All time",
];

const selectedFilter = ref(filterOptions[2]);

const chartOptions = computed(() => ({
  chart: {
    toolbar: {
      show: false,
    },
    type: "bar",
    height: 350,
    zoom: { enabled: false },
  },
  plotOptions: {
    bar: {
      columnWidth: "90%",
      borderRadius: 4,
    },
  },
  dataLabels: { enabled: false },
  colors: ["#6366f1"],
  xaxis: {
    categories: categories.value,
    labels: {
      formatter: (value) => value,
    },
  },
}));

const filteredOrders = computed(() => {
  if (!props.orders) return null;

  const now = new Date();
  const filterDate = new Date();

  switch (selectedFilter.value) {
    case "Today":
      filterDate.setHours(0, 0, 0, 0);
      break;
    case "Last 7 days":
      filterDate.setDate(now.getDate() - 7);
      break;
    case "Last 30 days":
      filterDate.setDate(now.getDate() - 30);
      break;
    case "Last 3 months":
      filterDate.setMonth(now.getMonth() - 3);
      break;
    case "Last 12 months":
      filterDate.setFullYear(now.getFullYear() - 1);
      break;
    case "Month to date":
      filterDate.setDate(1);
      break;
    case "Year to date":
      filterDate.setMonth(0, 1);
      break;
    case "All time":
      return props.orders;
  }

  return props.orders.filter(
    (order) => new Date(order.created_at) >= filterDate
  );
});

const groupOrdersByPeriod = (orders, period) => {
  const periodData = {};

  if (period === "hour") {
    for (let i = 0; i < 24; i++) {
      periodData[i] = { periodStart: i, totalRevenue: 0 };
    }
  }

  orders.forEach((order) => {
    const orderDate = new Date(order.created_at);
    let periodKey;

    switch (period) {
      case "hour":
        periodKey = orderDate.getHours();
        break;
      case "day":
        periodKey = orderDate.toISOString().split("T")[0];
        break;
      case "week": {
        const weekStart = new Date(
          orderDate.setDate(orderDate.getDate() - orderDate.getDay())
        );
        periodKey = weekStart.toISOString().split("T")[0];
        break;
      }
    }

    if (!periodData[periodKey]) {
      periodData[periodKey] = { periodStart: periodKey, totalRevenue: 0 };
    }
    periodData[periodKey].totalRevenue += parseFloat(
      order.total_amount.replace(/[^0-9.-]+/g, "")
    );
  });

  return Object.values(periodData).sort((a, b) =>
    period === "hour"
      ? a.periodStart - b.periodStart
      : a.periodStart.localeCompare(b.periodStart)
  );
};

const updateChartData = () => {
  if (filteredOrders.value && filteredOrders.value.length) {
    let periodData;
    let xAxisFormat;

    switch (selectedFilter.value) {
      case "Today":
        periodData = groupOrdersByPeriod(filteredOrders.value, "hour");
        xAxisFormat = (value) => `${value}:00`;
        chartOptions.value.plotOptions.bar.columnWidth = "50%";
        break;
      case "Last 7 days":
      case "Last 30 days":
      case "Month to date":
        periodData = groupOrdersByPeriod(filteredOrders.value, "day");
        xAxisFormat = (value) =>
          new Date(value).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
        chartOptions.value.plotOptions.bar.columnWidth = "90%";
        break;
      default:
        periodData = groupOrdersByPeriod(filteredOrders.value, "week");
        xAxisFormat = (value) =>
          new Date(value).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
        chartOptions.value.plotOptions.bar.columnWidth = "90%";
    }

    series.value = [
      {
        name: "Revenue",
        data: periodData.map((period) => period.totalRevenue.toFixed(2)),
      },
    ];
    categories.value = periodData.map((period) => period.periodStart);
    chartOptions.value.xaxis.labels.formatter = xAxisFormat;
  }
};

watch([() => props.orders, selectedFilter], updateChartData, {
  immediate: true,
});

const formattedTotalAmount = computed(() => {
  if (!filteredOrders.value) return "$0.00";
  const total = filteredOrders.value.reduce(
    (total, order) =>
      total + parseFloat(order.total_amount.replace(/[^0-9.-]+/g, "")),
    0
  );
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(total);
});
</script>
