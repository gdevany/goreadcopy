import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Chat } from '../../../redux/actions'
import R from 'ramda'

const {
  getChatContacts,
  openChatConversation,
  toggleContactsPopup,
} = Chat

class ContactsPopupWindow extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      filter: ''
    }
    this.locals = {}
    this.handleWindowTabClick = this.handleWindowTabClick.bind(this)
    this.renderOnlineUsers = R.memoize(this.renderOnlineUsers)
    this.renderOfflineUsers = R.memoize(this.renderOfflineUsers)
    this.filterOnline = R.memoize(this.filterOnline)
    this.filterOffline = R.memoize(this.filterOffline)
    this.handleWheelScroll = this.handleWheelScroll.bind(this)
  }

  componentDidMount() {
    this.props.getChatContacts()
  }

  handleWindowTabClick(event) {
    event.preventDefault()
    this.props.toggleContactsPopup()
  }

  handleContactClick(idx, event) {
    event.preventDefault()
    this.props.openChatConversation(idx)
  }

  handleWheelScroll(e) {
    if (this.locals && this.locals.container) {
      const { container } = this.locals
      const { scrollHeight, scrollTop, clientHeight } = container
      const { deltaY } = e

      if (scrollTop + deltaY < 0) {
        e.preventDefault()
        return false
      }
      if (scrollTop + deltaY + clientHeight > scrollHeight) {
        e.preventDefault()
        return false
      }
    }
    return true
  }

  filterOnline(users) {
    return users.filter(user => user.isOnline)
  }

  filterOffline(users) {
    return users.filter(user => !user.isOnline)
  }

  renderOnlineUsers(onlineUsers) {
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

  renderOfflineUsers(offlineUsers) {
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
    const { filter } = this.state
    const { contacts, isContactsOpen } = this.props
    const filteredContacts = filter ?
      contacts.filter(c=>c.fullname.toLowerCase().includes(filter.toLowerCase())) :
      contacts
    const offlineUsers = contacts ? this.filterOffline(filteredContacts) : []
    const onlineUsers = contacts ? this.filterOnline(filteredContacts) : []

    return (
      <section className='online-users-chats-container'>
        <div
          className={
            `${
              isContactsOpen ?
                'online-users-chats-small chats-open' :
                'online-users-chats-small'
            }`
          }
        >
          <div
            onClick={this.handleWindowTabClick}
            className='small-chat-container'
          >
            {
              isContactsOpen ?
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
                    { onlineUsers.length }
                  </span>
                </div>
              ) : null
            }
          </div>
          {
            isContactsOpen && contacts ? (
              <div
                className='chat-users-container'
                onWheel={e=>{this.handleWheelScroll(e)}}
                ref={cont=>{this.locals.container = cont}}
              >
                { this.renderOnlineUsers(onlineUsers) }
                { this.renderOfflineUsers(offlineUsers) }
              </div>
            ) :
            null
          }
          {
            isContactsOpen ? (
              <div className='chat-users-search-input-container'>
                <input
                  type='text'
                  placeholder='Search'
                  className='chat-users-search-input'
                  onChange={e=>this.setState({ filter: e.target.value })}
                  value={this.state.filter}
                />
                <img className='chat-users-search-icon' src='/image/search-icon.svg'/>
              </div>
            ) :
            null
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
