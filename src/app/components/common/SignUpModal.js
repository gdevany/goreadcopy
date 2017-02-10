import React, { PureComponent } from 'react'
import R from 'ramda'
import { Dialog, } from 'material-ui'
import { connect } from 'react-redux'
import { ReaderData } from '../../redux/actions'
import { ExternalRoutes as routes } from '../../constants'
import PrimaryButton from './PrimaryButton'
import SocialButton from './SocialButton'
import WrappedField from './WrappedField'

const { getInitialReaderData, checkFields } = ReaderData

const styles = {
  modalBody: {
    marginTop: -80,
    maxHeight: '100%',
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

class SignUpModal extends PureComponent {
  handleSubmit = (event) => {
    event.preventDefault()
    const fields = R.map(R.prop('value'), this.refs)
    this.props.checkFields(fields)
  }

  render() {
    const {
      errors,
      modalOpen,
      handleClose,
      handleSubmit
    } = this.props

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
        >
          <div
            className='general-font center-text signup-modal-x'
            onClick={handleClose}
          >
            X
          </div>
          <h1 className='center-text'>
            Join GoRead
          </h1>
          <div className='center-text'>
            <SocialButton
              href={routes.providerLogin({ provider: 'facebook' })}
              text={'Sign up with Facebook'}
            />
            <SocialButton
              href={routes.providerLogin({ provider: 'google' })}
              text={'Sign up with Google'}
            />
            <SocialButton
              href={routes.providerLogin({ provider: 'linkedin' })}
              text={'Sign up with Linkedin'}
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
                <input type='text' ref='firstName' className='form-input' />
              </WrappedField>
              <WrappedField
                field='lastName'
                errors={errors}
              >
                <span className='form-label'> Last name </span>
                <input type='text' ref='lastName' className='form-input' />
              </WrappedField>
              <WrappedField
                field='email'
                errors={errors}
              >
                <span className='form-label'> Email </span>
                <input type='email' ref='email' className='form-input'/>
              </ WrappedField>
              <div className='center-text'>
                <PrimaryButton
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

export default connect(mapStateToProps, { getInitialReaderData, checkFields })(SignUpModal)
