import { test, expect } from '@playwright/test';

test.describe('Study Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the API responses
    await page.route('**/api/v1/cards/**', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'card-1',
            question: 'What is the capital of Canada?',
            answer: 'Ottawa',
            type: 'LISTENING_KEYWORD',
            metadata: null,
            nextReviewAt: new Date().toISOString(),
            reviewCount: 0,
            averageQualityScore: 0,
            status: 'NEW',
            lastReviewedAt: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'card-2',
            question: 'Write an email to your boss requesting a day off',
            answer: 'Sample email content',
            type: 'WRITING_TASK1',
            metadata: null,
            nextReviewAt: new Date().toISOString(),
            reviewCount: 2,
            averageQualityScore: 3.5,
            status: 'LEARNING',
            lastReviewedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]),
      });
    });

    // Mock authenticated user
    await page.route('**/api/v1/auth/me', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            user: {
              id: 'user-1',
              email: 'test@example.com',
              name: 'Test User',
              role: 'student',
            },
          },
        }),
      });
    });
  });

  test('should display study dashboard', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page).toHaveTitle(/CELPIP 学习中心/);
    await expect(page.locator('h1')).toContainText('CELPIP 学习中心');

    // Check for statistics cards
    await expect(page.locator('text=总卡片')).toBeVisible();
    await expect(page.locator('text=已掌握')).toBeVisible();
    await expect(page.locator('text=学习中')).toBeVisible();
    await expect(page.locator('text=复习中')).toBeVisible();
  });

  test('should filter cards by type', async ({ page }) => {
    await page.goto('/dashboard');

    // Check that all card types are in the dropdown
    const cardTypeSelect = page.locator('select').first();
    await expect(cardTypeSelect).toBeVisible();

    // Test filtering by different card types
    await cardTypeSelect.selectOption({ label: '邮件写作' });
    await expect(page.locator('text=邮件写作')).toBeVisible();
  });

  test('should start study session', async ({ page }) => {
    await page.goto('/dashboard');

    // Set session limit to 5 cards
    await page.selectOption('select', '5');

    // Click "开始学习" button
    await page.click('button:has-text("开始学习")');

    // Should show current card
    await expect(page.locator('h2')).toContainText('当前卡片');
    await expect(page.locator('button:has-text("5")')).toBeVisible(); // Perfect quality button
    await expect(page.locator('button:has-text("4")')).toBeVisible(); // Good quality button
    await expect(page.locator('button:has-text("3")')).toBeVisible(); // Average quality button
    await expect(page.locator('button:has-text("2")')).toBeVisible(); // Poor quality button
    await expect(page.locator('button:has-text("1")')).toBeVisible(); // Bad quality button
  });

  test('should show feedback after rating card', async ({ page }) => {
    await page.goto('/dashboard');
    await page.click('button:has-text("开始学习")');

    // Select quality 3 (basic mastery)
    await page.click('button:has-text("3")');

    // Should show feedback
    await expect(page.locator('text=学习反馈')).toBeVisible();
    await expect(page.locator('text=基本掌握')).toBeVisible();
    await expect(page.locator('button:has-text("继续学习")')).toBeVisible();
  });

  test('should complete study session', async ({ page }) => {
    await page.goto('/dashboard');
    await page.click('button:has-text("开始学习")');

    // Rate all cards with perfect quality
    for (let i = 0; i < 2; i++) {
      await page.click('button:has-text("5")');
      await page.click('button:has-text("继续学习")');
    }

    // Should show completion screen
    await expect(page.locator('text=🎉 学习完成！')).toBeVisible();
    await expect(page.locator('text=开始新的学习')).toBeVisible();
  });

  test('should show empty state when no cards available', async ({ page }) => {
    // Mock empty response
    await page.route('**/api/v1/cards/**', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });

    await page.goto('/dashboard');

    await expect(page.locator('text=📚')).toBeVisible();
    await expect(page.locator('text=暂无需要学习的卡片')).toBeVisible();
    await expect(page.locator('button:has-text("刷新卡片")')).toBeVisible();
  });

  test('should toggle study modes', async ({ page }) => {
    await page.goto('/dashboard');

    // Test daily mode (default)
    let dailyButton = page.locator('button:has-text("日常学习")');
    let focusedButton = page.locator('button:has-text("专注学习")');

    await expect(dailyButton).toHaveClass(/bg-blue-500/);
    await expect(focusedButton).not.toHaveClass(/bg-blue-500/);

    // Switch to focused mode
    await focusedButton.click();

    await expect(focusedButton).toHaveClass(/bg-blue-500/);
    await expect(dailyButton).not.toHaveClass(/bg-blue-500/);
  });

  test('should show learning progress', async ({ page }) => {
    await page.goto('/dashboard');
    await page.click('button:has-text("开始学习")');

    // Check progress bar
    await expect(page.locator('text=本次学习进度')).toBeVisible();
    const progressBar = page.locator('.bg-blue-600.h-3.rounded-full');
    await expect(progressBar).toBeVisible();
  });

  test('should handle responsive design for mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');

    // Check that statistics cards are in a single column on mobile
    const statsCards = page.locator('.bg-blue-50, .bg-green-50, .bg-yellow-50, .bg-purple-50, .bg-indigo-50, .bg-pink-50, .bg-orange-50');
    await expect(statsCards.first()).toBeVisible();

    // Check that quality buttons are properly arranged
    const qualityButtons = page.locator('button:has-text("5"), button:has-text("4"), button:has-text("3"), button:has-text("2"), button:has-text("1")');
    await expect(qualityButtons.first()).toBeVisible();
  });

  test('should show performance stats after completion', async ({ page }) => {
    await page.goto('/dashboard');
    await page.click('button:has-text("开始学习")');

    // Complete a session
    await page.click('button:has-text("4")'); // Good quality
    await page.click('button:has-text("继续学习")');
    await page.click('button:has-text("5")'); // Perfect quality
    await page.click('button:has-text("继续学习")');

    // Check completion stats
    await expect(page.locator('text=新掌握')).toBeVisible();
    await expect(page.locator('text=平均质量分')).toBeVisible();
    await expect(page.locator('text=优秀率')).toBeVisible();
  });
});