import React, { PureComponent } from 'react'
import { PrimaryButton, SignUpModal } from '../common'

class CallToActionBottom extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
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
    return (
      <div className='center-text call-to-action-wrapper'>
        <h1 className='general-font'>
          Ready to join?
        </h1>
        <br />
        <PrimaryButton
          label='Sign Up'
          onClick={this.handleOpen}
        />
        <SignUpModal
          modalOpen={this.state.modalOpen}
          handleClose={this.handleClose}
        />
        <br />
      </div>
    )
  }
}

export default CallToActionBottom
