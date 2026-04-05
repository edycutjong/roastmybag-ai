import type { WalletStats, AnalyzedTrade } from './types';

/**
 * Curated demo wallet data with impressive sell histories.
 * Used for development and as fallback when API keys aren't configured.
 */

const DEMO_TRADES: AnalyzedTrade[] = [
  {
    tokenName: 'FourMeme Token',
    tokenSymbol: 'FOUR',
    contractAddress: '0x0000000000000000000000000000000000000001',
    amountSold: 50000,
    sellPrice: 0.001,
    currentPrice: 0.085,
    missedGains: 4200,
    sellDate: '2026-02-14',
    txHash: '0xabc123...demo',
  },
  {
    tokenName: 'SirenCoin',
    tokenSymbol: 'SIREN',
    contractAddress: '0x0000000000000000000000000000000000000002',
    amountSold: 1200000,
    sellPrice: 0.00002,
    currentPrice: 0.0018,
    missedGains: 2136,
    sellDate: '2026-01-28',
    txHash: '0xdef456...demo',
  },
  {
    tokenName: 'MoonDoge',
    tokenSymbol: 'MDOGE',
    contractAddress: '0x0000000000000000000000000000000000000003',
    amountSold: 800000,
    sellPrice: 0.000005,
    currentPrice: 0.00022,
    missedGains: 172,
    sellDate: '2026-03-05',
    txHash: '0xghi789...demo',
  },
  {
    tokenName: 'PepeClassic',
    tokenSymbol: 'PEPEC',
    contractAddress: '0x0000000000000000000000000000000000000004',
    amountSold: 5000000,
    sellPrice: 0.0000001,
    currentPrice: 0.0000089,
    missedGains: 44,
    sellDate: '2026-03-20',
    txHash: '0xjkl012...demo',
  },
  {
    tokenName: 'ChadBNB',
    tokenSymbol: 'CHAD',
    contractAddress: '0x0000000000000000000000000000000000000005',
    amountSold: 25000,
    sellPrice: 0.012,
    currentPrice: 0.089,
    missedGains: 1925,
    sellDate: '2026-02-02',
    txHash: '0xmno345...demo',
  },
];

export function getDemoStats(): WalletStats {
  const totalMissedUsd = DEMO_TRADES.reduce((sum, t) => sum + t.missedGains, 0);
  const sortedTrades = [...DEMO_TRADES].sort(
    (a, b) => b.missedGains - a.missedGains
  );
  const worstSell = sortedTrades[0] || null;

  return {
    totalMissedUsd: Math.round(totalMissedUsd * 100) / 100,
    worstSell,
    jeetScore: 87,
    tokensJeeted: DEMO_TRADES.length,
    trades: sortedTrades,
  };
}

export const DEMO_ROAST = {
  script:
    "Let me get this straight. You bought $FOUR at a tenth of a penny, watched it rally to 8 cents, and STILL decided to sell at a loss? That bag is worth four thousand two hundred dollars today. My GPU is literally crying for you. And that wasn't even your worst month! You dumped $SIREN three days before it mooned 90x. Your portfolio strategy is worse than a random number generator with a bias toward pain. You left eight thousand four hundred dollars on the table across five tokens. That's a used car. That's a vacation. That's literally anything better than what you did. Congratulations — with a Jeet Score of 87 out of 100, you've earned the title of Certified Degen Ruglord. Your paper hands belong in a museum.",
  beats: [
    {
      type: 'opening' as const,
      text: "Let me get this straight. You bought $FOUR at a tenth of a penny, watched it rally to 8 cents, and STILL decided to sell at a loss? That bag is worth four thousand two hundred dollars today. My GPU is literally crying for you.",
      highlight: '$4,200',
    },
    {
      type: 'data' as const,
      text: "And that wasn't even your worst month! You dumped $SIREN three days before it mooned 90x. Your portfolio strategy is worse than a random number generator with a bias toward pain.",
      highlight: '90x',
    },
    {
      type: 'comparison' as const,
      text: "You left eight thousand four hundred dollars on the table across five tokens. That's a used car. That's a vacation. That's literally anything better than what you did.",
      highlight: '$8,477',
    },
    {
      type: 'closing' as const,
      text: "Congratulations — with a Jeet Score of 87 out of 100, you've earned the title of Certified Degen Ruglord. Your paper hands belong in a museum.",
      highlight: '87/100',
    },
  ],
  title: 'Certified Degen Ruglord',
  jeetScore: 87,
};
