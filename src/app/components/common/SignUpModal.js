import React, { Component, PropTypes } from 'react'
import R from 'ramda'
import { Dialog, } from 'material-ui'
import { connect } from 'react-redux'
import { ReaderData } from '../../redux/actions'
import { ExternalRoutes as routes } from '../../constants'
import { Auth } from '../../services'
import PrimaryButton from './PrimaryButton'
import SocialButton from './SocialButton'
import WrappedField from './WrappedField'

const isUserLoggedIn = Auth.currentUserExists()

const { getInitialReaderData, checkFields, updateReaderData } = ReaderData

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

class SignUpModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      referrer: '',
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount = () => {
    if (!isUserLoggedIn) {
      const profileSlug = this.context.router.params.slug
      if (profileSlug && this.state.referrer !== profileSlug) {
        this.setState({
          referrer: profileSlug,
        })
        this.props.updateReaderData({
          referrer: profileSlug,
        })
      }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const fields = R.pick(['firstName', 'lastName', 'email', 'referrer'], this.props)
    this.props.checkFields(fields)
  }

  handleOnChange = R.curry((field, e) => {
    this.setState({ [field]: e.target.value })
    this.props.updateReaderData({ [field]: e.target.value })
  })

  render() {
    const {
      errors,
      modalOpen,
      handleClose,
      handleSubmit
    } = this.props

    const {
      firstName,
      lastName,
      email,
    } = this.state

    const isFinished = (firstName !== '' && lastName !== '' && email !== '')

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
            Join GoRead
          </h1>

          <div className='center-text'>

            <SocialButton
              href={routes.providerLogin({ provider: 'facebook' })}
              text={'Sign up with Facebook'}
              backgroundColor={'#3B5998'}
              icon={'/image/facebook.png'}
            />

            <SocialButton
              href={routes.providerLogin({ provider: 'google' })}
              text={'Sign up with Google'}
              backgroundColor={'#EA4235'}
              icon={'/image/google.png'}
            />

            <SocialButton
              href={routes.providerLogin({ provider: 'linkedin' })}
              text={'Sign up with Linkedin'}
              backgroundColor={'#0077B5'}
              icon={'/image/linkedin.png'}
            />

          </div>

          <h4 className='inner-title center-text'>
            or sign up with email:
          </h4>

          <div style={styles.formContainer}>
            <form onSubmit={this.handleSubmit} className='form-wrapper general-font'>

              <WrappedField
                field='firstName'
                errors={errors}
              >
                <span className='form-label'> First name </span>
                <input
                  type='text'
                  className='form-input'
                  onChange={this.handleOnChange('firstName')}
                  value={firstName}
                />
              </WrappedField>

              <WrappedField
                field='lastName'
                errors={errors}
              >
                <span className='form-label'> Last name </span>
                <input
                  type='text'
                  className='form-input'
                  onChange={this.handleOnChange('lastName')}
                  value={lastName}
                />
              </WrappedField>

              <WrappedField
                field='email'
                errors={errors}
              >
                <span className='form-label'> Email </span>
                <input
                  type='text'
                  className='form-input'
                  onChange={this.handleOnChange('email')}
                  value={email}
                />
              </WrappedField>

              <WrappedField
                field='nonFieldErrors'
                errors={errors}
              />

              <div className='center-text'>
                <PrimaryButton
                  disabled={!isFinished}
                  label={'Sign up with email'}
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

const mapDispatchToProps = {
  getInitialReaderData,
  updateReaderData,
  checkFields,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpModal)
