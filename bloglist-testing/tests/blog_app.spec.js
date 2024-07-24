const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({page, request}) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Anyue Wang',
        username: 'awang',
        password: 'password'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({page}) => {
    await expect(page.getByLabel('Username:')).toBeVisible()
    await expect(page.getByRole('button', {name: 'Login'})).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({page}) => {
      await page.getByLabel('Username:').fill('awang')
      await page.getByLabel('Password:').fill('password')

      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('Anyue Wang logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({page}) => {
      await page.getByLabel('Username:').fill('awang')
      await page.getByLabel('Password:').fill('wrong')

      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('invalid username or password')).toBeVisible()
    })
  })
})
