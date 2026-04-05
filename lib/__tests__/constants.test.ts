import { STABLECOIN_ADDRESSES, DEX_ROUTER_ADDRESSES, JEET_TIERS, getJeetTitle, LOADING_MESSAGES, COLORS } from '../constants';
import { describe, it, expect } from 'vitest';

describe('constants', () => {
  it('exports required constants', () => {
    expect(STABLECOIN_ADDRESSES.size).toBeGreaterThan(0);
    expect(DEX_ROUTER_ADDRESSES.size).toBeGreaterThan(0);
    expect(JEET_TIERS.length).toBeGreaterThan(0);
    expect(LOADING_MESSAGES.length).toBeGreaterThan(0);
    expect(COLORS).toBeDefined();
  });

  describe('getJeetTitle', () => {
    it('returns correct title for scores within defined bounds', () => {
      // 0-20
      expect(getJeetTitle(0).title).toBe('Diamond Hands Legend');
      expect(getJeetTitle(15).title).toBe('Diamond Hands Legend');
      expect(getJeetTitle(20).title).toBe('Diamond Hands Legend');
      
      // 21-40
      expect(getJeetTitle(21).title).toBe('Mostly Hodler');
      
      // 81-100
      expect(getJeetTitle(85).title).toBe('Certified Degen Ruglord');
      expect(getJeetTitle(100).title).toBe('Certified Degen Ruglord');
    });

    it('returns highest tier for scores above 100 or negative (fallback)', () => {
      // Because find returns undefined for scores > 100 or < 0
      expect(getJeetTitle(150).title).toBe('Certified Degen Ruglord');
      expect(getJeetTitle(-10).title).toBe('Certified Degen Ruglord');
    });
  });
});
