import React from 'react'
import { waterfall } from 'async'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Form from './Form.js'
import { Account as accountStages } from '../../../../pipelines'
import PrimaryButton from '../../PrimaryButton'
import { TextFieldInput } from '../fields'
import { ReaderData } from '../../../../redux/actions'
import { RuleManager, Rules } from '../validations'

const { stageGetUsername, stageSignUpSubmit } = accountStages
const { signUpReader } = ReaderData
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
    ]
  },
  rules: [
    ruleRunner('email', 'Email Address', required, isEmail),
    ruleRunner('firstName', 'First Name', required, minLength(2)),
    ruleRunner('lastName', 'Last Name', required, minLength(2)),
    ruleRunner('password', 'Password', required, minLength(6)),
    ruleRunner('password_confirmation', 'Confirm Password',
      required, mustMatch('password', '"Password"')),
  ]
}

/************************************************
//
//  Signup form in a single submit.
//
************************************************/
class SignUpForm extends Form {

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

  constructUsername = (ctr) => {
    const { firstName, lastName } = this.state
    return `${this.parseNameField(firstName)[0]}${this.parseNameField(lastName)}${ctr ? ctr : ''}`
  }

  pipeline = () => {
    const { onSuccess, onError } = this.props
    waterfall([
      stageGetUsername(1, null, this),
      stageSignUpSubmit(1, this),
    ], (err) => {
      if (err) {
        if (onError) { onError(err) }
        console.log('[ERROR] Login Submit Pipeline failed!')
        return
      }
      if (onSuccess) { onSuccess() }
    })
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit(this.pipeline)}
        className='form-wrapper general-font row'
      >
        <TextFieldInput
          placeholder=''
          label='Email Address'
          showError={this.state.showErrors}
          text={this.state.email || ''}
          type='email'
          onFieldChanged={this.handleFieldChanged(['email'])}
          errorText={this.errorFor('email')}
        />
        <TextFieldInput
          placeholder=''
          customClasses='small-12 medium-6 columns'
          label='First Name'
          showError={this.state.showErrors}
          text={this.state.firstName || ''}
          onFieldChanged={this.handleFieldChanged(['firstName'])}
          errorText={this.errorFor('firstName')}
        />
        <TextFieldInput
          placeholder=''
          customClasses='small-12 medium-6 columns'
          label='Last Name'
          showError={this.state.showErrors}
          text={this.state.lastName || ''}
          onFieldChanged={this.handleFieldChanged(['lastName'])}
          errorText={this.errorFor('lastName')}
        />
        <TextFieldInput
          placeholder=''
          customClasses='small-12 medium-6 columns'
          label='Password'
          showError={this.state.showErrors}
          text={this.state.password || ''}
          type='password'
          onFieldChanged={this.handleFieldChanged(['password'])}
          errorText={this.errorFor('password')}
        />
        <TextFieldInput
          placeholder=''
          customClasses='small-12 medium-6 columns'
          label='Confirm Password'
          showError={this.state.showErrors}
          text={this.state.password_confirmation || ''}
          type='password'
          onFieldChanged={this.handleFieldChanged(['password_confirmation'])}
          errorText={this.errorFor('password_confirmation')}
        />
        { this.constructNonFieldErrors() }
        <div className='small-12 columns center-text'>
          <PrimaryButton
            label={'Sign up'}
            onClick={null}
            type={'submit'}
          />
        </div>
        { this.constructSpinner() }
      </form>
    )
  }
}

SignUpForm.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func
}

const mapDispatchToProps = {
  signUpReader
}

export default connect(null, mapDispatchToProps)(SignUpForm)
