interface DexPairData {
  chainId: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  priceUsd: string;
  volume: {
    h24: number;
  };
  liquidity: {
    usd: number;
  };
}

interface DexScreenerResponse {
  pairs: DexPairData[] | null;
}

/**
 * Fetch current price for a token on BSC via DexScreener.
 * Returns price in USD, or 0 if not found.
 */
export async function fetchCurrentPrice(
  tokenAddress: string
): Promise<number> {
  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`
    );
    const data: DexScreenerResponse = await res.json();

    if (!data.pairs || data.pairs.length === 0) return 0;

    // Filter for BSC pairs and pick the one with highest liquidity
    const bscPairs = data.pairs.filter((p) => p.chainId === 'bsc');
    if (bscPairs.length === 0) return 0;

    const bestPair = bscPairs.sort(
      (a, b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0)
    )[0];

    return parseFloat(bestPair.priceUsd) || 0;
  } catch (err) {
    console.error('[DexScreener] Error fetching price:', err);
    return 0;
  }
}

/**
 * Batch fetch prices for multiple tokens.
 */
export async function fetchPrices(
  tokenAddresses: string[]
): Promise<Map<string, number>> {
  const prices = new Map<string, number>();
  const unique = [...new Set(tokenAddresses)];

  // DexScreener allows comma-separated addresses (up to 30)
  const chunks: string[][] = [];
  for (let i = 0; i < unique.length; i += 30) {
    chunks.push(unique.slice(i, i + 30));
  }

  for (const chunk of chunks) {
    for (const addr of chunk) {
      const price = await fetchCurrentPrice(addr);
      prices.set(addr.toLowerCase(), price);
    }
  }

  return prices;
}
