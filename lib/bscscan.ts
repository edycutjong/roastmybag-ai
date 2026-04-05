import type { TokenTransfer } from './types';

const BASE_URL = 'https://api.bscscan.com/api';
const API_KEY = process.env.BSCSCAN_API_KEY;

/**
 * Fetch all BEP-20 token transfers for a wallet address.
 */
export async function fetchTokenTransfers(
  address: string
): Promise<TokenTransfer[]> {
  if (!API_KEY) {
    console.warn('[BSCScan] No API key configured — returning empty results');
    return [];
  }

  const url = new URL(BASE_URL);
  url.searchParams.set('module', 'account');
  url.searchParams.set('action', 'tokentx');
  url.searchParams.set('address', address);
  url.searchParams.set('startblock', '0');
  url.searchParams.set('endblock', '99999999');
  url.searchParams.set('sort', 'desc');
  url.searchParams.set('apikey', API_KEY);

  const res = await fetch(url.toString());
  const data = await res.json();

  if (data.status !== '1' || !Array.isArray(data.result)) {
    console.error('[BSCScan] API error:', data.message);
    return [];
  }

  return data.result as TokenTransfer[];
}

/**
 * Validate a BSC wallet address.
 */
export function isValidBscAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}
