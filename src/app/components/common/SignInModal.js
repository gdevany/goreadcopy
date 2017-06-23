import React, { Component } from 'react'
import R from 'ramda'
import { Dialog, } from 'material-ui'
import { connect } from 'react-redux'
import { ExternalRoutes as routes } from '../../constants'
import PrimaryButton from './PrimaryButton'
import SocialButton from './SocialButton'
import WrappedField from './WrappedField'
import { Auth, Chat, Notifications } from '../../redux/actions'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { Colors } from '../../constants/style'

const { processUserLogin, cleanUserLoginErrors } = Auth
const { getChatContacts } = Chat
const { loadNotifications } = Notifications

const styles = {
  modalBody: {
    marginTop: -80,
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
    }

    this.handleSubmit = this.handleSubmit.bind(this)
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
        this.setState({ showLoader: false })
        this.props.handleClose
      })
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

  render() {
    const {
      errors,
      modalOpen,
      handleClose,
      handleSubmit
    } = this.props

    const {
      username,
      password,
      showLoader,
    } = this.state

    return (
      <div>

        <Dialog
          bodyClassName='signup-modal-content'
          bodyStyle={styles.modalBody}
          contentStyle={styles.modalContent}
          modal={false}
          open={modalOpen}
          onRequestClose={handleClose}
          autoDetectWindowHeight={false}
          autoScrollBodyContent={true}
        >
          <img
            src='/image/close.png'
            className='general-font center-text signup-modal-x'
            onClick={() => {handleClose(); this.handleCleanInputs()}}
          />

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
            <form onSubmit={this.handleSubmit} className='form-wrapper general-font'>

              <WrappedField
                field='username'
                errors={errors}
              >
                <span className='form-label'> Username </span>
                <input
                  type='text'
                  className='form-input'
                  onChange={this.handleOnChange('username')}
                  value={username}
                />
              </WrappedField>
              <WrappedField
                field='password'
                errors={errors}
              >
                <span className='form-label'> Password </span>
                <input
                  type='password'
                  className='form-input'
                  onChange={this.handleOnChange('password')}
                  value={password}
                />
              </WrappedField>
              <WrappedField
                field='nonFieldErrors'
                errors={errors}
              />
              <div className='center-text'>
                <PrimaryButton
                  label={'Sign in with email'}
                  onClick={handleSubmit}
                  type={'submit'}
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
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInModal)
