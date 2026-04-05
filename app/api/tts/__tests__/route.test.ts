import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '../route';
import { generateSpeech } from '@/lib/elevenlabs';

vi.mock('@/lib/elevenlabs', () => ({
  generateSpeech: vi.fn()
}));

describe('POST /api/tts', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.clearAllMocks();
  });

  const createRequest = (body: any) => {
    return new NextRequest('http://localhost/api/tts', {
      method: 'POST',
      body: JSON.stringify(body)
    });
  };

  it('returns 503 if API key is not configured', async () => {
    delete process.env.ELEVENLABS_API_KEY;
    const req = createRequest({ text: 'Hello' });
    const res = await POST(req);
    const json = await res.json();
    
    expect(res.status).toBe(503);
    expect(json.error).toBe('TTS not available — API key not configured');
  });

  it('returns 400 if text is missing', async () => {
    process.env.ELEVENLABS_API_KEY = 'test_key';
    const req = createRequest({});
    const res = await POST(req);
    const json = await res.json();
    
    expect(res.status).toBe(400);
    expect(json.error).toBe('Missing text');
  });

  it('returns 400 if text is not a string', async () => {
    process.env.ELEVENLABS_API_KEY = 'test_key';
    const req = createRequest({ text: 123 });
    const res = await POST(req);
    const json = await res.json();
    
    expect(res.status).toBe(400);
    expect(json.error).toBe('Missing text');
  });

  it('returns 503 if generateSpeech returns null', async () => {
    process.env.ELEVENLABS_API_KEY = 'test_key';
    vi.mocked(generateSpeech).mockResolvedValueOnce(null);

    const req = createRequest({ text: 'Hello' });
    const res = await POST(req);
    const json = await res.json();
    
    expect(res.status).toBe(503);
    expect(json.error).toBe('TTS not available — API key not configured');
  });

  it('returns audio buffer correctly', async () => {
    process.env.ELEVENLABS_API_KEY = 'test_key';
    const mockArrayBuffer = new ArrayBuffer(8);
    vi.mocked(generateSpeech).mockResolvedValueOnce(mockArrayBuffer);

    const req = createRequest({ text: 'Hello' });
    const res = await POST(req);

    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toBe('audio/mpeg');
    expect(res.headers.get('Content-Length')).toBe('8');
  });

  it('returns 500 on unexpected errors', async () => {
    process.env.ELEVENLABS_API_KEY = 'test_key';
    vi.mocked(generateSpeech).mockRejectedValueOnce(new Error('Provider failure'));

    const req = createRequest({ text: 'Hello' });
    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.error).toBe('TTS generation failed');
  });
});
