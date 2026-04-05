import { fetchCurrentPrice, fetchPrices } from '../dexscreener';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('dexscreener', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = vi.fn();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('fetchCurrentPrice', () => {
    const mockAddress = '0x123';

    it('returns price for valid BSC pair', async () => {
      vi.mocked(global.fetch).mockResolvedValue({
        json: async () => ({
          pairs: [
            {
              chainId: 'ethereum',
              priceUsd: '10.0',
              liquidity: { usd: 1000 }
            },
            {
              chainId: 'bsc',
              priceUsd: '5.0',
              liquidity: { usd: 5000 } // highest liquidity
            },
            {
              chainId: 'bsc',
              priceUsd: '5.1',
              liquidity: { usd: 1000 }
            }
          ]
        })
      } as any);

      const price = await fetchCurrentPrice(mockAddress);
      expect(price).toBe(5.0);
      expect(global.fetch).toHaveBeenCalledWith(`https://api.dexscreener.com/latest/dex/tokens/${mockAddress}`);
    });

    it('returns 0 if no pairs', async () => {
      vi.mocked(global.fetch).mockResolvedValue({
        json: async () => ({ pairs: null })
      } as any);

      const price = await fetchCurrentPrice(mockAddress);
      expect(price).toBe(0);
    });

    it('returns 0 if no BSC pairs', async () => {
      vi.mocked(global.fetch).mockResolvedValue({
        json: async () => ({
          pairs: [{ chainId: 'ethereum', priceUsd: '10.0', liquidity: { usd: 1000 } }]
        })
      } as any);

      const price = await fetchCurrentPrice(mockAddress);
      expect(price).toBe(0);
    });

    it('handles missing liquidity and invalid priceUsd', async () => {
      vi.mocked(global.fetch).mockResolvedValue({
        json: async () => ({
          pairs: [
            {
              chainId: 'bsc',
              priceUsd: 'invalid', // parseFloat will be NaN
              // no liquidity object
            },
            {
              chainId: 'bsc',
              priceUsd: '0',
              liquidity: { usd: 0 } // falsy usd
            }
          ]
        })
      } as any);

      const price = await fetchCurrentPrice(mockAddress);
      expect(price).toBe(0);
    });

    it('returns 0 on network error', async () => {
      vi.mocked(global.fetch).mockRejectedValue(new Error('Network error'));

      const price = await fetchCurrentPrice(mockAddress);
      expect(price).toBe(0);
    });
  });

  describe('fetchPrices', () => {
    it('batches requests correctly', async () => {
      // Mock fetchCurrentPrice indirectly by mocking fetch, or we can just mock the implementation of fetch
      // Let's create an array of 35 addresses to test chunking
      const addresses = Array.from({ length: 35 }, (_, i) => `0x${i}`);
      
      const mockResponses = addresses.map(addr => ({
        pairs: [{ chainId: 'bsc', priceUsd: '1.0', liquidity: { usd: 1000 } }]
      }));

      vi.mocked(global.fetch).mockImplementation(async (url) => {
        return {
          json: async () => ({
            pairs: [{ chainId: 'bsc', priceUsd: '2.0', liquidity: { usd: 1000 } }]
          })
        } as any;
      });

      const prices = await fetchPrices(addresses);
      
      // Should have made 35 requests (since it fetches individually inside the chunks loop)
      expect(global.fetch).toHaveBeenCalledTimes(35);
      expect(prices.size).toBe(35);
      expect(prices.get('0x0')).toBe(2.0);
    });
  });
});
