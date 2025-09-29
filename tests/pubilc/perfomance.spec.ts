import { test, expect } from '@playwright/test';

test('performance - page load under 2s', async ({ page }) => {
  const start = Date.now();
  await page.goto('http://localhost:5173/register');
  const loadTime = Date.now() - start;
  expect(loadTime).toBeLessThan(2000);
});

test('performance - form fill under 1s', async ({ page }) => {
  await page.goto('http://localhost:5173/register');
  const start = Date.now();

  await page.getByRole('textbox', { name: 'Enter your firstname...' }).fill('fast');
  await page.getByRole('textbox', { name: 'Enter your lastname...' }).fill('tester');
  await page.getByRole('textbox', { name: 'Enter your email...' }).fill(`perf_${Date.now()}@test.com`);
  await page.getByRole('textbox', { name: 'Enter your phone number...' }).fill('0123456789');

  const elapsed = Date.now() - start;
  expect(elapsed).toBeLessThan(1000);
});

test('performance - first meaningful paint element visible fast', async ({ page }) => {
  const start = Date.now();
  await page.goto('http://localhost:5173/register');
  await page.getByRole('heading', { name: 'Register' }).waitFor();
  const elapsed = Date.now() - start;

  expect(elapsed).toBeLessThan(1000);
});

test('performance - multiple registrations stress test', async ({ page }) => {
  await page.goto('http://localhost:5173/register');

  for (let i = 0; i < 5; i++) {
    const randomEmail = `stress_${Date.now()}_${i}@test.com`;

    await page.getByRole('textbox', { name: 'Enter your firstname...' }).fill('stress');
    await page.getByRole('textbox', { name: 'Enter your lastname...' }).fill('tester');
    await page.getByRole('textbox', { name: 'Enter your email...' }).fill(randomEmail);
    await page.getByRole('textbox', { name: 'Enter your phone number...' }).fill('0123456789');
    await page.getByRole('textbox', { name: 'dd/mm/yyyy' }).fill('01/01/2000');
    await page.getByRole('textbox', { name: 'Create password...' }).fill('12345678');
    await page.getByRole('textbox', { name: 'Confirm password...' }).fill('12345678');

    const start = Date.now();
    await page.getByRole('button', { name: 'REGISTER' }).click();
    await page.waitForURL('http://localhost:5173/login');
    const elapsed = Date.now() - start;
    console.log(`รอบที่ ${i + 1} เสร็จใน ${elapsed}ms`);

    expect(elapsed).toBeLessThan(7000);
    await page.goto('http://localhost:5173/register');
  }
});

test('performance - menu navigation under 7s', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  const start = Date.now();
  await page.getByRole('list').getByRole('link', { name: 'Menu' }).click();
  await expect(page.getByRole('heading', { name: 'Menu' })).toBeVisible();
  const categories = ['Meat', 'Fries', 'Seafood', 'Fruit', 'Dessert', 'Drink'];
  for (const cat of categories) {
    await page.getByRole('link', { name: `icon ${cat}` }).click();
    await expect(page.getByRole('complementary')).toContainText(cat, { timeout: 20000 });
  }
  const elapsed = Date.now() - start;

  expect(elapsed).toBeLessThan(7000);
});
