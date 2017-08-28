import React from 'react'
export default class SettingsController extends React.Component {
  constructor () {
    super()
    this.createDummyContatc = this.createDummyContact.bind(this)
    this.logCollection = this.logCollection.bind(this)
    this.clearCollection = this.clearCollection.bind(this)
  }
  createDummyContact () {
    console.log('dummy contact')
    this.props.storeContact(null, {
      firstName: 'Mario ' + Date.now(),
      lastName: 'Nunes',
      email: 'mnunes@fff.com',
      country: 'Portugal'
    })
    /*
    ContactsActions.createContact(
      {
        firstName: 'Mario',
        lastName: 'Nunes',
        email: 'mnunes@fff.com',
        country: 'Portugal'
      })
      */
  }
  logCollection () {
    console.log('log collection')
    //console.log(ContactsStore.getAll())
  }
  clearCollection () {
    console.log('clearCollection')
    //ContactsStore.removeData()
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
