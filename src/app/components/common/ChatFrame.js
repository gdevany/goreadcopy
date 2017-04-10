import React, { Component } from 'react'
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
          src={`${Env.API_URL === 'https://staging2.readerslegacy.com' ?
          'https://staging2.readerslegacy.com/chat' : 'https://www.goread.com/chat'}`
          }
        />
      </div>
    )
  }
}

ChatFrame.propTypes = {
  modalOpen: React.PropTypes.bool,
  handleClose: React.PropTypes.func
}

ChatFrame.defaultProps = {
  modalOpen: false,
  handleClose: null
}

export default ChatFrame
