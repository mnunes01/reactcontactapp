import React from 'react'
import ViewContactList from './contactlistview.jsx'

export default class ContactListController extends React.Component {
  render () {
    const ContactComponents = this.props.contacts.map((contact) => {
      let {key, firstName} = contact
      console.log(contact)
      return (
        <ViewContactList
          key={key}
          id={key}
          firstName={firstName}
          deleteAction={() => this.props.deleteAction(key)}
          clickAction={() => this.handleRedirectAction(key)}
        />
      )
    })
    return (
      <div>
        {Object.keys(this.props.contacts).length ? ContactComponents : <span>You dont have contacts</span>}
      </div>
    )
  }
}
