import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Chat as ChatActions } from '../../../redux/actions'
import { Chat as ChatServices } from '../../../services/api/currentReader'
import { ChatHistory } from './'
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
      page: 1,
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
    this.handlePassingReference = this.handlePassingReference.bind(this)
    this.performScroll = this.performScroll.bind(this)
  }

  componentDidMount() {
    const { history } = this.props
    if (history && history.conversation && history.conversation.results) {
      return
    }
    this.updateChatConversation()
      .then(()=>{
        this.performScroll()
      })
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateConversationReadStatus()
    this.updateFocusTextArea()
    this.checkIfChatUpdate(prevProps)
    if (!prevProps.isOpen && this.props.isOpen) {
      this.locals.doScrollToBottom = true
    }
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

  updateChatConversation(page = 1) {
    this.locals.isLockedForChatLoading = true
    return getChatConversation({ contact: this.props.id, page })
      .then(res=>this.props.loadChatConversation({
        id: this.props.id,
        data: res.data
      }))
      .then(() => { this.locals.page += 1 })
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

  handlePassingReference(ref, ctx) {
    const { doScrollToBottom } = this.locals
    const t = {}
    t[ctx] = ref
    this.setState(t, ()=>{
      if (doScrollToBottom) {
        this.performScroll()
        this.locals.doScrollToBottom = false
      }
    })
  }

  updateConversationReadStatus() {
    const { user: { unreadMessages, pk }, history: { conversation }, isOpen } = this.props
    const { isLockedForUpdateRead } = this.locals
    if (
      unreadMessages && isOpen &&
      conversation && conversation.results &&
      conversation.results.length > 0 &&
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

  performScroll() {
    this.scrollToBottom(this.state.container)
    this.scrollToBottom(this.state.containerMobile)
  }

  handleChatClick(event) {
    event.preventDefault()
    const { isOpen, id } = this.props
    this.props.toggleChatWindow(id)
      .then(()=>{
        this.performScroll()
      })
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
    this.setState({ message: event.target.value })
  }

  postMessage() {
    const { message } = this.state
    const { id } = this.props
    if (message && id) {
      this.props.postChatMessage({ message, recipient: id })
        .then(()=>{
          this.setState({ message: '' })
          this.performScroll()
        })
        .catch(err=>{console.log(err)})
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
        if (!this.locals.isLockedForChatLoading) {
          const prevHeight = scrollHeight
          this.updateChatConversation(this.locals.page)
            .then(()=>{ container.scrollTop = container.scrollHeight - prevHeight })
        }
        return false
      }
      if (scrollTop + deltaY + clientHeight > scrollHeight) {
        e.preventDefault()
        return false
      }
    }
    return true
  }

  render() {
    const { isTextAreaOpen } = this.state
    const { id, history, user, isOpen } = this.props
    const { conversation } = history

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
              ref={(div)=>{ if (div) { this.handlePassingReference(div, 'containerMobile') }}}
            >
              {
                history && history.conversation ?
                  <ChatHistory
                    scroll={this.performScroll}
                    conversation={conversation.results}
                    id={id}
                    user={user}
                  /> :
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
                    ref={div=>{ if (div) { this.handlePassingReference(div, 'container') }}}
                    onWheel={e=>{this.handleWheelScroll(e)}}
                  >
                    {
                      history && history.conversation ?
                        <ChatHistory
                          scroll={this.performScroll}
                          conversation={conversation.results}
                          id={id}
                          user={user}
                        /> :
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
  id: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
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
