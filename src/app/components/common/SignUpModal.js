import React, { PureComponent } from 'react'
import R from 'ramda'
import { Dialog, } from 'material-ui'
import { connect } from 'react-redux'
import { ReaderData } from '../../redux/actions'
import PrimaryButton from './PrimaryButton'

const { getInitialReaderData, checkEmail } = ReaderData

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
    const data = R.map(R.prop('value'), this.refs)
    this.props.checkEmail({ email: data.email }, data)
  }

  render() {
    const { modalOpen, handleClose, handleSubmit } = this.props

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
          <h4 className='inner-title center-text'>
            or sign up with email:
          </h4>
          <div style={styles.formContainer}>
            <form onSubmit={this.handleSubmit} className='form-wrapper general-font'>
              <div className='form-input-wrapper'>
                <span className='form-label'> First name </span>
                <input type='text' ref='firstName' className='form-input' />
              </div>
              <div className='form-input-wrapper'>
                <span className='form-label'> Last name </span>
                <input type='text' ref='lastName' className='form-input' />
              </div>
              <div className='form-input-wrapper'>
                <span className='form-label'> Email </span>
                <input type='email' ref='email' className='form-input'/>
              </div>
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

export default connect(null, { getInitialReaderData, checkEmail })(SignUpModal)
