import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import moment from 'moment'
import { Chat } from '../../../redux/actions'
import { LoadingSpinner } from '../'

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
    this.locals = {
      container: null
    }
    this.timer = this.timer.bind(this)
    this.onFilterChange = this.onFilterChange.bind(this)
    this.filterChatlist = this.filterChatlist.bind(this)
    this.handleContactClick = this.handleContactClick.bind(this)
    this.handleWheelScroll = this.handleWheelScroll.bind(this)
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
      fullname
    } = contact

    if (filter) {
      return fullname.toLowerCase().includes(filter.toLowerCase())
    }
    return true
  }

  sortChatlist(current, next) {
    const a = current.lastMessage.timestamp
    const b = next.lastMessage.timestamp
    const x = current.fullname.toLowerCase()
    const y = next.fullname.toLowerCase()

    if (a && b) { return b - a }
    if (!a && b) { return 1 }
    if (a && !b) { return -1 }
    return x < y ? -1 : x > y ? 1 : 0
  }

  summarizeMessage(text) {
    if (!text) { return '' }
    if (text.length > maxPostLength) { return `${ text.substr(0, maxPostLength) }...` }
    return text
  }

  handleContactClick(idx, event) {
    event.preventDefault()
    this.props.openChatConversation(idx)
    this.props.showMethod()
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
            <Link to={el.url} onClick={e=>e.stopPropagation()}>
              <img src={el.imageUrl}/>
            </Link>
          </figure>
          <div className='single-chat-details-container'>
            <div className='single-chat-actor-name-container'>
              <a className='single-chat-actor-name'>
                { el.fullname }
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
                  {
                    el.lastMessage.timestamp ?
                      moment(moment.unix(el.lastMessage.timestamp)).fromNow() :
                      ''
                  }
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
          <div
            className='chat-user-results'
            onWheel={e=>{this.handleWheelScroll(e)}}
            ref={cont=>{this.locals.container = cont}}
          >
            {
              contacts ?
                this.renderMessageList(contacts) :
                <LoadingSpinner size={40} />
            }
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
