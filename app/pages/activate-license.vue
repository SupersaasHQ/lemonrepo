<template>
  <div class="max-w-xl mx-auto">
    <UContainer class="max-w-4xl py-12 space-y-6">
      <h1
        class="font-display text-4xl sm:text-5xl font-bold tracking-tight text-black"
      >
        Activate License
      </h1>
      <p class="max-w-xl text-gray-600 text-xl">
        You need to activate your license to use Lemonrepo. Please enter the
        github username you want to activate the license for.
      </p>
      <UForm
        class="space-y-6"
        :schema="schema"
        :state="state"
        @submit="onSubmit"
      >
        <UFormGroup label="Github Username" name="username" required size="lg">
          <UInput placeholder="Your github username" v-model="state.username" />
        </UFormGroup>
        <UFormGroup label="License Key" name="licenseKey" required size="lg">
          <UInput placeholder="Your license key" v-model="state.licenseKey" />
        </UFormGroup>
        <UButton
          :loading="loading"
          :disabled="loading"
          type="submit"
          label="Activate License"
          size="lg"
          color="black"
          block
        />
      </UForm>
    </UContainer>
    <UModal v-model="licenseActivated" title="License Activated">
      <div class="px-8 pb-16 sm:pb-12 f-center flex-col text-center">
        <Icon name="i-ph-check-circle-duotone" class="h-36 w-36 mx-auto" />
        <p class="text-xl font-bold mb-4">
          Your license
          <span class="text-primary font-bold">{{ state.licenseKey }}</span> has
          been activated successfully.
        </p>
        <p class="text-gray-500">
          You should have been granted access to our Github repository. If you
          have any questions, please contact us at <br />
          <UButton
            variant="link"
            :padded="false"
            color="gray"
            class="underline"
            @click="copy('fayaz@supersaas.dev')"
            >{{
              copied ? "Copied to clipboard" : "fayaz@supersaas.dev"
            }}</UButton
          >
        </p>
      </div>
    </UModal>
  </div>
</template>

<script setup>
import { useClipboard } from "@vueuse/core";
import { toast } from "vue-sonner";
import { z } from "zod";
const route = useRoute();
const key = route.query.key;
const { lemonSqueezyUrl } = useRuntimeConfig().public;
const { copy, copied } = useClipboard();
const loading = ref(false);
const schema = z.object({
  username: z.string().min(1).max(39, "Invalid username"),
  licenseKey: z.string().length(36, "Invalid license key"),
});
const licenseActivated = ref(false);
const state = reactive({
  username: undefined,
  licenseKey: undefined,
});
async function onSubmit(event) {
  try {
    loading.value = true;
    await $fetch("/api/activate", {
      method: "POST",
      body: event.data,
    });
    licenseActivated.value = true;
  } catch (error) {
    toast.error(error.data.message);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  if (key) {
    state.licenseKey = key;
  }
});
</script>
