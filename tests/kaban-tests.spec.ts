import { test, expect } from '@playwright/test'

test('Create a board', async ({ page }) => {
  const columnsToAdd = ['Todo', 'Doing', 'Done']
  await page.goto('/')
  await page.waitForLoadState('load')
  await page.getByRole('button', { name: 'Create New Board' }).click()

  await page.waitForSelector('section[role="dialog"]')
  await page.getByLabel('Board Name').fill('My First Board')

  for (let i = 0; i <= columnsToAdd.length - 1; i++) {
    if (i + 1 > 2) {
      await page.getByRole('button', { name: 'Add New Column' }).click()
    }

    await page.getByPlaceholder('e.g. Todo').nth(i).fill(columnsToAdd[i])
  }
  await page.getByRole('button', { name: 'Add new Board' }).click()

  await page.waitForSelector('[role="status"]', { state: 'visible' })
  await expect(page.getByRole('status')).toHaveText(
    /board created successfully/i
  )
})

test('Delete a board', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  const links = page.locator('aside ul a')
  for (let i = 0; i < (await links.count()); i++) {
    const current = links.nth(i)
    if ((await current.innerText()) !== 'Test board') {
      await current.click()
      break
    }
  }
  await page.waitForURL(/.*\/board\/.*/)
  await page.waitForLoadState('domcontentloaded')
  await page.locator('header label').last().click()
  await page.getByText('Delete board').click()
  await page.waitForSelector('section[role="dialog"]', { state: 'visible' })
  await page.getByRole('button', { name: 'Delete' }).click()
  await page.waitForSelector('[role="status"]', { state: 'visible' })
  await expect(page.getByRole('status')).toHaveText(
    /board deleted successfully/i
  )
  await expect(page).toHaveURL(/.*\/$/)
})

test('Add new task', async ({ page }) => {
  const task = {
    title: 'My first task',
    description:
      "This is a description for the tasks, let's see if it works, ok?",
    subtasks: ['Subtask 1', 'Subtask 2', 'Subtask 3', 'Subtask 4', 'Subtask 5'],
  }
  await page.goto('/')
  await page.waitForLoadState('load')

  await page.getByRole('link', { name: 'Test board' }).click()

  await page.waitForURL(/.*\/board\/.*/)
  await page.getByRole('button', { name: 'Add New Task' }).click()
  await page.waitForSelector('section[role="dialog"]')

  await page.getByLabel('Title').fill(task.title)
  await page.getByLabel('Description').fill(task.description)

  for (let i = 0; i <= task.subtasks.length - 1; i++) {
    if (i + 1 > 2) {
      await page.getByRole('button', { name: 'Add New Subtask' }).click()
    }

    await page
      .getByPlaceholder('e.g. Make coffee')
      .nth(i)
      .fill(task.subtasks[i])
  }

  await page.getByRole('button', { name: 'Add new Task' }).nth(1).click()

  await page.waitForSelector('[role="status"]', { state: 'visible' })
  await expect(page.getByRole('status')).toHaveText(/task added successfully/i)
})

test('Delete task', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('load')
  await page.getByRole('link', { name: 'Test board' }).click()
  await page.waitForURL(/.*\/board\/.*/)

  await page.locator('main ul li').first().click()
  await page.waitForSelector('section[role="dialog"]', { state: 'visible' })

  await page.locator('section[role="dialog"] header label').click()
  await page.getByText('Delete task').click()
  await page.getByRole('button', { name: 'Delete' }).click()
  await page.waitForSelector('[role="status"]', { state: 'visible' })
  await expect(page.getByRole('status')).toHaveText(
    /task deleted successfully/i
  )
})
