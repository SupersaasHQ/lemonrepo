// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-07-30",
  future: { compatibilityVersion: 4 },
  modules: [
    "@nuxthub/core",
    "@nuxt/ui",
    "@nuxt/scripts",
    "@nuxt/fonts",
    "nuxt-auth-utils",
    "@nuxt/image",
    "@nuxt/icon",
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  hub: {
    kv: true,
  },
  colorMode: {
    preference: "light",
  },
  fonts: {
    families: [
      {
        name: "Recoleta",
        provider: "local",
        weights: ["700"],
      },
    ],
  },
  runtimeConfig: {
    session: {
      maxAge: 60 * 60 * 24 * 7,
    },
    lemonSqueezyApiKey: process.env.LEMONSQUEEZY_API_KEY,
    lemonSqueezyWebhookSecret: process.env.LEMONSQUEEZY_WEBHOOK_SECRET,
    githubOwner: process.env.GITHUB_OWNER,
    githubRepo: process.env.GITHUB_REPO,
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
    telegramChatId: process.env.TELEGRAM_CHAT_ID,
    public: {
      productUrl: process.env.LEMONSQUEEZY_PRODUCT_URL,
    },
  },
  devtools: { enabled: true },
});