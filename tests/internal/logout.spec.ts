import { test, expect } from '@playwright/test';

test('user can logout', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Enter your registered email...' }).fill('test6@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your registered password...' }).fill('tttttttt');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();
  const loginHeading = page.getByRole('heading', { name: 'Login' });
  await expect(loginHeading).toBeVisible();

  await expect(page.locator('#root')).toContainText('Email');
  await expect(page.locator('#root')).toContainText('Password');

});