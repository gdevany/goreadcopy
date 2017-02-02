import React, { PureComponent } from 'react'
import { RaisedButton } from 'material-ui'
import SignUpModal from './SignUpModal'

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
        <h1>
          Where readers and authors come together
        </h1><br />
        <RaisedButton
          backgroundColor='#4A4A4A'
          className='primary-button'
          labelColor='white'
          label='Sign Up'
          onTouchTap={this.handleOpen}
        />
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
