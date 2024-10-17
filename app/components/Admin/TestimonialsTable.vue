<template>
  <div class="mt-8">
    <UTable
      :rows="testimonials"
      :columns="columns"
      :loading="loading"
    >
      <template #loading-state>
        <div class="flex items-center justify-center h-32">
          <Icon
            name="i-ph-spinner"
            class="w-6 h-6 animate-spin"
          />
        </div>
      </template>
      <template #empty-state>
        <div class="flex flex-col items-center justify-center py-6 gap-3">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ loading ? "Loading testimonials..." : "No testimonials found" }}
          </div>
        </div>
      </template>
      <template #author.avatar-data="{ row }">
        <div class="flex flex-col gap-2">
          <UAvatar
            :src="row.author.src"
            alt="Author avatar"
          />
        </div>
      </template>
      <template #author.name-data="{ row }">
        <p>
          {{ row.author.name }}
        </p>
      </template>
      <template #author.description-data="{ row }">
        <p>
          {{ row.author.description }}
        </p>
      </template>
      <template #title-data="{ row }">
        <p>
          {{ row.title }}
        </p>
      </template>
      <template #quote-data="{ row }">
        <p>
          {{ row.quote }}
        </p>
      </template>
      <template #actions-data="{ row }">
        <UButton
          color="red"
          variant="ghost"
          label="delete"
          @click="emit('onDelete', row)"
        />
      </template>
    </UTable>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  testimonials: Testimonial[]
  loading: boolean
}>()

const columns = [
  { key: "author.avatar", label: "Author Avatar" },
  { key: "author.name", label: "Author Name" },
  { key: "author.description", label: "Author Description" },
  { key: "title", label: "Title" },
  { key: "quote", label: "Quote" },
  {
    key: "actions",
  },
]

const emit = defineEmits<{
  (e: "onDelete", value: Testimonial): void
}>()
</script>
