import { test, expect, Page } from '@playwright/test';

test('reserve and cancel queue full flow', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Enter your registered email...' }).fill('test3@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your registered password...' }).fill('tttttttt');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByRole('link', { name: 'Reserve now' }).click();
  await page.locator('.bg-yellow-600').first().click();
  const seatsInput = page.getByRole('spinbutton');
  if (await seatsInput.count() >= 0) {
    await seatsInput.clear();
    await seatsInput.fill('1');

    const policyCheckbox = page.getByRole('checkbox');
    await expect(policyCheckbox).toBeVisible();
    await policyCheckbox.check();

    const confirmBtn = page.getByRole('button', { name: 'CONFIRM' });
    await expect(confirmBtn).toBeEnabled();
    await confirmBtn.click();
  }

  const finishedHeading = page.locator('h2', { hasText: 'Finished reserve' });
  await finishedHeading.waitFor({ state: 'visible', timeout: 10000 });
  await expect(finishedHeading).toContainText('Finished reserve');

  const cancelBtn = page.getByRole('button', { name: 'Cancel Queue' });
  await cancelBtn.waitFor({ state: 'visible', timeout: 5000 });
  await cancelBtn.click();

  const popup = page.locator('h3', { hasText: 'Your queue was cancelled' });
  await popup.waitFor({ state: 'visible', timeout: 5000 });
  await expect(popup).toBeVisible();

  await page.waitForURL('http://localhost:5173/', { timeout: 10000 });

  await page.screenshot({ path: 'landing-after-cancel.png', fullPage: true });

  await expect(page.locator('body')).toContainText("Got plans for tonight's party?");
});

// test('check history after reserve', async ({ page }) => {
//   await page.goto('http://localhost:5173/');
//   await page.getByRole('link', { name: 'Login' }).click();
//   await page.getByRole('textbox', { name: 'Enter your registered email...' }).fill('test4@gmail.com');
//   await page.getByRole('textbox', { name: 'Enter your registered password...' }).fill('tttttttt');
//   await page.getByRole('button', { name: 'LOGIN' }).click();

//   await page.getByRole('link', { name: 'Reserve now' }).click();
//   await page.locator('.text-sm.cursor-pointer').first().click();

//   const seatsInput = page.getByRole('spinbutton');
//   if (await seatsInput.count() >= 0) {
//     await seatsInput.clear();
//     await seatsInput.fill('1');

//     const policyCheckbox = page.getByRole('checkbox');
//     await expect(policyCheckbox).toBeVisible();
//     await policyCheckbox.check();

//     const confirmBtn = page.getByRole('button', { name: 'CONFIRM' });
//     await expect(confirmBtn).toBeEnabled();
//     await confirmBtn.click();
//   }
//   await page.getByRole('link', { name: 'Back to home' }).click();

//   await page.getByRole('link', { name: 'History' }).click();
//   await expect(page.locator('tbody')).toContainText('more detail >>');

// });


