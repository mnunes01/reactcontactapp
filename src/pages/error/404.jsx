import React from 'react'
import { Link } from 'react-router-dom'
export default class ErrorPage extends React.Component {
  render () {
    return (
      <div>
        <h1>Wrong path explorer!</h1>
        <h2>You hited the unknow and falled on a blackhole.
          <br />Your journey is over and you reached the end of the Contacts App universe as we know it.
          <br />Contacts App may be extended one day, we may even implement email and turn it into the long time lost twin of outlook and gmail
          <br />but for now this is all we have!
          <br />btw: That amazing blonde that you meet last weekend on Puerto Banus may even consider to give you her contact so you can fill your 5mb of browser local storage with span,
          <br />but you certainly will not find her contact here!
        </h2>
        <h3>press <Link to='/'>here to go back to home</Link></h3>
      </div>
    )
  }
};
