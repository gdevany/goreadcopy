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
    this.setState({ modalOpen: false})
  }

  render() {
    return (
      <div className='center-text call-to-action-wrapper'>
        <h1 className='general-font'>
          Where authors and readers come together
        </h1><br />
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
        <br /> <br />
        <a href='#'>
          Are you an author?
        </a>
      </div>
    )
  }
}

export default CallToActionTop
