/**
* Settings Controller
* Gives the user options to
* add a dummy contact to the collection
* log the entire collection on the console
* clear the whole database collection
* Used mainly for development and debug porpouses
*/

import React from 'react'
import { ActionCreateContact, ActionGetAllContacts, ActionClearCollection } from '../../actions/contactsactions.js'

export default class SettingsController extends React.Component {
  constructor () {
    super()
    this.createDummyContatc = this.createDummyContact.bind(this)
    this.logCollection = this.logCollection.bind(this)
    this.clearCollection = this.clearCollection.bind(this)
  }

  /**
  * Add a dummy entry on the database using ActionCreateContact with the content of the specified object
  * @method createDummyContact
  */
  createDummyContact () {
    ActionCreateContact(
      {
        firstName: 'Mario',
        lastName: 'Nunes',
        email: 'mnunes@fff.com',
        country: 'Portugal'
      }, () => { console.log('contact created') })
  }

  /**
  * logs the entire database collection on the console using the ActionGetAllContacts
  * @method logCollection
  */
  logCollection () {
    ActionGetAllContacts((err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log(data)
      }
    })
  }

  /**
  * Clear the entire database collection using the ActionClearCollection
  * @method clearCollection
  */
  clearCollection () {
    ActionClearCollection((err = null) => {
      if (err) {
        console.log(err)
      } else {
        console.log('collection cleared')
      }
    })
  }

  render () {
    return (
      <div className='settings'>
        <div>
          <label>
            Create Dummy Data: <button onClick={this.createDummyContatc}>New Contact</button>
          </label>
        </div>
        <div>
          <label>
            Console log stored collection: <button onClick={this.logCollection}>Log collection</button>
          </label>
        </div>
        <div>
          <label>
            Clear collection: <button onClick={this.clearCollection}>Clear collection</button>
          </label>
        </div>
      </div>
    )
  }
}
