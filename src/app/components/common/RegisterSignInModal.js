import React, { Component } from 'react'
import { Dialog } from 'material-ui'
import { SignUpModal, LogInModal } from './'

const styles = {
  modalBody: {
    marginTop: -80,
  },
  modalContent: {
    maxWidth: '100%',
  },
}

class RegisterSignInModal extends Component {

  constructor(props) {
    super(props)

    this.state = {
      modalLogInOpen: false,
      modalRegisterOpen: false,
    }

    this.handleLogInModalClose = this.handleLogInModalClose.bind(this)
    this.handleRegisterModalClose = this.handleRegisterModalClose.bind(this)
  }

  handleLogInModalClose = () => {
    this.setState({ modalLogInOpen: false })
  }

  handleLogInModalOpen = (event) => {
    event.preventDefault()
    this.props.handleClose()
    this.setState({ modalLogInOpen: true })
  }

  handleRegisterModalClose = () => {
    this.setState({ modalRegisterOpen: false })
  }

  handleRegisterModalOpen = (event) => {
    event.preventDefault()
    this.props.handleClose()
    this.setState({ modalRegisterOpen: true })
  }

  render() {
    const {
      modalOpen,
      handleClose,
    } = this.props
    return (
      <div>
        <Dialog
          bodyClassName='register-sign-in-modal'
          bodyStyle={styles.modalBody}
          contentStyle={styles.modalContent}
          modal={true}
          open={modalOpen}
          onRequestClose={handleClose}
          autoDetectWindowHeight={false}
          autoScrollBodyContent={true}
        >
          <img
            src='/image/close.png'
            className='general-font center-text search-modal-x'
            onClick={handleClose}
          />
          <div className='register-sign-in-modal-container'>
            <figure className='logo-container-figure'>
              <img src='/image/logo.png'/>
            </figure>
            <p>Where readers and authors come together</p>
            <div className='register-sign-btns-container'>
              <div className='register-sign-in-buttons-container'>
                <a
                  className='sign-in-button'
                  onClick={this.handleLogInModalOpen}
                >
                  Log In
                </a>
              </div>
              <div className='register-sign-in-buttons-container'>
                <a
                  className='register-button'
                  onClick={this.handleRegisterModalOpen}
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        </Dialog>
        <LogInModal
          modalOpen={this.state.modalLogInOpen}
          handleClose={this.handleLogInModalClose}
        />
        <SignUpModal
          modalOpen={this.state.modalRegisterOpen}
          handleClose={this.handleRegisterModalClose}
        />
      </div>
    )
  }
}

export default RegisterSignInModal
