# HFCB KHQR Payment Generator

A Next.js web app for generating KHQR payment codes via the HFCB Online Payment Gateway.

## Features

- **Native QR Code** — Generate scannable KHQR codes directly (`webpay.acquire.nativePay`)
- **Payment Link** — Create hosted payment page links (`webpay.acquire.createorder`)
- **Query Order** — Check payment status in real-time (`webpay.acquire.queryOrder`)
- **Token Auth** — Built-in OAuth token retrieval (`/oauth/token`)
- **Auto Poll** — Automatically poll payment status every 5 seconds
- **Credential saving** — Credentials saved in browser localStorage

## Deploy to Vercel

### Option 1 — Vercel CLI (recommended)

```bash
npm install -g vercel
vercel
```

### Option 2 — GitHub + Vercel Dashboard

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Vercel auto-detects Next.js — click **Deploy**

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## How to Use

1. **Enter credentials** — Paste your API Base URL and Bearer token, or use "Get Token" to authenticate with client_id/secret/username/password
2. **Native QR** — Enter seller code + amount → Generate QR → Customer scans with HFCB mobile app
3. **Payment Link** — Creates a hosted payment page URL to share with customers
4. **Query** — Check any order's payment status by reference number

## API Proxy

All API calls go through `/api/gateway` (Next.js server-side proxy) to avoid CORS issues. Your credentials are never stored server-side.

## Notes

- The app uses `sign_type: MD5` as specified in the guideline
- KHR amounts should be entered as whole numbers (e.g. 400000)
- USD amounts support decimals (e.g. 1.00)
- Service code (BIC) defaults to `HEFBKHPP` for HFCB
