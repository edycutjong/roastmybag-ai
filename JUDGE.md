# RoastMyBag.ai — For Judges 🔥

> This file mirrors the live page at **[roastmybag.edycu.dev/judge](https://roastmybag.edycu.dev/judge)**.
> That page needs no auth, no cookies and no setup — it is one click from the pitch.

---

## 01 · The claim

**RoastMyBag.ai is an AI voice agent that scans your BNB Chain wallet, calculates the money you
left on the table by selling memecoins too early, and roasts you for it — out loud.**

---

## 02 · The 30-second path

1. Open **[roastmybag.edycu.dev](https://roastmybag.edycu.dev)** — no signup, no wallet connect, no keys.
2. Type the word **`demo`** into the input and press **"Roast My Bag"**.
3. Watch the scan → roast sequence, then read the **Jeet Score**, the tier title, and the itemised
   list of tokens you paper-handed.
4. Optional: paste any real BSC wallet address (`0x…`) to run it against live chain data instead.

No cloning, no install, no environment file. If a step here required a terminal, it would have
failed its purpose.

---

## 03 · Receipts

| Metric | Value | Detail |
|---|---|---|
| Unit tests | **121 passing** | 22 files, 0 skipped |
| Coverage | **100%** | statements · branches · functions · lines |
| E2E tests | **48 passing** | Playwright, desktop + mobile viewports |
| Exhaustive verification | **30,001 cases** | Jeet Score → tier mapping, whole input space |
| Static bundle | **904 KB** | budget 1,500 KB warn / 2,000 KB fail |
| Lighthouse accessibility | **98 / 100** | landing / judge — hard gate at 90 |
| CI pipeline | **6 stages** | quality · security · build · e2e · perf · gate |
| Open security alerts | **0** | CodeQL · Dependabot · secret scanning · gitleaks |

Every number above is reproducible from the commands in §04. See [DEMO.md](DEMO.md) for how each
was measured and what is **not** measured.

### The one number worth reading twice

`getJeetTitle()` — the function that decides which of five tier titles headlines your roast, your
OG card and your share text — is verified across **30,001 distinct inputs**, spanning the whole
valid range, both out-of-range directions, and every fractional position between tiers. Not
sampled. Enumerated. See `lib/__tests__/jeet-tier.exhaustive.test.ts`.

That verification found a real defect: fractional scores between two tiers matched no band and
fell through to the fallback, so a near-perfect **20.5** was labelled *"Certified Degen Ruglord"* —
the harshest title in the table. Fixed, and pinned by a named regression test.

---

## 04 · Reproduce it

The real path. No flag disables the product; the app calls its providers normally.

```bash
git clone https://github.com/edycutjong/roastmybag-ai.git
cd roastmybag-ai && npm ci
cp .env.example .env.local   # add OPENAI_API_KEY + ELEVENLABS_API_KEY
npm run dev                  # → http://localhost:3000
```

**CI / deterministic replay** — runs with zero credentials. This verifies the code; it is *not*
the product:

```bash
npm run ci     # audit + lint + typecheck + 121 tests @ 100% coverage
npm run e2e    # 48 Playwright tests, desktop + mobile
```

---

## 05 · Honest limitations

1. **Sell price is estimated, not exact.** The analyzer approximates each sell at 10% of the
   token's current price rather than reconstructing the historical fill from LP reserves at block
   height. "Missed gains" is an entertaining upper-bound estimate, not an accounting figure.
2. **Any outbound token transfer counts as a "sell".** Moving a token to your own second wallet,
   or to cold storage, is scored as paper-handing. Distinguishing a real DEX sell from a
   self-transfer needs LP pair resolution the project does not do.
3. **Typing `demo` serves a curated profile, by design,** so the flow is reviewable without a
   funded wallet. It is clearly labelled in the response payload (`demo: true`) and is not the
   only path — a real `0x` address runs the live pipeline.
4. **No real-provider cost receipt is published.** Test suites run with zero credentials; the
   product itself calls OpenAI and ElevenLabs, but a measured cost-and-wall-clock figure from a
   live run is not recorded. This is the weakest evidence in this file, and it is stated rather
   than hidden.

---

## 06 · Links

| | |
|---|---|
| 🔥 Live app | https://roastmybag.edycu.dev |
| 🧑‍⚖️ Judge page | https://roastmybag.edycu.dev/judge |
| 💻 Repository | https://github.com/edycutjong/roastmybag-ai |
| 🎬 Demo video | https://youtu.be/K9sz9dNHa3w |
| ✅ CI runs | https://github.com/edycutjong/roastmybag-ai/actions |
