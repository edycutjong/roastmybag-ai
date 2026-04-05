import type { TokenTransfer } from './types';

const BASE_URL = 'https://deep-index.moralis.io/api/v2.2';
/**
 * Fetch all BEP-20 token transfers for a wallet address.
 */
export async function fetchTokenTransfers(
  address: string
): Promise<TokenTransfer[]> {
  const API_KEY = process.env.MORALIS_API_KEY;
  if (!API_KEY) {
    console.warn('[Moralis] No API key configured — returning empty results');
    return [];
  }

  const url = new URL(`${BASE_URL}/${address}/erc20/transfers`);
  url.searchParams.set('chain', 'bsc');
  url.searchParams.set('limit', '100'); // Fetch up to 100 recent transfers

  try {
    const res = await fetch(url.toString(), {
      headers: {
        'accept': 'application/json',
        'X-API-Key': API_KEY,
      },
    });

    if (!res.ok) {
      console.error('[Moralis] API error:', res.status, res.statusText);
      return [];
    }

    const data = await res.json();

    if (!data?.result || !Array.isArray(data.result)) {
      return [];
    }

    // Map Moralis response to the local TokenTransfer struct type
    return data.result.map((tx: any) => ({
      hash: tx.transaction_hash,
      from: tx.from_address,
      to: tx.to_address,
      tokenName: tx.token_name,
      tokenSymbol: tx.token_symbol,
      tokenDecimal: String(tx.token_decimals), // Note: Moralis gives 'token_decimals'
      contractAddress: tx.address,
      value: tx.value,
      timeStamp: Math.floor(new Date(tx.block_timestamp).getTime() / 1000).toString(),
      blockNumber: tx.block_number,
    })) as TokenTransfer[];
  } catch (err) {
    console.error('[Moralis] Network or parsing error:', err);
    return [];
  }
}

/**
 * Validate a BSC wallet address.
 */
export function isValidBscAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}
