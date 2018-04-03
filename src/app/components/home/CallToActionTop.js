import React, { PureComponent } from 'react'
import { PrimaryButton, SignUpModal, SoldBookCounter } from '../common'

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
            Buy A Book, We Give A Book!
          </h1>
          <h2 className='second-h2-on-landing medium-sized-text'>
            {'Total Books Given To Kids: '}
            <SoldBookCounter />
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
