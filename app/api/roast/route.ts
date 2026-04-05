import { NextRequest, NextResponse } from 'next/server';
import { getSystemPrompt, buildUserMessage } from '@/lib/roast-prompt';
import type { WalletStats, RoastResult } from '@/lib/types';
import { getJeetTitle } from '@/lib/constants';
import { DEMO_PROFILES } from '@/lib/demo-profiles';

/**
 * POST /api/roast — Generate AI roast from wallet stats
 * Body: { stats: WalletStats }
 */
export async function POST(req: NextRequest) {
  try {
    const { stats } = (await req.json()) as { stats: WalletStats };

    if (!stats) {
      return NextResponse.json({ error: 'Missing wallet stats' }, { status: 400 });
    }

    // Check if these are demo stats
    const isDemo = stats.trades?.some((t: any) => t.txHash?.includes('...'));

    // Fallback to demo roast if no API key or it's explicit demo data
    if (!process.env.OPENAI_API_KEY || isDemo) {
      const match = DEMO_PROFILES.find(p => p.stats.totalMissedUsd === stats.totalMissedUsd) || DEMO_PROFILES[0];
      return NextResponse.json({
        success: true,
        demo: true,
        data: match.roast,
      });
    }

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: getSystemPrompt() },
          { role: 'user', content: buildUserMessage(stats) },
        ],
        temperature: 0.9,
        max_tokens: 800,
        response_format: { type: 'json_object' },
      }),
    });

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: 'AI failed to generate roast' }, { status: 500 });
    }

    const parsed = JSON.parse(content) as RoastResult;
    const { title } = getJeetTitle(stats.jeetScore);

    return NextResponse.json({
      success: true,
      demo: false,
      data: { ...parsed, jeetScore: stats.jeetScore, title },
    });
  } catch (error) {
    console.error('[/api/roast] Error:', error);
    // Fallback to demo on any error
    return NextResponse.json({
      success: true,
      demo: true,
      data: DEMO_PROFILES[0].roast,
    });
  }
}
