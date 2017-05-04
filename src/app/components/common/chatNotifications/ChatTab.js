import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Chat } from '../../../redux/actions'
import moment from 'moment'
import R from 'ramda'

const { loadChatConversation, postChatMessage } = Chat

class ChatTab extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isChatOpen: false,
      isTextareaOpen: false,
      message: '',
      listContainer: null,
    }

    this.handleChatClick = this.handleChatClick.bind(this)
    this.handleOpenTextArea = this.handleOpenTextArea.bind(this)
    this.handleCloseTextArea = this.handleCloseTextArea.bind(this)
    this.onTextChange = this.onTextChange.bind(this)
    this.onMessagePost = this.onMessagePost.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)
  }

  componentDidMount() {
    const { id } = this.props
    this.props.loadChatConversation(id)
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom()
  }

  scrollToBottom() {
    const { listContainer } = this.state
    const scrollHeight = listContainer.scrollHeight
    const height = listContainer.clientHeight
    const maxScrollTop = scrollHeight - height
    listContainer.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
  }

  handleChatClick(event) {
    event.preventDefault()
    const { isChatOpen } = this.state
    if (isChatOpen) {
      this.setState({
        isChatOpen: false,
        isTextareaOpen: false
      })
    } else {
      this.setState({
        isChatOpen: true
      })
    }
  }

  handleOpenTextArea(event) {
    event.preventDefault()
    this.setState({
      isTextareaOpen: true
    })
  }

  handleCloseTextArea(event) {
    event.preventDefault()
    this.setState({
      isTextareaOpen: false
    })
  }

  onTextChange(event) {
    event.preventDefault()
    this.setState({
      message: event.target.value
    })
  }

  onMessagePost(event) {
    const { message } = this.state
    const { id } = this.props
    event.preventDefault()
    if (message && id) {
      this.props.postChatMessage({ message, recipient: id })
      this.setState({ message: '' })
    }
  }

  splitConversation(list) {
    let split = null, temp = []
    split = []
    for (let i = 0; i < list.length; i++) {
      if (i === 0) {
        temp.push(list[i])
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
    const { isChatOpen, isTextareaOpen } = this.state
    const { id, history, user } = this.props

    return (
      <div>
        <section className='active-chat-container-mobile'>
          <div className='active-main-chat-container'>
            <figure className='active-chat-icon-close'>
              <img src='/image/close.png'/>
            </figure>
            <span className='active-chat-user-name'>
              { user.fullname }
            </span>
            <figure className='active-chat-has-mesagges-icon'>
              <img src='/image/online-icon.png'/>
            </figure>
          </div>

          <div className='active-chat-conversation-window'>
            <div
              className='active-chat-in-use'
              onClick={this.handleCloseTextArea}
              ref={(div)=>{this.setState({ listContainer: div })}}
            >
              {
                history && history.conversation ?
                  this.renderConversation(history, id, user) :
                  null
              }
            </div>
            <div className={`${isTextareaOpen ?
              'conversation-textarea-container-open' : 'conversation-textarea-container'}`
              }
            >
              <textarea
                onClick={this.handleOpenTextArea}
                onChange={this.onTextChange}
                placeholder='Type your message'
                value={this.state.message}
              />
              {isTextareaOpen ?
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
            className={`${isChatOpen ?
              'active-chat-small chat-open' : 'active-chat-small'}`
            }
          >
            <div
              onClick={this.handleChatClick}
              className='active-main-chat-container'
            >
              {isChatOpen ?
                (
                  <figure className='active-chat-icon-close'>
                    <img src='/image/close.png'/>
                  </figure>
                ) : (
                  <figure className='active-chat-has-mesagges-icon'>
                    <img src='/image/online-icon.png'/>
                  </figure>
                )
              }
              <span className='active-chat-user-name'>
                { user.fullname }
              </span>
              {isChatOpen ?
                (
                  <figure className='active-chat-has-mesagges-icon'>
                    <img src='/image/online-icon.png'/>
                  </figure>
                ) : null}
            </div>
            {isChatOpen ?
              (
                <div className='active-chat-conversation-window'>
                  <div
                    className='active-chat-in-use'
                    onClick={this.handleCloseTextArea}
                    ref={(div)=>{this.setState({ listContainer: div })}}
                  >
                    {
                      history && history.conversation ?
                        this.renderConversation(history, id, user) :
                        null
                    }
                  </div>
                  <div className={`${isTextareaOpen ?
                    'conversation-textarea-container-open' : 'conversation-textarea-container'}`
                    }
                  >
                    <textarea
                      onClick={this.handleOpenTextArea}
                      onChange={this.onTextChange}
                      placeholder='Type your message'
                      value={this.state.message}
                    />
                    {isTextareaOpen ?
                      (
                        <a href='#' className='conversation-send-btn' onClick={this.onMessagePost}>
                          Send
                        </a>
                      ) : null
                    }
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
