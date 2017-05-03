import { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Chat as ChatServices } from '../../services/api/currentReader'
import { Env } from '../../constants'
import { Chat as ChatActions } from '../../redux/actions'
import R from 'ramda'

const { sendHeartbeat } = ChatServices
const { updateOnlineStatus } = ChatActions

let socket, interval
const uri = Env.SOCKET_URL
const pingTime = 5000

const cmp = (x, y) => x[0] === y[0] && x[1] === y[1]

class SocketHandler extends PureComponent {
  constructor(props) {
    super(props)
    this.processStatusDiff = this.processStatusDiff.bind(this)
    this.onConnectionMessage = this.onConnectionMessage.bind(this)
  }

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

  processStatusDiff(receivedStatus) {
    if (!this.props.contacts) { return null }
    const currentStatus = this.props.contacts.map(el=>[el.pk, el.isOnline])
    const newStatus = R.toPairs(receivedStatus).map(el=>[Number(el[0]), el[1]])
    const diff = R.differenceWith(cmp, newStatus, currentStatus)
    return diff.map(n=>{ return { pk: n[0], isOnline: n[1] } })
  }

  onConnectionMessage(post) {
    let diff = null
    const heartbeat = '--heartbeat--'
    const message = post.data !== heartbeat ? JSON.parse(post.data) : {}
    switch (message.type) {
      case 'activity':
        // Handle activity message
        //console.log(message.data)
        break
      case 'chat-notification':
        // Handle chat notification
        //console.log(message.data)
        break
      case 'activity-notification':
        // Handle activity notification
        //console.log(message.data)
        break
      case 'chat':
        // Handle chat
        console.log(message.data)
        break
      case 'online-status':
        diff = this.processStatusDiff(message.data)
        if (diff && diff.length > 0) {
          console.log('Diffed', diff)
          this.props.updateOnlineStatus(diff)
        }
        break
      default:
        return
    }
  }

  onConnectionError() {}

  onConnectionClose() {}

  render() {
    return null
  }
}

const mapStateAsProps = ({
  chat: {
    contacts,
    conversations
  }
}) => {
  return {
    contacts,
    conversations
  }
}

const mapDispatchAsProps = {
  updateOnlineStatus
}

export default connect(mapStateAsProps, mapDispatchAsProps)(SocketHandler)
