import React, { PureComponent } from 'react'
import { PrimaryButton, SignUpModal } from '../common'

class CallToActionTop extends PureComponent {
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
      <div className='center-text header'>

        <div className='slide-up'>
          <h1>
            Where readers and authors come together
          </h1><br />

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
