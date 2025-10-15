import { test as setup, expect } from '@playwright/test'

setup('Login test', async ({ page }) => {
  await page.goto('/login')

  await page.getByLabel('Username').fill('admin')
  await page.getByLabel('Password').fill('casita05@')
  await page.getByRole('button', { name: 'Login' }).click()

  await expect(page).toHaveURL('/')
  await page.context().storageState({ path: './playwright/.auth/user.json' })
})
