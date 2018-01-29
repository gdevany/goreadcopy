import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import R from 'ramda'
import { RuleManager } from '../validations'
import { LoadingSpinner } from '../../'

const { run } = RuleManager

/************************************************
//
//  Base class for handling field validations,
//  error handling and other common aspects of
//  form work.
//
************************************************/
class Form extends PureComponent {

  /* **************************
  /  React Lifecycle Functions
  ************************** */
  constructor(props, params) {
    super(props)
    this.state = {
      showErrors: false,
      isBlocked: false,
      fieldValidationErrors: {},
      respFieldErrors: {},
      respNonFieldErrors: [],
    }
    this.locals = {
      rules: params && params.rules ? params.rules : [],
      payloads: params && params.payloads ? params.payloads : {},
      pipelineStep: 0,
    }
  }

  //  If it is decided to override this function behavior on the instanced Form,
  //  remember to add the call to the setValidationErrors() function again.
  //  If not, the error validation won't be initialized and will not work as expected.
  componentWillMount() {
    this.setValidationErrors()
  }

  render() {
    return null
  }

  /* *******************
  /  Auxiliar Functions
  ******************* */

  /* Pipeline Functions */
  /**********************/
  setPipelineStep = (newStep) => {
    if (newStep >= 0) { this.locals.pipelineStep = newStep }
  }

  resetPipelineStep = () => {
    this.locals.pipelineStep = 0
  }

  incrementPipelineStep = () => {
    this.locals.pipelineStep += 1
  }

  isAlreadyDone = (next, step) => {
    if ((step ? step : 0) < this.locals.pipelineStep) {
      next(null)
      return true
    }
    return false
  }

  /* Getter Functions */
  /********************/
  errorFor = (field) => {
    return this.state.fieldValidationErrors[field] || this.state.respFieldErrors[field] || ''
  }

  payload = (id) => {
    return R.pick(id && this.locals.payloads[id] ? this.locals.payloads[id] : [], this.state)
  }

  /* Setter Functions */
  /********************/
  setErrorResponse = (err) => {
    const { errors, nonFieldErrors } = err.response.data
    const mappedFieldErrors = this.mapFieldErrors(errors)
    this.setState({
      respFieldErrors: mappedFieldErrors,
      respNonFieldErrors: nonFieldErrors
    })
  }

  setValidationErrors = () => {
    this.setState({ fieldValidationErrors: run(this.state, this.locals.rules) })
  }

  /* Control Functions */
  /*********************/
  block = (fn) => {
    return new Promise((resolve, reject) => {
      if (!this.state.isBlocked) {
        this.setState({ isBlocked: true }, () => resolve(fn()))
        return
      }
      reject()
    })
  }

  unblock = () => {
    this.setState({ isBlocked: false })
  }

  /* Handler Functions */
  /*********************/
  handleSubmit = (fn) => {
    return (e) => {
      e.preventDefault()
      this.setState({ showErrors: true })
      if (!R.isEmpty(this.state.fieldValidationErrors)) return
      fn()
    }
  }

  handleFieldChanged = (fields) => {
    return (e) => {
      const diff = this.mapStateDiff(fields, e ? e.target.value : null)
      const newState = update(this.state, diff)
      newState.fieldValidationErrors = run(newState, this.locals.rules)
      this.setState(newState)
    }
  }

  /* Constructor Functions */
  /**************************/
  constructNonFieldErrors = () => {
    return this.state.respNonFieldErrors ? (
      <div className='small-12 columns center-text error'>
        {
          this.state.respNonFieldErrors.map((el, idx) => {
            return <p key={idx} className='message'>{el}</p>
          })
        }
      </div>
    ) : null
  }

  constructSpinner = () => {
    return this.state.isBlocked ? (
      <div className='form-input-wrapper center-text'>
        <LoadingSpinner />
      </div>
    ) : null
  }

  /* Mapping Functions */
  /*********************/
  mapStateDiff = (fields, value) => {
    const result = { respFieldErrors: {} }
    fields.map((el, idx) => {
      if (idx === 0) {
        if (el) {
          result[el] = { $set: value }
          result['respFieldErrors'][el] = { $set: '' }
        }
      } else {
        result[el[0]] = { $set: el[1] }
      }
    })
    return result
  }

  mapFieldErrors = (errors) => {
    return errors ? Object.keys(errors).reduce((previous, current) => {
      previous[current] = errors[current].message[0]
      return previous
    }, {}) : {}
  }

}

Form.propTypes = {
  submitOnce: PropTypes.bool,
  submitButtonText: PropTypes.string,
}

Form.defaultProps = {
  submitOnce: true,
  submitButtonText: 'Submit'
}

export default Form
