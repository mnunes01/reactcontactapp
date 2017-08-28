import React from 'react'
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

import VirtualizedSelect from 'react-virtualized-select'
import Divider from 'material-ui/Divider'

export default class ContactForm extends React.Component {
  render () {
    const id = this.props.contact.key
    console.log('form', this.props.contact.value)
    const {firstName, lastName, email, country} = this.props.contact.value
    const {firstNameMsg, lastNameMsg, emailMsg, countryMsg} = [] // this.props.fieldsMsg
    const {formDisabled} = [] // this.props.formDisabled
    return (
      <div className='contactDetails'>
        <small>action: {this.props.action} <br /> contact id: {id} <br /> operationsMessage: {this.props.operationMsg} <br /> form status: {formDisabled}</small>
        <form onSubmit={this.props.submitAction}>
          <div>
            <div>
              <label>
                First Name:
                <input type='text' name='firstName' value={firstName} onChange={this.props.inputChanges} required disabled={formDisabled} />
              </label>
            </div>
            <div>
              <span>{firstNameMsg}</span>
            </div>
          </div>
          <Divider light />

          <div>
            <div>
              <label>
                Last Name:
                <input type='text' name='lastName' value={lastName} onChange={this.props.inputChanges} required disabled={formDisabled} />
              </label>
            </div>
            <div>
              <span>{lastNameMsg}</span>
            </div>
          </div>
          <Divider light />

          <div>
            <div>
              <label>
                Email:
                <input type='email' name='email' value={email} onChange={this.props.inputChanges} required disabled={formDisabled} />
              </label>
            </div>
            <div>
              <span>{emailMsg}</span>
            </div>
          </div>
          <Divider light />

          <div>
            <div>
              <label>
                <VirtualizedSelect
                  options={this.props.countryList}
                  name='country'
                  onChange={this.props.countryChange}
                  value={country}
                  placeholder='Type or select your country'
                />
              </label>
            </div>
            <div>
              <span>{countryMsg}</span>
            </div>
          </div>
          <Divider light />

          <div>
            <input type='submit' name='saveContact' value='Save' disabled={formDisabled} />
          </div>
          <Divider light />
        </form>
        <div>
          {this.props.showDeleteButton ? <button onClick={this.props.deleteAction} disabled={formDisabled}>Delete</button> : ''}
          <button onClick={this.props.closeAction} disabled={formDisabled}>Close</button>
        </div>
        <Divider light />
      </div>
    )
  }
}
