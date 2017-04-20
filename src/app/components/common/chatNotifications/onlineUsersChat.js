import React, { PureComponent } from 'react'

class OnlineUsersChat extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isUsersContainerOpen: false,
    }

    this.handleChatsClick = this.handleChatsClick.bind(this)
  }

  handleChatsClick = (event) => {
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

  render() {
    const { isUsersContainerOpen } = this.state

    return (
      <section className='online-users-chats-container'>
        <div
          className={`${isUsersContainerOpen ?
            'online-users-chats-small chats-open' : 'online-users-chats-small'}`
          }
        >
          <div
            onClick={this.handleChatsClick}
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
            <span className='online-users-divider'>•</span>
            <span className='online-users-count'>
              10
            </span>
          </div>
          {isUsersContainerOpen ?
            (
              <div className='chat-users-container'>
                <div className='chat-single-user'>
                  <figure className='chat-single-user-figure'>
                    <img src='/image/kendunn.jpg'/>
                  </figure>
                  <div className='chat-single-user-name'>
                    <span>Roberth Baratheon</span>
                  </div>
                  <figure className='chat-single-message-figure'>
                    <img src='/image/online-icon.png'/>
                  </figure>
                </div>
                <div className='chat-single-user'>
                  <figure className='chat-single-user-figure'>
                    <img src='/image/kendunn.jpg'/>
                  </figure>
                  <div className='chat-single-user-name'>
                    <span>Roberth Baratheon</span>
                  </div>
                  <figure className='chat-single-message-figure'>
                    <img src='/image/online-icon.png'/>
                  </figure>
                </div>
                <div className='chat-single-user'>
                  <figure className='chat-single-user-figure'>
                    <img src='/image/kendunn.jpg'/>
                  </figure>
                  <div className='chat-single-user-name'>
                    <span>Roberth Baratheon</span>
                  </div>
                  <figure className='chat-single-message-figure'>
                    <img src='/image/online-icon.png'/>
                  </figure>
                </div>
                <div className='chat-single-user'>
                  <figure className='chat-single-user-figure'>
                    <img src='/image/kendunn.jpg'/>
                  </figure>
                  <div className='chat-single-user-name'>
                    <span>Roberth Baratheon</span>
                  </div>
                  <figure className='chat-single-message-figure'>
                    <img src='/image/online-icon.png'/>
                  </figure>
                </div>
                <div className='chat-single-user'>
                  <figure className='chat-single-user-figure'>
                    <img src='/image/kendunn.jpg'/>
                  </figure>
                  <div className='chat-single-user-name'>
                    <span>Roberth Baratheon</span>
                  </div>
                  <figure className='chat-single-message-figure'>
                    <img src='/image/online-icon.png'/>
                  </figure>
                </div>
                <div className='chat-single-user'>
                  <figure className='chat-single-user-figure'>
                    <img src='/image/kendunn.jpg'/>
                  </figure>
                  <div className='chat-single-user-name'>
                    <span>Roberth Baratheon</span>
                  </div>
                  <figure className='chat-single-message-figure'>
                    <img src='/image/online-icon.png'/>
                  </figure>
                </div>
                <div className='offline-users-container'>
                  <span className='offline-users-title'>Offline (420)</span>
                  <div className='single-offline-user'>
                    <figure className='chat-single-user-figure'>
                      <img src='/image/kendunn.jpg'/>
                    </figure>
                    <div className='chat-single-user-name'>
                      <span>John Snow</span>
                    </div>
                  </div>
                  <div className='single-offline-user'>
                    <figure className='chat-single-user-figure'>
                      <img src='/image/kendunn.jpg'/>
                    </figure>
                    <div className='chat-single-user-name'>
                      <span>John Snow</span>
                    </div>
                  </div>
                  <div className='single-offline-user'>
                    <figure className='chat-single-user-figure'>
                      <img src='/image/kendunn.jpg'/>
                    </figure>
                    <div className='chat-single-user-name'>
                      <span>John Snow</span>
                    </div>
                  </div>
                  <div className='single-offline-user'>
                    <figure className='chat-single-user-figure'>
                      <img src='/image/kendunn.jpg'/>
                    </figure>
                    <div className='chat-single-user-name'>
                      <span>John Snow</span>
                    </div>
                  </div>
                  <div className='single-offline-user'>
                    <figure className='chat-single-user-figure'>
                      <img src='/image/kendunn.jpg'/>
                    </figure>
                    <div className='chat-single-user-name'>
                      <span>John Snow</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          }
        </div>
      </section>
    )
  }
}

export default OnlineUsersChat
