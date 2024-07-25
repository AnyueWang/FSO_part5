const { test, expect, beforeEach, describe } = require('@playwright/test')
const helper = require('./helper')
const { before } = require('node:test')

describe('Blog app', () => {
  const name = 'Anyue Wang'
  const username = 'awang'
  const password = 'password'

  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name,
        username,
        password,
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByLabel('Username:')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await helper.login(page, { name, username, password })

      await expect(page.getByText(`${name} logged in.`)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await helper.login(page, { name, username, password: 'wrong' })

      await expect(page.getByText('invalid username or password')).toBeVisible()
    })
  })

  describe('When log in', () => {
    beforeEach(async ({ page }) => {
      await helper.login(page, { name, username, password })
    })

    const title = 'A new blog'
    const author = 'Someone famous'
    const url = 'blog.com'

    test('a new blog can be created', async ({ page }) => {
      await helper.addBlog(page, { title, author, url })

      await expect(page.getByText(`${title} - ${author}`)).toBeVisible()
    })

    describe('and a new blog is created', () => {
      beforeEach(async ({ page }) => {
        await helper.addBlog(page, { title, author, url })
      })

      test('a new blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'View' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText(`Likes: 1`)).toBeVisible()
      })

      test('a blog can be deleted', async ({ page }) => {
        await page.getByRole('button', { name: 'View' }).click()
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'Remove' }).click()

        await expect(page.getByText(`You have deleted the blog "${title}".`)).toBeVisible()
      })
    })
  })
})
