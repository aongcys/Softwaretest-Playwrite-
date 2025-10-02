import { test, expect } from '@playwright/test';

test('register pass', async ({ page }) => {
  await page.goto('http://localhost:5173/register');
  await page.getByRole('textbox', { name: 'Enter your firstname...' }).fill('test');
  await page.getByRole('textbox', { name: 'Enter your lastname...' }).fill('testing');

  const randomEmail = `user_${Date.now()}@test.com`;
  await page.getByRole('textbox', { name: 'Enter your email...' }).fill(randomEmail);
  await page.getByRole('textbox', { name: 'Enter your phone number...' }).fill('0123456789');
  await page.getByRole('textbox', { name: 'dd/mm/yyyy' }).fill('12/10/2006');
  await page.getByRole('textbox', { name: 'Create password...' }).fill('1111111111');
  await page.getByRole('textbox', { name: 'Confirm password...' }).fill('1111111111');
  await page.getByRole('button', { name: 'REGISTER' }).click();

  await page.waitForURL('http://localhost:5173/login');
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});

test('register fail by email already use', async ({ page }) => {
  await page.goto('http://localhost:5173/register');
  await page.getByRole('textbox', { name: 'Enter your firstname...' }).click();
  await page.getByRole('textbox', { name: 'Enter your firstname...' }).fill('mike');
  await page.getByRole('textbox', { name: 'Enter your lastname...' }).click();
  await page.getByRole('textbox', { name: 'Enter your lastname...' }).fill('heool');
  await page.getByRole('textbox', { name: 'Enter your email...' }).click();
  await page.getByRole('textbox', { name: 'Enter your email...' }).fill('test@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your phone number...' }).click();
  await page.getByRole('textbox', { name: 'Enter your phone number...' }).fill('1111111111');
  await page.getByRole('textbox', { name: 'dd/mm/yyyy' }).click();
  await page.getByRole('textbox', { name: 'dd/mm/yyyy' }).fill('02/03/2007');
  await page.getByRole('textbox', { name: 'Create password...' }).click();
  await page.getByRole('textbox', { name: 'Create password...' }).fill('1111111111');
  await page.getByRole('textbox', { name: 'Confirm password...' }).click();
  await page.getByRole('textbox', { name: 'Confirm password...' }).fill('1111111111');
  await page.getByRole('button', { name: 'REGISTER' }).click();
  await expect(page.getByRole('paragraph')).toContainText('This email is already in use. Please try with a different email.');
});

test('register fail by invalid email pattern', async ({ page }) => {
  await page.goto('http://localhost:5173/register');

  await page.getByRole('textbox', { name: 'Enter your firstname...' }).fill('mike');
  await page.getByRole('textbox', { name: 'Enter your lastname...' }).fill('heool');
  const emailInput = page.getByRole('textbox', { name: 'Enter your email...' });
  await emailInput.fill('test');
  await page.getByRole('textbox', { name: 'Enter your phone number...' }).fill('1111111111');
  await page.getByRole('textbox', { name: 'dd/mm/yyyy' }).fill('02/03/2007');
  await page.getByRole('textbox', { name: 'Create password...' }).fill('1111111111');
  await page.getByRole('textbox', { name: 'Confirm password...' }).fill('1111111111');
  await page.getByRole('button', { name: 'REGISTER' }).click();

  const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.checkValidity());
  expect(isValid).toBeFalsy();

  const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
  expect(validationMessage).toContain("@");
});

test('register fail by email is empty', async ({ page }) => {
  await page.goto('http://localhost:5173/register');
  await page.getByRole('textbox', { name: 'Enter your firstname...' }).click();
  await page.getByRole('textbox', { name: 'Enter your firstname...' }).fill('tester');
  await page.getByRole('textbox', { name: 'Enter your lastname...' }).click();
  await page.getByRole('textbox', { name: 'Enter your lastname...' }).fill('manage');
  await page.getByRole('textbox', { name: 'Enter your phone number...' }).click();
  await page.getByRole('textbox', { name: 'Enter your phone number...' }).fill('0987654321');
  await page.getByRole('textbox', { name: 'dd/mm/yyyy' }).click();
  await page.getByRole('textbox', { name: 'dd/mm/yyyy' }).fill('12/06/1995');
  await page.getByRole('textbox', { name: 'Create password...' }).click();
  await page.getByRole('textbox', { name: 'Create password...' }).fill('test');
  await page.getByRole('textbox', { name: 'Confirm password...' }).click();
  await page.getByRole('textbox', { name: 'Confirm password...' }).fill('test');
  await page.getByRole('button', { name: 'REGISTER' }).click();
  await expect(page.getByRole('paragraph')).toContainText('Firebase: Error (auth/missing-email).');
});

test('register fail by password', async ({ page }) => {
  await page.goto('http://localhost:5173/register');
  await page.getByRole('textbox', { name: 'Enter your firstname...' }).click();
  await page.getByRole('textbox', { name: 'Enter your firstname...' }).fill('tester');
  await page.getByRole('textbox', { name: 'Enter your lastname...' }).click();
  await page.getByRole('textbox', { name: 'Enter your lastname...' }).fill('manage');
  await page.getByRole('textbox', { name: 'Enter your email...' }).click();
  await page.getByRole('textbox', { name: 'Enter your email...' }).fill('testtung@email.com');
  await page.getByRole('textbox', { name: 'Enter your phone number...' }).click();
  await page.getByRole('textbox', { name: 'Enter your phone number...' }).fill('0987654321');
  await page.getByRole('textbox', { name: 'dd/mm/yyyy' }).click();
  await page.getByRole('textbox', { name: 'dd/mm/yyyy' }).fill('12/06/1995');
  await page.getByRole('textbox', { name: 'Create password...' }).click();
  await page.getByRole('textbox', { name: 'Create password...' }).fill('test');
  await page.getByRole('textbox', { name: 'Confirm password...' }).click();
  await page.getByRole('textbox', { name: 'Confirm password...' }).fill('test');
  await page.getByRole('button', { name: 'REGISTER' }).click();
  await expect(page.getByRole('paragraph')).toContainText('Firebase: Password should be at least 6 characters (auth/weak-password).');
});


