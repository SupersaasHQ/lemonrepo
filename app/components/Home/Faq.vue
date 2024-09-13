<template>
  <div id="faq" class="py-24 px-4 relative">
    <div class="relative max-w-6xl mx-auto">
      <div class="mb-16">
        <h2
          class="max-w-2xl text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 font-display"
        >
          Got Questions? We've got some answers!
        </h2>
        <p class="mt-12 max-w-2xl text-gray-600 text-2xl">
          If you have any other questions, feel free to reach out to me at
          <button
            variant="link"
            class="underline"
            :padded="false"
            color="gray"
            @click="copy('fayaz@supersaas.dev')"
          >
            {{ copied ? "Copied to clipboard" : "fayaz@supersaas.dev" }}
          </button>
          I'm happy to help!
        </p>
      </div>
      <UAccordion
        :items="items"
        multiple
        color="gray"
        variant="soft"
        size="xl"
        :ui="{ item: { size: 'text-base leading-relaxed', padding: 'py-4 pl-4', base: 'max-w-3xl' } }"
      />
    </div>
  </div>
</template>

<script setup>
import { useClipboard } from "@vueuse/core";
const { copy, copied } = useClipboard();

const items = [
  {
    label: "Can I try this product for free?",
    content:
      "You can can try the demo, you can also check the docs for videos and tutorials, where I explain the product in detail.",
  },
  {
    label: "What does Lifetime access mean?",
    content:
      "You get access to all the updates and releases that I push to the project. You can also raise issues and feature requests on Github.",
  },
  {
    label: "Javascript or Typescript?",
    content:
      "Lemonrepo is made with Javascript, but some utilities are written in Typescript.",
  },
  {
    label: "What's the tech stack?",
    content:
      "Lemonrepo is made with Nuxt 3 the fullstack framework, Tailwind CSS for CSS, Nuxt Auth Utils for authentication, Drizzle ORM for database, AWS S3, Nuxthub Blob and Local Storage for file storage, Stripe and Lemonsqueezy for payments, Resend, Sendgrid, Postmark, Plunk for emails, and more.",
  },
  {
    label: "What happens after I purchase a template?",
    content:
      "After you purchase the template, you will be invited to the respective github repository. You can then fork the repository and start building your project.",
  },
  {
    label: "Do you offer refunds?",
    content:
      "Unfortunately due to the nature of this product, where you get complete access to the codebase, and I have no way to verify if you have used it, I cannot offer refunds.",
  },
  {
    label:
      "I did not like the product, and I haven't used it. Can I get a refund?",
    content:
      "I strongly reccomend reaching out to me in case you have doubts about Lemonrepo, I will gladly give you an entire tour of the procuct and how to use it. I can also help you with any questions you have. This way you can decide if you want to purchase the product or not.",
  },
  {
    label: "Can I use Lemonrepo for open source projects?",
    content: "No, this will break the license, I hope you understand.",
  },
  {
    label: "Can I use Lemonrepo for client projects?",
    content: "Yes you can, use it for as many projects as you like.",
  },
  {
    label: "Can I use Lemonrepo for commercial projects?",
    content: "Yes you can, Lemonrepo was made for this very purpose.",
  },
  {
    label: "Can I resell this product?",
    content: "Absolutely not, please read the license for more details.",
  },
  {
    label: "Do you offer technical support?",
    content:
      "Yes, as long as it's related to the template codebase. I cannot help with your business logic or customizations that you may have made.",
  },
];
</script>
