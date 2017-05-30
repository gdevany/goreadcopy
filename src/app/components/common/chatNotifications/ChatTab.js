import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Chat as ChatActions } from '../../../redux/actions'
import { Chat as ChatServices } from '../../../services/api/currentReader'
import moment from 'moment'
import R from 'ramda'
import { LoadingSpinner } from '../'

const {
  loadChatConversation,
  postChatMessage,
  closeChatConversation,
  updateOpenedConversation,
  toggleChatWindow,
} = ChatActions

const {
  updateReadConversation,
  getChatConversation
} = ChatServices

class ChatTab extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isTextAreaOpen: true,
      message: '',
      textarea: null,
      container: null,
      containerMobile: null,
    }

    this.locals = {
      isLockedForUpdateRead: false,
      isLockedForChatLoading: false,
      focusTextArea: true,
    }

    this.handleChatClick = this.handleChatClick.bind(this)
    this.handleOpenTextArea = this.handleOpenTextArea.bind(this)
    this.handleCloseTextArea = this.handleCloseTextArea.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleCloseChatTab = this.handleCloseChatTab.bind(this)
    this.onTextChange = this.onTextChange.bind(this)
    this.onTextFieldBlur = this.onTextFieldBlur.bind(this)
    this.onMessagePost = this.onMessagePost.bind(this)
    this.postMessage = this.postMessage.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)
    this.updateConversationReadStatus = this.updateConversationReadStatus.bind(this)
    this.checkIfChatUpdate = this.checkIfChatUpdate.bind(this)
    this.updateChatConversation = this.updateChatConversation.bind(this)
    this.handleWheelScroll = this.handleWheelScroll.bind(this)
  }

  componentDidMount() {
    this.updateChatConversation()
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom(this.state.container)
    this.scrollToBottom(this.state.containerMobile)
    this.updateConversationReadStatus()
    this.updateFocusTextArea()
    this.checkIfChatUpdate(prevProps)
  }

  checkIfChatUpdate(prevProps) {
    if (
      !this.locals.isLockedForChatLoading &&
      this.props.id !== prevProps.id &&
      this.props.history &&
      !this.props.history.conversation
    ) {
      this.updateChatConversation()
    }
  }

  updateChatConversation() {
    this.locals.isLockedForChatLoading = true
    getChatConversation({ contact: this.props.id })
      .then(res=>this.props.loadChatConversation({
        id: this.props.id,
        data: res.data
      }))
      .then(() => { this.locals.isLockedForChatLoading = false })
      .catch(err=>console.log(err))
  }

  updateFocusTextArea() {
    const { focusTextArea } = this.locals
    const { textarea } = this.state
    if (focusTextArea && textarea) {
      this.locals.focusTextArea = false
      textarea.focus()
    }
  }

  updateConversationReadStatus() {
    const { user: { unreadMessages, pk }, history: { conversation }, isOpen } = this.props
    const { isLockedForUpdateRead } = this.locals
    if (
      unreadMessages && isOpen &&
      conversation && conversation.length > 0 &&
      !isLockedForUpdateRead
    ) {
      this.locals.isLockedForUpdateRead = true
      updateReadConversation({ contact: pk })
        .then(this.props.updateOpenedConversation({ contact: pk }))
        .then(()=>{ this.locals.isLockedForUpdateRead = false })
        .catch(err=>console.log(err))
    }
  }

  scrollToBottom(container) {
    if (!container) { return }
    const scrollHeight = container.scrollHeight
    const height = container.clientHeight
    const maxScrollTop = scrollHeight - height
    container.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
  }

  handleChatClick(event) {
    event.preventDefault()
    const { isOpen, id } = this.props
    this.props.toggleChatWindow(id)
    if (isOpen) {
      this.setState({
        isTextAreaOpen: false
      })
    } else {
      this.locals.focusTextArea = true
      this.setState({ isTextAreaOpen: true })
    }
  }

  handleOpenTextArea(event) {
    event.preventDefault()
    this.setState({
      isTextAreaOpen: true
    })
  }

  handleCloseChatTab(event) {
    event.preventDefault()
    const { id } = this.props
    if (id) { this.props.closeChatConversation(id) }
  }

  handleCloseTextArea(event) {
    event.preventDefault()
    this.setState({
      isTextAreaOpen: false
    })
  }

  handleKeyDown(event) {
    const code = event.key
    switch (code) {
      case 'Enter':
        event.preventDefault()
        this.postMessage()
        break
      default:
        return
    }
  }

  onTextChange(event) {
    event.preventDefault()
    this.setState({
      message: event.target.value
    })
  }

  postMessage() {
    const { message } = this.state
    const { id } = this.props
    if (message && id) {
      this.props.postChatMessage({ message, recipient: id })
      this.setState({ message: '' })
    }
  }

  onMessagePost(event) {
    event.preventDefault()
    this.postMessage()
  }

  onTextFieldBlur(event) {
    this.setState({ isTextAreaOpen: false })
  }

  handleWheelScroll(e) {
    if (this.state.container) {
      const { container } = this.state
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

  splitConversation(list) {
    let split = null, temp = []
    split = []
    for (let i = 0; i < list.length; i++) {
      if (i === 0) {
        temp.push(list[i])
        if (i === list.length - 1) {
          split.push(temp)
        }
        continue
      }
      if (list[i].sender === list[i - 1].sender) {
        temp.push(list[i])
      } else {
        split.push(temp)
        temp = []
        temp.push(list[i])
      }
      if (i === list.length - 1) {
        split.push(temp)
      }
    }
    return split
  }

  renderContactPostList(posts, user, index) {
    return (
      <div key={index} className='conversation-extrange'>
        <figure className='conversation-extrange-figure'>
          <img src={user.imageUrl}/>
        </figure>
        <div className='conversation-extrange-chat-container'>
          {
            posts.map((post, idx)=>{
              return (
                <p key={idx} className='conversation-extrange-pharagraph'>
                  { post.body }
                </p>
              )
            })
          }
        </div>
        <div className='timestamp-container'>
          <span>{ moment(moment.unix(R.last(posts).timestamp)).fromNow() }</span>
        </div>
      </div>
    )
  }

  renderOwnPostList(posts, index) {
    return (
      <div key={index} className='conversation-me'>
        <div className='conversation-me-chat-container'>
          {
            posts.map((post, idx)=>{
              return (
                <p key={idx} className='conversation-me-pharagraph'>
                  { post.body }
                </p>
              )
            })
          }
        </div>
        <div className='timestamp-container'>
          <span>{ moment(moment.unix(R.last(posts).timestamp)).fromNow() }</span>
        </div>
      </div>
    )
  }

  renderConversation(history, contactId, user) {
    const blocks = this.splitConversation(history.conversation)
    return blocks.map((block, idx, arr)=>{
      const userID = R.last(block).sender
      if (userID === contactId) {
        return this.renderContactPostList(block, user, idx)
      }
      return this.renderOwnPostList(block, idx)
    })
  }

  render() {
    const { isTextAreaOpen } = this.state
    const { id, history, user, isOpen } = this.props

    return (
      <div className='active-chat-main-container-mobile'>
        <section className='active-chat-container-mobile'>
          <div className='active-main-chat-container'>
            <figure className='active-chat-icon-close' onClick={this.handleCloseChatTab}>
              <img src='/image/close.png'/>
            </figure>
            <span className='active-chat-user-name'>
              { user.fullname }
            </span>
            {
              user.isOnline ? (
                <figure className='active-chat-has-mesagges-icon'>
                  <img src='/image/online-icon.png'/>
                </figure>
              ) : null
            }
          </div>

          <div className='active-chat-conversation-window'>
            <div
              className='active-chat-in-use'
              onClick={this.handleCloseTextArea}
              ref={(div)=>{this.setState({ containerMobile: div })}}
            >
              {
                history && history.conversation ?
                  this.renderConversation(history, id, user) :
                  <LoadingSpinner size={40} />
              }
            </div>
            <div className={`${isTextAreaOpen ?
              'conversation-textarea-container-open' : 'conversation-textarea-container'}`
              }
            >
              <textarea
                onClick={this.handleOpenTextArea}
                onChange={this.onTextChange}
                placeholder='Type your message'
                value={this.state.message}
              />
              {isTextAreaOpen ?
                (
                  <a href='#' className='conversation-send-btn' onClick={this.onMessagePost}>
                    Send
                  </a>
                ) : null
              }
            </div>
          </div>
        </section>
        <section className='active-chat-container'>
          <div
            className={`${isOpen ?
              'active-chat-small chat-open' : 'active-chat-small'}`
            }
          >
            <div
              onClick={this.handleChatClick}
              className='active-main-chat-container'
            >
              {isOpen ?
                (
                  <figure className='active-chat-icon-close' onClick={this.handleCloseChatTab}>
                    <img src='/image/close.png'/>
                  </figure>
                ) : user.isOnline ? (
                  <figure className='active-chat-has-mesagges-icon'>
                    <img src='/image/online-icon.png'/>
                  </figure>
                ) : null
              }
              <span className='active-chat-user-name'>
                { user.fullname }
              </span>
              {isOpen && user.isOnline ?
                (
                  <figure className='active-chat-has-mesagges-icon'>
                    <img src='/image/online-icon.png'/>
                  </figure>
                ) : null}
            </div>
            {isOpen ?
              (
                <div className='active-chat-conversation-window'>
                  <div
                    className='active-chat-in-use'
                    onClick={this.handleCloseTextArea}
                    ref={div=>{this.setState({ container: div })}}
                    onWheel={e=>{this.handleWheelScroll(e)}}
                  >
                    {
                      history && history.conversation ?
                        this.renderConversation(history, id, user) :
                        <LoadingSpinner size={40} />
                    }
                  </div>
                  <div className={`${isTextAreaOpen ?
                    'conversation-textarea-container-open' : 'conversation-textarea-container'}`
                    }
                  >
                    <textarea
                      ref={(textarea)=>{this.setState({ textarea })}}
                      onClick={this.handleOpenTextArea}
                      onBlur={this.onTextFieldBlur}
                      onChange={this.onTextChange}
                      placeholder='Type your message'
                      value={this.state.message}
                      onKeyDown={this.handleKeyDown}
                    />
                  </div>
                </div>
              ) : null
            }
          </div>
        </section>
      </div>
    )
  }
}

ChatTab.propTypes = {
  id: React.PropTypes.number.isRequired,
  history: React.PropTypes.object.isRequired,
  isOpen: React.PropTypes.bool,
}

ChatTab.defaultProps = {
  history: {},
  isOpen: false,
}

const mapDispatchToProps = {
  loadChatConversation,
  postChatMessage,
  closeChatConversation,
  updateOpenedConversation,
  toggleChatWindow,
}

const mapStateToProps = ({
  chat: {
    conversations,
    contacts
  }
}) => {
  return {
    conversations,
    contacts
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatTab)
