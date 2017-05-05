import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Chat } from '../../../redux/actions'

let intervalId
const refreshTime = 60000
const maxPostLength = 35

const {
  openChatConversation,
} = Chat

class LatestMessagePopupWindow extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      filter: ''
    }
    this.timer = this.timer.bind(this)
    this.onFilterChange = this.onFilterChange.bind(this)
    this.filterChatlist = this.filterChatlist.bind(this)
    this.handleContactClick = this.handleContactClick.bind(this)
  }

  componentDidMount() {
    intervalId = setInterval(this.timer, refreshTime)
  }

  componentWillUnmount() {
    clearInterval(intervalId)
  }

  timer() {
    this.forceUpdate()
  }

  filterChatlist(contact) {
    const { filter } = this.state
    const {
      fullname,
      lastMessage: {
        body, timestamp
      }
    } = contact

    if (filter) {
      return body && timestamp && fullname.toLowerCase().includes(filter.toLowerCase())
    }
    return body && timestamp
  }

  sortChatlist(current, next) {
    return next.lastMessage.timestamp - current.lastMessage.timestamp
  }

  summarizeMessage(text) {
    if (text.length > maxPostLength) { return `${ text.substr(0, maxPostLength) }...` }
    return text
  }

  handleContactClick(idx, event) {
    event.preventDefault()
    this.props.openChatConversation(idx)
  }

  renderMessageList(contacts) {
    const latestMessagingContacts = contacts.filter(this.filterChatlist)
    latestMessagingContacts.sort(this.sortChatlist)
    return latestMessagingContacts.map((el) => {
      return (
        <div
          className='single-chat-element-container'
          key={el.pk}
          onClick={(e) => this.handleContactClick(el.pk, e)}
        >
          <figure className='single-chat-avatar-figure'>
            <img src={el.imageUrl}/>
          </figure>
          <div className='single-chat-details-container'>
            <div className='single-chat-actor-name-container'>
              <a className='single-chat-actor-name'>
                {el.fullname}
                {
                  el.unreadMessages > 0 ? (
                    <div className='has-messages-chat'>
                      <span>•</span>
                      <figure>
                        <img src='/image/unread-chat-icon.svg'/>
                        <span className='unread-counter'>
                          {el.unreadMessages}
                        </span>
                      </figure>
                    </div>
                  ) : null
                }
              </a>
              <div className='single-chat-timestamp-container'>
                <span className='single-chat-timestamp-element'>
                  {moment(moment.unix(el.lastMessage.timestamp)).fromNow()}
                </span>
              </div>
            </div>
            <div className='single-chat-message-preview-container'>
              <p className='single-chat-message-preview'>
                { this.summarizeMessage(el.lastMessage.body) }
              </p>
            </div>
          </div>
        </div>
      )
    })
  }

  onFilterChange(e) {
    this.setState({ filter: e.target.value })
  }

  render() {
    const { contacts } = this.props
    return (
      <section className='chat-frame-main-container'>
        <section className='chats-frame-container'>
          <div className='search-users-container'>
            <form className='search-users-form'>
              <input
                type='text'
                className='search-users-input'
                placeholder='Search name to chat...'
                value={this.state.filter}
                onChange={this.onFilterChange}
              />
              <img className='search-icon-element' src='/image/search-icon.svg'/>
            </form>
          </div>
          <div className='chat-user-results'>
            { contacts ? this.renderMessageList(contacts) : null }
          </div>
        </section>
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
  openChatConversation
}

export default connect(mapStateToProps, mapDispatchToProps)(LatestMessagePopupWindow)
