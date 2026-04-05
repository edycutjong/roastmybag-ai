import { NextRequest, NextResponse } from 'next/server';
import { isValidBscAddress } from '@/lib/bscscan';
import { analyzeWallet } from '@/lib/analyzer';
import { getRandomDemoProfile } from '@/lib/demo-profiles';

/**
 * POST /api/scan — Analyze a BSC wallet for paper-handed trades
 * Body: { address: string }
 */
export async function POST(req: NextRequest) {
  try {
    const { address } = await req.json();

    if (!address || !isValidBscAddress(address)) {
      return NextResponse.json(
        { error: 'Invalid BSC wallet address' },
        { status: 400 }
      );
    }

    // Use demo data if no API key or if address is the demo keyword trigger
    if (!process.env.BSCSCAN_API_KEY || address === '0x0000000000000000000000000000000000000001') {
      return NextResponse.json({
        success: true,
        demo: true,
        data: getRandomDemoProfile().stats,
      });
    }

    const stats = await analyzeWallet(address);
    return NextResponse.json({ success: true, demo: false, data: stats });
  } catch (error) {
    console.error('[/api/scan] Error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze wallet' },
      { status: 500 }
    );
  }
}
