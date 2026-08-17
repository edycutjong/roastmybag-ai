# Contributing

Thanks for your interest in RoastMyBag.ai! 🔥

> **Project status.** This is a completed hackathon submission built for the
> Four.Meme AI Sprint on BNB Chain. It is maintained as a frozen artifact:
> dependency *version* updates are intentionally disabled, security fixes are
> not. Bug reports and focused fixes are welcome; large refactors are unlikely
> to be merged.

## Getting Started

1. Fork the repo and branch from `main`: `git checkout -b fix/your-fix`
2. Install dependencies: `npm ci`
3. Copy the env template: `cp .env.example .env.local`
4. Start the dev server: `npm run dev` → http://localhost:3000

The app runs without any API keys — it falls back to curated demo profiles.
Add real keys to exercise the live OpenAI / ElevenLabs / Moralis paths.

## Before You Open a PR

```bash
npm run ci        # audit + lint + typecheck + tests with coverage
npm run e2e       # Playwright, desktop + mobile
```

Both must pass. Additionally:

- **Keep coverage at 100%.** The suite covers every statement, branch, function
  and line; a PR that drops it will fail the quality stage.
- **Name regression tests after the defect they fix.** See
  `lib/__tests__/regressions.test.ts` — the test list is meant to read as a
  changelog of real bugs, not an opaque numbered suite.
- **Never read a secret from a client component.** `app/api/__tests__/secret-boundary.test.ts`
  enforces this and will fail the build if a credential can reach the browser.
- Keep commits conventional: `feat:`, `fix:`, `docs:`, `chore:`, `ci:`, `test:`.

## Reporting Bugs / Requesting Features

Open an issue using the provided templates. For bugs, include repro steps, the
wallet address or `demo` input used, expected vs. actual behavior, and your
browser/Node version.

## Security

Do not open a public issue for a vulnerability. See [SECURITY.md](../SECURITY.md)
for private reporting.
