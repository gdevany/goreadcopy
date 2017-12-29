import React from 'react'
import { waterfall } from 'async'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Form from './Form.js'
import { Account as accountStages } from '../../../../pipelines'
import PrimaryButton from '../../PrimaryButton'
import {
  TextFieldInput,
  CountryStateInput,
  DateDropDownInput,
  GenderDropDownInput
} from '../fields'
import { CurrentReader } from '../../../../redux/actions'
import { RuleManager, Rules } from '../validations'

const { stageUserProfileUpdate } = accountStages
const { updateReader } = CurrentReader
const { ruleRunner } = RuleManager
const { required } = Rules

const params = {
  payloads: {
    UPDATE_READER: [
      'firstName',
      'lastName',
      'address1',
      'address2',
      'birthdate',
      'city',
      'country',
      'context',
      'gender',
      'profession',
      'state',
      'zipcode',
    ]
  },
  rules: [
    ruleRunner('firstName', 'First Name', required),
    ruleRunner('lastName', 'Last Name', required),
    ruleRunner('address1', 'Address', required),
    ruleRunner('year', 'Year', required),
    ruleRunner('month', 'Month', required),
    ruleRunner('day', 'Day', required),
    ruleRunner('city', 'City', required),
    ruleRunner('country', 'Country', required),
    ruleRunner('gender', 'Gender', required),
    ruleRunner('profession', 'Profession', required),
    ruleRunner('state', 'State', required),
    ruleRunner('zipcode', 'Zipcode', required),
  ]
}

/************************************************
//
//  Form to submit account's profile data
//
************************************************/
class ProfileForm extends Form {

  constructor(props) {
    super(props, params)
    if (props.context) this.state.context = props.context
    if (props.currentReader) {
      params.payloads.UPDATE_READER.map((el, idx) => {
        if (props.currentReader[el]) this.state[el] = props.currentReader[el]
      })
    }
    if (this.state.birthdate) {
      this.state.year = this.state.birthdate.substring(0, 4)
      this.state.month = this.state.birthdate.substring(5, 7)
      this.state.day = this.state.birthdate.substring(8, 10)
    }
  }

  pipeline = () => {
    const { onSuccess, onError } = this.props
    waterfall([
      stageUserProfileUpdate(0, this),
    ], (err) => {
      if (err) {
        if (onError) { onError(err) }
        console.log('[ERROR] Full Account Signup Pipeline failed!')
        return
      }
      if (onSuccess) { onSuccess() }
      this.resetPipelineStep()
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
        <DateDropDownInput
          label='Birthdate'
          hideSubLabels={true}
          currentState={this.state}
          handleFieldChanged={this.handleFieldChanged}
          errorFor={this.errorFor}
          fields={{ year: 'year', month: 'month', day: 'day', date: 'birthdate' }}
        />
        <GenderDropDownInput
          customClasses='small-12 medium-6 columns'
          currentState={this.state}
          handleFieldChanged={this.handleFieldChanged}
          errorFor={this.errorFor}
          fields={{ gender: 'gender' }}
        />
        <TextFieldInput
          placeholder=''
          customClasses='small-12 medium-6 columns'
          label='Profession'
          showError={this.state.showErrors}
          text={this.state.profession || ''}
          onFieldChanged={this.handleFieldChanged(['profession'])}
          errorText={this.errorFor('profession')}
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
        { this.constructNonFieldErrors() }
        <div className='small-12 columns center-text'>
          <PrimaryButton
            label={this.props.submitButtonText}
            onClick={null}
            type={'submit'}
          />
        </div>
        { this.constructSpinner() }
      </form>
    )
  }
}

ProfileForm.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func
}

const mapStateToProps = ({
  currentReader
}) => {
  return {
    currentReader
  }
}

const mapDispatchToProps = {
  updateReader
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)
