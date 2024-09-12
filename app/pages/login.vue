<script setup>
import { z } from "zod";
import { toast } from "vue-sonner";

const loading = ref(false);
const { fetch: refreshSession } = useUserSession();

const schema = z.object({
  password: z.string().min(1, "Password is required"),
});

const state = reactive({
  password: undefined,
});

async function login(event) {
  try {
    loading.value = true;
    await $fetch("/api/login", {
      method: "POST",
      body: { password: event.data.password },
    });
    await refreshSession();
    return navigateTo("/admin");
  } catch (error) {
    loading.value = false;
    toast.error(error.data.message || "Something went wrong");
  }
}
</script>

<template>
  <main class="h-screen flex items-center justify-center">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="login">
      <UFormGroup name="password" size="lg">
        <UInput
          v-model="state.password"
          type="password"
          placeholder="Password"
        />
      </UFormGroup>

      <UButton
        :loading="loading"
        :disabled="loading"
        type="submit"
        block
        size="lg"
      >
        Login
      </UButton>
    </UForm>
  </main>
</template>
