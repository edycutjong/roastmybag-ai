# DEMO.md — measured receipts

Every number in [JUDGE.md](JUDGE.md) and on `/judge` is recorded here with the command that
produced it, so it can be re-derived rather than taken on faith. What was **not** measured is
stated just as plainly at the bottom.

**Measurement environment**

| | |
|---|---|
| Date | 2026-08-17 |
| Machine | Apple Silicon macOS (darwin 25.5.0) |
| Node | v22.22.0 |
| npm | 10.9.4 |
| Commit | `main` at the time of the harness commit |

---

## 1 · Unit tests + coverage

```bash
npm run test:coverage
```

```
Test Files  21 passed (21)
     Tests  110 passed (110)
  Duration  6.99s

All files          |     100 |      100 |     100 |     100 |
                     % Stmts   % Branch   % Funcs   % Lines
```

100% across statements, branches, functions and lines — not a headline figure but a gate: the
Stage 1 CI job fails if it drops.

## 2 · Exhaustive verification — 30,001 cases

```bash
npx vitest run lib/__tests__/jeet-tier.exhaustive.test.ts
```

`getJeetTitle()` maps a Jeet Score to one of five tier titles. It is the most visible decision in
the product — it headlines the roast, the OG card and the share text — so it is verified across
its **entire input space** rather than on examples:

- Range: `-100.00` → `200.00`, step `0.01`
- Count: **30,001 distinct inputs**, enumerated, not sampled
- Properties asserted per input: the returned tier exists in the table; the clamped score falls
  inside that tier's band; and the mapping is monotonic (a higher score never yields a milder
  tier).

**This verification found a real defect.** `JEET_TIERS` declares inclusive integer bounds
(`0-20`, `21-40`, …), so the original `score >= min && score <= max` test matched nothing for any
value in a gap. The `??` fallback then returned the *last* tier — meaning a near-perfect **20.5**
was labelled *"Certified Degen Ruglord"*, the harshest title available. Negative scores and `NaN`
failed the same way. Latent in production (scores are rounded before display), but real.

Fixed in `lib/constants.ts`; pinned by five named regression tests in
`lib/__tests__/regressions.test.ts`. Integer behaviour is unchanged, which is itself asserted.

## 2b · Property-based testing — 11,000 generated cases

```bash
npx vitest run lib/__tests__/properties.test.ts
```

Enumeration (§2) proves a *bounded* space is fully correct. Properties attack the unbounded ones —
arbitrary strings, arbitrary doubles, and hostile wallet data — using `fast-check`, at 1,000
generated cases per property across 11 properties. Counterexamples shrink to a minimal
reproduction.

| Function | Properties held |
|---|---|
| `isValidBscAddress` | never throws on any string; accepts every canonical `0x` + 40-hex in any case; rejects every non-40 length; rejects surrounding whitespace (guards the regex anchors) |
| `getJeetTitle` | total over all doubles; monotonic; agrees with its own clamp for all finite input |
| `buildUserMessage` | never throws on any stats incl. `NaN`/`Infinity`/empty; always emits the structural fields the system prompt parses; never lists more than the top 5 trades; reports `None` exactly when there are no trades |

`buildUserMessage` matters most here: token names and symbols come from on-chain metadata, so they
are **attacker-influenced strings flowing into an LLM prompt**. The properties assert the builder
survives arbitrary input without throwing and without losing its structural markers.

> This also satisfies the OpenSSF Scorecard **Fuzzing** check, which recognises `fast-check`
> property-based testing for JavaScript/TypeScript.

## 3 · Permission boundary — credentials never reach the browser

```bash
npx vitest run app/api/__tests__/secret-boundary.test.ts
```

The security claim in [SECURITY.md](SECURITY.md) is that every provider credential is server-side
only. This asserts it rather than describing it: sentinel values are injected into
`OPENAI_API_KEY`, `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID` and `MORALIS_API_KEY`, then every
API route is driven through its success, error, upstream-401 and bad-input paths, with the full
response — status, headers and body — searched for each sentinel. It also statically rejects any
`'use client'` file that reads a secret env var, and any `NEXT_PUBLIC_` name carrying one.

Verified non-vacuous: injecting `process.env.OPENAI_API_KEY` into a `'use client'` component makes
the test fail and name the offending file.

## 4 · E2E — 48 tests, desktop + mobile

```bash
npm run build && npm run e2e
```

```
48 passed (22.4s)
```

24 tests across two projects (`chromium` desktop, `Pixel 7` mobile): demo-mode smoke, the core
scan → roast → results journey, `/judge` reachability with no cookies or session, and responsive
layout at 375 / 768 / 1440px.

**This suite found a real bug too.** At 375px the landing page could be swiped **113px** sideways
into dead space: `.hero-glow` is a 600px decorative element offset past the left edge, and
`overflow-x: hidden` on `<body>` does not stop the viewport scroll, which lives on `<html>`. Fixed
with `overflow-x: clip` on `html`. The `/judge` page had a worse variant — `<body>` is a column
flex container, and a flex item's default `min-width: auto` let the `<pre>` blocks stretch the
page to 670px, clipping ~295px of real text with no way to scroll to it. Fixed with `min-w-0`.

## 5 · Build + bundle budget

```bash
rm -rf .next && npm run build
du -sk .next/static
```

| | |
|---|---|
| Compile | 2.2s |
| Total wall clock | 5.88s |
| Static assets | **904 KB** |
| Budget | 1,500 KB warn · 2,000 KB fail |
| Routes | 3 static (`/`, `/judge`, `/_not-found`), 4 dynamic API |

## 6 · Lighthouse CI

Measured by the Stage 5 job of CI run
[32009628669](https://github.com/edycutjong/roastmybag-ai/actions/runs/32009628669),
desktop preset, 3 runs per URL against the production build.

| URL | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| `/` | 87 | **98** | 100 | 100 |
| `/judge` | 100 | **100** | 100 | 100 |
| **Gate** | ≥80 warn | **≥90 error** | ≥85 warn | ≥90 warn |

Accessibility is the only hard gate (`error`); both pages clear it. Thresholds live in
`lighthouserc.json`.

```bash
npm run build && npm run lighthouse
```

## 7 · Live deployment

```bash
curl -s -o /dev/null -w "%{http_code} %{time_total}s\n" https://roastmybag.edycu.dev
```

```
200 0.884435s
```

## 8 · Security posture

| Surface | Open alerts |
|---|---|
| `npm audit` | 0 |
| Dependabot | 0 |
| Secret scanning + push protection | 0 (enabled) |
| CodeQL | see Actions |
| gitleaks (full history, `fetch-depth: 0`) | see Actions |

---

## What is NOT measured

**No real-provider cost or wall-clock receipt exists.** This is the single weakest piece of
evidence in this project, and it is the one a strong submission would have.

The test suites above run with **zero credentials** — but that is a statement about the *tests*,
not about the *product*. The product genuinely calls OpenAI (GPT-4o) and ElevenLabs (TTS) on the
default path; no flag disables it. What is missing is a recorded live run: the exact dollar cost,
the wall clock, and the token/audio counts from one real end-to-end roast.

To close this gap, run one real roast with live keys and record here:

- OpenAI: prompt + completion tokens, model, computed cost
- ElevenLabs: characters synthesised, audio duration, computed cost
- End-to-end wall clock from submit to audio playback

Until that exists, treat "zero-credential test suite" as evidence of *code* quality only. The
distinction matters: a zero-credential **test suite** is correct engineering; a zero-credential
**product** would mean the judged capability is mocked. This project is the former, but the
receipt proving it is not yet on paper.
