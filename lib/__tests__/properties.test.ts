import { describe, it, expect } from 'vitest';
import fc from 'fast-check';

import { getJeetTitle, JEET_TIERS } from '../constants';
import { isValidBscAddress } from '../bscscan';
import { buildUserMessage } from '../roast-prompt';
import type { AnalyzedTrade, WalletStats } from '../types';

/**
 * Property-based tests (fast-check).
 *
 * These complement the enumerated verification in jeet-tier.exhaustive.test.ts.
 * Enumeration proves a bounded space is fully correct; properties attack the
 * unbounded ones — arbitrary strings, arbitrary doubles, and hostile wallet
 * data — where the inputs originate off-chain and cannot be trusted.
 *
 * Each `fc.assert` runs 1,000 generated cases (fast-check shrinks any
 * counterexample to a minimal reproduction).
 */

const RUNS = { numRuns: 1000 };

const TITLES = new Set<string>(JEET_TIERS.map((t) => t.title));

// ─── isValidBscAddress ───────────────────────────────────────
describe('property: isValidBscAddress', () => {
  const hexChar = fc.constantFrom(...'0123456789abcdefABCDEF'.split(''));
  const address40 = fc.array(hexChar, { minLength: 40, maxLength: 40 }).map((c) => `0x${c.join('')}`);

  it('never throws, whatever string it is handed', () => {
    fc.assert(
      fc.property(fc.string(), (s) => {
        expect(typeof isValidBscAddress(s)).toBe('boolean');
      }),
      RUNS
    );
  });

  it('accepts every canonical 0x + 40-hex address, in any letter case', () => {
    fc.assert(
      fc.property(address40, (addr) => {
        expect(isValidBscAddress(addr)).toBe(true);
        expect(isValidBscAddress(addr.toLowerCase())).toBe(true);
        expect(isValidBscAddress(addr.toUpperCase().replace('0X', '0x'))).toBe(true);
      }),
      RUNS
    );
  });

  it('rejects any hex body whose length is not exactly 40', () => {
    fc.assert(
      fc.property(
        fc.array(hexChar, { minLength: 0, maxLength: 80 }).filter((c) => c.length !== 40),
        (chars) => {
          expect(isValidBscAddress(`0x${chars.join('')}`)).toBe(false);
        }
      ),
      RUNS
    );
  });

  it('rejects surrounding whitespace on an otherwise valid address', () => {
    // Anchored regex — guards against a future switch to an unanchored test,
    // which would let " 0x…  " or a log line containing an address through.
    fc.assert(
      fc.property(address40, fc.constantFrom(' ', '\n', '\t', '  '), (addr, ws) => {
        expect(isValidBscAddress(`${ws}${addr}`)).toBe(false);
        expect(isValidBscAddress(`${addr}${ws}`)).toBe(false);
      }),
      RUNS
    );
  });
});

// ─── getJeetTitle ────────────────────────────────────────────
describe('property: getJeetTitle', () => {
  it('is total — returns a table tier for any double, without throwing', () => {
    fc.assert(
      fc.property(fc.double({ noNaN: false }), (score) => {
        const result = getJeetTitle(score);
        expect(TITLES.has(result.title)).toBe(true);
        expect(typeof result.emoji).toBe('string');
      }),
      RUNS
    );
  });

  it('is monotonic — a higher score never yields a milder tier', () => {
    const rank = (title: string) => JEET_TIERS.findIndex((t) => t.title === title);

    fc.assert(
      fc.property(
        fc.double({ min: -1000, max: 1000, noNaN: true }),
        fc.double({ min: -1000, max: 1000, noNaN: true }),
        (a, b) => {
          const [lo, hi] = a <= b ? [a, b] : [b, a];
          expect(rank(getJeetTitle(hi).title)).toBeGreaterThanOrEqual(
            rank(getJeetTitle(lo).title)
          );
        }
      ),
      RUNS
    );
  });

  it('agrees with its own clamp, for every finite score', () => {
    // Finite only, deliberately: ±Infinity takes the non-finite early return
    // (fail benign -> best tier) rather than clamping to 100, so the two
    // disagree there by design. That path is pinned in regressions.test.ts.
    fc.assert(
      fc.property(fc.double({ noNaN: true, noDefaultInfinity: true }), (score) => {
        const clamped = Math.min(100, Math.max(0, score));
        expect(getJeetTitle(score).title).toBe(getJeetTitle(clamped).title);
      }),
      RUNS
    );
  });
});

// ─── buildUserMessage ────────────────────────────────────────
/**
 * Wallet stats are derived from third-party APIs and on-chain token metadata,
 * so token names and every numeric field are attacker-influenced. This prompt
 * builder must survive all of it.
 */
const arbTrade: fc.Arbitrary<AnalyzedTrade> = fc.record({
  tokenName: fc.string(),
  tokenSymbol: fc.string(),
  contractAddress: fc.string(),
  amountSold: fc.double(),
  sellPrice: fc.double(),
  currentPrice: fc.double(),
  missedGains: fc.double(),
  sellDate: fc.string(),
  txHash: fc.string(),
});

const arbStats: fc.Arbitrary<WalletStats> = fc
  .record({
    totalMissedUsd: fc.double(),
    jeetScore: fc.double(),
    tokensJeeted: fc.integer(),
    trades: fc.array(arbTrade, { maxLength: 25 }),
  })
  .map((s) => ({ ...s, worstSell: s.trades[0] ?? null }) as WalletStats);

describe('property: buildUserMessage', () => {
  it('never throws on any wallet stats, including NaN, Infinity and empty trades', () => {
    fc.assert(
      fc.property(arbStats, (stats) => {
        expect(typeof buildUserMessage(stats)).toBe('string');
      }),
      RUNS
    );
  });

  it('always emits the structural fields the system prompt depends on', () => {
    fc.assert(
      fc.property(arbStats, (stats) => {
        const msg = buildUserMessage(stats);
        expect(msg).toContain('Jeet Score:');
        expect(msg).toContain('Total USD Left on Table:');
        expect(msg).toContain('Tokens Panic-Sold:');
        expect(msg).toContain('Worst Single Sell:');
        expect(msg).toContain('Generate the roast now.');
      }),
      RUNS
    );
  });

  it('never lists more than the top 5 trades, however many are supplied', () => {
    fc.assert(
      fc.property(arbStats, (stats) => {
        const msg = buildUserMessage(stats);
        const section = msg.split('Top Worst Sells:')[1]?.split('Worst Single Sell:')[0] ?? '';
        const lines = section.split('\n').filter((l) => l.trim().startsWith('- '));
        expect(lines.length).toBeLessThanOrEqual(5);
      }),
      RUNS
    );
  });

  it('reports "None" for the worst sell exactly when there are no trades', () => {
    fc.assert(
      fc.property(arbStats, (stats) => {
        const msg = buildUserMessage(stats);
        const none = msg.includes('Worst Single Sell: None');
        expect(none).toBe(stats.worstSell === null);
      }),
      RUNS
    );
  });
});
