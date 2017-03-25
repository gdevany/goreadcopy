import React, { Component } from 'react'

class ChatFrame extends Component {
  render() {
    const { modalOpen } = this.props
    const classString = 'chatbox ' + (modalOpen ? 'open' : '')
    return (
      <div className={classString}>
        <iframe src='http://127.0.0.1:8000/chat' />
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
