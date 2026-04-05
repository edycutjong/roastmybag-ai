# 💀 RoastMyBag.ai

> "In crypto, there are two kinds of people... Diamond hands... and jeets. This is for the jeets."

**RoastMyBag.ai** is an AI voice agent that scans your BNB Chain wallet, calculates missed gains, and brutally roasts you for selling memecoins too early. Built for the **Four.Meme AI Sprint** on BNB Chain.

## 🔗 Live Demo
*(Insert Live Vercel App Link Here)*

---

## 🎯 The Problem
Every memecoin trader has a graveyard of sold-too-early bags. But calculating exactly how much money you left on the table requires manually sifting through block explorers, cross-referencing historical prices, and doing painful math. Portfolio trackers like DeBank show cold numbers — nobody shares a screenshot of their DeBank dashboard saying "look how I got rekt."

There's a massive gap between the viral, emotionally-charged content that dominates Crypto Twitter and the dry, analytical tools available to traders. Missed gains are the #1 most viral content type in crypto, yet no product turns this shared pain into entertainment.

## 💡 The Solution
RoastMyBag.ai is an AI-powered "wallet comedian" that transforms your worst trades into personalized comedy.

1. **Connect** — Paste any BNB Chain wallet address (or just type `demo`)
2. **Scan** — Our engine fetches your full memecoin transaction history via BSCScan and calculates the exact USD you missed on every panic-sell using DexScreener pricing.
3. **Calculate** — We compare sell prices with today's value to find your exact missed gains.
4. **Roast** — GPT-4o generates a brutally funny, data-driven roast script. This isn't generic comedy — the AI knows the *exact* dollar amounts, token names, and timing of your worst decisions.
5. **Listen** — ElevenLabs speaks the roast out loud with a sarcastic AI voice, synced to a visual experience with fire, confetti, and screen shakes.
6. **Share** — A "Certificate of Jeeting" generates with your Jeet Score (0-100). Share it on X to spread the pain!

## 🛠️ Technical Highlights
- **Framework:** Next.js 16 App Router (TypeScript) deployed on Vercel.
- **Data Layer:** BSCScan API (transaction history) + DexScreener API (live pricing).
- **AI Brain:** GPT-4o (structured, data-driven comedy generation).
- **Voice Agent:** ElevenLabs (sarcastic TTS).
- **UI / UX:** Framer Motion (animations), Web Audio API (retro SFX), HTML5 Canvas (fire/confetti effects).
- **Zero Smart Contracts:** All value delivered at the application layer, zero blockchain deployment risk.

## 🚀 Getting Started

To run this project locally, you will need the following API keys:
- `BSCSCAN_API_KEY` (Get from BSCScan)
- `OPENAI_API_KEY` (Get from OpenAI)
- `ELEVENLABS_API_KEY` (Get from ElevenLabs)
- `ELEVENLABS_VOICE_ID` (Optional - defaults to Adam `pNInz6obpgDQGcFmaJgB`)

Create a `.env.local` file in the root directory:
```env
BSCSCAN_API_KEY=your_bscscan_api_key
OPENAI_API_KEY=your_openai_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_VOICE_ID=pNInz6obpgDQGcFmaJgB
```

Then run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to get roasted.

## 🏷️ Tags
`ai`, `meme`, `web3`, `bnb-chain`, `four-meme`, `voice-ai`, `entertainment`, `social`, `viral`, `crypto`
