import { NextRequest, NextResponse } from 'next/server';
import { generateSpeech } from '@/lib/elevenlabs';

/**
 * POST /api/tts — Text-to-speech via ElevenLabs
 * Body: { text: string }
 */
export async function POST(req: NextRequest) {
  try {
    if (!process.env.ELEVENLABS_API_KEY) {
      return NextResponse.json(
        { error: 'TTS not available — API key not configured' },
        { status: 503 }
      );
    }

    const { text } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Missing text' }, { status: 400 });
    }

    const audio = await generateSpeech(text);

    if (!audio) {
      return NextResponse.json(
        { error: 'TTS not available — API key not configured' },
        { status: 503 }
      );
    }

    return new NextResponse(audio, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': String(audio.byteLength),
      },
    });
  } catch (error) {
    console.error('[/api/tts] Error:', error);
    return NextResponse.json({ error: 'TTS generation failed' }, { status: 500 });
  }
}
