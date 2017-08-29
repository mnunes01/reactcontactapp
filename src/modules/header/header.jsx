/**
* header view
* enables navigation across the app
*/

import React from 'react'
import { NavLink } from 'react-router-dom' // eslint-disable-line no-unused-vars

export default class Header extends React.Component {
  render () {
    return (
      <div className='headerLinks'>
        <NavLink exact activeClassName='active' to={'/'} > Home</NavLink>
        <NavLink activeClassName='active' to={'/newcontact/new'}> Add Contact</NavLink>
        <NavLink activeClassName='active' to={'/settings/'}> Settings</NavLink>
      </div>
    )
  }
}
