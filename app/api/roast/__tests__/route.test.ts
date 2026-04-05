import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '../route';
import { DEMO_PROFILES } from '@/lib/demo-profiles';
import * as constants from '@/lib/constants';

vi.mock('@/lib/constants', () => ({
  getJeetTitle: vi.fn().mockReturnValue({ title: 'Mocked Jeet Title' })
}));

describe('POST /api/roast', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  const createRequest = (body: any) => {
    return new NextRequest('http://localhost/api/roast', {
      method: 'POST',
      body: JSON.stringify(body)
    });
  };

  const validStats = {
    totalMissedUsd: 15000,
    tokensJeeted: 5,
    jeetScore: 85,
    trades: []
  };

  it('returns 400 for missing stats', async () => {
    const req = createRequest({});
    const res = await POST(req);
    const json = await res.json();
    
    expect(res.status).toBe(400);
    expect(json.error).toBe('Missing wallet stats');
  });

  it('returns demo profile if NO openai api key is set', async () => {
    delete process.env.OPENAI_API_KEY;
    const req = createRequest({ stats: validStats });
    const res = await POST(req);
    const json = await res.json();

    expect(json.demo).toBe(true);
    expect(json.data.script).toBeDefined();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('returns demo profile if stats contain demo trade (txHash with ...)', async () => {
    process.env.OPENAI_API_KEY = 'test_key';
    const demoStats = {
      ...validStats,
      totalMissedUsd: DEMO_PROFILES[0].stats.totalMissedUsd, // match the first demo profile
      trades: [{ txHash: '0x123...abc' }]
    };
    const req = createRequest({ stats: demoStats });
    const res = await POST(req);
    const json = await res.json();

    expect(json.demo).toBe(true);
    expect(json.data).toEqual(DEMO_PROFILES[0].roast);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('calls OpenAI logic and parses response successfully', async () => {
    process.env.OPENAI_API_KEY = 'test_key';
    
    const mockOpenAIResponse = {
      choices: [{
        message: {
          content: JSON.stringify({ script: 'You sold too early!', beats: [] })
        }
      }]
    };
    (fetch as Mock).mockResolvedValueOnce({
      json: async () => mockOpenAIResponse
    });

    const req = createRequest({ stats: validStats });
    const res = await POST(req);
    const json = await res.json();

    expect(json.demo).toBe(false);
    expect(json.data.script).toBe('You sold too early!');
    expect(json.data.jeetScore).toBe(85);
    expect(json.data.title).toBe('Mocked Jeet Title');
    expect(fetch).toHaveBeenCalledWith('https://api.openai.com/v1/chat/completions', expect.any(Object));
  });

  it('returns 500 if AI fails to return content', async () => {
    process.env.OPENAI_API_KEY = 'test_key';
    
    // Malformed/Empty OpenAI Response
    const mockOpenAIResponse = { choices: [] };
    (fetch as Mock).mockResolvedValueOnce({
      json: async () => mockOpenAIResponse
    });

    const req = createRequest({ stats: validStats });
    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.error).toBe('AI failed to generate roast');
  });

  it('falls back to demo profile if fetch throws an error', async () => {
    process.env.OPENAI_API_KEY = 'test_key';
    (fetch as Mock).mockRejectedValueOnce(new Error('Network error'));
    
    const req = createRequest({ stats: validStats });
    const res = await POST(req);
    const json = await res.json();

    expect(json.demo).toBe(true);
    expect(json.data).toEqual(DEMO_PROFILES[0].roast);
  });
});
