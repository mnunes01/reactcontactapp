/**
* Abstraction layer for localforage npm library
* more info on localforage: https://www.npmjs.com/package/localforage
*/

import LocalForage from 'localforage'
import dispatcher from '../dispatcher'
import { DB_NAME, DB_DESCRIPTION, DB_VERSION } from '../config/config.js'

class ContactsStore {
  constructor () {
    LocalForage.config(
      {
        name: DB_NAME,
        version: DB_VERSION,
        description: DB_DESCRIPTION
      }
    )
  }

  /**
  * Retrieves the entire collection of contacts from database
  * executes the provided callback, returning the collection or error on fail
  * @method getAllContacts
  * @param {requestCallback} callback - The callback that handles the response.
  */
  getAllContacts (callback) {
    let collection = []
    LocalForage.iterate(function (value, key, iterationNumber) {
      collection.push({key, value})
    }).then(function (value) {
      callback(null, collection)
    }).catch(function (err) {
      callback(err)
    })
  }

  /**
  * Retrieves one registry of collection of contacts from database by key
  * executes the provided callback, returning the key and value or error on fail
  * @method getContact
  * @param {string} key - The registry key to retrieve
  * @param {requestCallback} callback - The callback that handles the response.
  */
  getContact (key, callback) {
    LocalForage.getItem(key).then(function (value) {
      callback(null, key, value)
    }).catch(function (err) {
      callback(err)
    })
  }

  /**
  * Save new contact or update a existing one if values.key is not null
  * executes the provided callback, returning a object with key and values or error on fail
  * @method addContact
  * @param {string} key - null or string, as if its a new registry creation or a update to a existing one
  * @param {object} values - object containing contact details
  * @param {requestCallback} callback - The callback that handles the response.
  */
  addContact (key, values, callback) {
    key = key === null || key === undefined ? key = Date.now().toString() : key
    LocalForage.setItem(key, values)
      .then(function (value) {
        callback(null, {key, value})
      })
      .catch(function (err) {
        callback(err)
      })
  }

  /**
  * Removes one registry of collection of contacts from database by key
  * executes the provided callback, returns err on exection fail
  * @method removeContact
  * @param {string} key - The registry key to retrieve
  * @param {requestCallback} callback - The callback that handles the response.
  */
  removeContact (key, callback) {
    LocalForage.removeItem(key)
      .then(function () {
        callback()
      })
      .catch(function (err) {
        callback(err)
      })
  }

  /**
  * Clears the entire collection from the database (DROP)
  * executes the provided callback, returns err on exection fail
  * @method clearCollection
  * @param {requestCallback} callback - The callback that handles the response.
  */
  clearCollection (callback) {
    LocalForage.clear().then(function () {
      callback()
    }).catch(function (err) {
      callback(err)
    })
  }

  /**
  * action handler routing
  */
  handleActions (action) {
    switch (action.type) {
      case 'CREATE_CONTACT': // used directly only for test porpouse, todo: remove action, createcontac mode is private to this class. Is being used directly by settings to creat dummy contacts data.
      {
        this.addContact(null, action.values, action.callback)
        break
      }
      case 'DELETE_CONTACT': // deletes contact
      {
        this.removeContact(action.key, action.callback)
        break
      }
      case 'SAVE_CONTACT': // create new or updates a existing contact
      {
        this.addContact(action.key, action.values, action.callback)
        break
      }
      case 'GET_CONTACT': // create new or updates a existing contact
      {
        this.getContact(action.key, action.callback)
        break
      }
      case 'GET_ALL_CONTACTS': // gets all the contacts
      {
        this.getAllContacts(action.callback)
        break
      }
      case 'CLEAR_COLLECTION': // clears the entire collection
      {
        this.clearCollection(action.callback)
        break
      }
      default:
      {
        break
      }
    }
  }
}
const contactStore = new ContactsStore()
dispatcher.register(contactStore.handleActions.bind(contactStore))
export default contactStore
