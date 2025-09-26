import { test, expect } from '@playwright/test';

test('guest should login before reserve', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Reserve now' }).click();
  await page.locator('.text-sm.cursor-pointer').first().click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});

test('reserve fail by no seats value', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Enter your registered email...' }).fill('testing@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your registered password...' }).fill('tttttttt');
  await page.getByRole('button', { name: 'LOGIN' }).click();

  await page.getByRole('link', { name: 'Reserve now' }).click();
  await page.locator('.bg-yellow-600').first().click();

  const policyCheckbox = page.getByRole('checkbox');
  if (await policyCheckbox.count() > 0) {
    await policyCheckbox.check();
  }

  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe("Please specify a valid number of seats!");
    await dialog.accept();
  });

  const confirmBtn = page.getByRole('button', { name: 'CONFIRM' });
  if (await confirmBtn.count() > 0) {
    await confirmBtn.click();
  }
});

test('reserve fail by policy not accepted', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Enter your registered email...' }).fill('testing@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your registered password...' }).fill('tttttttt');
  await page.getByRole('button', { name: 'LOGIN' }).click();

  await page.getByRole('link', { name: 'Reserve now' }).click();
  await page.locator('.text-sm.cursor-pointer').first().click();

  const seatsInput = page.getByRole('spinbutton');
  if (await seatsInput.count() > 0) {
    await seatsInput.fill('1');
  }

  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe("Please agree to the reservation policy!");
    await dialog.accept();
  });

  const confirmBtn = page.getByRole('button', { name: 'CONFIRM' });
  if (await confirmBtn.count() > 0) {
    await confirmBtn.click();
  }
});

// test('reserve complete', async ({ page }) => {
//   await page.goto('http://localhost:5173/');
//   await page.getByRole('link', { name: 'Login' }).click();
//   await page.getByRole('textbox', { name: 'Enter your registered email...' }).fill('test2@gmail.com');
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

//   const finishedHeading = page.locator('h2');
//   await finishedHeading.waitFor({ state: 'visible', timeout: 10000 });
//   await expect(finishedHeading).toContainText('Finished reserve');
// });
