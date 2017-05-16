import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Chat as ChatServices } from '../../services/api/currentReader'
import { Env } from '../../constants'
import { Chat as ChatActions, Notifications as NotificationsActions } from '../../redux/actions'
import R from 'ramda'
import Sound from 'react-sound'
//import NotificationSound from '../../../client/media/sounds/notification.mp3'

const { sendHeartbeat } = ChatServices
const {
  updateOnlineStatus,
  updateUnreadChatNumber,
  appendReceivedChatMessage
} = ChatActions
const {
  updateUnreadNotificationNumber
} = NotificationsActions

let socket, interval
const uri = Env.SOCKET_URL
const pingTime = 5000
//HARDCODED - TO FIX LATER
const NotificationSound = '/media/sounds/notification.mp3'

const cmp = (x, y) => x[0] === y[0] && x[1] === y[1]

class SocketHandler extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      playStatus: Sound.status.STOPPED
    }
    this.processStatusDiff = this.processStatusDiff.bind(this)
    this.onConnectionMessage = this.onConnectionMessage.bind(this)
    this.handleSongFinishedPlaying = this.handleSongFinishedPlaying.bind(this)
    this.playNotificationSound = this.playNotificationSound.bind(this)
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

  handleSongFinishedPlaying() {
    this.setState({ playStatus: Sound.status.STOPPED })
  }

  playNotificationSound(id) {
    const { isMessagesOpen, isContactsOpen, conversations } = this.props
    const chatInstance = id ? R.find(R.propEq('id', id), conversations) : null
    if (isMessagesOpen || isContactsOpen) { return }
    if (id && chatInstance && chatInstance.isOpen) { return }
    this.setState({ playStatus: Sound.status.PLAYING })
  }

  onConnectionMessage(post) {
    let diff = null
    const heartbeat = '--heartbeat--'
    const message = post.data !== heartbeat ? JSON.parse(post.data) : {}
    switch (message.type) {
      case 'activity':
        // Handle activity message
        //console.log('Activity', message.data)
        break
      case 'chat-notification':
        // Handle received notifications for unread chats.
        this.props.updateUnreadChatNumber(message)
        this.playNotificationSound(message.sender)
        break
      case 'activity-notification':
        // Handle activity notification
        this.props.updateUnreadNotificationNumber(message.data)
        this.playNotificationSound()
        break
      case 'chat':
        // Handle received chat posts for conversations.
        this.props.appendReceivedChatMessage(message.data)
        this.playNotificationSound(message.data.sender)
        break
      case 'online-status':
        // Handle received messages for changes on contact's statuses.
        diff = this.processStatusDiff(message.data)
        if (diff && diff.length > 0) {
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
    return (
      <Sound
        url={NotificationSound}
        playStatus={this.state.playStatus}
        playFromPosition={0}
        onFinishedPlaying={this.handleSongFinishedPlaying}
      />
    )
  }
}

const mapStateAsProps = ({
  chat: {
    contacts,
    conversations,
    isMessagesOpen,
    isContactsOpen,
  }
}) => {
  return {
    contacts,
    conversations,
    isMessagesOpen,
    isContactsOpen,
  }
}

const mapDispatchAsProps = {
  updateOnlineStatus,
  updateUnreadChatNumber,
  appendReceivedChatMessage,
  updateUnreadNotificationNumber,
}

export default connect(mapStateAsProps, mapDispatchAsProps)(SocketHandler)
