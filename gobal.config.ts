import { chromium } from 'playwright';
import { existsSync } from 'fs';

async function globalSetup() {

  if (existsSync('state.json')) {
    return;
  }

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await browser.newPage();

  await page.goto('http://localhost:5173', {
    waitUntil: 'domcontentloaded',
  });

  await page.waitForURL('http://localhost:5173');

  await page.waitForLoadState('networkidle');

  await context.storageState({ path: 'state.json' });

  await browser.close();

}

export default globalSetup;

