import React from 'react' // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'
import SettingsController from '../settings.jsx' // eslint-disable-line no-unused-vars

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SettingsController />, div)
})
