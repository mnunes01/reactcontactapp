/**
* Main Router
* Switchs the views and loads componets based on the url path
*/
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom' // eslint-disable-line no-unused-vars
import ContactListController from '../modules/contactslist/index.jsx'
import ContactDetailsController from '../modules/contactform/index.jsx'
import SettingsController from '../modules/settings/settings.jsx'
import ErrorPage from '../modules/error/404.jsx'

export default class Main extends React.Component {
  render () {
    return (
      <div className='main'>
        <Switch>
          <Route exact path='/' component={ContactListController} />
          <Route exact path='/details/:action/:key' component={ContactDetailsController} />
          <Route path='/newcontact/:action' component={ContactDetailsController} />
          <Route exact path='/settings/' component={SettingsController} />
          <Route path='/404' component={ErrorPage} />
          <Redirect to='/404' />
        </Switch>
      </div>
    )
  }
}
