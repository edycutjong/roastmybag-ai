import { test, expect } from '@playwright/test';

/**
 * The /judge surface must be reachable by a judge with no credentials and no
 * session. A judge page that breaks on submission day is worse than none, so
 * it is pinned by a test.
 */
test.describe('/judge is publicly reachable', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('returns 200 with no cookies and no session', async ({ page, context }) => {
    await context.clearCookies();

    const response = await page.goto('/judge');
    expect(response?.status(), '/judge must not require auth').toBe(200);

    // No redirect to a login or home page.
    expect(new URL(page.url()).pathname).toBe('/judge');
  });

  test('states the claim, the click path, receipts and limitations', async ({ page }) => {
    await page.goto('/judge');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('RoastMyBag');
    await expect(page.getByText(/scans your BNB Chain wallet/i)).toBeVisible();
    await expect(page.getByRole('heading', { name: /the 30-second path/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /receipts/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /honest limitations/i })).toBeVisible();
  });

  test('links back to the live app and the repository', async ({ page }) => {
    await page.goto('/judge');

    await expect(page.getByRole('link', { name: /live app/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /repository/i })).toBeVisible();
  });
});
