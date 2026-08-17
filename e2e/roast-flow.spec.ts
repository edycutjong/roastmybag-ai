import { test, expect } from '@playwright/test';

/**
 * The core user journey, end to end, with zero credentials:
 * type "demo" -> scan -> roast -> results.
 */
test.describe('core roast flow', () => {
  // The scan and roast phases are deliberately paced animations (~3s + ~5s).
  test.setTimeout(90_000);

  test('demo keyword drives the full scan -> roast -> results sequence', async ({ page }) => {
    await page.goto('/');

    await page.locator('#wallet-input').fill('demo');
    await page.locator('#roast-button').click();

    // Loading phase renders one of the rotating status lines and a progress bar.
    await expect(page.getByText(/scanning|calculating|loading|counting|measuring|digging|finding|preparing/i).first())
      .toBeVisible({ timeout: 15_000 });

    // Results eventually replace it — the Jeet Score is the headline artifact.
    await expect(page.getByText(/jeet score/i).first()).toBeVisible({ timeout: 60_000 });
  });

  test('a valid 0x address is accepted without an inline error', async ({ page }) => {
    await page.goto('/');

    await page.locator('#wallet-input').fill('0x' + '1'.repeat(40));
    await page.locator('#roast-button').click();

    await expect(page.getByText(/invalid bsc wallet address/i)).toHaveCount(0);
  });

  test('submitting with Enter behaves the same as clicking the button', async ({ page }) => {
    await page.goto('/');

    await page.locator('#wallet-input').fill('demo');
    await page.locator('#wallet-input').press('Enter');

    await expect(page.locator('#roast-button')).toHaveCount(0, { timeout: 15_000 });
  });
});
