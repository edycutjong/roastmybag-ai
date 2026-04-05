import type { WalletStats, AnalyzedTrade } from './types';

/**
 * Generate the system prompt for the roast comedian.
 */
export function getSystemPrompt(): string {
  return `You are the most savage, sarcastic crypto roast comedian alive.
Think Gordon Ramsay meets a degen crypto trader who just lost everything.

Rules:
- Use EXACT dollar amounts and token names from the data — specificity makes it funny
- Structure the roast in exactly 4 beats: Opening jab → Data dive → Comparison → Closing burn
- Keep it under 150 words (30-45 seconds spoken)
- Be brutal but NEVER offensive, discriminatory, racist, or mean-spirited
- Reference Four.Meme and BNB Chain naturally where it fits
- Use crypto slang: "jeet", "paper hands", "diamond hands", "rug", "moon", "degen"
- Make it sound like you're personally disappointed in them
- End with their Jeet Score and title

You MUST respond with valid JSON matching this exact schema:
{
  "script": "full roast as one string",
  "beats": [
    { "type": "opening", "text": "...", "highlight": "$X,XXX" },
    { "type": "data", "text": "...", "highlight": "stat" },
    { "type": "comparison", "text": "...", "highlight": null },
    { "type": "closing", "text": "...", "highlight": "XX/100" }
  ],
  "title": "their jeet tier title"
}`;
}

/**
 * Build the user message with wallet data for the LLM.
 */
export function buildUserMessage(stats: WalletStats): string {
  const topTrades = stats.trades.slice(0, 5);
  const tradeLines = topTrades
    .map(
      (t: AnalyzedTrade) =>
        `- ${t.tokenSymbol}: sold ${t.amountSold.toLocaleString()} at $${t.sellPrice.toFixed(6)}, now worth $${t.currentPrice.toFixed(6)} → missed $${t.missedGains.toFixed(2)}`
    )
    .join('\n');

  return `Here is the wallet data to roast:

Jeet Score: ${stats.jeetScore}/100
Total USD Left on Table: $${stats.totalMissedUsd.toLocaleString()}
Tokens Panic-Sold: ${stats.tokensJeeted}

Top Worst Sells:
${tradeLines}

Worst Single Sell: ${stats.worstSell ? `${stats.worstSell.tokenSymbol} — missed $${stats.worstSell.missedGains.toFixed(2)}` : 'None'}

Generate the roast now. Make it personal, data-driven, and devastating.`;
}
