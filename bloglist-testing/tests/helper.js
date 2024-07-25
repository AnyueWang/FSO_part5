const login = async (page, { username, password }) => {
  await page.getByLabel('Username:').fill(username)
  await page.getByLabel('Password:').fill(password)

  await page.getByRole('button', { name: 'Login' }).click()
}

const addBlog = async (page, { title, author, url }) => {
  await page.getByRole('button', { name: 'New Blog' }).click()

  await page.getByLabel('Title:').fill(title)
  await page.getByLabel('Author:').fill(author)
  await page.getByLabel('Url:').fill(url)

  await page.getByRole('button', { name: 'Create' }).click()
  await page.getByText(`${title} - ${author}`).waitFor()
}

module.exports = {
  login,
  addBlog
}