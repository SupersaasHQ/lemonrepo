<template>
  <div class="mt-8">
    <UTable :rows="customers" :columns="columns" :loading="loading">
      <template #loading-state>
        <div class="flex items-center justify-center h-32">
          <Icon name="i-ph-spinner" class="w-6 h-6 animate-spin" />
        </div>
      </template>
      <template #empty-state>
        <div class="flex flex-col items-center justify-center py-6 gap-3">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ loading ? "Loading customers..." : "No customers found" }}
          </div>
        </div>
      </template>
      <template #name-data="{ row }">
        <div class="flex items-center gap-2">
          <UAvatar
            :src="`https://unavatar.io/${row.email}`"
            :alt="row.name"
            size="xs"
          />
          <p @click="copyText(row.name)">{{ maskedName(row.name) }}</p>
        </div>
      </template>
      <template #email-data="{ row }">
        <p @click="copyText(row.email)">{{ maskedEmail(row.email) }}</p>
      </template>
      <template #city-data="{ row }">
        <p>
          {{ row.city || "N/A" }}
        </p>
      </template>
      <template #country_formatted-data="{ row }">
        <p>
          {{
            row.country_formatted
              ? row.country_formatted.length > 20
                ? row.country_formatted.slice(0, 20) + "..."
                : row.country_formatted
              : "N/A"
          }}
        </p>
      </template>
      <template #licenseKeyStatus-data="{ row }">
        <span
          class="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm font-medium forced-colors:outline"
          :class="getStatusColor(row.licenseKeyStatus || 'N/A')"
        >
          {{ row.licenseKeyStatus || "N/A" }}
        </span>
      </template>
    </UTable>
  </div>
</template>

<script lang="ts" setup>
import { useClipboard } from "@vueuse/core";
import { toast } from "vue-sonner";
const { copy } = useClipboard();

const props = defineProps<{
  customers: any[];
  loading: boolean;
  maskUserData: boolean;
}>();

interface Customer {
  id: number;
  name: string;
  email: string;
  city: string;
  country_formatted: string;
  licenseKey: string;
  licenseKeyStatus: string;
}

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "city", label: "City" },
  { key: "country_formatted", label: "Country" },
  { key: "licenseKeyStatus", label: "License Status" },
];

const getStatusColor = (status: string) => {
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
</script>

<style></style>
