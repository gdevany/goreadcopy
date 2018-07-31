import React from 'react'
import { waterfall } from 'async'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Form from './Form.js'
import { Account as accountStages } from '../../../../pipelines'
import PrimaryButton from '../../PrimaryButton'
import { TextFieldInput, CountryStateInput } from '../fields'
import { ReaderData, CurrentReader } from '../../../../redux/actions'
import { RuleManager, Rules } from '../validations'

const { stageGetUsername, stageSignUpSubmit, stageUserProfileUpdate } = accountStages
const { signUpReader } = ReaderData
const { updateReader } = CurrentReader
const { ruleRunner } = RuleManager
const { required, minLength, isEmail, mustMatch } = Rules

const params = {
  payloads: {
    SIGN_UP: [
      'email',
      'username',
      'firstName',
      'lastName',
      'password',
      'password_confirmation',
      'referrer',
      'affiliate'
    ],
    UPDATE_READER: [
      'country',
      'state',
      'address1',
      'address2',
      'city',
      'zipcode'
    ]
  },
  rules: [
    ruleRunner('email', 'Email Address', required, isEmail),
    ruleRunner('firstName', 'First Name', required, minLength(2)),
    ruleRunner('lastName', 'Last Name', required, minLength(2)),
    ruleRunner('password', 'Password', required, minLength(6)),
    ruleRunner('password_confirmation', 'Confirm Password',
      required, mustMatch('password', '"Password"')),
    ruleRunner('country', 'Country', required),
    ruleRunner('state', 'State', required),
    ruleRunner('address1', 'Address', required),
    ruleRunner('city', 'City', required),
    ruleRunner('zipcode', 'Zipcode', required)
  ]
}

/************************************************
//
//  Signup form that will also complete the user
//  basic profile information in a single submit.
//
************************************************/
class FullSignUpForm extends Form {

  constructor(props) {
    super(props, params)
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    this.setValidationErrors()
    this.setAffiliate()
    this.setReferrer()
  }

  setAffiliate = () => {
    const affiliate = location.pathname === '/vid' ? 'newHome' : null
    if (affiliate) this.setState({ affiliate })
  }

  setReferrer = () => {
    const { params } = this.context.router
    const referrer = params && params.slug ? params.slug : null
    if (referrer) this.setState({ referrer })
  }

  parseNameField = (rawName) => {
    return rawName.toLowerCase().replace(/\s/g, '')
  }

  constructUsername = (idx) => {
    const { firstName, lastName } = this.state
    return `${this.parseNameField(firstName)[0]}${this.parseNameField(lastName)}${idx ? idx : ''}`
  }

  onNameFieldChange = (fields) => {
    return (e) => {
      this.handleFieldChanged(fields)(e)
      this.resetPipelineStep()
    }
  }

  pipeline = () => {
    const { onSuccess, onError } = this.props
    waterfall([
      stageGetUsername(0, null, this),
      stageSignUpSubmit(1, this),
      stageUserProfileUpdate(2, this),
    ], (err) => {
      if (err) {
        if (onError) { onError(err) }
        console.log('[ERROR] Full Account Signup Pipeline failed!')
        return
      }
      if (onSuccess) { onSuccess() }
    })
  }

  render() {
    const { isBlocked } = this.state;
    return (
      <form
        onSubmit={this.handleSubmit(this.pipeline)}
        className='form-wrapper general-font row'
      >
        <TextFieldInput
          placeholder=''
          customClasses='small-12 medium-6 columns'
          label='First Name'
          showError={this.state.showErrors}
          text={this.state.firstName || ''}
          onFieldChanged={this.onNameFieldChange(['firstName'])}
          errorText={this.errorFor('firstName')}
        />
        <TextFieldInput
          placeholder=''
          customClasses='small-12 medium-6 columns'
          label='Last Name'
          showError={this.state.showErrors}
          text={this.state.lastName || ''}
          onFieldChanged={this.onNameFieldChange(['lastName'])}
          errorText={this.errorFor('lastName')}
        />
        <TextFieldInput
          placeholder=''
          customClasses='small-12 columns'
          label='Address'
          showError={this.state.showErrors}
          text={this.state.address1 || ''}
          onFieldChanged={this.handleFieldChanged(['address1'])}
          errorText={this.errorFor('address1')}
        />
        <TextFieldInput
          placeholder=''
          customClasses='small-12 columns'
          label='Address 2 (Optional)'
          showError={this.state.showErrors}
          text={this.state.address2 || ''}
          onFieldChanged={this.handleFieldChanged(['address2'])}
          errorText={this.errorFor('address2')}
        />
        <CountryStateInput
          currentState={this.state}
          handleFieldChanged={this.handleFieldChanged}
          errorFor={this.errorFor}
        />
        <TextFieldInput
          placeholder=''
          customClasses='small-12 medium-6 columns'
          label='City'
          showError={this.state.showErrors}
          text={this.state.city || ''}
          onFieldChanged={this.handleFieldChanged(['city'])}
          errorText={this.errorFor('city')}
        />
        <TextFieldInput
          placeholder=''
          customClasses='small-12 medium-6 columns'
          label='Zipcode'
          showError={this.state.showErrors}
          text={this.state.zipcode || ''}
          onFieldChanged={this.handleFieldChanged(['zipcode'])}
          errorText={this.errorFor('zipcode')}
        />
        <TextFieldInput
          placeholder=''
          label='Email Address'
          hint='Your order confirmation will be sent here.'
          showError={this.state.showErrors}
          text={this.state.email || ''}
          type='email'
          onFieldChanged={this.handleFieldChanged(['email'])}
          errorText={this.errorFor('email')}
        />
        <TextFieldInput
          placeholder=''
          customClasses='small-12 columns'
          label='Password'
          hint='By entering a password, you will be able to sign in and track your order.'
          showError={this.state.showErrors}
          text={this.state.password || ''}
          type='password'
          onFieldChanged={this.handleFieldChanged(['password'])}
          errorText={this.errorFor('password')}
        />
        <TextFieldInput
          placeholder=''
          customClasses='small-12 columns'
          label='Confirm Password'
          showError={this.state.showErrors}
          text={this.state.password_confirmation || ''}
          type='password'
          onFieldChanged={this.handleFieldChanged(['password_confirmation'])}
          errorText={this.errorFor('password_confirmation')}
        />
        { this.constructNonFieldErrors() }
        { this.constructSpinner() }
        <div className='small-12 columns center-text'>
          <PrimaryButton
            label={'Continue'}
            onClick={null}
            type={'submit'}
            disabled={isBlocked}
          />
        </div>
      </form>
    )
  }
}

FullSignUpForm.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func
}

const mapDispatchToProps = {
  signUpReader,
  updateReader,
}

export default connect(null, mapDispatchToProps)(FullSignUpForm)
