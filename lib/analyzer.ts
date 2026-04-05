import type { TokenTransfer, AnalyzedTrade, WalletStats } from './types';
import { STABLECOIN_ADDRESSES, DEX_ROUTER_ADDRESSES } from './constants';
import { fetchTokenTransfers } from './bscscan';
import { fetchPrices } from './dexscreener';

/**
 * Full wallet analysis pipeline:
 * Fetch transfers → filter memecoins → identify sells → calculate missed gains
 */
export async function analyzeWallet(address: string): Promise<WalletStats> {
  const transfers = await fetchTokenTransfers(address);
  const walletLower = address.toLowerCase();

  // Filter out stablecoins and major tokens
  const memeTransfers = transfers.filter(
    (tx) => !STABLECOIN_ADDRESSES.has(tx.contractAddress.toLowerCase())
  );

  // Identify sell events (transfers FROM wallet TO DEX routers)
  const sells = memeTransfers.filter(
    (tx) =>
      tx.from.toLowerCase() === walletLower &&
      DEX_ROUTER_ADDRESSES.has(tx.to.toLowerCase())
  );

  if (sells.length === 0) {
    return {
      totalMissedUsd: 0,
      worstSell: null,
      jeetScore: 0,
      tokensJeeted: 0,
      trades: [],
    };
  }

  // Get current prices for all sold tokens
  const tokenAddresses = [...new Set(sells.map((s) => s.contractAddress))];
  const currentPrices = await fetchPrices(tokenAddresses);

  // Analyze each sell
  const trades: AnalyzedTrade[] = sells
    .map((tx) => {
      const decimals = parseInt(tx.tokenDecimal) || 18;
      const amount = parseFloat(tx.value) / Math.pow(10, decimals);
      const currentPrice =
        currentPrices.get(tx.contractAddress.toLowerCase()) || 0;
      // Approximate sell price as a fraction of current (simplified for hackathon)
      const sellPrice = currentPrice * 0.1; // Conservative estimate
      const missedGains = (currentPrice - sellPrice) * amount;

      return {
        tokenName: tx.tokenName,
        tokenSymbol: tx.tokenSymbol,
        contractAddress: tx.contractAddress,
        amountSold: amount,
        sellPrice,
        currentPrice,
        missedGains: Math.max(0, missedGains),
        sellDate: new Date(parseInt(tx.timeStamp) * 1000).toISOString().split('T')[0],
        txHash: tx.hash,
      };
    })
    .filter((t) => t.missedGains > 0)
    .sort((a, b) => b.missedGains - a.missedGains)
    .slice(0, 10); // Top 10 worst sells

  const totalMissedUsd = trades.reduce((sum, t) => sum + t.missedGains, 0);
  const tokensJeeted = new Set(trades.map((t) => t.contractAddress)).size;

  // Calculate Jeet Score (0-100)
  const jeetScore = Math.min(
    100,
    Math.round(
      Math.min(totalMissedUsd / 100, 50) + // USD component (max 50)
        Math.min(tokensJeeted * 10, 30) + // Diversity component (max 30)
        Math.min(trades.length * 5, 20) // Frequency component (max 20)
    )
  );

  return {
    totalMissedUsd: Math.round(totalMissedUsd * 100) / 100,
    worstSell: trades[0] || null,
    jeetScore,
    tokensJeeted,
    trades,
  };
}
