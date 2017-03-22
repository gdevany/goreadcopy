import React, { Component } from 'react'

class ChatFrame extends Component {
  render() {
    return (
      <iframe src='http://127.0.0.1:8000/chat' />
    )
  }
}

export default ChatFrame
