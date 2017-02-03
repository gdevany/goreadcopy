import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import SignUpButtons from './SignUpButtons'
import { updateUserData, createUser } from '../redux/actions/userData'
import R from 'ramda'

const styles = {
  formContainer: {
    backgroundColor: '#fff',
    marginTop: 10,
    maxWidth: 900,
  },
}

class SignUpStepOne extends PureComponent {
  componentWillReceiveProps({ submitSuccessful }) {
    if (submitSuccessful) { this.props.handleNext() }
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    const buttonText = document.activeElement.getAttribute('value')
    const data = R.map(R.prop('value'), this.refs)

    if (buttonText === 'Next') {
      // TODO: consider error handling + validations?
      this.props.updateUserData(data)
      this.props.createUser()
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
              <SignUpButtons
                stepIndex={this.props.stepIndex}
                buttonType='form'
              />
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

const mapStateToProps = R.prop('userData')

const mapDispatchToProps = {
  createUser,
  updateUserData,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpStepOne)
