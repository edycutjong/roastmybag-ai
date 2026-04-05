import { DEMO_PROFILES, getRandomDemoProfile } from '../demo-profiles';
import { describe, it, expect } from 'vitest';

describe('demo-profiles', () => {
  it('exports a valid non-empty array of profiles', () => {
    expect(Array.isArray(DEMO_PROFILES)).toBe(true);
    expect(DEMO_PROFILES.length).toBeGreaterThan(0);
    
    const profile = DEMO_PROFILES[0];
    expect(profile).toHaveProperty('id');
    expect(profile).toHaveProperty('stats');
    expect(profile).toHaveProperty('roast');
    
    // Check stats structure
    expect(profile.stats).toHaveProperty('totalMissedUsd');
    expect(profile.stats).toHaveProperty('worstSell');
    expect(profile.stats).toHaveProperty('jeetScore');
    
    // Check roast structure
    expect(profile.roast).toHaveProperty('script');
    expect(profile.roast).toHaveProperty('beats');
  });

  it('getRandomDemoProfile returns a valid profile', () => {
    const randomProfile = getRandomDemoProfile();
    expect(randomProfile).toBeDefined();
    expect(DEMO_PROFILES).toContainEqual(randomProfile);
  });
});
