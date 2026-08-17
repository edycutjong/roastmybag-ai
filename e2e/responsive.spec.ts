import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const PATHS = ['/', '/judge'];

test.describe('responsive layout', () => {
  for (const vp of VIEWPORTS) {
    for (const path of PATHS) {
      test(`${path} cannot be scrolled sideways at ${vp.name} (${vp.width}px)`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        // Assert the property a user actually feels: swiping right must not
        // reveal dead space. Raw scrollWidth is the wrong measure here —
        // decorative, clipped elements (.hero-glow) inflate it while being
        // completely unreachable.
        const scrolledTo = await page.evaluate(async () => {
          window.scrollTo(2000, 0);
          await new Promise((r) => setTimeout(r, 200));
          return window.scrollX;
        });

        expect(scrolledTo, `${path} swipes ${scrolledTo}px sideways at ${vp.width}px`).toBe(0);
      });

      test(`${path} keeps its text inside the viewport at ${vp.name} (${vp.width}px)`, async ({
        page,
      }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        // Clipping is only acceptable for decoration. Any element holding
        // real text must fit, or content is silently unreadable.
        const clipped = await page.evaluate((viewportWidth) => {
          const offenders: string[] = [];
          document.querySelectorAll('p, h1, h2, h3, li, a, button, pre, span').forEach((el) => {
            const text = (el.textContent ?? '').trim();
            if (!text) return;
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 && rect.height === 0) return;
            // An element with its own horizontal scroller is fine.
            if (getComputedStyle(el).overflowX === 'auto') return;
            if (rect.right > viewportWidth + 1 || rect.left < -1) {
              offenders.push(`<${el.tagName.toLowerCase()}> "${text.slice(0, 30)}"`);
            }
          });
          return offenders.slice(0, 5);
        }, vp.width);

        expect(clipped, `${path} clips text at ${vp.width}px`).toEqual([]);
      });
    }
  }

  test('primary action meets touch-target size on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const box = await page.locator('#roast-button').boundingBox();
    expect(box, 'roast button must be rendered').not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(36);
    expect(box!.width).toBeGreaterThanOrEqual(36);
  });

  test('wallet input stays within the viewport on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const box = await page.locator('#wallet-input').boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(375 + 1);
  });
});
