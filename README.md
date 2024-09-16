# Lemonrepo

Lemonrepo allows you sell access to Private Github repositories using Lemonsqueezy. Everything is automated, license activation to repo read only invite management.

Lemonrepo is the tech behind I use to sell https://supersaas.dev, a fullstack Nuxt 3 starter kit

[![Deploy to NuxtHub](https://hub.nuxt.com/button.svg)](https://hub.nuxt.com/new?template=lemonrepo)

## Features

- A modern website template to sell your repo
- Feature sections
- Show realtime sales
- A public changelog showing your GitHub commits
- Testimonials
- FAQ
- Lemonsqueezy integration
- Superfast loading (Scored 100 on speed test)
- Admin Panel - View orders, Taxes, Refunds, Discounts
- Customer details
- License details
- Telegram notifications

Environment variables

```env
# Github
GITHUB_TOKEN=
GITHUB_OWNER=
GITHUB_REPO=

# Lemonsqueezy
LEMONSQUEEZY_API_KEY=
LEMONSQUEEZY_PRODUCT_URL=
LEMONSQUEEZY_WEBHOOK_SECRET=
LEMONSQUEEZY_STORE_ID=

# Admin
NUXT_SESSION_PASSWORD= A 32 char string
ADMIN_PASSWORD=

#TELEGRAM
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```


## Setup

Make sure to install the dependencies with [pnpm](https://pnpm.io).

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Check out the [deployment documentation](https://hub.nuxt.com/docs/getting-started/deploy) for more information.

## Deploy

Deploy the application on the Edge with [NuxtHub](https://hub.nuxt.com) on your Cloudflare account:

```bash
npx nuxthub deploy
```

Then checkout your server logs, analytics and more in the [NuxtHub Admin](https://admin.hub.nuxt.com).

You can also deploy using [Cloudflare Pages CI](https://hub.nuxt.com/docs/getting-started/deploy#cloudflare-pages-ci).

