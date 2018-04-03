import React, { Component } from 'react'
import R from 'ramda'
import { Dialog, } from 'material-ui'
import { connect } from 'react-redux'
import { ExternalRoutes as routes } from '../../constants'
import PrimaryButton from './PrimaryButton'
import SocialButton from './SocialButton'
import { LoginForm } from './data/forms'
import { Auth, Chat, Notifications, ReaderData } from '../../redux/actions'

const { processUserLogin, cleanUserLoginErrors } = Auth
const { getChatContacts } = Chat
const { loadNotifications } = Notifications
const { resetUserPassword } = ReaderData

const styles = {
  modalRoot: {
    position: 'fixed',
  },
  modalBody: {
    marginTop: -80,
    width: '100%',
  },
  modalContent: {
    maxWidth: '100%',
    width: '100%',
    opacity: 0.93,
  },

  formContainer: {
    height: '100vh',
    margin: '0 auto',
    maxWidth: 400,
  },

  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
}

class SignInModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      showLoader: false,
      isPassForgotten: false,
      isRecoverSubmit: false,
      isRecoverError: false,
      isRecoverErrorMessage: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitRecovery = this.handleSubmitRecovery.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({ showLoader: true })
    const credentials = R.pick(['username', 'password'], this.state)
    this.props.processUserLogin(credentials)
      .then(() => { this.props.getChatContacts() })
      .then(() => { this.props.loadNotifications() })
      .then(() => {
        this.setState({ showLoader: false }, this.props.handleClose)
      })
      .catch(()=> { this.setState({ showLoader: false }) })
  }

  handleSubmitRecovery = (event) => {
    event.preventDefault()
    const submitEmail = document.getElementsByClassName('recovery-input')[0].value
    if (submitEmail) {
      this.props.resetUserPassword(submitEmail)
        .then(() => {
          this.setState({
            isPassForgotten: false,
            isRecoverSubmit: true,
          })
        })
        .catch((err) => {
          this.setState({
            isRecoverError: true,
            isRecoverErrorMessage: err.response ? err.response.data ? err.response.data.errors ?
              err.response.data.errors.email.message : null : null : null,
          })
        })
    }
  }

  handleOnChange = R.curry((field, e) => {
    this.setState({ [field]: e.target.value })
  })

  handleCleanInputs = () => {
    this.setState({
      username: '',
      password: '',
    })
    this.props.cleanUserLoginErrors()
  }

  handleOnForgottenChange = () => {
    this.setState({
      isPassForgotten: true,
    })
  }

  handleCloseModal = () => {
    const { handleClose } = this.props
    handleClose()
    this.handleRecoveryCancel()
  }

  handleRecoveryCancel = () => {
    this.setState({
      isPassForgotten: false,
      isRecoverSubmit: false,
    })
  }

  handleRecoveryError = () => {
    this.setState({
      isRecoverError: false,
    })
  }

  render() {
    const {
      modalOpen,
    } = this.props

    const {
      isPassForgotten,
      isRecoverSubmit,
      isRecoverError,
      isRecoverErrorMessage,
    } = this.state

    return (
      <div>
        <Dialog
          bodyClassName='signup-modal-content'
          bodyStyle={styles.modalBody}
          contentStyle={styles.modalContent}
          style={styles.modalRoot}
          modal={false}
          open={modalOpen}
          onRequestClose={this.handleCloseModal}
          autoDetectWindowHeight={false}
          autoScrollBodyContent={true}
        >
          <img
            src='/image/close.png'
            className='general-font center-text signup-modal-x'
            onClick={() => {this.handleCloseModal(); this.handleCleanInputs()}}
          />
          {isPassForgotten || isRecoverSubmit ? (
            <div className='center-text'>
              <h1 className='center-text large-header'>
                Forgot your Password?
              </h1>
              {isRecoverSubmit ? (
                <div>
                  <div className='success-panel'>
                    <strong>
                      <p>
                        Success!
                      </p>
                      <p>
                        An email will arrive to your inbox soon with the password
                        reset instructions.
                      </p>
                    </strong>
                  </div>
                  <div className='center-text recovery-buttons'>
                    <PrimaryButton
                      label={'Return to Login'}
                      onClick={this.handleRecoveryCancel}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p>
                    Send us your email address and we'll send a mail to restablish your account.
                  </p>
                  <div className={isRecoverError ? 'error' : null}>
                    <input
                      type='text'
                      className='form-input recovery-input'
                      placeholder='Email'
                      onChange={this.handleRecoveryError}
                    />
                    {isRecoverError ? (
                      <p>
                        {isRecoverErrorMessage ? isRecoverErrorMessage :
                          'Please check the email is correct.'}
                      </p>
                      ) : null
                    }
                  </div>
                  <div className='center-text recovery-buttons'>
                    <PrimaryButton
                      label={'Recover Password'}
                      onClick={this.handleSubmitRecovery}
                    />
                    <PrimaryButton
                      label={'Cancel'}
                      onClick={this.handleRecoveryCancel}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
          <div>
            <h1 className='center-text large-header'>
              Sign in to GoRead
            </h1>
            <div className='center-text'>
              <SocialButton
                href={routes.providerLogin({ provider: 'facebook' })}
                text={'Continue with Facebook'}
                backgroundColor={'#3B5998'}
                icon={'/image/facebook.png'}
              />
              <SocialButton
                href={routes.providerLogin({ provider: 'google' })}
                text={'Continue with Google'}
                backgroundColor={'#EA4235'}
                icon={'/image/google.png'}
              />
              <SocialButton
                href={routes.providerLogin({ provider: 'linkedin' })}
                text={'Continue with Linkedin'}
                backgroundColor={'#0077B5'}
                icon={'/image/linkedin.png'}
              />
            </div>
            <h4 className='inner-title center-text'>
              or sign in with email:
            </h4>
            <div style={styles.formContainer}>
              <LoginForm
                onSuccess={()=>{this.props.handleClose()}}
                onError={null}
              />
              <div className='forgot-password' onClick={this.handleOnForgottenChange}>
                <span>
                  Forgot password?
                </span>
              </div>
            </div>
          </div>)}
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = R.prop('readerData')

const mapDispatchToProps = {
  processUserLogin,
  cleanUserLoginErrors,
  getChatContacts,
  loadNotifications,
  resetUserPassword,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInModal)
