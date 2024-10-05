<template>
  <AdminPageContainer title="Settings">
    <div class="space-y-12 mt-8">
      <AdminFormSection
        title="Telegram Notifications"
        description="Send yourself a telegram notification when a new order is created with the order details"
      >
        <div class="sm:col-span-4">
          <div class="flex items-center gap-2">
            <UToggle
              :model-value="enabled"
              :loading="loading"
              :disabled="loading"
              @change="toggleTelegramNotifications"
            />
            <p>{{ enabled ? "Enabled" : "Disabled" }}</p>
          </div>
        </div>
      </AdminFormSection>
      <AdminFormSection
        title="Website Banner"
        description="Show a banner on top of the header. Promote something, make announcements."
      >
        <UForm :schema="bannerSchema" :state="bannerState" class="space-y-4 col-span-4" @submit="onBannerSubmit">
          <div class="sm:col-span-4">
            <UToggle
              v-model="bannerState.enabled"
              :loading="bannerLoading"
              :disabled="bannerLoading"
            />
            <p>{{ bannerState.enabled ? "Enabled" : "Disabled" }}</p>
          </div>
          <div class="sm:col-span-4">
            <UFormGroup
              label="Title"
              name="title"
              size="lg"
              help="Shown in bold, keep it small 1 - 2 words"
            >
              <UInput v-model="bannerState.title" :disabled="!bannerState.enabled" />
            </UFormGroup>
          </div>
          <div class="sm:col-span-4">
            <UFormGroup label="Subtitle" name="subtitle" size="lg">
              <UInput v-model="bannerState.subtitle" :disabled="!bannerState.enabled" />
            </UFormGroup>
          </div>
          <div class="sm:col-span-4">
            <UButton type="submit" label="Save" size="lg" :loading="bannerLoading" />
          </div>
        </UForm>
      </AdminFormSection>
    </div>
  </AdminPageContainer>
</template>

<script setup>
import { z } from 'zod'
import { toast } from "vue-sonner";

const { data: enabled } = await useFetch("/api/admin/telegram-notifications");
const loading = ref(false);

const bannerSchema = z.object({
  enabled: z.boolean(),
  title: z.string().max(50, 'Title must be 50 characters or less'),
  subtitle: z.string().max(100, 'Subtitle must be 100 characters or less')
});

const { data: bannerData } = await useFetch("/api/website-banner");
const bannerState = reactive({
  enabled: bannerData.value?.enabled || false,
  title: bannerData.value?.title || '',
  subtitle: bannerData.value?.subtitle || ''
});

const bannerLoading = ref(false);

const toggleTelegramNotifications = async () => {
  loading.value = true;
  await $fetch("/api/admin/telegram-notifications", {
    method: "PATCH",
    body: {
      enabled: !enabled.value,
    },
  });
  loading.value = false;
  enabled.value = !enabled.value;
  toast.success(
    `Telegram notifications ${enabled.value ? "enabled" : "disabled"}`
  );
};

const onBannerSubmit = async (event) => {
  bannerLoading.value = true;
  try {
    await $fetch("/api/admin/website-banner", {
      method: "PATCH",
      body: event.data,
    });
    toast.success("Website banner settings updated");
  } catch (error) {
    toast.error("Failed to update website banner settings");
  } finally {
    bannerLoading.value = false;
  }
};
</script>
