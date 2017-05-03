import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Chat } from '../../../redux/actions'

const {
  getChatContacts,
  openChatConversation,
} = Chat

class ContactsPopupWindow extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isUsersContainerOpen: false,
    }

    this.handleWindowTabClick = this.handleWindowTabClick.bind(this)
  }

  componentDidMount() {
    this.props.getChatContacts()
  }

  handleWindowTabClick = (event) => {
    event.preventDefault()
    const { isUsersContainerOpen } = this.state
    if (isUsersContainerOpen) {
      this.setState({
        isUsersContainerOpen: false
      })
    } else {
      this.setState({
        isUsersContainerOpen: true
      })
    }
  }

  handleContactClick = (idx, e) => {
    event.preventDefault()
    this.props.openChatConversation(idx)
  }

  renderOnlineUsers(users) {
    const onlineUsers = users.filter(user => user.isOnline)
    return onlineUsers.map(user => {
      return (
        <div
          className='chat-single-user'
          key={user.pk}
          onClick={(e) => this.handleContactClick(user.pk, e)}
        >
          <figure className='chat-single-user-figure'>
            <img src={user.imageUrl}/>
          </figure>
          <div className='chat-single-user-name'>
            <span>{user.fullname}</span>
          </div>
          <figure className='chat-single-message-figure'>
            <img src='/image/online-icon.png'/>
          </figure>
        </div>
      )
    })
  }

  renderOfflineUsers(users) {
    const offlineUsers = users.filter(user => !user.isOnline)
    return (
      <div className='offline-users-container'>
        <span className='offline-users-title'>{`Offline (${offlineUsers.length})`}</span>
        {
          offlineUsers.map(user => {
            return (
              <div
                className='single-offline-user'
                key={user.pk}
                onClick={(e) => this.handleContactClick(user.pk, e)}
              >
                <figure className='chat-single-user-figure'>
                  <img src={user.imageUrl}/>
                </figure>
                <div className='chat-single-user-name'>
                  <span>{user.fullname}</span>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

  render() {
    const { isUsersContainerOpen } = this.state
    const { contacts } = this.props

    return (
      <section className='online-users-chats-container'>
        <div
          className={`${isUsersContainerOpen ?
            'online-users-chats-small chats-open' : 'online-users-chats-small'}`
          }
        >
          <div
            onClick={this.handleWindowTabClick}
            className='small-chat-container'
          >
            {isUsersContainerOpen ?
              (
                <figure className='online-users-chat-icon-close'>
                  <img src='/image/close.png'/>
                </figure>
              ) : (
                <figure className='online-users-chat-icon'>
                  <img src='/image/online-icon.png'/>
                </figure>
              )
            }
            <span className='online-users-main-text'>
              Chat
            </span>
            {
              contacts ? (
                <div>
                  <span className='online-users-divider'>•</span>
                  <span className='online-users-count'>
                    { contacts.filter(user => user.isOnline).length }
                  </span>
                </div>
              ) : null
            }
          </div>
          {
            isUsersContainerOpen && contacts ? (
              <div className='chat-users-container'>
                { this.renderOnlineUsers(contacts) }
                { this.renderOfflineUsers(contacts) }
              </div>
            ) : null
          }
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({
  chat: {
    contacts
  }
}) => {
  return {
    contacts
  }
}

const mapDispatchToProps = {
  getChatContacts,
  openChatConversation
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPopupWindow)
