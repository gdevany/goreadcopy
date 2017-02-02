import React, { PureComponent } from 'react'
import SignUpButtons from './SignUpButtons'

const styles = {
  formContainer: {
    backgroundColor: '#fff',
    marginTop: 10,
    maxWidth: 900,
  },
}

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
        <div style={styles.formContainer} className='card front-card'>
          <form
            onSubmit={this.handleFormSubmit}
            className='form-wrapper'
          >
            <h1 className='center-text step-header'>Create your account</h1>
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

        <div className='behind-card-container'>
          <div style={styles.formContainer} className='card behind-card' />
        </div>

      </div>
    )
  }
}

export default SignUpStepOne
