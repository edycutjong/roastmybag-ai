import { describe, it, expect } from 'vitest';
import { getJeetTitle, JEET_TIERS } from '../constants';

/**
 * Exhaustive verification of the single decision function that must never be
 * wrong: Jeet Score -> tier title.
 *
 * This is the function whose output is the headline of every roast, the OG
 * card, and the share text. A wrong tier is the most visible possible defect,
 * so it is verified across its whole input space rather than on examples.
 *
 * Input space: every value from -100.00 to 200.00 in 0.01 increments.
 * That is 30,001 distinct inputs, covering the valid range [0, 100], both
 * out-of-range directions, and every fractional position between tiers.
 */

const STEP = 0.01;
const LOWER = -100;
const UPPER = 200;
const TOTAL_CASES = Math.round((UPPER - LOWER) / STEP) + 1; // 30_001

const TITLES = new Set(JEET_TIERS.map((t) => t.title));

/** Rounds away float accumulation error from repeated addition. */
const at = (i: number) => Math.round((LOWER + i * STEP) * 100) / 100;

describe('getJeetTitle — exhaustive over 30,001 inputs', () => {
  it('publishes the exact case count it verifies', () => {
    expect(TOTAL_CASES).toBe(30_001);
  });

  it('never returns a tier outside the declared table, for any input', () => {
    for (let i = 0; i < TOTAL_CASES; i++) {
      const result = getJeetTitle(at(i));
      expect(TITLES.has(result.title as (typeof JEET_TIERS)[number]['title'])).toBe(true);
      expect(result.emoji).toBeTruthy();
    }
  });

  it('returns the tier whose band contains the clamped score, for every input', () => {
    for (let i = 0; i < TOTAL_CASES; i++) {
      const score = at(i);
      const clamped = Math.min(100, Math.max(0, score));
      const { title } = getJeetTitle(score);

      const tier = JEET_TIERS.find((t) => t.title === title)!;
      // Bands are contiguous half-open ranges [min, max + 1).
      expect(clamped).toBeGreaterThanOrEqual(tier.min);
      expect(clamped).toBeLessThan(tier.max + 1);
    }
  });

  it('is monotonic — a higher score never yields a milder tier', () => {
    const rank = (title: string) => JEET_TIERS.findIndex((t) => t.title === title);
    let previous = 0;

    for (let i = 0; i < TOTAL_CASES; i++) {
      const current = rank(getJeetTitle(at(i)).title);
      expect(current).toBeGreaterThanOrEqual(previous);
      previous = current;
    }
  });

  it('assigns exactly one tier to every integer score the app can produce', () => {
    // analyzeWallet() clamps and rounds, so 0..100 integers are the real
    // production input set. Every one must match exactly one band.
    for (let score = 0; score <= 100; score++) {
      const matches = JEET_TIERS.filter((t) => score >= t.min && score <= t.max);
      expect(matches).toHaveLength(1);
      expect(getJeetTitle(score).title).toBe(matches[0].title);
    }
  });
});
