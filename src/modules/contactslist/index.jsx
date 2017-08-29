/**
* Controller container that handles the logic and feeds data into the contact list view
* Retrieves the contact list form database
* uses google material ui chip to display firstName
* enables the user to delete the contact clicking on the cross
* enables the user to edit / view the contact clicking on the name
*/

import React from 'react'
import _ from 'lodash'
import { ActionGetAllContacts, ActionDeleteContact } from '../../actions/contactsactions.js'
import ViewContactList from './components/contactlist_view.jsx' // eslint-disable-line no-unused-vars
import * as Labels from './config/labels.js'

export default class ContactListController extends React.Component {
  constructor () {
    super()
    this.state = {
      contacts: [],
      outputMessage: ''
    }
    this.handleRedirectAction = this.handleRedirect.bind(this)
    this.deleteAction = this.deleteContact.bind(this)
  }
  /**
  * Retrieve contacts collection using ActionGetAllContacts from database
  * if the database is empty displays a no contacts message defined as on the labels
  * componentDidMount is a method inerithed from React.Component
  * @method componentDidMount
  */
  componentDidMount () {
    this.setState({outputMessage: Labels._LOADING_})
    ActionGetAllContacts((err, data) => {
      if (err) {
        console.log(err)
      } else {
        if (data.length === 0) {
          this.setState({outputMessage: Labels._NO_CONTACTS_})
        } else {
          this.setState({contacts: data, outputMessage: Labels._LOADED_})
        }
      }
    })
  }

  /**
  * Deletes a specified entry on the database
  * on callback sucess remove the deleted entry on the component state collection
  * on failure outputs a error message on the console
  * @method deleteContact
  * @param {string} key - the correspondent key on the database of the entry to delete
  */
  deleteContact (key) {
    ActionDeleteContact(key, (err = null) => {
      if (err) {
        console.log('error: ', err)
      } else {
        const arrayIndex = _.indexOf(this.state.contacts, _.find(this.state.contacts, {key: key}))
        this.setState({
          contacts: [...this.state.contacts.slice(0, arrayIndex), ...this.state.contacts.slice(arrayIndex + 1)]
        })
        if (this.state.contacts.length === 0) {
          this.setState({outputMessage: Labels._NO_CONTACTS_})
        }
      }
    })
  }

  /**
  * handles the click action to edit / view the contact loading the contact controller and subsequent view
  * @method handleRedirect
  * @param {string} key - the correspondent key on the database of the entry to view / edit
  */
  handleRedirect (key) {
    this.props.history.push('/details/edit/' + key)
  }

  render () {
    const ContactComponents = this.state.contacts.map((contact) => {
      let key = contact.key
      let firstName = contact.value.firstName
      return (
        <ViewContactList
          key={key}
          firstName={firstName}
          deleteAction={() => this.deleteAction(key)}
          clickAction={() => this.handleRedirectAction(key)}
        />
      )
    })
    return (
      <div className='list'>
        {Object.keys(this.state.contacts).length ? ContactComponents : <span>{this.state.outputMessage}</span>}
      </div>
    )
  }
}
