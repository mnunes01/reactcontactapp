import React from 'react'
import ReactDOM from 'react-dom'
import ContactListController from '../'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ContactListController />, div)
})
