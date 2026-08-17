import { test, expect } from '@playwright/test';

/**
 * Smoke test: the app must load and be usable with NO environment variables
 * and no credentials at all.
 */
test.describe('demo mode smoke', () => {
  test('landing page renders the pitch without any API keys', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Get Your Bags');
    await expect(page.locator('#wallet-input')).toBeVisible();
    await expect(page.locator('#roast-button')).toBeVisible();
  });

  test('exposes correct document metadata', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/RoastMyBag/i);
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /wallet|roast/i);
  });

  test('logs no console errors and shows no Next.js error overlay', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('nextjs-portal')).toHaveCount(0);
    expect(errors, `console errors: ${errors.join(' | ')}`).toEqual([]);
  });

  test('rejects a malformed wallet address with an inline error', async ({ page }) => {
    await page.goto('/');

    await page.locator('#wallet-input').fill('definitely-not-an-address');
    await page.locator('#roast-button').click();

    await expect(page.getByText(/invalid bsc wallet address/i)).toBeVisible();
  });
});
