import { PureComponent } from 'react'
import { connect } from 'react-redux'

let socket
const host = 'localhost:8000'
const uri = `ws://${host}/ws/userprofile?subscribe-user`

class SocketHandler extends PureComponent {
  componentDidMount() {
    socket = new WebSocket(uri)
    socket.onopen = this.onConnectionOpen
    socket.onmessage = this.onConnectionMessage
    socket.onerror = this.onConnectionError
    socket.onclose = this.onConnectionClose
  }

  componentWillUnmount() {
    socket.close()
  }

  onConnectionOpen() {}

  onConnectionMessage(message) {
    switch (message.type) {
      case 'activity':
        // Handle activity message
        console.log(message.data)
        break
      case 'chat-notification':
        // Handle chat notification
        console.log(message.data)
        break
      case 'activity-notification':
        // Handle activity notification
        console.log(message.data)
        break
      case 'chat':
        // Handle chat
        console.log(message.data)
        break
      case 'online-status':
        // Handle online status
        console.log(message.data)
        break
      default:
        console.log(message.data)
    }
  }

  onConnectionError() {}

  onConnectionClose() {}

  render() {
    return null
  }
}

export default connect(null, null)(SocketHandler)
