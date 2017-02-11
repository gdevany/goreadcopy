import React, { Component } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import { ReaderData, Litcoins } from '../../redux/actions'
import { LITCOIN_TYPES as L } from '../../constants/litcoins'
import SignUpButtons from './SignUpButtons'
import R from 'ramda'
import { Colors, Breakpoints } from '../../constants/style'
import { WrappedField } from '../common'

const { updateReaderData, createReader } = ReaderData
const { updateLitcoinBalance } = Litcoins

const styles = {
  container: {
    backgroundColor: Colors.white,
    marginTop: 10,
    maxWidth: 900,

    [Breakpoints.mobile]: {
      marginTop: 0,
    },
  },

  formContainer: {
    padding: '50px 0',
    margin: '0 auto',
    maxWidth: 400,

    [Breakpoints.mobile]: {
      padding: '50px 15px',
    },
  },
}

class SignUpStepOne extends Component {
  constructor(props) {
    super(props)

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
  }

  componentWillReceiveProps({ submitSuccessful }) {
    if (submitSuccessful) { this.props.handleNext() }
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    const buttonText = document.activeElement.getAttribute('value')
    const fields = R.pick(['username', 'password', 'passwordConfirmation'], this.props)
    const {
      updateReaderData,
      createReader,
      handlePrev
    } = this.props

    if (buttonText === 'Next') {
      // TODO: consider error handling + validations?
      updateReaderData(fields)
      createReader()
    } else if (buttonText === 'Back') {
      handlePrev()
    }
  }

  handleOnChange = R.curry((field, event) => {
    this.props.updateReaderData({ [field]: event.target.value })
  })

  handleOnBlur = (event) => {
    const {
      username,
      password,
      passwordConfirmation,
      updateReaderData,
      updateLitcoinBalance
    } = this.props

    if (event.target.type === 'text' && username.value !== '') {
      updateReaderData({ username })
      updateLitcoinBalance(L.ENTERS_USERNAME)
    } else if (event.target.type === 'password' && password.value !== '') {
      updateReaderData({ password, passwordConfirmation })
      updateLitcoinBalance(L.ENTERS_PASSWORD)
    }
  }

  render() {
    const {
      errors,
      username,
      password,
      passwordConfirmation,
    } = this.props

    return (
      <div>
        <div style={styles.container} className='card front-card'>
          <form
            onSubmit={this.handleFormSubmit}
            style={styles.formContainer}
          >
            <h1 className='center-text step-header'>Create your account</h1>
            <WrappedField
              field='username'
              errors={errors}
            >
              <span className='form-label'> User ID </span>
              <input
                type='text'
                className='form-input'
                value={username}
                onChange={this.handleOnChange('username')}
                onBlur={this.handleOnBlur}
              />
            </WrappedField>

            <WrappedField
              field='password'
              errors={errors}
            >
              <span className='form-label'> Create Password </span>
              <input
                type='password'
                className='form-input'
                value={password}
                onChange={this.handleOnChange('password')}
                onBlur={this.handleOnBlur}
              />
            </WrappedField>

            <WrappedField
              field='passwordConfirmation'
              errors={errors}
            >
              <span className='form-label'> Confirm Password </span>
              <input
                type='password'
                className='form-input'
                value={passwordConfirmation}
                onChange={this.handleOnChange('passwordConfirmation')}
                onBlur={this.handleOnBlur}
              />
            </WrappedField>

            <div className='center-text'>
              <SignUpButtons
                stepIndex={this.props.stepIndex}
                buttonType='form'
              />
            </div>

            <div className='page-number'>
              <p className={styles.pageText}>1</p>
            </div>
          </form>
        </div>

        <div className='behind-card-container'>
          <div style={styles.container} className='card behind-card' />
        </div>

        <div className='third-behind-card-container'>
          <div style={styles.container} className='card third-behind-card' />
        </div>
      </div>
    )
  }
}

const mapStateToProps = R.prop('readerData')

const mapDispatchToProps = {
  createReader,
  updateReaderData,
  updateLitcoinBalance,
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(SignUpStepOne))
