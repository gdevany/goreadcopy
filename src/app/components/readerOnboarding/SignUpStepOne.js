import React, { Component } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import { ReaderData, Litcoins } from '../../redux/actions'
import { LITCOIN_TYPES as L } from '../../constants/litcoins'
import SignUpButtons from './SignUpButtons'
import R from 'ramda'
import { Colors, Breakpoints } from '../../constants/style'
import { WrappedField } from '../common'
import RefreshIndicator from 'material-ui/RefreshIndicator'

const { updateReaderData, createReader } = ReaderData
const { updateLitcoinBalance } = Litcoins

const styles = {
  container: {
    backgroundColor: Colors.white,
    marginTop: 10,
    marginBottom: 30,
    maxWidth: 900,
    overflow: 'hidden',

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

  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
}

class SignUpStepOne extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      showLoader: false,
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentWillReceiveProps({ submitSuccessful }) {
    if (submitSuccessful) { this.props.handleNext() }
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    this.setState({
      showLoader: true,
    })
    const buttonText = event.target.value
    const fields = R.pick(['username', 'password', 'passwordConfirmation'], this.props)
    const {
      updateReaderData,
      createReader,
      handlePrev
    } = this.props

    if (buttonText === 'Next') {
      updateReaderData(fields)
      createReader()
      .then(
        () => {
          this.setState({ showLoader: false })
        }
      )
    } else if (buttonText === 'Back') {
      handlePrev()
      .then(
        () => {
          this.setState({ showLoader: false })
        }
      )
    }
  }

  handleOnChange = R.curry((field, event) => {
    this.setState({ [field]: event.target.value })
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

    if (username || password) {
      if (event.target.type === 'text' && username.value !== '') {
        updateReaderData({ username })
        updateLitcoinBalance(L.ENTERS_USERNAME)
      } else if (event.target.type === 'password' && password.value !== '') {
        updateReaderData({ password, passwordConfirmation })
        updateLitcoinBalance(L.ENTERS_PASSWORD)
      }
    }
  }

  render() {
    const { errors } = this.props
    const {
      username,
      password,
      passwordConfirmation,
      showLoader,
    } = this.state

    return (
      <div>
        <div style={styles.container} className='card front-card'>
          <form
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
                handleButtonClick={this.handleFormSubmit}
              />
            </div>
            {
              showLoader ? (
                <div className='form-input-wrapper center-text'>
                  <RefreshIndicator
                    size={50}
                    left={0}
                    top={0}
                    loadingColor={Colors.blue}
                    status='loading'
                    style={styles.refresh}
                  />
                </div>
              ) : null
            }
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
