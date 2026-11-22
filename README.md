# ChatMate — Automated Customer Support Agent

An AI customer-support agent that answers order, refund, payment and account
questions, with a chat interface and a rule-based reply engine that can be
swapped for any LLM provider.

## What it does

- **Landing page** — product overview and sign-in entry points.
- **Chat** — a real conversation UI at `/chat` backed by `/api/chat`.
- **Auth** — NextAuth sign-in and sign-up flows.
- **Reply engine** — intent matching over orders, refunds, cancellations,
  payments, account access and human handoff. Swap `reply()` in
  `pages/api/chat.js` for a model call to use an LLM instead.

## Stack

- Next.js 14 (pages router)
- Chakra UI + Framer Motion
- NextAuth
- MongoDB (optional — only needed for the `Backend/` service)

## Getting started

```bash
npm install
npm run dev
# open http://localhost:3000
```

The chat works with no configuration. To enable the MongoDB-backed backend:

```bash
cp .env.example .env.local   # then fill in MONGODB_URI
cd Backend && npm install && node server.js
```

## Project layout

```
pages/
  index.js        landing page
  chat.js         chat interface
  api/chat.js     reply engine (swap for an LLM here)
  signin.js       auth
  signup.js       auth
components/       Navbar, HeroSection, Footer, aboutCard
Backend/          optional Node + MongoDB service
```

## License

MIT — see [LICENSE](LICENSE).