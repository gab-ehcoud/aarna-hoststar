
# AARNA HostStar India — Landing Page (Next.js)

A single-page landing + application demo for the HostStar India event.
Built with **Next.js (pages router)** and **vanilla CSS** (no Tailwind) to keep
deployment simple for Vercel.

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel
1. Create a new Vercel project and import this folder.
2. Set **Framework Preset** to Next.js and deploy (no env required).
3. API route `/api/apply` echoes submissions for demo presentations.
   (It does not persist files; it logs JSON to serverless logs.)

## Customize
- Edit `pages/index.tsx` sections (Hero, Timeline, Jury, Prizes, Form, FAQs).
- Colors & layout in `styles/globals.css` (dark theme with orange accents).
