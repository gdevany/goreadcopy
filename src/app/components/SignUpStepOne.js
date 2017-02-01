import React, { PureComponent } from 'react'
import SignUpButtons from './SignUpButtons'

class SignUpStepOne extends PureComponent {
  handleFormSubmit = (event) => {
    event.preventDefault()
    const buttonText = document.activeElement.getAttribute('value')
    if ((buttonText === 'Next') || (buttonText === 'Finish')) {
      this.props.handleSubmit(this.refs)
      this.props.handleNext()
    } else if (buttonText === 'Back') {
      this.props.handlePrev()
    }
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleFormSubmit}
          className='form-wrapper general-font'
        >
          <div className='form-input-wrapper'>
            <span className='form-label'> User ID </span>
            <input type='text' ref='userId' className='form-input' />
          </div>
          <div className='form-input-wrapper'>
            <span className='form-label'> Create Password </span>
            <input type='password' ref='password' className='form-input' />
          </div>
          <div className='form-input-wrapper'>
            <span className='form-label'> Confirm Password </span>
            <input type='password' ref='password-confirm' className='form-input'/>
          </div>
          <div className='center-text'>
            <SignUpButtons />
          </div>
        </form>
      </div>
    )
  }
}

export default SignUpStepOne
