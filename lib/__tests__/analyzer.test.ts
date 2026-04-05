import { analyzeWallet } from '../analyzer';
import { fetchTokenTransfers } from '../bscscan';
import { fetchPrices } from '../dexscreener';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('../bscscan', () => ({
  fetchTokenTransfers: vi.fn(),
}));

vi.mock('../dexscreener', () => ({
  fetchPrices: vi.fn(),
}));

describe('analyzer', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const mockAddress = '0x123';

  it('returns empty stats when no transfers', async () => {
    vi.mocked(fetchTokenTransfers).mockResolvedValue([]);
    
    const result = await analyzeWallet(mockAddress);
    
    expect(result.totalMissedUsd).toBe(0);
    expect(result.worstSell).toBeNull();
    expect(result.jeetScore).toBe(0);
    expect(result.tokensJeeted).toBe(0);
    expect(result.trades.length).toBe(0);
  });

  it('filters out stablecoins', async () => {
    vi.mocked(fetchTokenTransfers).mockResolvedValue([
      {
        contractAddress: '0x55d398326f99059ff775485246999027b3197955', // USDT (stablecoin)
        tokenName: 'Tether USD',
        tokenSymbol: 'USDT',
        tokenDecimal: '18',
        value: '1000000000000000000',
        from: mockAddress.toLowerCase(),
        to: '0x456',
        timeStamp: '10000',
        hash: '0xabc'
      }
    ] as any);

    const result = await analyzeWallet(mockAddress);
    expect(result.trades.length).toBe(0);
  });

  it('calculates score correctly for valid memecoin sells', async () => {
    vi.mocked(fetchTokenTransfers).mockResolvedValue([
      {
        contractAddress: '0xmeme',
        tokenName: 'Meme Coin',
        tokenSymbol: 'MEME',
        tokenDecimal: '18',
        value: '1000000000000000000', // 1 token
        from: mockAddress.toLowerCase(), // Is a sell
        to: '0x456',
        timeStamp: '1600000000',
        hash: '0xabc'
      },
      {
        contractAddress: '0xmeme2', // no decimal provided, defaults to 18
        tokenName: 'Meme Coin 2',
        tokenSymbol: 'MEME2',
        tokenDecimal: '',
        value: '1000000000000000000', // 1 token
        from: mockAddress.toLowerCase(),
        to: '0x456',
        timeStamp: '1600000000',
        hash: '0xdef'
      },
      {
        contractAddress: '0xnot_a_sell',
        tokenName: 'Buy',
        tokenSymbol: 'BUY',
        tokenDecimal: '18',
        value: '1000000000000000000',
        from: '0x456', // Not from address, so it's a buy
        to: mockAddress.toLowerCase(),
        timeStamp: '1600000000',
        hash: '0xghi'
      }
    ] as any);

    const mockPrices = new Map<string, number>();
    mockPrices.set('0xmeme', 100);
    mockPrices.set('0xmeme2', 50); // It will fallback to 0 if not provided, but we provide it here
    
    vi.mocked(fetchPrices).mockResolvedValue(mockPrices);

    const result = await analyzeWallet(mockAddress);
    
    // Only 2 sells
    expect(result.trades.length).toBe(2);
    
    // Sort logic should put highest missedGains first.
    // 0xmeme: current $100. Missed: 100 - (100 * 0.1) = 90
    // 0xmeme2: current $50. Missed: 50 - (50 * 0.1) = 45
    expect(result.trades[0].contractAddress).toBe('0xmeme');
    expect(result.trades[0].missedGains).toBe(90);
    expect(result.worstSell?.contractAddress).toBe('0xmeme');

    expect(result.trades[1].contractAddress).toBe('0xmeme2');
    expect(result.trades[1].missedGains).toBe(45);

    expect(result.totalMissedUsd).toBe(135);
    expect(result.tokensJeeted).toBe(2);

    // jeetScore calculation:
    // Missed gains: min(135 / 100, 50) = 1.35
    // Tokens jeeted: min(2 * 10, 30) = 20
    // Trades: min(2 * 5, 20) = 10
    // Total = round(1.35 + 20 + 10) = 31
    expect(result.jeetScore).toBe(31);
  });

  it('filters out trades with no missed gains', async () => {
    vi.mocked(fetchTokenTransfers).mockResolvedValue([
      {
        contractAddress: '0xmeme',
        tokenName: 'Meme Coin',
        tokenSymbol: 'MEME',
        tokenDecimal: '18',
        value: '1000000000000000000',
        from: mockAddress.toLowerCase(),
        to: '0x456',
        timeStamp: '1600000000',
        hash: '0xabc'
      }
    ] as any);

    // Provide 0 price
    const mockPrices = new Map<string, number>();
    mockPrices.set('0xmeme', 0);
    vi.mocked(fetchPrices).mockResolvedValue(mockPrices);

    const result = await analyzeWallet(mockAddress);
    expect(result.trades.length).toBe(0);
    expect(result.totalMissedUsd).toBe(0);
    expect(result.worstSell).toBeNull();
  });
});
