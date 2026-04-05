/**
 * ElevenLabs TTS client — streaming text-to-speech.
 */
export async function generateSpeech(text: string): Promise<ArrayBuffer | null> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID || 'pNInz6obpgDQGcFmaJgB'; // Adam

  if (!apiKey) {
    console.warn('[ElevenLabs] No API key configured');
    return null;
  }

  try {
    const abortController = new AbortController();
    const timeout = setTimeout(() => abortController.abort(), 15000);

    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        signal: abortController.signal,
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_turbo_v2_5',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.8,
            style: 0.7,
            use_speaker_boost: true,
          },
        }),
      }
    );
    clearTimeout(timeout);

    if (!res.ok) {
        console.error('[ElevenLabs] Error:', res.status, await res.text());
      return null;
    }

    return await res.arrayBuffer();
  } catch (err) {
    console.error('[ElevenLabs] Network error:', err);
    return null;
  }
}
