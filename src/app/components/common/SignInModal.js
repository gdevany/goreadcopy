import React, { Component } from 'react'
import R from 'ramda'
import { Dialog, } from 'material-ui'
import { connect } from 'react-redux'
import { ExternalRoutes as routes } from '../../constants'
import PrimaryButton from './PrimaryButton'
import SocialButton from './SocialButton'
import WrappedField from './WrappedField'
import { Auth } from '../../redux/actions'

const { processUserLogin } = Auth

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
}

class SignInModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const credentials = R.pick(['username', 'password'], this.state)
    this.props.processUserLogin(credentials)
  }

  handleOnChange = R.curry((field, e) => {
    this.setState({ [field]: e.target.value })
  })

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
            onClick={handleClose}
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
            </form>
          </div>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = R.prop('readerData')

export default connect(mapStateToProps, { processUserLogin })(SignInModal)
