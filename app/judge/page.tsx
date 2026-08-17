import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'RoastMyBag.ai — For Judges',
  description:
    'The 30-second path through RoastMyBag.ai: what it claims, exactly what to click, the verified numbers behind it, and its honest limitations.',
  robots: { index: true, follow: true },
};

const LIVE = 'https://roastmybag.edycu.dev';
const REPO = 'https://github.com/edycutjong/roastmybag-ai';
const VIDEO = 'https://youtu.be/K9sz9dNHa3w';

const receipts: Array<{ label: string; value: string; note: string }> = [
  { label: 'Unit tests', value: '121 passing', note: '22 files, 0 skipped' },
  { label: 'Coverage', value: '100%', note: 'statements · branches · functions · lines' },
  { label: 'E2E tests', value: '48 passing', note: 'Playwright, desktop + mobile viewports' },
  { label: 'Exhaustive verification', value: '30,001 cases', note: 'Jeet Score → tier mapping, whole input space' },
  { label: 'Static bundle', value: '904 KB', note: 'budget 1,500 KB warn / 2,000 KB fail' },
  { label: 'Lighthouse accessibility', value: '98 / 100', note: 'landing / judge — hard gate at 90' },
  { label: 'CI pipeline', value: '6 stages', note: 'quality · security · build · e2e · perf · gate' },
  { label: 'Open security alerts', value: '0', note: 'CodeQL · Dependabot · secret scanning · gitleaks' },
];

const steps: Array<{ text: string; href?: string; label?: string }> = [
  { text: 'Open the live app — no signup, no wallet connect, no keys.', href: LIVE, label: LIVE.replace('https://', '') },
  { text: 'Type the word demo into the input and press "Roast My Bag".' },
  { text: 'Watch the scan → roast sequence, then read the Jeet Score, the tier title, and the itemised list of tokens you paper-handed.' },
  { text: 'Optional: paste any real BSC wallet address (0x…) to run it against live chain data instead.' },
];

const limitations: string[] = [
  'Sell price is estimated, not exact. The analyzer approximates each sell at 10% of the token\'s current price rather than reconstructing the historical fill from LP reserves at block height. "Missed gains" is therefore an entertaining upper-bound estimate, not an accounting figure.',
  'Any outbound token transfer counts as a "sell". Moving a token to your own second wallet, or to cold storage, is scored as paper-handing. Distinguishing a real DEX sell from a self-transfer needs LP pair resolution the project does not do.',
  'Typing "demo" serves a curated profile, by design, so the flow is reviewable without a funded wallet. It is clearly labelled in the response payload (demo: true) and is not the only path — a real 0x address runs the live pipeline.',
  'No real-provider cost receipt is published. Test suites run with zero credentials; the product itself calls OpenAI and ElevenLabs, but a measured cost-and-wall-clock figure from a live run is not yet recorded in DEMO.md.',
];

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 flex items-baseline gap-3 text-xl font-bold text-white sm:text-2xl">
        <span className="font-mono text-sm text-[#FF4500]">{n}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function JudgePage() {
  return (
    // `min-w-0` matters: <body> is a column flex container, and a flex item
    // defaults to min-width:auto — so the <pre> blocks' min-content width
    // would stretch this page past the viewport and get clipped by the
    // body's overflow-x:hidden, silently cutting off text on mobile.
    <main className="mx-auto w-full min-w-0 max-w-3xl px-6 py-16 text-white sm:px-8">
      <header className="mb-14">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#FF6B35]">
          For judges · no auth required
        </p>
        <h1 className="text-3xl font-bold leading-tight sm:text-5xl">RoastMyBag.ai 🔥</h1>
      </header>

      <Section n="01" title="The claim">
        <p className="rounded-xl border-l-4 border-[#FF4500] bg-[#141414] p-5 text-lg leading-relaxed text-[#e8e8e8]">
          RoastMyBag.ai is an AI voice agent that scans your BNB Chain wallet, calculates the money
          you left on the table by selling memecoins too early, and roasts you for it — out loud.
        </p>
      </Section>

      <Section n="02" title="The 30-second path">
        <ol className="space-y-3">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-4 rounded-lg bg-[#141414] p-4">
              <span className="shrink-0 font-mono text-sm font-bold text-[#FFD700]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[#e8e8e8]">
                {s.text}{' '}
                {s.href && (
                  <a
                    href={s.href}
                    className="font-semibold text-[#FF6B35] underline underline-offset-4 hover:text-[#FFD700]"
                  >
                    {s.label}
                  </a>
                )}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-[#9a9a9a]">
          No cloning, no install, no environment file. If a step here required a terminal, it would
          have failed its purpose.
        </p>
      </Section>

      <Section n="03" title="Receipts">
        <div className="grid gap-3 sm:grid-cols-2">
          {receipts.map((r) => (
            <div key={r.label} className="rounded-xl border border-[#2a2a2a] bg-[#141414] p-4">
              <div className="text-xs uppercase tracking-wider text-[#9a9a9a]">{r.label}</div>
              <div className="my-1 font-mono text-2xl font-bold text-[#00FF88]">{r.value}</div>
              <div className="text-xs text-[#9a9a9a]">{r.note}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section n="04" title="Reproduce it">
        <p className="mb-3 text-sm text-[#9a9a9a]">
          The real path. No flag disables the product; the app calls its providers normally.
        </p>
        <pre className="overflow-x-auto rounded-xl border border-[#2a2a2a] bg-[#0d0d0d] p-4 font-mono text-sm text-[#e8e8e8]">
{`git clone ${REPO.replace('https://', '')}
cd roastmybag-ai && npm ci
cp .env.example .env.local   # add OPENAI_API_KEY + ELEVENLABS_API_KEY
npm run dev                  # → http://localhost:3000`}
        </pre>
        <p className="mt-4 mb-2 text-sm text-[#9a9a9a]">
          CI / deterministic replay — runs with zero credentials. This verifies the code; it is not
          the product:
        </p>
        <pre className="overflow-x-auto rounded-xl border border-[#2a2a2a] bg-[#0d0d0d] p-4 font-mono text-sm text-[#e8e8e8]">
{`npm run ci     # audit + lint + typecheck + 121 tests @ 100% coverage
npm run e2e    # 48 Playwright tests, desktop + mobile
`}
        </pre>
      </Section>

      <Section n="05" title="Honest limitations">
        <ul className="space-y-3">
          {limitations.map((l, i) => (
            <li
              key={i}
              className="rounded-lg border-l-2 border-[#FF3333] bg-[#141414] p-4 text-sm leading-relaxed text-[#c9c9c9]"
            >
              {l}
            </li>
          ))}
        </ul>
      </Section>

      <Section n="06" title="Links">
        <div className="flex flex-wrap gap-3">
          {[
            { href: LIVE, label: '🔥 Live app' },
            { href: REPO, label: '💻 Repository' },
            { href: VIDEO, label: '🎬 Demo video' },
            { href: `${REPO}/actions`, label: '✅ CI runs' },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg border border-[#2a2a2a] bg-[#141414] px-4 py-3 font-semibold text-[#e8e8e8] transition-colors hover:border-[#FF4500] hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>
        <p className="mt-8">
          <Link href="/" className="text-[#FF6B35] underline underline-offset-4 hover:text-[#FFD700]">
            ← Back to the app
          </Link>
        </p>
      </Section>
    </main>
  );
}
