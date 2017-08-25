import React from 'react'

export default class Footer extends React.Component {
  render () {
    return (
      <div className='footer'>
        <small>Running application in <b>{process.env.NODE_ENV}</b> mode. <br />@Mario Nunes 08/2017 Hello:<a href='mailto:mnunes01@hotmail.com' rel='noopener noreferrer' target='_blank'>mnunes01@hotmail.com</a></small>
      </div>
    )
  }
}
