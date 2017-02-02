import React, { PureComponent } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import SignUpModal from './SignUpModal'

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
        <RaisedButton
          backgroundColor='#4A4A4A'
          labelColor='white'
          label='Sign Up'
          onTouchTap={this.handleOpen}
        />
        <SignUpModal
          modalOpen={this.state.modalOpen}
          handleClose = {this.handleClose.bind(this)}
        />
        <br />
      </div>
    )
  }
}

export default CallToActionBottom
