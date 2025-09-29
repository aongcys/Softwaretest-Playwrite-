import { test, expect } from '@playwright/test';

test('all user can see an menu', async ({ page }) => {

  await page.goto('http://localhost:5173/');
  await page.getByRole('list').getByRole('link', { name: 'Menu' }).click();
  await page.getByRole('heading', { name: 'Menu' }).click();
  await expect(page.getByRole('complementary')).toContainText('All', { timeout: 20000 });

  await page.waitForTimeout(5000);
  await page.getByRole('link', { name: 'icon Meat' }).click();
  await expect(page.getByRole('complementary')).toContainText('Meat', { timeout: 20000 });
  await page.waitForTimeout(2000);
  await page.getByRole('link', { name: 'icon Fries' }).click();
  await expect(page.getByRole('complementary')).toContainText('Fries', { timeout: 20000 });
  await page.waitForTimeout(2000);
  await page.getByRole('link', { name: 'icon Seafood' }).click();
  await expect(page.getByRole('complementary')).toContainText('Seafood', { timeout: 20000 });
  await page.waitForTimeout(2000);
  await page.getByRole('link', { name: 'icon Fruit' }).click();
  await expect(page.getByRole('complementary')).toContainText('Fruit', { timeout: 20000 });
  await page.waitForTimeout(2000);
  await page.getByRole('link', { name: 'icon Dessert' }).click();
  await expect(page.getByRole('complementary')).toContainText('Dessert', { timeout: 20000 });
  await page.waitForTimeout(2000);
  await page.getByRole('link', { name: 'icon Drink' }).click();
  await expect(page.getByRole('complementary')).toContainText('Drink', { timeout: 20000 });

});




