import LocalForage from 'localforage'
import { DB_NAME, DB_DESCRIPTION } from '../config/config.js'

export default class DataStore {
  contructor () {
    this.initConfig()
  }

  initConfig () {
    LocalForage.config(
      {
        name: DB_NAME,
        version: 1.0,
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

  getContact (key) {
    LocalForage.getItem('somekey').then(function (value) {
      console.log(value)
    }).catch(function (err) {
      console.log(err)
    })
  }

  addContact (key, values, callback) {
    // Unlike localStorage, you can store non-strings.
    key = key === null ? key = Date.now() : key
    LocalForage.setItem(key.toString(), values)
      .then(function (value) {
        // This will output `1`.
        console.log('added', value)
        callback()
      })
      .catch(function (err) {
      // This code runs if there were any errors
        console.log(err)
      })
  }

  removeContact (key, callback) {
    LocalForage.removeItem(key)
      .then(function () {
      // Run this code once the key has been removed.
        console.log('Key is cleared!')
        callback()
      })
      .catch(function (err) {
      // This code runs if there were any errors
        console.log(err)
      })
  }
}
