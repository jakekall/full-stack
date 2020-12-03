import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {

  it('renders title, author and likes', () => {
    const blog = {
      title: 'Test title',
      author: 'Tester',
      likes: 9
    }

    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} />)
    const titleAndAuthorDiv = simpleBlogComponent.find('.titleAndAuthor')
    const likesDiv = simpleBlogComponent.find('.likes')

    expect(titleAndAuthorDiv.text()).toBe(`${blog.title} ${blog.author}`)
    expect(likesDiv.text()).toContain(blog.likes)
  })

  it('clicking button twice calls handler twice', () => {
    const blog = {
      title: 'Test title',
      author: 'Tester',
      likes: 9
    }
    const mockHandler = jest.fn()

    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
    const button = simpleBlogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})