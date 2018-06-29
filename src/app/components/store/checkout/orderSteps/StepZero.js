import React, { PureComponent } from 'react'
import { PrimaryButton } from '../../../common'
import { LoginForm, FullSignUpForm } from '../../../common/data/forms'
import PropTypes from 'prop-types'

class StepZero extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showDefaultView: true
    }
  }

  constructDefaultView = () => {
    return (
      <div className='row'>
        <div className='small-12 medium-offset-3 medium-6 columns'>
          <div className='center-text'>
            <h3 className='large-header'> New members continue to checkout: </h3>
            <PrimaryButton
              label={'Checkout'}
              onClick={() => {this.setState({ showDefaultView: false })}}
            />
          </div>
          <hr/>
          <div className='center-text'>
            <h3 className='large-header'> GoRead Current Members Please Sign In: </h3>
            <LoginForm onSuccess={this.props.onLoginSuccess} />
          </div>
        </div>
      </div>
    )
  }

  constructNewMemberView = () => {
    return (
      <div className='row'>
        <div className='small-12 medium-offset-3 medium-6 columns'>
          <div className='center-text'>
            <h3 className='large-header'>
              Please, fill in the following fields:
            </h3>
          </div>
          <FullSignUpForm
            onSuccess={this.props.onAccountCreation}
          />
        </div>
      </div>
    )
  }

  render() {
    const { showDefaultView } = this.state
    return showDefaultView ?
      this.constructDefaultView() :
      this.constructNewMemberView()
  }
}

StepZero.propTypes = {
  onAccountCreation: PropTypes.func,
}

export default StepZero
