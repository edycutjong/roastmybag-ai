# 💀 RoastMyBag.ai

> *"In crypto, there are two kinds of people... Diamond hands... and jeets. This is for the jeets."*

**RoastMyBag.ai** is an AI voice agent that scans your BNB Chain wallet, calculates missed gains, and brutally roasts you for selling memecoins too early. Built for the **[Four.Meme AI Sprint](https://four.meme/)** on BNB Chain.

[![CI](https://github.com/edycutjong/roastmybag-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/edycutjong/roastmybag-ai/actions)

---

## 🎯 The Problem

Every memecoin trader has a graveyard of sold-too-early bags. But calculating exactly how much money you left on the table requires manually sifting through block explorers, cross-referencing historical prices, and doing painful math.

Portfolio trackers like DeBank show cold numbers — nobody shares a screenshot of their DeBank dashboard saying *"look how I got rekt."*

There's a massive gap between the viral, emotionally-charged content that dominates Crypto Twitter and the dry, analytical tools available to traders. **Missed gains are the #1 most viral content type in crypto**, yet no product turns this shared pain into entertainment.

## 💡 The Solution

RoastMyBag.ai is an AI-powered **"wallet comedian"** that transforms your worst trades into personalized comedy:

1. **Connect** — Paste any BNB Chain wallet address (or type `demo` to try it instantly)
2. **Scan** — Our engine fetches your full memecoin transaction history via BSCScan and calculates the exact USD you missed on every panic-sell using DexScreener pricing
3. **Calculate** — We compare sell prices with today's value to find your exact missed gains and assign a **Jeet Score (0–100)**
4. **Roast** — GPT-4o generates a brutally funny, data-driven roast script. This isn't generic comedy — the AI knows the *exact* dollar amounts, token names, and timing of your worst decisions
5. **Listen** — ElevenLabs speaks the roast out loud with a sarcastic AI voice, synced in real-time to visual beat cards with highlighted data points
6. **Share** — One-click post to X with your Jeet Score, title, and total missed gains

---

## ⚡ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js 16 App Router                │
│                     (React 19 + RSC)                    │
├──────────┬──────────┬──────────┬─────────┬──────────────┤
│ /api/scan│/api/roast│ /api/tts │ /api/og │   page.tsx   │
│ Wallet   │ AI Roast │ Voice    │ OG Image│  SPA Client  │
│ Analysis │ Gen      │ Synth    │ Gen     │  (4 phases)  │
└────┬─────┴────┬─────┴────┬─────┴────┬────┴──────────────┘
     │          │          │          │
     ▼          ▼          ▼          ▼
  BSCScan    OpenAI    ElevenLabs   Satori
  DexScreener GPT-4o    TTS API    (ImageResponse)
```

### Client Flow — 4-Phase SPA

| Phase | Description |
|-------|-------------|
| `landing` | Hero + wallet input (address validation or `demo` keyword) |
| `scanning` | Animated progress bar + rotating loading messages |
| `roasting` | AI generation phase with continued loading UX |
| `results` | Score ring, beat-synced roast cards, damage report, share CTA |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 App Router (TypeScript, React 19) |
| **Styling** | Tailwind CSS v4 + custom CSS (glassmorphism, fire gradients) |
| **Animations** | Framer Motion + HTML5 Canvas (fire & confetti effects) |
| **Audio** | Web Audio API (retro SFX engine) + ElevenLabs TTS |
| **Data** | BSCScan API (BEP-20 transfers) + DexScreener API (live pricing) |
| **AI** | OpenAI GPT-4o (structured JSON comedy generation) |
| **OG Images** | Satori + `next/og` (dynamic social cards) |
| **Testing** | Vitest + Testing Library + v8 coverage (100% target) |
| **CI/CD** | GitHub Actions (typecheck → lint → test:coverage) |
| **Deploy** | Vercel |

---

## 📁 Project Structure

```
roastmybag-ai/
├── app/
│   ├── api/
│   │   ├── scan/route.ts      # Wallet scanner (BSCScan + DexScreener)
│   │   ├── roast/route.ts     # AI roast generator (GPT-4o)
│   │   ├── tts/route.ts       # Voice synthesis (ElevenLabs)
│   │   └── og/route.tsx       # Dynamic OG image generation
│   ├── __tests__/             # Page & layout tests
│   ├── globals.css            # Design system (CSS variables, fire effects)
│   ├── layout.tsx             # Root layout (Space Grotesk + JetBrains Mono)
│   └── page.tsx               # Main SPA (4-phase state machine)
├── components/
│   ├── __tests__/             # Component tests (100% coverage)
│   ├── canvas-fire.tsx        # HTML5 Canvas fire background
│   ├── confetti.tsx           # Confetti particle system
│   ├── results-view.tsx       # Results dashboard (score ring, beats, damage report)
│   └── sfx-engine.ts          # Web Audio API sound effects
├── lib/
│   ├── __tests__/             # Library tests (100% coverage)
│   ├── analyzer.ts            # Trade analysis engine (missed gains calc)
│   ├── bscscan.ts             # BSCScan API client
│   ├── constants.ts           # Jeet tiers, stablecoins, DEX routers, design tokens
│   ├── demo-profiles.ts       # Pre-built demo wallet profiles
│   ├── dexscreener.ts         # DexScreener price API client
│   ├── elevenlabs.ts          # ElevenLabs TTS API client
│   ├── roast-prompt.ts        # GPT-4o system prompt & message builder
│   └── types.ts               # TypeScript interfaces
├── public/                    # App icons (192, 512, apple-touch)
├── .github/workflows/ci.yml   # CI pipeline
├── vitest.config.ts           # Test configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+
- **npm** 9+

### 1. Clone & Install

```bash
git clone https://github.com/edycutjong/roastmybag-ai.git
cd roastmybag-ai
npm install
```

### 2. Configure Environment

Copy the example env file and add your API keys:

```bash
cp .env.example .env.local
```

| Variable | Required | Source |
|----------|----------|--------|
| `OPENAI_API_KEY` | Optional* | [OpenAI Platform](https://platform.openai.com/api-keys) |
| `ELEVENLABS_API_KEY` | Optional* | [ElevenLabs](https://elevenlabs.io/) |
| `ELEVENLABS_VOICE_ID` | Optional | Defaults to `pNInz6obpgDQGcFmaJgB` (Adam) |
| `MORALIS_API_KEY` | Optional* | [Moralis](https://moralis.io/) |
| `NEXT_PUBLIC_SITE_URL` | Optional | Defaults to `http://localhost:3000` |

> **\*Zero-API-key mode:** The app works out of the box with `demo` mode — pre-built profiles provide full wallet data and roast scripts without any API keys. BSCScan API also works without a key (rate-limited).

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and type `demo` to get roasted instantly.

---

## 🧪 Testing

The project targets **100% code coverage** across all source files.

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Type check
npm run typecheck

# Lint
npm run lint

# Full CI pipeline (typecheck + test:coverage)
npm run ci
```

**Test architecture:**
- **Unit tests** for all `lib/` modules (API clients, analyzer, constants, prompts)
- **Component tests** for all `components/` (canvas-fire, confetti, results-view, sfx-engine)
- **Integration tests** for all API routes (`/api/scan`, `/api/roast`, `/api/tts`, `/api/og`)
- **Page tests** for layout and main page state machine

---

## 🎮 Demo Mode

Type `demo` in the wallet input to experience the full flow without any API keys or real wallet. Demo mode uses **pre-built profiles** with realistic BNB Chain memecoin data, pre-generated roasts, and the complete UI experience including:

- Animated scanning & roasting phases
- Jeet Score ring with tier assignment
- Beat-synced roast cards with typewriter animation
- Full damage report table
- Share-to-X integration
- Web Speech API fallback for TTS

---

## 🔥 Jeet Score Tiers

| Score | Title | Emoji |
|-------|-------|-------|
| 0–20 | Diamond Hands Legend | 💎 |
| 21–40 | Mostly Hodler | 🤲 |
| 41–60 | Casual Paper Hands | 📄 |
| 61–80 | Professional Jeet | 🏃 |
| 81–100 | Certified Degen Ruglord | 👑 |

---

## 📄 License

MIT

---

## 🏷️ Tags

`ai` · `meme` · `web3` · `bnb-chain` · `four-meme` · `voice-ai` · `entertainment` · `social` · `viral` · `crypto` · `nextjs` · `react` · `typescript`

---

<p align="center">
  <b>RoastMyBag.ai</b> — Not financial advice. Just emotional damage. 💀<br/>
  Powered by <a href="https://four.meme/">Four.Meme</a> × <a href="https://www.bnbchain.org">BNB Chain</a>
</p>
