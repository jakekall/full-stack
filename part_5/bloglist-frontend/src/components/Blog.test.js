import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
  it('at first only name and author are displayed', () => {
    const blog = {
      title: 'Test title',
      author: 'Tester'
    }

    const blogComponent = shallow(<Blog blog={blog} update={jest.fn()} remove={jest.fn()} username={''} />)
    const basicsDiv = blogComponent.find('.basics')
    expect(basicsDiv.text()).toBe(`${blog.title} by ${blog.author}`)
  })

  it('after clicking name the details are displayed', () => {
    const blog = {
      title: 'Test title',
      author: 'Tester',
      likes: 15,
      url: 'testsite',
      user: {name: 'Tester'}
    }

    const blogComponent = shallow(<Blog blog={blog} update={jest.fn()} remove={jest.fn()} username={''} />)
    const titleSpan = blogComponent.find('.title')
    titleSpan.simulate('click')

    const detailsDiv = blogComponent.find('.details')
    expect(detailsDiv.text()).toBe(`${blog.url}${blog.likes} likeadded by ${blog.user.name}`)
  })
})