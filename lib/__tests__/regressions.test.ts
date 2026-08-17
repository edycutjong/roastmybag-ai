import { describe, it, expect } from 'vitest';
import { getJeetTitle } from '../constants';

/**
 * Regression tests. Each is named for the specific defect it pins, so the
 * test list reads as a changelog of real bugs found and fixed rather than as
 * an opaque numbered suite.
 */
describe('regressions', () => {
  it('fractional_score_between_tiers_no_longer_falls_through_to_worst_title', () => {
    // Defect: JEET_TIERS declares inclusive integer bounds (0-20, 21-40, ...),
    // so `score >= min && score <= max` matched nothing for any value in a
    // gap. The `??` fallback then returned the LAST tier, meaning a near
    // -perfect 20.5 was labelled "Certified Degen Ruglord" — the harshest
    // title in the table, for the second-best score.
    expect(getJeetTitle(20.5).title).toBe('Diamond Hands Legend');
    expect(getJeetTitle(40.5).title).toBe('Mostly Hodler');
    expect(getJeetTitle(60.5).title).toBe('Casual Paper Hands');
    expect(getJeetTitle(80.5).title).toBe('Professional Jeet');
  });

  it('negative_score_no_longer_reports_certified_degen_ruglord', () => {
    // Same fallback path: a negative score matched no band and was branded
    // with the worst title instead of the best.
    expect(getJeetTitle(-1).title).toBe('Diamond Hands Legend');
    expect(getJeetTitle(-999).title).toBe('Diamond Hands Legend');
  });

  it('score_above_one_hundred_clamps_instead_of_relying_on_fallback', () => {
    // 101 previously produced the right answer by accident — via the
    // fallback, not via a match. Now it clamps to 100 and matches the top
    // band deliberately.
    expect(getJeetTitle(101).title).toBe('Certified Degen Ruglord');
    expect(getJeetTitle(10_000).title).toBe('Certified Degen Ruglord');
  });

  it('non_finite_score_does_not_brand_the_user_with_the_worst_title', () => {
    // NaN propagating out of an arithmetic edge case (empty trade list,
    // divide-by-zero) previously rendered "Certified Degen Ruglord".
    expect(getJeetTitle(NaN).title).toBe('Diamond Hands Legend');
    expect(getJeetTitle(Infinity).title).toBe('Diamond Hands Legend');
    expect(getJeetTitle(-Infinity).title).toBe('Diamond Hands Legend');
  });

  it('integer_tier_boundaries_are_unchanged_by_the_gap_fix', () => {
    // Guards against the fix silently shifting production behaviour:
    // analyzeWallet() only ever emits rounded integers.
    const boundaries: Array<[number, string]> = [
      [0, 'Diamond Hands Legend'],
      [20, 'Diamond Hands Legend'],
      [21, 'Mostly Hodler'],
      [40, 'Mostly Hodler'],
      [41, 'Casual Paper Hands'],
      [60, 'Casual Paper Hands'],
      [61, 'Professional Jeet'],
      [80, 'Professional Jeet'],
      [81, 'Certified Degen Ruglord'],
      [100, 'Certified Degen Ruglord'],
    ];
    for (const [score, title] of boundaries) {
      expect(getJeetTitle(score).title).toBe(title);
    }
  });
});
