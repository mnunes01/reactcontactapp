import React from 'react'
import { NavLink } from 'react-router-dom'

export default class Header extends React.Component {
  render () {
    return (
      <div className='headerLinks'>
        <NavLink exact activeClassName='active' to={'/'} > Home</NavLink>
        <NavLink activeClassName='active' to={'/settings/'}> Settings</NavLink>
      </div>
    )
  }
}
