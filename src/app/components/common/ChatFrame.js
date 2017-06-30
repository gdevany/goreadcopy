import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Env from '../../constants/env'
class ChatFrame extends Component {
  render() {
    const { modalOpen, handleClose } = this.props
    const classString = 'chatbox ' + (modalOpen ? 'open' : '')
    return (
      <div className={classString}>
        <a
          className='chatbox-btn-close'
          onClick={handleClose}
        >
          x
        </a>
        <iframe
          src={`${Env.API_URL}/chat`}
        />
      </div>
    )
  }
}

ChatFrame.propTypes = {
  modalOpen: PropTypes.bool,
  handleClose: PropTypes.func
}

ChatFrame.defaultProps = {
  modalOpen: false,
  handleClose: null
}

export default ChatFrame
