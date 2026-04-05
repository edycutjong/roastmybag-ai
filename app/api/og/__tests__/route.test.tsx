import { describe, it, expect, vi } from 'vitest';
import { GET } from '../route';
import { renderToStaticMarkup } from 'react-dom/server';

// Mock next/og
vi.mock('next/og', () => {
  return {
    ImageResponse: class MockImageResponse {
      public element: any;
      public options: any;
      constructor(element: any, options: any) {
        this.element = element;
        this.options = options;
        // Mock a status property just for checking returned objects if needed
        (this as any).status = 200;
        (this as any).headers = new Headers({ 'Content-Type': 'image/png' });
      }
    }
  };
});

describe('GET /api/og', () => {
  it('generates an OG image with default params when none provided', async () => {
    const req = new Request('http://localhost/api/og');
    const res: any = await GET(req);

    expect(res.options.width).toBe(1200);
    expect(res.options.height).toBe(630);
    
    // Check embedded default text props
    const elementStr = renderToStaticMarkup(res.element);
    expect(elementStr).toContain('??/100');
    expect(elementStr).toContain('Unknown Degen');
    expect(elementStr).toContain('🔥');
    expect(elementStr).toContain('Left $0 on the table');
  });

  it('generates an OG image with provided search params', async () => {
    const req = new Request('http://localhost/api/og?score=99&title=Maximum%20Jeet&missed=50000&emoji=😱');
    const res: any = await GET(req);

    // Check embedded custom text props
    const elementStr = renderToStaticMarkup(res.element);
    expect(elementStr).toContain('99/100');
    expect(elementStr).toContain('Maximum Jeet');
    expect(elementStr).toContain('😱');
    expect(elementStr).toContain('Left $50000 on the table');
  });
});
