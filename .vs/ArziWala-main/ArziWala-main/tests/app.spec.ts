import { test, expect } from '@playwright/test';

test.describe('ArziWala App', () => {
  test('page loads without errors', async ({ page }) => {
    // Capture console errors
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Capture page errors
    const pageErrors: Error[] = [];
    page.on('pageerror', error => {
      pageErrors.push(error);
    });

    // Navigate to the app
    await page.goto('/');

    // Wait for the app to load
    await page.waitForLoadState('networkidle');

    // Check if main content is visible
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Check for ArziWala title
    const title = page.locator('text=ArziWala');
    await expect(title).toBeVisible();

    // Log any errors found
    if (consoleErrors.length > 0) {
      console.log('Console errors:', consoleErrors);
    }
    if (pageErrors.length > 0) {
      console.log('Page errors:', pageErrors.map(e => e.message));
    }

    // Assert no critical errors
    expect(consoleErrors).toHaveLength(0);
    expect(pageErrors).toHaveLength(0);
  });

  test('landing page renders correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check hero section
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toBeVisible();
    
    // Check "Start Writing Now" button
    const startButton = page.locator('text=Start Writing Now');
    await expect(startButton).toBeVisible();
    
    // Click and navigate to app
    await startButton.click();
    
    // Check form is visible
    const form = page.locator('main');
    await expect(form).toBeVisible();
  });

  test('form fields are interactive', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to app
    await page.click('text=Start Writing Now');
    
    // Fill basic form fields
    await page.fill('input[name="senderName"]', 'Test User');
    await page.fill('input[name="senderAddress"]', 'Test Address, Test City');
    await page.fill('input[name="city"]', 'Patna');
    await page.fill('input[name="phone"]', '9876543210');
    
    // Check values are set
    const nameInput = page.locator('input[name="senderName"]');
    await expect(nameInput).toHaveValue('Test User');
  });

  test('letter generation works', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to app
    await page.click('text=Start Writing Now');
    
    // Fill required fields
    await page.fill('input[name="senderName"]', 'Ramesh Kumar');
    await page.fill('input[name="senderAddress"]', 'Village Test, Post Office Test');
    await page.fill('input[name="city"]', 'Patna');
    
    // Click generate button
    const generateButton = page.locator('text=Generate Letter').first();
    await generateButton.click();
    
    // Wait for generation
    await page.waitForTimeout(2000);
    
    // Check if letter content appears
    const textarea = page.locator('textarea').first();
    await expect(textarea).not.toHaveValue('');
  });
});
