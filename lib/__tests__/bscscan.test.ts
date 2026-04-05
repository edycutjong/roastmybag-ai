import { fetchTokenTransfers, isValidBscAddress } from '../bscscan';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('bscscan', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetAllMocks();
    process.env = { ...originalEnv };
    process.env.MORALIS_API_KEY = 'test_key';
    global.fetch = vi.fn();
    // Suppress console statements during testing
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('fetchTokenTransfers', () => {
    const mockAddress = '0x123';

    it('returns empty array if no API key', async () => {
      delete process.env.MORALIS_API_KEY;
      const result = await fetchTokenTransfers(mockAddress);
      expect(result).toEqual([]);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('returns transfers on success', async () => {
      const mockResponse = {
        result: [
          {
            transaction_hash: '0xabc',
            from_address: mockAddress,
            to_address: '0xdef',
            token_name: 'Test Token',
            token_symbol: 'TEST',
            token_decimals: 18,
            address: '0xtoken',
            value: '1000',
            block_timestamp: '2023-01-01T00:00:00.000Z',
            block_number: 12345
          }
        ]
      };

      vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        json: async () => mockResponse
      } as any);

      const result = await fetchTokenTransfers(mockAddress);

      expect(global.fetch).toHaveBeenCalledTimes(1);
      
      const expectedUrl = new URL(`https://deep-index.moralis.io/api/v2.2/${mockAddress}/erc20/transfers`);
      expectedUrl.searchParams.set('chain', 'bsc');
      expectedUrl.searchParams.set('limit', '100');
      
      expect(global.fetch).toHaveBeenCalledWith(
        expectedUrl.toString(),
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-API-Key': 'test_key'
          })
        })
      );

      expect(result.length).toBe(1);
      expect(result[0]).toEqual({
        hash: '0xabc',
        from: mockAddress,
        to: '0xdef',
        tokenName: 'Test Token',
        tokenSymbol: 'TEST',
        tokenDecimal: '18',
        contractAddress: '0xtoken',
        value: '1000',
        timeStamp: Math.floor(new Date('2023-01-01T00:00:00.000Z').getTime() / 1000).toString(),
        blockNumber: 12345
      });
    });

    it('returns empty array on API error', async () => {
      vi.mocked(global.fetch).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      } as any);

      const result = await fetchTokenTransfers(mockAddress);
      expect(result).toEqual([]);
    });

    it('returns empty array on malformed data', async () => {
      vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ something_else: [] })
      } as any);

      const result = await fetchTokenTransfers(mockAddress);
      expect(result).toEqual([]);
    });

    it('returns empty array on network error', async () => {
      vi.mocked(global.fetch).mockRejectedValue(new Error('Network error'));

      const result = await fetchTokenTransfers(mockAddress);
      expect(result).toEqual([]);
    });
  });

  describe('isValidBscAddress', () => {
    it('returns true for valid BSC address', () => {
      expect(isValidBscAddress('0x55d398326f99059ff775485246999027b3197955')).toBe(true);
      expect(isValidBscAddress('0x55D398326F99059FF775485246999027B3197955')).toBe(true);
    });

    it('returns false for invalid addresses', () => {
      expect(isValidBscAddress('')).toBe(false);
      expect(isValidBscAddress('0x123')).toBe(false);
      expect(isValidBscAddress('55d398326f99059ff775485246999027b3197955')).toBe(false); // missing 0x
      expect(isValidBscAddress('0x55d398326f99059ff775485246999027b319795G')).toBe(false); // invalid hex char
    });
  });
});
