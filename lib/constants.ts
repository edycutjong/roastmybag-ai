// ─── Token Filtering ───────────────────────────────────────
export const STABLECOIN_ADDRESSES = new Set([
  '0x55d398326f99059ff775485246999027b3197955', // USDT
  '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d', // USDC
  '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD
  '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', // DAI
  '0x2170ed0880ac9a755fd29b2688956bd959f933f8', // ETH
  '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', // WBNB
]);

export const DEX_ROUTER_ADDRESSES = new Set([
  '0x10ed43c718714eb63d5aa57b78b54704e256024e', // PancakeSwap V2
  '0x13f4ea83d0bd40e75c8222255bc855a974568dd4', // PancakeSwap V3
  '0x1b81d678ffb9c0263b24a97847620c99d213eb14', // PancakeSwap Universal
]);

// ─── Jeet Score Tiers ──────────────────────────────────────
export const JEET_TIERS = [
  { min: 0, max: 20, title: 'Diamond Hands Legend', emoji: '💎' },
  { min: 21, max: 40, title: 'Mostly Hodler', emoji: '🤲' },
  { min: 41, max: 60, title: 'Casual Paper Hands', emoji: '📄' },
  { min: 61, max: 80, title: 'Professional Jeet', emoji: '🏃' },
  { min: 81, max: 100, title: 'Certified Degen Ruglord', emoji: '👑' },
] as const;

export function getJeetTitle(score: number): { title: string; emoji: string } {
  // Non-finite input has no meaningful tier. Fail benign rather than branding
  // an unknown score with the harshest title.
  if (!Number.isFinite(score)) return JEET_TIERS[0];

  // Clamp, then match on contiguous half-open bands [min, max + 1).
  //
  // The tier table lists inclusive integer bounds (0-20, 21-40, ...), so a
  // literal `score >= min && score <= max` test leaves a gap between every
  // pair of tiers: 20.5 matched no tier and fell through to the `??`
  // fallback — the LAST tier — labelling a near-perfect score
  // "Certified Degen Ruglord". Negatives and scores above 100 fell through
  // the same way. Integer behaviour is unchanged by this fix.
  const clamped = Math.min(100, Math.max(0, score));

  // The bands are contiguous, and JEET_TIERS[0].min is 0 while clamped >= 0,
  // so "the last tier whose lower bound we have reached" is exactly the
  // containing band — and it always exists. That removes the unreachable
  // fallback the previous `find(...) ?? last` form required.
  let match: (typeof JEET_TIERS)[number] = JEET_TIERS[0];
  for (const tier of JEET_TIERS) {
    if (clamped >= tier.min) match = tier;
  }
  return match;
}

// ─── Loading Messages ──────────────────────────────────────
export const LOADING_MESSAGES = [
  'Scanning your financial crimes...',
  'Calculating your missed gains...',
  'Preparing the burn ward...',
  'Loading disappointment data...',
  'Counting your paper-handed decisions...',
  'Measuring your regret in USD...',
  'Digging through your transaction graveyard...',
  'Finding your worst life choices...',
];

// ─── Design Tokens ─────────────────────────────────────────
export const COLORS = {
  bgPrimary: '#0a0a0a',
  bgCard: '#141414',
  accentFire: '#FF4500',
  accentFireEnd: '#FF6B35',
  accentGold: '#FFD700',
  accentGreen: '#00FF88',
  accentRed: '#FF3333',
} as const;
