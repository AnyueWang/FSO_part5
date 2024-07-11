import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'
import NewBlogForm from '../src/components/NewBlogForm'

describe('<Blog />', () => {
  let blog, user
  beforeEach(() => {
    blog = {
      title: 'Testing blog',
      author: 'Me, Myself, and I',
      url: 'abc.com',
      likes: 982
    }
    user = userEvent.setup()
  })

  test('render blog list', () => {
    const container = render(<Blog blog={blog} />).container
    const element = container.querySelector('.blog')
    expect(element).toHaveTextContent('Testing blog')
  })

  test('click "view" button to see details of blog', async () => {
    const container = render(<Blog blog={blog} />).container
    const element = container.querySelector('.blog')
    const button = screen.getByText('View')
    await user.click(button)

    expect(element).toHaveTextContent('Url: abc.com')
    expect(element).toHaveTextContent('Likes: 982')
  })

  test('click "like" button twice', async () => {
    const mockAddLike = vi.fn()
    render(<Blog blog={blog} addLike={mockAddLike} />).container
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockAddLike.mock.calls).toHaveLength(2)
  })
})

describe('<NewBlogForm />', () => {
  test('create a new blog', async () => {
    const mockCreateBlog = vi.fn()
    const user = userEvent.setup()
    const { container } = render(<NewBlogForm createBlog={mockCreateBlog} />)
    const inputTitle = container.querySelector('#title')
    const inputAuthor = container.querySelector('#author')
    const inputUrl = container.querySelector('#url')
    const button = screen.getByText('Create')

    await user.type(inputTitle, 'A blog title')
    await user.type(inputAuthor, 'Meeee')
    await user.type(inputUrl, 'abc.com')
    await user.click(button)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0].title).toBe('A blog title')
  })
})