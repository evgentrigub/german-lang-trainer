import { test, expect, type Page } from '@playwright/test';

/**
 * Basic happy-path user journey:
 * 1. Navigate to homepage
 * 2. Start first reading exercise
 * 3. Answer all questions with the first option (placeholder)
 * 4. Verify that results screen is shown
 * 5. Return to dashboard and verify stats card appears
 *
 * NOTE: This is a *scaffold* – selectors should be updated once UI test ids
 * are finalised. It ensures the overall page flow does not crash.
 */

test('full practice flow produces results', async ({ page }: { page: Page }) => {
  // 1️⃣ Home → Practice list
  await page.goto('/', { waitUntil: 'networkidle' });

  // Click primary call-to-action that leads to /practice
  await page.locator('a[href="/practice"]').first().click();

  // 2️⃣ Text overview → Begin questions
  await page.locator('[data-test="text-card"]').first().click();

  await page.locator('[data-test="start-questions"]').click();

  // Wait until question interface appears
  await page.locator('[data-test="confirm-answer"]').waitFor({ state: 'visible' });

  // 3️⃣ Answer loop – pick the first option for each question
  // This is intentionally naive; correctness is irrelevant for smoke test.
  // Loop until the "next-question" button no longer exists (final results page)
  while (true) {
    // Select first answer option (letter A)
    const optionButton = page.locator('[data-test="question-option"]').first();
    await optionButton.click();

    // Click confirm answer
    await page.locator('[data-test="confirm-answer"]').click();

    // Wait for next-question button to appear and click it; if absent, exit loop (results page)
    const nextBtn = page.locator('[data-test="next-question"]');
    if (await nextBtn.waitFor({ state: 'visible', timeout: 3000 }).catch(() => null)) {
      await nextBtn.click();
    } else {
      break;
    }
  }

  // 4️⃣ Verify results screen appears
  await expect(page.getByText(/%/)).toBeVisible(); // score percentage visible

  // 5️⃣ Navigate back to dashboard
  await page.getByRole('link', { name: /dashboard/i }).click();
  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
}); 