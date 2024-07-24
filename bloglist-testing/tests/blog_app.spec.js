const { test, expect, beforeEach, describe } = require('@playwright/test')
const helper = require('./helper')

describe('Blog app', () => {

  beforeEach(async ({ page, request }) => {
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

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByLabel('Username:')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await helper.login(page, { name: 'Anyue Wang', username: 'awang', password: 'password' })

      await expect(page.getByText('Anyue Wang logged in.')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await helper.login(page, { name: 'Anyue Wang', username: 'awang', password: 'wrong' })

      await expect(page.getByText('invalid username or password')).toBeVisible()
    })
  })

  describe('When log in', () => {
    beforeEach(async ({ page }) => {
      await helper.login(page, { name: 'Anyue Wang', username: 'awang', password: 'password' })
    })


    test('a new blog can be created', async ({ page }) => {
      await helper.addBlog(page, { title: 'A new blog', author: 'Someone famous', url: 'blog.com' })

      await expect(page.getByText(`A new blog - Someone famous`)).toBeVisible()
    })

    test('a new blog can be liked', async ({ page }) => {
      await helper.addBlog(page, { title: 'A new blog', author: 'Someone famous', url: 'blog.com' })

      await page.getByRole('button', { name: 'View' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText(`Likes: 1`)).toBeVisible()
    })
  })
})
