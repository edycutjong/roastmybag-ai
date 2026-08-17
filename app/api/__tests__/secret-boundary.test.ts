import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { NextRequest } from 'next/server';
import { POST as roastPOST } from '../roast/route';
import { POST as scanPOST } from '../scan/route';
import { POST as ttsPOST } from '../tts/route';

/**
 * Permission-boundary test.
 *
 * The security claim in SECURITY.md is that every provider credential
 * (OpenAI, ElevenLabs, Moralis) is read server-side only and never reaches
 * the browser. Most projects *configure* that boundary; this asserts it
 * actually holds.
 *
 * Two halves:
 *   1. Runtime  — no API response may echo a credential, in any code path,
 *                 including the error and fallback paths.
 *   2. Static   — no client-side source file may reference a secret env var,
 *                 and no secret may be exposed under a NEXT_PUBLIC_ name.
 */

// Distinctive sentinels — if any of these strings appears in a response or a
// client bundle, a credential escaped the server boundary.
const SECRETS = {
  OPENAI_API_KEY: 'sk-SENTINEL-openai-must-never-leak-0000',
  ELEVENLABS_API_KEY: 'SENTINEL-elevenlabs-must-never-leak-0000',
  ELEVENLABS_VOICE_ID: 'SENTINEL-voice-id-0000',
  MORALIS_API_KEY: 'SENTINEL-moralis-must-never-leak-0000',
} as const;

const SECRET_VALUES = Object.values(SECRETS);
const SECRET_NAMES = Object.keys(SECRETS);

/** Serialises a Response completely: status, headers, and body. */
async function dump(res: Response): Promise<string> {
  const headers = JSON.stringify(Object.fromEntries(res.headers.entries()));
  let body: string;
  try {
    body = await res.clone().text();
  } catch {
    body = '';
  }
  return `${res.status}\n${headers}\n${body}`;
}

function expectNoSecrets(serialised: string, label: string) {
  for (const secret of SECRET_VALUES) {
    expect(
      serialised.includes(secret),
      `${label} leaked a credential across the server boundary`
    ).toBe(false);
  }
}

const req = (path: string, body: unknown) =>
  new NextRequest(`http://localhost${path}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

describe('permission boundary — provider credentials never leave the server', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv, ...SECRETS };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('does not leak credentials when the upstream provider errors', async () => {
    // Upstream failure drives every route into its catch/fallback branch —
    // historically the likeliest place for a key to end up in an error body.
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error(`upstream exploded using ${SECRETS.OPENAI_API_KEY}`))
    );

    const responses = await Promise.all([
      roastPOST(req('/api/roast', { stats: { totalMissedUsd: 1, jeetScore: 50, trades: [] } })),
      scanPOST(req('/api/scan', { address: '0x' + 'a'.repeat(40) })),
      ttsPOST(req('/api/tts', { text: 'hello' })),
    ]);

    for (const res of responses) {
      expectNoSecrets(await dump(res), 'error path');
    }
  });

  it('does not leak credentials when the upstream provider returns a malformed payload', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ error: { message: SECRETS.OPENAI_API_KEY } }), {
          status: 401,
          headers: { 'content-type': 'application/json' },
        })
      )
    );

    for (const res of [
      await roastPOST(req('/api/roast', { stats: { totalMissedUsd: 1, jeetScore: 50, trades: [] } })),
      await scanPOST(req('/api/scan', { address: '0x' + 'b'.repeat(40) })),
      await ttsPOST(req('/api/tts', { text: 'hello' })),
    ]) {
      expectNoSecrets(await dump(res), 'upstream-401 path');
    }
  });

  it('does not leak credentials on malformed client input', async () => {
    vi.stubGlobal('fetch', vi.fn());

    for (const res of [
      await roastPOST(req('/api/roast', {})),
      await scanPOST(req('/api/scan', { address: 'not-an-address' })),
      await ttsPOST(req('/api/tts', {})),
    ]) {
      expectNoSecrets(await dump(res), 'bad-input path');
    }
  });

  it('exposes no provider credential under a NEXT_PUBLIC_ name', () => {
    // Anything prefixed NEXT_PUBLIC_ is inlined into the client bundle by
    // Next.js, so a secret under that prefix is a public secret.
    for (const name of Object.keys(process.env)) {
      if (!name.startsWith('NEXT_PUBLIC_')) continue;
      const value = process.env[name] ?? '';
      for (const secret of SECRET_VALUES) {
        expect(value.includes(secret), `${name} exposes a server credential`).toBe(false);
      }
      expect(
        SECRET_NAMES.some((s) => name.includes(s)),
        `${name} mirrors a server-only credential name`
      ).toBe(false);
    }
  });

  it('never reads a secret env var from a client component', () => {
    // 'use client' files are compiled into the browser bundle. Reading
    // process.env.<SECRET> from one inlines the value at build time.
    const roots = ['app', 'components'];
    const offenders: string[] = [];

    const walk = (dir: string) => {
      for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) {
          if (entry === '__tests__' || entry === 'node_modules') continue;
          walk(full);
          continue;
        }
        if (!/\.(ts|tsx)$/.test(entry)) continue;

        const source = readFileSync(full, 'utf8');
        const isClient = /^\s*['"]use client['"]/m.test(source);
        if (!isClient) continue;

        for (const name of SECRET_NAMES) {
          if (source.includes(`process.env.${name}`)) offenders.push(`${full} -> ${name}`);
        }
      }
    };

    for (const root of roots) walk(root);
    expect(offenders, 'client components must not read server credentials').toEqual([]);
  });
});
