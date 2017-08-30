/**
* Statelles Render View Component for the contact form
*/

import React from 'react'
import PropTypes from 'prop-types'
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import VirtualizedSelect from 'react-virtualized-select' // eslint-disable-line no-unused-vars
import Divider from 'material-ui/Divider' // eslint-disable-line no-unused-vars

export default class ViewContactDetails extends React.Component {
  render () {
    const {key, firstName, lastName, email, country} = this.props.fieldsValues
    const {firstNameMsg, lastNameMsg, emailMsg, countryMsg} = this.props.fieldsMsg
    const {formDisabled} = this.props.formDisabled
    return (
      <div className='contactDetails'>
        <div className='info'>
          <small>action: {this.props.action} <br /> contact key: {key} <br /> operationsMessage: {this.props.operationMsg} <br /> form status: {formDisabled}</small>
        </div>
        <form onSubmit={this.props.submitAction}>
          <div className='form-row'>
            <div>
              <label className='fields'>
                <span>First Name:</span>
                <input className='field' type='text' name='firstName' value={firstName} onChange={this.props.inputChanges} required disabled={formDisabled} />
              </label>
            </div>
            <div>
              <span className='error'>{firstNameMsg}</span>
            </div>
          </div>

          <div className='form-row'>
            <div>
              <label className='fields'>
                <span>Last Name:</span>
                <input className='field' type='text' name='lastName' value={lastName} onChange={this.props.inputChanges} required disabled={formDisabled} />
              </label>
            </div>
            <div>
              <span className='error'>{lastNameMsg}</span>
            </div>
          </div>

          <div className='form-row'>
            <div>
              <label className='fields'>
                <span>Email:</span>
                <input className='field' type='email' name='email' value={email} onChange={this.props.inputChanges} required disabled={formDisabled} />
              </label>
            </div>
            <div>
              <span className='error'>{emailMsg}</span>
            </div>
          </div>

          <div className='form-row'>
            <label className='fields'>
              <span>Country:</span>
              <div className='select'>
                <VirtualizedSelect
                  options={this.props.countryList}
                  name='country'
                  onChange={this.props.countryChange}
                  value={country}
                  placeholder='Type or select your country'
                />
              </div>
            </label>
            <div>
              <span className='error'>{countryMsg}</span>
            </div>
          </div>

          <div className='form-row buttons'>
            <input className='btn' type='submit' name='saveContact' value='Save' disabled={formDisabled} />
          </div>
        </form>
        <div className='form-row buttons'>
          {this.props.showDeleteButton ? <button className='btn' onClick={this.props.deleteAction} disabled={formDisabled}>Delete</button> : ''}
          <button className='btn' onClick={this.props.closeAction} disabled={formDisabled}>Close</button>
        </div>
      </div>
    )
  }
}

ViewContactDetails.propTypes = {
  // fieldsValues:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
  formDisabled: PropTypes.string,
  showDeleteButton: PropTypes.bool,
  countryList: PropTypes.array,
  action: PropTypes.string.isRequired,
  operationMsg: PropTypes.string,
  deleteAction: PropTypes.func,
  countryChange: PropTypes.func,
  inputChanges: PropTypes.func,
  submitAction: PropTypes.func
}
