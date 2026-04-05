import { getSystemPrompt, buildUserMessage } from '../roast-prompt';
import type { WalletStats } from '../types';
import { describe, it, expect } from 'vitest';

describe('roast-prompt', () => {
  describe('getSystemPrompt', () => {
    it('returns a string containing key instructions', () => {
      const prompt = getSystemPrompt();
      expect(typeof prompt).toBe('string');
      expect(prompt).toContain('JSON matching this exact schema');
      expect(prompt).toContain('"script":');
      expect(prompt).toContain('"beats":');
    });
  });

  describe('buildUserMessage', () => {
    it('formats wallet stats properly', () => {
      const mockStats: WalletStats = {
        jeetScore: 85,
        totalMissedUsd: 15000,
        tokensJeeted: 3,
        worstSell: {
          tokenName: 'Test Token',
          tokenSymbol: 'TEST',
          contractAddress: '0x123',
          amountSold: 1000,
          sellPrice: 1,
          currentPrice: 10,
          missedGains: 9000,
          sellDate: '2023-01-01',
          txHash: '0xabc'
        },
        trades: [
          {
            tokenName: 'Test Token',
            tokenSymbol: 'TEST',
            contractAddress: '0x123',
            amountSold: 1000,
            sellPrice: 1,
            currentPrice: 10,
            missedGains: 9000,
            sellDate: '2023-01-01',
            txHash: '0xabc'
          }
        ]
      };

      const message = buildUserMessage(mockStats);
      
      expect(message).toContain('Jeet Score: 85/100');
      expect(message).toContain('Total USD Left on Table: $15,000');
      expect(message).toContain('Tokens Panic-Sold: 3');
      expect(message).toContain('Worst Single Sell: TEST — missed $9000.00');
      expect(message).toContain('- TEST: sold 1,000 at $1.000000, now worth $10.000000 → missed $9000.00');
    });

    it('handles null worstSell', () => {
      const mockStats: WalletStats = {
        jeetScore: 0,
        totalMissedUsd: 0,
        tokensJeeted: 0,
        worstSell: null,
        trades: []
      };

      const message = buildUserMessage(mockStats);
      expect(message).toContain('Worst Single Sell: None');
    });
  });
});
