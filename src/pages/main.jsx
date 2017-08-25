import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ContactListController from './contactslist/contactlist.jsx'
import SettingsController from './settings/settings.jsx'
import ErrorPage from './error/404.jsx'
import DataStore from '../datastore/store.js'

export default class Main extends React.Component {
  constructor () {
    super()
    this.dataStore = new DataStore()
    this.storeContact = this.addContact.bind(this)
    this.getContacts = this.getAllContacts.bind(this)
    this.handleRedirectAction = this.handleRedirect.bind(this)
    this.deleteAction = this.deleteContact.bind(this)
    this.state = ({
      contactlist : []
    })
  }

  componentDidMount () {
    // bind the event listener on component mount
    //this.dataStore.on('change', this.getContacts)
    this.getAllContacts()
    console.log('mounting')
  }
  componentWillUnmount () {
    // unbind listeners to prevent memory leaks
    //this.dataStore.removeListener('change', this.getContacts)
    console.log('unmounting')
  }
  componentWillReceiveProps (nextProps) {
    this.setState({contacts: nextProps.contactlist})
  }

  addContact (key, values) {
    console.log('adding')
    this.dataStore.addContact(key, values, () => {
      this.getAllContacts() //  not sure about this
    })
  }
  getAllContacts () {
    console.log('get all contacts')
    this.dataStore.getAllContacts((data) => {
      this.setState({contactlist: data})
    })
  }
  deleteContact (key) {
    console.log('delete: ', key)
    this.dataStore.removeContact(key, () => {
      this.getAllContacts() //  not sure about this
    })
  }
  handleRedirect (id) {
    this.props.history.push('/details/edit/' + id)
  }

  render () {
    return (
      <div className='main'>
        <Switch>
          <Route exact path='/' render={ () => <ContactListController contacts={this.state.contactlist} deleteAction={this.deleteAction} /> } />
          <Route exact path='/settings/' render={ () => <SettingsController storeContact={this.storeContact} /> } />
          <Route path='/404' component={ErrorPage} />
          <Redirect to='/404' />
        </Switch>
      </div>
    )
  }
}
