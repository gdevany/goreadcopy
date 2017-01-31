import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { updateUserData } from '../redux/actions/userData'
import {
  Dialog,
  RaisedButton
} from 'material-ui'

class SignUpModal extends PureComponent {
  handleSubmit = (event) => {
    event.preventDefault()
    const formData = {}
    for (const field in this.refs) {
      formData[field] = this.refs[field].value
    }

    this.props.updateUserData(formData)
  }


  render() {
    const { modalOpen, handleClose, userData } = this.props

    return (
      <div>
        <Dialog
          bodyClassName='signup-modal-content'
          modal={false}
          open={ modalOpen}
          onRequestClose={handleClose}
        >
        <div
          className='general-font center-text signup-modal-x'
          onClick={handleClose}
        >
          X
        </div>
        <div className='general-font general-statement signup-modal-title center-text'>
          Join GoRead
        </div>
        <div className='general-font inner-title center-text'>
          or sign up with email:
        </div>
        <div>
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
              <RaisedButton
                backgroundColor='transparent'
                label='Sign up with email'
                onTouchTap={handleClose}
                type='submit'
              />
            </div>
          </form>
        </div>
        </Dialog>
      </div>
    )
  }
}

export default connect(null, { updateUserData})(SignUpModal)
