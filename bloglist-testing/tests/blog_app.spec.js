const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({page}) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({page}) => {
    await expect(page.getByLabel('Username:')).toBeVisible()
    await expect(page.getByRole('button', {name: 'Login'})).toBeVisible()
  })
})
