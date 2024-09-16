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
    <UModal
      v-model="licenseActivated"
      :ui="{ rounded: 'rounded-2xl overflow-hidden' }"
    >
      <div class="p-2 bg-white">
        <div class="p-8 bg-gray-50 rounded-xl border border-gray-100 space-y-4">
          <Icon
            name="i-ph-check-circle-duotone"
            class="h-20 w-20 mx-auto block text-green-500 my-6"
          />
          <p class="text-lg font-bold text-center">
            License activated successfully
          </p>
          <div
            class="p-2 border border-gray-200 text-center rounded-lg text-gray-600 font-semibold text-sm"
          >
            {{ state.licenseKey }}
          </div>
          <p
            class="text-gray-500 text-left md:text-center text-xs sm:text-sm flex items-center gap-2"
          >
            <UAvatar
              :src="`https://github.com/${state.username}.png`"
              size="xs"
            />
            {{ state.username }}
            has been granted access to our Github repository.
          </p>
        </div>
        <div class="grid grid-cols-2 relative mt-1">
          <UButton
            variant="ghost"
            color="gray"
            block
            @click="copy('fayaz@supersaas.dev')"
            class="text-gray-400 font-normal"
          >
            {{ copied ? "Copied to clipboard" : "help@supersaas.dev" }}
          </UButton>
          <UDivider
            orientation="vertical"
            class="absolute left-1/2 -translate-x-1/2 h-5 top-1/2 -translate-y-1/2"
          />
          <UButton
            variant="ghost"
            color="gray"
            block
            to="https://github.com/supersaashq/essentials"
            target="_blank"
            class="text-gray-400 font-normal"
          >
            Open Github
          </UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup>
import confetti from "canvas-confetti";
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
    await $fetch("/api/activate-license", {
      method: "POST",
      body: event.data,
    });
    licenseActivated.value = true;
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
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
