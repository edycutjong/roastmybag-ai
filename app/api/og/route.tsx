import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const score = searchParams.get('score') || '??';
  const title = searchParams.get('title') || 'Unknown Degen';
  const missed = searchParams.get('missed') || '0';
  const emoji = searchParams.get('emoji') || '🔥';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a00 50%, #0a0a0a 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,69,0,0.08) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div style={{ fontSize: '80px' }}>{emoji}</div>

          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #ff4500, #ffd700)',
              backgroundClip: 'text',
              color: 'transparent',
              textAlign: 'center',
            }}
          >
            Jeet Score: {score}/100
          </div>

          <div
            style={{
              fontSize: '36px',
              color: '#ffffff',
              fontWeight: 600,
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: '28px',
              color: '#ff3333',
              marginTop: '8px',
            }}
          >
            Left ${missed} on the table 💀
          </div>

          <div
            style={{
              marginTop: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span style={{ fontSize: '32px' }}>🔥</span>
            <span
              style={{
                fontSize: '28px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #ff4500, #ffd700)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              RoastMyBag.ai
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
