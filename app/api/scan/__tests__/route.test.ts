import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '../route';
import * as analyzer from '@/lib/analyzer';

// Mock dependencies
vi.mock('@/lib/bscscan', () => ({
  isValidBscAddress: vi.fn().mockImplementation((addr) => addr !== 'invalid')
}));

vi.mock('@/lib/analyzer', () => ({
  analyzeWallet: vi.fn()
}));

vi.mock('@/lib/demo-profiles', () => ({
  getRandomDemoProfile: vi.fn().mockReturnValue({ stats: { jeetScore: 42 } })
}));

describe('POST /api/scan', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.clearAllMocks();
  });

  const createRequest = (body: any) => {
    return new NextRequest('http://localhost/api/scan', {
      method: 'POST',
      body: JSON.stringify(body)
    });
  };

  it('returns 400 for missing address', async () => {
    const req = createRequest({});
    const res = await POST(req);
    const json = await res.json();
    
    expect(res.status).toBe(400);
    expect(json.error).toBe('Invalid BSC wallet address');
  });

  it('returns 400 for invalid address', async () => {
    const req = createRequest({ address: 'invalid' });
    const res = await POST(req);
    const json = await res.json();
    
    expect(res.status).toBe(400);
    expect(json.error).toBe('Invalid BSC wallet address');
  });

  it('returns demo profile if NO moralis api key is set', async () => {
    delete process.env.MORALIS_API_KEY;
    const req = createRequest({ address: '0xValidAddressButNoKey' });
    const res = await POST(req);
    const json = await res.json();

    // The bscscan mock considers anything except 'invalid' as valid
    expect(json.demo).toBe(true);
    expect(json.data.jeetScore).toBe(42);
    expect(analyzer.analyzeWallet).not.toHaveBeenCalled();
  });

  it('returns demo profile for specific demo address', async () => {
    process.env.MORALIS_API_KEY = 'test_key';
    const req = createRequest({ address: '0x0000000000000000000000000000000000000001' });
    const res = await POST(req);
    const json = await res.json();

    expect(json.demo).toBe(true);
    expect(analyzer.analyzeWallet).not.toHaveBeenCalled();
  });

  it('calls analyzeWallet and returns actual data', async () => {
    process.env.MORALIS_API_KEY = 'test_key';
    vi.mocked(analyzer.analyzeWallet).mockResolvedValueOnce({ jeetScore: 99 } as any);
    
    const req = createRequest({ address: '0xValidRealAddress' });
    const res = await POST(req);
    const json = await res.json();

    expect(json.demo).toBe(false);
    expect(json.data.jeetScore).toBe(99);
    expect(analyzer.analyzeWallet).toHaveBeenCalledWith('0xValidRealAddress');
  });

  it('falls back to demo profile if analyzeWallet throws an error', async () => {
    process.env.MORALIS_API_KEY = 'test_key';
    vi.mocked(analyzer.analyzeWallet).mockRejectedValueOnce(new Error('Moralis went down'));
    
    const req = createRequest({ address: '0xValidButFail' });
    const res = await POST(req);
    const json = await res.json();

    expect(json.demo).toBe(true);
    // Picks up the demo profile fallback
    expect(json.data.jeetScore).toBe(42);
  });
});
