import { test, expect } from '@playwright/test';

test.describe('Todo app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the page title', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Todo App — Remix' }),
    ).toBeVisible();
  });

  test('should add a new todo', async ({ page }) => {
    const uniqueTitle = `My E2E todo ${Date.now()}`;
    await page.getByPlaceholder('What needs doing?').fill(uniqueTitle);
    await page.getByTestId('add-todo-btn').click();

    await expect(page.getByText(uniqueTitle)).toBeVisible();
  });

  test('should toggle a todo', async ({ page }) => {
    const uniqueTitle = `Todo to toggle ${Date.now()}`;

    await page.getByPlaceholder('What needs doing?').fill(uniqueTitle);
    await page.getByTestId('add-todo-btn').click();

    await expect(page.getByText(uniqueTitle)).toBeVisible();

    const todoItem = page
      .getByRole('listitem')
      .filter({ hasText: uniqueTitle });

    await todoItem.getByRole('checkbox').click();
  });

  test('should delete a todo', async ({ page }) => {
    const uniqueTitle = `Todo to be deleted ${Date.now()}`;

    await page.getByPlaceholder('What needs doing?').fill(uniqueTitle);
    await page.getByTestId('add-todo-btn').click();

    const todoItem = page
      .getByRole('listitem')
      .filter({ hasText: uniqueTitle });

    await todoItem.getByRole('button', { name: '×' }).click();

    await expect(page.getByText(uniqueTitle)).not.toBeVisible();
  });
});
