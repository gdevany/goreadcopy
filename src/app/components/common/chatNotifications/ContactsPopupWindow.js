import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Chat } from '../../../redux/actions'
import R from 'ramda'

const {
  getChatContacts,
  openChatConversation,
  toggleContactsPopup,
} = Chat

const compareByProp = (prop, a, b) => {
  const x = a[prop].toLowerCase()
  const y = b[prop].toLowerCase()
  return x < y ? -1 : x > y ? 1 : 0
}

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
    this.props.toggleContactsPopup()
  }

  handleContactClick = (idx, event) => {
    event.preventDefault()
    this.props.openChatConversation(idx)
  }

  renderOnlineUsers(users) {
    let onlineUsers = []
    onlineUsers = users.filter(user => user.isOnline)
    onlineUsers.sort(R.curry(compareByProp)('fullname'))
    return onlineUsers.map(user => {
      return (
        <div
          className='chat-single-user'
          key={user.pk}
          onClick={(e) => this.handleContactClick(user.pk, e)}
        >
          <div className='chat-single-user-left'>
            <figure className='chat-single-user-figure'>
              <img src={user.imageUrl}/>
            </figure>
            <div className='chat-single-user-name'>
              <span>{user.fullname}</span>
            </div>
          </div>
          <figure className='chat-single-message-figure'>
            <img src='/image/online-icon.png'/>
          </figure>
        </div>
      )
    })
  }

  renderOfflineUsers(users) {
    let offlineUsers = []
    offlineUsers = users.filter(user => !user.isOnline)
    offlineUsers.sort(R.curry(compareByProp)('fullname'))
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
    const { contacts, isContactsOpen } = this.props

    return (
      <section className='online-users-chats-container'>
        <div
          className={`${isContactsOpen ?
            'online-users-chats-small chats-open' : 'online-users-chats-small'}`
          }
        >
          <div
            onClick={this.handleWindowTabClick}
            className='small-chat-container'
          >
            {isContactsOpen ?
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
            isContactsOpen && contacts ? (
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
    contacts,
    isContactsOpen,
  }
}) => {
  return {
    contacts,
    isContactsOpen
  }
}

const mapDispatchToProps = {
  getChatContacts,
  openChatConversation,
  toggleContactsPopup,
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPopupWindow)
