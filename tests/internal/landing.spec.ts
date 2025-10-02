import { test, expect } from '@playwright/test';

test('login user should not see login button', async ({ page }) => {
  await page.goto('http://localhost:5173/login');

  await page.getByPlaceholder('Enter your registered email...').fill('testing@gmail.com');
  await page.getByPlaceholder('Enter your registered password...').fill('tttttttt');
  await page.getByRole('button', { name: 'LOGIN' }).click();

  await page.waitForURL('http://localhost:5173/');
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
});

