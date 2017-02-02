import React, { PureComponent } from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import SignUpButtons from './SignUpButtons'
import { updateUserData, createUser } from '../redux/actions/userData'

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
    // TODO: should probably refactor out separate step handling to
    // individual steps instead of having conditional logic here...

    const data = R.map(R.prop('value'), this.refs)

    if (buttonText === 'Next') {
      this.props.updateUserData(data)
      this.props.createUser()
      // TODO: consider error handling + validations?
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
              <input type='text' ref='username' className='form-input' />
            </div>
            <div className='form-input-wrapper'>
              <span className='form-label'> Create Password </span>
              <input type='password' ref='password' className='form-input' />
            </div>
            <div className='form-input-wrapper'>
              <span className='form-label'> Confirm Password </span>
              <input type='password' ref='passwordConfirmation' className='form-input'/>
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

const mapStateToProps = R.identity

const mapDispatchToProps = {
  createUser,
  updateUserData,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpStepOne)
