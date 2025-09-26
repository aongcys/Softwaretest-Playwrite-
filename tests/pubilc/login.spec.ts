import { test, expect } from '@playwright/test';

test('login pass', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByRole('textbox', { name: 'Enter your registered email...' }).click();
  await page.getByPlaceholder('Enter your registered email...').fill('testing@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your registered password...' }).click();
  await page.getByPlaceholder('Enter your registered password...').fill('tttttttt');
  await page.getByRole('button', { name: 'LOGIN' }).click();

  await page.waitForURL('http://localhost:5173/');

  await expect(page.getByRole('link', { name: 'test' })).toBeVisible();
});

test('login fail by email', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByRole('textbox', { name: 'Enter your registered email...' }).click();
  await page.getByRole('textbox', { name: 'Enter your registered email...' }).fill('ttest@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your registered password...' }).click();
  await page.getByRole('textbox', { name: 'Enter your registered password...' }).fill('tttttttt');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await expect(page.locator('#root')).toContainText('Invalid email or password');
});

test('login fail by password', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByRole('textbox', { name: 'Enter your registered email...' }).click();
  await page.getByRole('textbox', { name: 'Enter your registered email...' }).fill('ttest@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your registered password...' }).click();
  await page.getByRole('textbox', { name: 'Enter your registered password...' }).fill('tttttttt');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await expect(page.locator('#root')).toContainText('Invalid email or password');
});




