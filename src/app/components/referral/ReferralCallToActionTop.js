import React, { PureComponent } from 'react'
import { PrimaryButton, SignUpModal } from '../common'

class ReferralCallToActionTop extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      referrerName: false,
      modalOpen: false
    }

    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen = (event) => {
    this.setState({ modalOpen: true })
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  }

  render() {
    const { referrerName } = this.props
    return (
      <div className='center-text header'>

        <div className='slide-up text-on-landing-container'>
          <h1>
            Where readers and authors come together
          </h1>
          <h2 className='first-h2-on-landing'>
            Joining Is Free, It’s A Social Media Website!
          </h2>
          <span className='middle-small-text'>For a limited time:</span>
          <h2>
            Get Your First Book Free, Just For Creating An Account!
          </h2>
          <h1 className='referrer-message'>
            {referrerName} has invited you to join GoRead.
          </h1>

          <PrimaryButton
            label='Sign Up'
            onClick={this.handleOpen}
          />
        </div>

        <SignUpModal
          modalOpen={this.state.modalOpen}
          handleClose={this.handleClose}
        />
        <br /> <br />

      </div>
    )
  }
}

export default ReferralCallToActionTop
