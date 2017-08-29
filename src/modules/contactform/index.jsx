/**
* Controller container that handles the logic and feeds data into the contact details view
* recives a prop action that can have edit or newcontact values
* if the value is edit, retrieves the contact information from the database calling the correspondent action and renders the view
* giving the possibility to edit, save or delete the contact
*
* if the value is newcontact, renders a empty view that enables the possibility to create a new contact entry on the database
* after save, the newcontact will pass to edit mode and enable the possbility to edit, save or delete
*
* after delete a contact in this view the view is closed and the user is taken to the app home page
*/

import React from 'react'
import ContactDetails from './components/contactdetails_view.jsx' // eslint-disable-line no-unused-vars
import { COUNTRY_LIST } from '../../utils/countrylist/countrylist.js'
import { ActionGetContact, ActionSaveContact, ActionDeleteContact } from '../../actions/contactsactions'
import Validator from 'validator'
import * as Labels from './config/labels.js'

export default class ContactDetailsController extends React.Component {
  constructor () {
    super()
    this.state = {
      key: '',
      action: undefined,
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      operationMsg: null,
      firstName_errorMsg: '',
      lastName_errorMsg: '',
      email_errorMsg: '',
      country_errorMsg: '',
      formDisabled: ''
    }
    this.submitAction = this.handleSubmit.bind(this)
    this.deleteAction = this.handleDeleteContact.bind(this)
    this.closeAction = this.handlecloseAction.bind(this)
    this.countryChange = this.handleCountryChange.bind(this)
    this.inputChanges = this.handleInputChange.bind(this)
  }
  componentWillMount () {
    this.setState({action: this.props.match.params.action})
    this.setUserDetails(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({action: nextProps.match.params.action})
    this.setUserDetails(nextProps)
  }

  /**
  * Set user state details after the controller receives props
  * if action props is new set a default empty object for contact details
  * otherwise call ActionGetContact and retrieves contact details from database
  * @method setUserDetails
  * @param {object} props - object containing props passed to the controller on mount or after a update
  */
  setUserDetails (props) {
    if (props.match.params.action === 'new') {
      this.setState({
        key: undefined,
        firstName: '',
        lastName: '',
        email: '',
        country: ''
      })
    } else {
      ActionGetContact(props.match.params.key, (err, key, value) => {
        if (this.err) {
          console.log(err)
        } else {
          this.setState({
            key: key,
            firstName: value.firstName,
            lastName: value.lastName,
            email: value.email,
            country: value.country
          })
        }
      })
    }
  }
  /**
  * method used to validate the contact details data after the user press the submit cta and before the
  * data is submited to database
  * this method is using the npm package validator https://www.npmjs.com/package/validator
  * receives no params and reads all data directly from the state
  * returns nothing and handles all execptions and invalid data fields directly to state
  * @method validateFormData
  */
  validateFormData () {
    let validationResult = true
    let validationMsg = {isValid_firstName: true, isValid_lastName: true, isValid_country: true, isValid_email: true}

    if (Validator.isEmpty(this.state.firstName)) {
      validationResult = false
      this.setState({firstName_errorMsg: Labels._ERROR_MSG_FIRSTNAME_})
      validationMsg.isValid_firstName = false
    } else {
      this.setState({firstName_errorMsg: ''})
    }

    if (Validator.isEmpty(this.state.lastName)) {
      validationResult = false
      this.setState({lastName_errorMsg: Labels._ERROR_MSG_LASTNAME_})
      validationMsg.isValid_lastName = false
    } else {
      this.setState({lastName_errorMsg: ''})
    }

    if (Validator.isEmpty(this.state.country)) {
      validationResult = false
      this.setState({country_errorMsg: Labels._ERROR_MSG_COUNTRY_})
      validationMsg.isValid_country = false
    } else {
      this.setState({country_errorMsg: ''})
    }

    if (Validator.isEmpty(this.state.email) || !Validator.isEmail(this.state.email)) {
      validationResult = false
      validationMsg.isValid_email = false
      this.setState({email_errorMsg: Labels._ERROR_MSG_EMAIL_})
    } else {
      this.setState({email_errorMsg: ''})
    }

    return validationResult
  }

  /**
  * handles the form submit action after user press the cta
  * uses method validateFormData to validate the data and in case the data pass all the tests
  * call ActionSaveContact to update or create the contact registry on the database
  * Disables the form inputs while is validating the data and waiting for the reply of the store action
  * for debuging proposes set a operation message
  * @method handleSubmit
  * @param {object} event - object containing the form data
  */
  handleSubmit (event) {
    event.preventDefault()
    if (this.validateFormData()) {
      this.setState({formDisabled: 'disabled', operationMsg: Labels._Status_MSG_SAVING_})
      ActionSaveContact({
        key: this.state.key,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        country: this.state.country
      },
      (err, data) => {
        if (err) {
          console.log(err)
        } else {
          if (this.state.action === 'new') {
            this.setState({key: data.key, action: 'edit'})
          }
          this.setState({operationMsg: Labels._STATUS_MSG_SAVED_, formDisabled: ''})
        }
      })
    }
  }

  /**
  * handles the deleteAction and calls ActionDeleteContact to remove a registry form the database
  * in case the delete operation is sucessfull closes the form and redirects the user to app home page
  * @method handleDeleteContact
  */
  handleDeleteContact () {
    ActionDeleteContact(this.state.key, (err) => {
      if (err) {
        console.log(err)
      } else {
        this.props.history.push('/')
      }
    })
  }

  /**
  * handles the change country form event updating the state object with the new value
  * @method handleCountryChange
  * @param {object} event - object containing the country input selected data
  */
  handleCountryChange (event) {
    this.setState({
      country: event.value
    })
  }

  /**
  * handles the input's form change event updating the state object with the new value
  * @method handleInputChange
  * @param {object} event - object containing the country input selected data
  */
  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  /**
  * handles the close cta event, closes the form and redirects the user to the app home page
  * @method handlecloseAction
  */
  handlecloseAction () {
    this.props.history.push('/')
  }

  render () {
    return (
      <ContactDetails
        key={this.state.key}
        action={this.state.action}
        operationMsg={this.state.operationMsg}
        submitAction={this.submitAction}
        deleteAction={this.deleteAction}
        closeAction={this.closeAction}
        countryChange={this.countryChange}
        countryList={COUNTRY_LIST}
        inputChanges={this.inputChanges}
        formDisabled={this.state.formDisabled}
        showDeleteButton={this.state.action === 'edit'}
        fieldsValues={{key: this.state.key, firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, country: this.state.country}}
        fieldsMsg={{firstNameMsg: this.state.firstName_errorMsg, lastNameMsg: this.state.lastName_errorMsg, emailMsg: this.state.email_errorMsg, countryMsg: this.state.country_errorMsg}}
      />
    )
  }
}
