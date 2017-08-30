import React from 'react'
import ReactDOM from 'react-dom'
import ContactDetailsController from '../index.jsx'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const test = { params: { action: 'new' } }
  ReactDOM.render(<ContactDetailsController match={test} />, div)
})
