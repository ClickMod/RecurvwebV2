This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## CMS Integration (Strapi + Railway)

Blog posts (`/blog/[slug]`) and industry pages (`/industries/[slug]`) are driven by a self-hosted Strapi CMS deployed on Railway. All other pages remain static in this codebase.

### Required environment variables

Add these to `.env.local` for local dev, and to your hosting platform (Vercel/Railway) for production:

| Variable | Description |
|---|---|
| `STRAPI_API_URL` | Base URL of the Strapi instance, e.g. `https://strapi-cms.up.railway.app` |
| `STRAPI_API_TOKEN` | Read-only API token from Strapi admin → Settings → API Tokens |
| `REVALIDATE_SECRET` | Random secret string shared with the Strapi webhook |

### Webhook → revalidation flow

1. Editor publishes or updates a blog post or industry in Strapi admin
2. Strapi fires a POST to `https://<your-domain>/api/revalidate?secret=<REVALIDATE_SECRET>`
3. The handler calls `revalidatePath` for the affected route and `revalidateTag` for the list
4. Next.js discards the cached page; the next request re-fetches from Strapi and caches the result

### How to add a new industry (end-to-end, no redeploy)

1. Log in to Strapi admin → **Content Manager → Industry → Create new entry**
2. Fill in `title`, `slug` (auto-generated from title), `content` (rich text), SEO fields, and `featuredImage`
3. Click **Publish**
4. Strapi fires the webhook → Next.js revalidation runs immediately
5. Visit `https://<your-domain>/industries/<slug>` — the page renders from Strapi on first load, then gets cached
6. **No code deploy needed**

### Static route precedence

`app/industries/schools-and-education/page.tsx` is a hand-crafted static route that takes precedence over the dynamic `[slug]` route for that path. It can be migrated to Strapi at any time by removing the file and creating an "schools-and-education" industry entry in Strapi.

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
