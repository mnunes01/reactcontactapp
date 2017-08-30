/**
* Statelles Render View Component for the contact list
*/

import React from 'react'
import Chip from 'material-ui/Chip' // eslint-disable-line no-unused-vars
import Avatar from 'material-ui/Avatar' // eslint-disable-line no-unused-vars
import FaceIcon from 'material-ui-icons/Face' // eslint-disable-line no-unused-vars

export default class ViewContactList extends React.Component {
  render () {
    const {deleteAction, clickAction, firstName, id} = this.props
    return (
      <div className='row'>
        <Chip className='chip'
          avatar={
            <Avatar>
              <FaceIcon />
            </Avatar>
          }
          label={firstName}
          id={id}
          onClick={clickAction}
          onRequestDelete={deleteAction}
        />
      </div>
    )
  }
}
