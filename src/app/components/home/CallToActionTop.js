import React, { PureComponent } from 'react'
import { PrimaryButton, SignUpModal } from '../common'

class CallToActionTop extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      modalOpen: false,
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
    return (
      <div className='center-text header'>

        <div className='slide-up text-on-landing-container'>
          <h1>
            Where readers hang out, connect & discover their next book!
          </h1>
          <h2 className='first-h2-on-landing'>
            Joining Is Free, It’s A Social Media Website!
          </h2>
          <span className='middle-small-text'>For a limited time:</span>
          <h2 className='second-h2-on-landing'>
            Get Your First Book Free, Just For Creating An Account!
          </h2>

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

export default CallToActionTop
