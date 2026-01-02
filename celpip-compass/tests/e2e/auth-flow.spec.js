import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/login');

    await expect(page).toHaveTitle(/CELPIP Compass/);
    await expect(page.locator('h1')).toContainText('登录');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button:has-text("登录")')).toBeVisible();
  });

  test('should navigate to register page', async ({ page }) => {
    await page.goto('/login');

    await page.click('text=还没有账号？立即注册');

    await expect(page).toHaveURL(/\/register$/);
    await expect(page.locator('h1')).toContainText('注册');
  });

  test.describe('Registration', () => {
    test('should successfully register a new user', async ({ page }) => {
      await page.goto('/register');

      await page.fill('input[name="email"]', 'test@example.com');
      await page.fill('input[name="name"]', 'Test User');
      await page.fill('input[name="password"]', 'password123');
      await page.fill('input[name="confirmPassword"]', 'password123');

      await page.click('button:has-text("注册")');

      // Should redirect to login or dashboard
      await expect(page).toHaveURL(/\/(login|dashboard)$/);
    });

    test('should show validation errors for invalid registration', async ({ page }) => {
      await page.goto('/register');

      // Try to register with invalid email
      await page.fill('input[name="email"]', 'invalid-email');
      await page.fill('input[name="name"]', 'Test User');
      await page.fill('input[name="password"]', '123');
      await page.fill('input[name="confirmPassword"]', '123');

      await page.click('button:has-text("注册")');

      await expect(page.locator('text=Invalid email format')).toBeVisible();
      await expect(page.locator('text=Password must be at least 6 characters')).toBeVisible();
    });

    test('should show password mismatch error', async ({ page }) => {
      await page.goto('/register');

      await page.fill('input[name="email"]', 'test@example.com');
      await page.fill('input[name="name"]', 'Test User');
      await page.fill('input[name="password"]', 'password123');
      await page.fill('input[name="confirmPassword"]', 'different123');

      await page.click('button:has-text("注册")');

      await expect(page.locator('text=Passwords do not match')).toBeVisible();
    });
  });

  test.describe('Login', () => {
    test('should show login validation errors', async ({ page }) => {
      await page.goto('/login');

      // Try to login with empty fields
      await page.click('button:has-text("登录")');

      await expect(page.locator('text=Email is required')).toBeVisible();
      await expect(page.locator('text=Password is required')).toBeVisible();
    });

    test('should show invalid credentials error', async ({ page }) => {
      await page.goto('/login');

      await page.fill('input[type="email"]', 'nonexistent@example.com');
      await page.fill('input[type="password"]', 'wrongpassword');

      await page.click('button:has-text("登录")');

      await expect(page.locator('text=Invalid credentials')).toBeVisible();
    });
  });

  test.describe('Navigation', () => {
    test('should navigate between login and register', async ({ page }) => {
      await page.goto('/login');

      // Go to register
      await page.click('text=还没有账号？立即注册');
      await expect(page).toHaveURL(/\/register$/);

      // Go back to login
      await page.click('text=已有账号？立即登录');
      await expect(page).toHaveURL(/\/login$/);
    });
  });

  test.describe('Responsive Design', () => {
    test('should display login form correctly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/login');

      // Check that form elements are properly sized and positioned
      const emailInput = page.locator('input[type="email"]');
      const passwordInput = page.locator('input[type="password"]');
      const submitButton = page.locator('button:has-text("登录")');

      await expect(emailInput).toBeVisible();
      await expect(passwordInput).toBeVisible();
      await expect(submitButton).toBeVisible();

      // Check that they are not overlapping
      const emailBox = await emailInput.boundingBox();
      const passwordBox = await passwordInput.boundingBox();
      const buttonBox = await submitButton.boundingBox();

      expect(emailBox.y).toBeLessThan(passwordBox.y);
      expect(passwordBox.y).toBeLessThan(buttonBox.y);
    });
  });
});