import React from 'react'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import FaceIcon from 'material-ui-icons/Face'

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
          key={id}
          onClick={clickAction}
          onRequestDelete={() => deleteAction(id)}
        />
      </div>
    )
  }
}
