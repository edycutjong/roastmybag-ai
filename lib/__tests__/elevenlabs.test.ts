import { generateSpeech } from '../elevenlabs';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('elevenlabs', () => {
  const originalEnv = process.env;
  
  beforeEach(() => {
    vi.resetAllMocks();
    process.env = { ...originalEnv };
    process.env.ELEVENLABS_API_KEY = 'test_api_key';
    global.fetch = vi.fn();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('returns null if no API key', async () => {
    delete process.env.ELEVENLABS_API_KEY;
    const result = await generateSpeech('test text');
    expect(result).toBeNull();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('makes successful API call and returns ArrayBuffer', async () => {
    const mockArrayBuffer = new ArrayBuffer(8);
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      arrayBuffer: async () => mockArrayBuffer
    } as any);

    const result = await generateSpeech('test roast');
    
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('api.elevenlabs.io'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'xi-api-key': 'test_api_key'
        })
      })
    );
    expect(result).toBe(mockArrayBuffer);
  });

  it('returns null on API error (res.ok = false)', async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: false,
      status: 400,
      text: async () => 'Bad request'
    } as any);

    const result = await generateSpeech('test');
    expect(result).toBeNull();
  });

  it('triggers abort on timeout', async () => {
    vi.useFakeTimers();
    vi.mocked(global.fetch).mockImplementation(async (url, config) => {
      // Simulate slow request
      return new Promise((resolve) => {
        if (config?.signal) {
          config.signal.addEventListener('abort', () => {
            resolve({ ok: false, status: 500, text: async () => 'Aborted' } as any);
          });
        }
      });
    });

    const promise = generateSpeech('test');
    vi.advanceTimersByTime(16000); // Past 15000ms timeout
    const result = await promise;
    
    expect(result).toBeNull();
    vi.useRealTimers();
  });

  it('returns null on network error', async () => {
    vi.mocked(global.fetch).mockRejectedValue(new Error('Network disconnected'));

    const result = await generateSpeech('test');
    expect(result).toBeNull();
  });
});
