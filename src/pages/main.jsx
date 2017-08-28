import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ContactListController from './contactslist/contactlist.jsx'
//import ContactDetailsController from './contactform/index.jsx'
import ContactForm from './contactform/contactform.jsx'
import SettingsController from './settings/settings.jsx'
import ErrorPage from './error/404.jsx'
import DataStore from '../datastore/store.js'
import _ from 'lodash'
import { withRouter } from 'react-router'

// import COUNTRY_LIST from src\utils\countrylist\countrylist.js



class Main extends React.Component {
  constructor () {
    super()

    this.dataStore = new DataStore()

    this.storeContact = this.addContact.bind(this)
    this.getContacts = this.getAllContacts.bind(this)
    this.getContact = this.getContact.bind(this)
    this.deleteAction = this.deleteContact.bind(this)
    this.handleRedirectAction = this.handleRedirect.bind(this)
    this.closeFormActionHandler = this.closeFormAction.bind()
    this.state = ({
      contactlist: [],
      contactToEdit: []
    })
  }

  componentDidMount () {
    this.getAllContacts()
    console.log('mounting')
  }

  componentWillUnmount () {
    console.log('unmounting')
  }

  componentWillReceiveProps (nextProps) {
    this.setState({contacts: nextProps.contactlist})
  }

  addContact (key, values) {
    console.log('adding')
    this.dataStore.addContact(key, values, (err, newData) => {
      if (err) {
        console.log(err)
      } else {
        this.setState({contactlist: [...this.state.contactlist, newData]})
      }
    })
  }

  getAllContacts () {
    console.log('get all contacts')
    this.dataStore.getAllContacts((data) => {
      this.setState({contactlist: data})
    })
  }
  getContact (key) {
    console.log('get contact')
    this.dataStore.getContact(key, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log('contact data: ', data)
        this.setState({contactToEdit: data})
        this.props.history.push('/details/edit/' + key)
      }
    })
  }
  deleteContact (key) {
    console.log('delete: ', key)
    this.dataStore.removeContact(key, (err = null) => {
      if (err) {
        console.log('error: ', err)
      } else {
        const arrayIndex = _.indexOf(this.state.contactlist, _.find(this.state.contactlist, {key: key}))
        console.log(arrayIndex)
        console.log('main delete', arrayIndex)
        this.setState({contactlist: [...this.state.contactlist.slice(0, arrayIndex), ...this.state.contactlist.slice(arrayIndex + 1)]})
      }
    })
  }

  handleRedirect (key) {
    // this.setState({contactToEdit: this.getContact(key)})
    this.getContact(key)
    //  this.props.history.push('/details/edit/' + key)
  }
  closeFormAction () {
    //this.setState({contactToEdit: []})
    this.props.history.push('/')
  }

  render () {
    return (
      <div className='main'>
        <Switch>
          <Route exact path='/' render={ () =>
            <ContactListController
              contacts={this.state.contactlist}
              deleteAction={this.deleteAction}
              editAction={this.handleRedirectAction}
            />
          } />
          <Route exact path='/details/:action/:id' render={ () =>
            <ContactForm
              contact={this.state.contactToEdit}
              closeAction={this.closeFormActionHandler}
            />
          } />
          <Route exact path='/settings/' render={ () =>
            <SettingsController
              storeContact={this.storeContact}
            />
          } />
          <Route path='/404' component={ErrorPage} />
          <Redirect to='/404' />
        </Switch>
      </div>
    )
  }
}
export default withRouter(Main)
