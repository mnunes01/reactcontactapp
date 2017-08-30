/**
* Collection of methods that dispatch actions to the data store
*/

/* imports dispatcher */
import dispatcher from '../dispatcher'

/**
* Create a new contact
* @method ActionCreateContact
* @param {object} values - object containing contact details
* @param {requestCallback} callback - The callback that handles the response.
*/
export function ActionCreateContact (values, callback) {
  dispatcher.dispatch({
    type: 'CREATE_CONTACT',
    callback: callback,
    values: {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      country: values.country
    }
  })
}

/**
* Delete a contact
* @method ActionDeleteContact
* @param {int} key - database key to delete
* @param {requestCallback} callback - The callback that handles the response.
*/
export function ActionDeleteContact (key, callback) {
  dispatcher.dispatch({
    type: 'DELETE_CONTACT',
    callback: callback,
    key
  })
}

/**
* Save new contact or update a existing one if values.key is not null
* @method ActionSaveContact
* @param {object} values - object containing contact details
* @param {requestCallback} callback - The callback that handles the response.
*/
export function ActionSaveContact (values, callback) {
  dispatcher.dispatch({
    type: 'SAVE_CONTACT',
    callback: callback,
    key: values.key,
    values: {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      country: values.country
    }
  })
}

/**
* Retrieves a contact by key from database
* @method ActionGetContact
* @param {int} key - database key to retrieve
* @param {requestCallback} callback - The callback that handles the response.
*/
export function ActionGetContact (key, callback) {
  dispatcher.dispatch({
    type: 'GET_CONTACT',
    callback: callback,
    key
  })
}

/**
* Retrieves the entire collection of contacts from database
* @method ActionGetAllContacts
* @param {requestCallback} callback - The callback that handles the response.
*/
export function ActionGetAllContacts (callback) {
  dispatcher.dispatch({
    type: 'GET_ALL_CONTACTS',
    callback: callback
  })
}

/**
* Clear the entire collection of contacts from database
* @method ActionClearCollection
* @param {requestCallback} callback - The callback that handles the response.
*/
export function ActionClearCollection (callback) {
  dispatcher.dispatch({
    type: 'CLEAR_COLLECTION',
    callback: callback
  })
}
