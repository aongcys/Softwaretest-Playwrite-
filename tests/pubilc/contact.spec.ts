import { test, expect } from '@playwright/test';

test('Contact us fail by null massage', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Enter your email...' }).click();
  await page.getByRole('textbox', { name: 'Enter your email...' }).fill('testing@gmail.com');
  await page.getByRole('button', { name: 'SUBMIT' }).click();

  const messageInput = page.getByRole('textbox', { name: 'Write your message...' });
  const validationMessage = await messageInput.evaluate((el: HTMLInputElement) => el.validationMessage);
  expect(validationMessage).toBe('Please fill out this field.');

});

test('Contact us fail by null email', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Write your message...' }).click();
  await page.getByRole('textbox', { name: 'Write your message...' }).fill('hello');
  await page.getByRole('button', { name: 'SUBMIT' }).click();

  const messageInput = page.getByRole('textbox', { name: 'Enter your email...' });
  const validationMessage = await messageInput.evaluate((el: HTMLInputElement) => el.validationMessage);
  expect(validationMessage).toBe('Please fill out this field.');

});

