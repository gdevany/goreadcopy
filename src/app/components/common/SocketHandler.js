import { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Chat } from '../../services/api/currentReader'
import { Env } from '../../constants'

const { sendHeartbeat } = Chat

let socket, interval
const uri = Env.SOCKET_URL
const pingTime = 5000

class SocketHandler extends PureComponent {
  componentDidMount() {
    socket = new WebSocket(uri)
    socket.onopen = this.onConnectionOpen
    socket.onmessage = this.onConnectionMessage
    socket.onerror = this.onConnectionError
    socket.onclose = this.onConnectionClose
  }

  componentWillUnmount() {
    if (interval) {
      clearInterval(interval)
    }
    socket.close()
  }

  onConnectionOpen() {
    interval = setInterval(() => { sendHeartbeat({ _: Date.now() }) }, pingTime)
  }

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
