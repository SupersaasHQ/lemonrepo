<template>
  <div class="mt-8">
    <UTable :rows="orders" :columns="columns" :loading="loading">
      <template #loading-state>
        <div class="flex items-center justify-center h-32">
          <Icon name="i-ph-spinner" class="w-6 h-6 animate-spin" />
        </div>
      </template>
      <template #empty-state>
        <div class="flex flex-col items-center justify-center py-6 gap-3">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ loading ? "Loading orders..." : "No orders found" }}
          </div>
        </div>
      </template>
      <template #user_name-data="{ row }">
        <div class="flex items-center gap-2">
          <UAvatar
            :src="`https://unavatar.io/${row.user_email}`"
            :alt="row.user_name"
            size="xs"
          />
          <p @click="copyText(row.user_name)">
            {{ maskedName(row.user_name) }}
          </p>
        </div>
      </template>
      <template #status-data="{ row }">
        <span
          class="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm font-medium forced-colors:outline"
          :class="getStatusColor(row.status)"
        >
          {{ row.status }}
        </span>
      </template>
      <template #total_amount-data="{ row }">
        {{ row.total_amount === "$0.00" ? "-" : row.total_amount }}
      </template>
      <template #tax_paid-data="{ row }">
        {{ row.tax_paid === "$0.00" ? "-" : row.tax_paid }}
      </template>
      <template #discount-data="{ row }">
        {{ row.discount === "$0.00" ? "-" : row.discount }}
      </template>
      <template #licenseKeyStatus-data="{ row }">
        <span
          class="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm font-medium forced-colors:outline"
          :class="getLicenseKeyStatusColor(row.licenseKeyStatus || 'N/A')"
        >
          {{ row.licenseKeyStatus || "N/A" }}
        </span>
      </template>
      <template #created_at-data="{ row }">
        {{ formatDate(row.created_at) }}
      </template>
      <template #actions-data="{ row }">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-ph-dots-three-outline-fill"
          @click="showDetails(row)"
        />
      </template>
      <template #user_email-data="{ row }">
        <p @click="copyText(row.user_email)">
          {{ maskedEmail(row.user_email) }}
        </p>
      </template>
    </UTable>
  </div>
  <UModal v-model="showModal">
    <ul
      v-if="selectedOrder"
      class="[&>li]:py-3 divide-y dark:divide-white/10 text-sm px-6 py-3"
    >
      <div class="flex justify-between my-4 items-end">
        <div class=" flex items-center gap-2">
          <UAvatar
            :src="`https://unavatar.io/${selectedOrder.user_email}`"
            :alt="selectedOrder.user_name"
            size="lg"
          />
          <div>
            <p @click="copyText(selectedOrder.user_name)">
              {{ maskedName(selectedOrder.user_name) }}
            </p>
            <p
              class="text-gray-500"
              @click="copyText(selectedOrder.user_email)"
            >
              {{ maskedEmail(selectedOrder.user_email) }}
            </p>
          </div>
        </div>
        <div>
          <p class="text-lg font-semibold">
            {{ selectedOrder.total_amount }}
          </p>
        </div>
      </div>
      <li class="grid grid-cols-2">
        <span class="text-gray-500">Order Number</span>
        <span>{{ selectedOrder.order_number }}</span>
      </li>
      <li class="grid grid-cols-2">
        <span class="text-gray-500">Status</span>
        <span
          class="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm font-medium forced-colors:outline max-w-max"
          :class="getStatusColor(selectedOrder.status)"
        >
          {{ selectedOrder.status }}
        </span>
      </li>
      <li class="grid grid-cols-2">
        <span class="text-gray-500">Tax</span>
        <span>{{
          selectedOrder.tax_paid === "$0.00" ? "-" : selectedOrder.tax_paid
        }}</span>
      </li>
      <li class="grid grid-cols-2">
        <span class="text-gray-500">Discount</span>
        <span>{{
          selectedOrder.discount === "$0.00" ? "-" : selectedOrder.discount
        }}</span>
      </li>
      <li class="grid grid-cols-2">
        <span class="text-gray-500">License Key</span>
        <span>{{ selectedOrder.licenseKey }}</span>
      </li>
      <li class="grid grid-cols-2">
        <span class="text-gray-500">License Key Status</span>
        <span
          class="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm font-medium forced-colors:outline max-w-max"
          :class="
            getLicenseKeyStatusColor(selectedOrder.licenseKeyStatus || 'N/A')
          "
        >
          {{ selectedOrder.licenseKeyStatus || "N/A" }}
        </span>
      </li>
      <li class="grid grid-cols-2">
        <span class="text-gray-500">Date</span>
        <span>{{ formatDate(selectedOrder.created_at) }}</span>
      </li>
      <li class="grid grid-cols-2">
        <span class="text-gray-500">Receipt</span>
        <span class="underline"
          ><NuxtLink :to="selectedOrder.receipt" target="_blank"
            >View Receipt ↗</NuxtLink
          ></span
        >
      </li>
    </ul>
  </UModal>
</template>

<script lang="ts" setup>
import { useDateFormat, useClipboard } from "@vueuse/core";
import { toast } from "vue-sonner";
interface Order {
  id: number;
  store_id: number;
  customer_id: number;
  order_number: string;
  user_name: string;
  user_email: string;
  currency: string;
  status: string;
  amount: number;
  total: number;
  total_amount: string;
  tax_paid: string;
  discount: string;
  receipt: string;
  licenseKey: string;
  licenseKeyStatus: string;
  created_at: string;
  updated_at: string;
  url: string;
}
const { copy } = useClipboard();

const props = defineProps<{
  orders: Order[];
  loading: boolean;
  maskUserData: boolean;
}>();

const showModal = ref(false);
const selectedOrder = ref<Order | null>(null);
const columns = [
  { key: "user_name", label: "Customer" },
  { key: "user_email", label: "Email" },
  { key: "order_number", label: "Order #" },
  { key: "status", label: "Status" },
  { key: "total_amount", label: "Total" },
  { key: "tax_paid", label: "Tax" },
  { key: "discount", label: "Discount" },
  { key: "licenseKeyStatus", label: "License" },
  { key: "created_at", label: "Date" },
  {
    key: "actions",
  },
];

const formatDate = (dateString: string) => {
  return useDateFormat(new Date(dateString), "DD-MM-YY hh:mm a");
};

const getStatusColor = (status: string) => {
  const colors = {
    Paid: "bg-green-500/15 text-green-700 group-data-[hover]:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:group-data-[hover]:bg-green-500/20",
    "Partial refund":
      "bg-yellow-500/15 text-yellow-700 group-data-[hover]:bg-yellow-500/25 dark:bg-yellow-500/10 dark:text-yellow-400 dark:group-data-[hover]:bg-yellow-500/20",
  };
  return colors[status as keyof typeof colors] || "gray";
};

const showDetails = (row: Order) => {
  selectedOrder.value = row;
  showModal.value = true;
};

function maskedEmail(email: string) {
  if (!props.maskUserData) {
    return email;
  }

  const [localPart, domain] = email.split("@");
  if (!domain) {
    return email;
  }

  const maskedLocal =
    localPart[0] + "•".repeat(Math.max(localPart.length - 1, 5));
  const [domainName] = domain.split(".");
  const maskedDomain =
    domainName[0] + "•".repeat(Math.max(domainName.length - 1, 5));

  return `${maskedLocal}@${maskedDomain}`;
}

const copyText = (text: string) => {
  copy(text);
  toast.success("Copied to clipboard");
};

function maskedName(name: string) {
  if (!props.maskUserData) {
    return name || "-";
  }

  if (!name || name.length <= 2) {
    return name || "-";
  }

  return name[0] + "•".repeat(name.length - 2) + name[name.length - 1];
}

const getLicenseKeyStatusColor = (status: string) => {
  const colors = {
    Active:
      "bg-green-500/15 text-green-700 group-data-[hover]:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:group-data-[hover]:bg-green-500/20",
    Expired:
      "bg-rose-500/15 text-rose-700 group-data-[hover]:bg-rose-500/25 dark:bg-rose-500/10 dark:text-rose-400 dark:group-data-[hover]:bg-rose-500/20",
    Inactive:
      "bg-yellow-500/15 text-yellow-700 group-data-[hover]:bg-yellow-500/25 dark:bg-yellow-500/10 dark:text-yellow-400 dark:group-data-[hover]:bg-yellow-500/20",
    "N/A":
      "bg-gray-500/15 text-gray-700 group-data-[hover]:bg-gray-500/25 dark:bg-gray-500/10 dark:text-gray-400 dark:group-data-[hover]:bg-gray-500/20",
  };
  return colors[status as keyof typeof colors] || "gray";
};
</script>
