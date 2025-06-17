<template>
  <AdminPageContainer title="Testimonials">
    <template #actions>
      <div class="flex items-center gap-2 rounded-full py-1.5 px-2.5 text-xs">
        <UButton @click="isTestimonialModalOpen = true">
          Add Testimonial
        </UButton>
      </div>
    </template>
    <AdminTestimonialsTable
      :testimonials="testimonials || []"
      :loading="status === 'pending'"
      @on-delete="onDelete"
    />

    <UModal v-model="isTestimonialModalOpen">
      <UCard>
        <template #header>
          <div class="flex justify-between">
            <div>Add Testimonial</div>
            <div>
              <UButton
                @click="onCancel"
                color="gray"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
              />
            </div>
          </div>
        </template>

        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormGroup
            label="Title"
            name="title"
          >
            <UInput v-model="state.title" />
          </UFormGroup>

          <UFormGroup
            label="Quote"
            name="quote"
          >
            <UTextarea v-model="state.quote" />
          </UFormGroup>

          <UFormGroup
            label="Author Name"
            name="name"
          >
            <UInput v-model="state.author.name" />
          </UFormGroup>

          <UFormGroup
            label="Description"
            name="description"
          >
            <UTextarea v-model="state.author.description" />
          </UFormGroup>

          <UFormGroup
            label="Avatar URL"
            name="url"
          >
            <UInput v-model="state.author.avatar.src" />
          </UFormGroup>

          <UButton
            type="submit"
            block
            :loading="testimonialAdding"
          >
            Save
          </UButton>
        </UForm>
      </UCard>
    </UModal>
  </AdminPageContainer>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from "#ui/types"
import { z } from "zod"
import { toast } from "vue-sonner"

const testimonialAdding = ref(false)
const testimonialDeleting = ref(false)
const isTestimonialModalOpen = ref(false)

const schema = z.object({
  title: z.string().min(3, "Title is required"),
  quote: z.string().min(3, "Quote is required"),
  author: z.object({
    name: z.string().min(3, "Author name is required"),
    description: z.string().min(3, "Author description is required"),
    avatar: z.object({
      src: z.string().url("Invalid URL for avatar"),
      loading: z.enum(["lazy"]),
    }),
  }),
})

const state = reactive<Testimonial>({
  title: "",
  quote: "",
  author: {
    name: "",
    description: "",
    avatar: {
      src: "",
      loading: "lazy",
    },
  },
})

const { data: testimonials, status } = await useFetch<Testimonial[], any>(
  "/api/testimonials"
)

async function onDelete(testimonial: Testimonial) {
  if (!confirm("Delete this testimonial?")) {
    return
  }

  testimonials.value = testimonials.value?.filter((t) => {
    return (
      t.title !== testimonial.title && t.author.name !== testimonial.author.name
    )
  })

  testimonialDeleting.value = true
  try {
    await $fetch("/api/admin/testimonials", {
      method: "PATCH",
      body: {
        testimonials: testimonials.value,
      },
    })

    isTestimonialModalOpen.value = false
    toast.success("Testimonial deleted successfully")
  } catch (error) {
    toast.error("Failed to delete testimonial")
  } finally {
    testimonialDeleting.value = false
  }
}

async function onSubmit(event: FormSubmitEvent<any>) {
  testimonialAdding.value = true
  try {
    if (!testimonials.value) {
      testimonials.value = []
    }

    testimonials.value = testimonials.value.concat(state)

    await $fetch("/api/admin/testimonials", {
      method: "PATCH",
      body: {
        testimonials: testimonials.value,
      },
    })

    isTestimonialModalOpen.value = false
    toast.success("Testimonial added successfully")
  } catch (error) {
    toast.error("Failed to add testimonial")
  } finally {
    testimonialAdding.value = false
  }
}

async function onCancel() {
  isTestimonialModalOpen.value = false
}
</script>
