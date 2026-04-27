import { test, expect } from '@playwright/test';

test.describe('Todo app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the page title', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Todo App — Next.js' }),
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
    // create a known todo first
    await page.getByPlaceholder('What needs doing?').fill(uniqueTitle);
    await page.getByTestId('add-todo-btn').click();

    // target the newly added todo
    const todoItem = page
      .getByRole('listitem')
      .filter({ hasText: uniqueTitle });

    await todoItem.getByRole('checkbox').click();

    await expect(todoItem.getByText(uniqueTitle)).toHaveCSS(
      'text-decoration-line',
      'line-through',
    );
  });

  test('should delete a todo', async ({ page }) => {
    // create a known todo first
    await page.getByPlaceholder('What needs doing?').fill('Todo to be deleted');
    await page.getByTestId('add-todo-btn').click();

    // target the newly added todo
    const todoItem = page
      .getByRole('listitem')
      .filter({ hasText: 'Todo to be deleted' });

    await todoItem.getByRole('button', { name: '×' }).click();

    await expect(page.getByText('Todo to be deleted')).not.toBeVisible();
  });

  test('should display stats', async ({ page }) => {
    const pendingCount = page.getByTestId('pending-count');
    const completedCount = page.getByTestId('completed-count');

    await expect(pendingCount).toBeVisible();
    await expect(completedCount).toBeVisible();
  });

  test('should increment stats when adding a new todo', async ({ page }) => {
    const uniqueTitle = `My E2E todo ${Date.now()}`;
    const pendingCount = page.getByTestId('pending-count');
    const totalCount = page.getByTestId('total-todos-count');

    const pendingCountBefore = parseInt(
      (await pendingCount.textContent())?.match(/\d+/)?.[0] || '0',
    );
    const totalCountBefore = parseInt(
      (await totalCount.textContent())?.match(/\d+/)?.[0] || '0',
    );

    await page.getByPlaceholder('What needs doing?').fill(uniqueTitle);
    await page.getByTestId('add-todo-btn').click();
    await expect(pendingCount).toHaveText(
      `Pending Todos: ${pendingCountBefore + 1}`,
    );
    await expect(totalCount).toHaveText(`Total Todos: ${totalCountBefore + 1}`);
  });
  // add this add two todos, complete one, click Completed tab, assert only the completed one is visible

  test('should update stats when toggling a todo', async ({ page }) => {
    const uniqueTitle = `Todo to toggle stats ${Date.now()}`;
    const pendingCount = page.getByTestId('pending-count');
    const completedCount = page.getByTestId('completed-count');

    const pendingCountBefore = parseInt(
      (await pendingCount.textContent())?.match(/\d+/)?.[0] || '0',
    );
    const completedCountBefore = parseInt(
      (await completedCount.textContent())?.match(/\d+/)?.[0] || '0',
    );

    // create a known todo first
    await page.getByPlaceholder('What needs doing?').fill(uniqueTitle);
    await page.getByTestId('add-todo-btn').click();

    // target the newly added todo
    const todoItem = page
      .getByRole('listitem')
      .filter({ hasText: uniqueTitle });

    await todoItem.getByRole('checkbox').click();
    await expect(pendingCount).toHaveText(
      `Pending Todos: ${pendingCountBefore}`,
    );
    await expect(completedCount).toHaveText(
      `Completed Todos: ${completedCountBefore + 1}`,
    );
  });

  test('should filter todos', async ({ page }) => {
    const uniqueTitle = `Todo to filter ${Date.now()}`;
    // create a known todo first
    await page.getByPlaceholder('What needs doing?').fill(uniqueTitle);
    await page.getByTestId('add-todo-btn').click();

    // filter by completed (should not show the new todo)
    await page.getByRole('button', { name: 'Completed' }).click();
    await expect(page.getByText(uniqueTitle)).not.toBeVisible();

    // filter by pending (should show the new todo)
    await page.getByRole('button', { name: 'Pending' }).click();
    await expect(page.getByText(uniqueTitle)).toBeVisible();
  });

  test('should add two todos, complete one, click Completed tab, assert only the completed one is visible', async ({
    page,
  }) => {
    const uniqueTitle1 = `First todo ${Date.now()}`;
    const uniqueTitle2 = `Second todo ${Date.now()}`;

    // create two known todos
    await page.getByPlaceholder('What needs doing?').fill(uniqueTitle1);
    await page.getByTestId('add-todo-btn').click();
    await page.getByPlaceholder('What needs doing?').fill(uniqueTitle2);
    await page.getByTestId('add-todo-btn').click();

    // complete the first todo
    const firstTodoItem = page
      .getByRole('listitem')
      .filter({ hasText: uniqueTitle1 });
    await firstTodoItem.getByRole('checkbox').click();

    // filter by completed (should show only the first todo)
    await page.getByRole('button', { name: 'Completed' }).click();
    await expect(page.getByText(uniqueTitle1)).toBeVisible();
    await expect(page.getByText(uniqueTitle2)).not.toBeVisible();

    // filter by pending (should show only the second todo)
    await page.getByRole('button', { name: 'Pending' }).click();
    await expect(page.getByText(uniqueTitle1)).not.toBeVisible();
    await expect(page.getByText(uniqueTitle2)).toBeVisible();
  });
});
