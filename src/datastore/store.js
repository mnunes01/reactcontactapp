import LocalForage from 'localforage'
import { DB_NAME, DB_DESCRIPTION, DB_VERSION } from '../config/config.js'

export default class DataStore {
  contructor () {
    this.initConfig()
  }

  initConfig () {
    console.log('dbinit')
    LocalForage.config(
      {
        name: DB_NAME,
        version: DB_VERSION,
        description: DB_DESCRIPTION
      }
    )
  }

  getAllContacts (callback) {
    let collection = []
    LocalForage.iterate(function (value, key, iterationNumber) {
      // Resulting key/value pair -- this callback
      // will be executed for every item in the
      // database.
      // console.log([key, value], iterationNumber)
      collection.push({key, value})
    }).then(function (value) {
      // console.log('Iteration has completed', value)
      callback(collection)
    }).catch(function (err) {
    // This code runs if there were any errors
      console.log(err)
    })
  }

  getContact (key, callback) {
    LocalForage.getItem(key).then(function (value) {
      console.log('store getContact:', {key: key, value: value})
      callback(null, {key: key, value: value})
    }).catch(function (err) {
      callback(err)
    })
  }

  addContact (key, values, callback) {
    // Unlike localStorage, you can store non-strings.
    key = key === null || key === undefined ? key = Date.now().toString() : key
    LocalForage.setItem(key, values)
      .then(function (value) {
        // This will output `1`.
        callback(null, {key, value})
      })
      .catch(function (err) {
      // This code runs if there were any errors
        console.log('store error: ', err)
      })
  }

  removeContact (key, callback) {
    LocalForage.removeItem(key)
      .then(function () {
      // Run this code once the key has been removed.
        console.log('Key is cleared! ', key)
        callback()
      })
      .catch(function (err) {
      // This code runs if there were any errors
        console.log('store error: ', err)
        callback(err)
      })
  }
}
