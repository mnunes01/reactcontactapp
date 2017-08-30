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
import * as Labels from './config/labels.js'
export default class SettingsController extends React.Component {
  constructor () {
    super()
    console.log(Labels)
    this.createDummyContatc = this.createDummyContact.bind(this)
    this.logCollection = this.logCollection.bind(this)
    this.clearCollection = this.clearCollection.bind(this)
    this.state = {
      outputMSG: ''
    }
  }

  /**
  * Add a dummy entry on the database using ActionCreateContact with the content of the specified object
  * @method createDummyContact
  */
  createDummyContact () {
    this.setState({ outputMSG: Labels._STATUS_MSG_INCOURSE_ })
    ActionCreateContact(
      {
        firstName: 'Mario',
        lastName: 'Nunes',
        email: 'mnunes@fff.com',
        country: 'Portugal'
      }, (err) => {
        if (err) {
          this.setState({ outputMSG: Labels._STATUS_MSG_ERR_ })
        } else {
          this.setState({ outputMSG: Labels._STATUS_MSG_CONTACT_CREATED_ })
        }
      })
  }

  /**
  * logs the entire database collection on the console using the ActionGetAllContacts
  * @method logCollection
  */
  logCollection () {
    this.setState({ outputMSG: Labels._STATUS_MSG_INCOURSE_ })
    ActionGetAllContacts((err, data) => {
      if (err) {
        console.log(err)
        this.setState({ outputMSG: Labels._STATUS_MSG_ERR_ })
      } else {
        this.setState({ outputMSG: Labels._STATUS_MSG_COLLECTION_LOGGED_ })
        console.log(data)
      }
    })
  }

  /**
  * Clear the entire database collection using the ActionClearCollection
  * @method clearCollection
  */
  clearCollection () {
    this.setState({ outputMSG: Labels._STATUS_MSG_INCOURSE_ })
    ActionClearCollection((err = null) => {
      if (err) {
        this.setState({ outputMSG: Labels._STATUS_MSG_ERR_ })
      } else {
        this.setState({ outputMSG: Labels._STATUS_MSG_COLLECTION_CLEARED_ })
      }
    })
  }

  render () {
    return (
      <div className='settings'>
        <div className='info'>
          <small>{this.state.outputMSG}</small>
        </div>
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
