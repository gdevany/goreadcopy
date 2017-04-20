import React, { PureComponent } from 'react'

class ChatConversation extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      isChatOpen: false,
    }

    this.handleChatClick = this.handleChatClick.bind(this)
  }

  handleChatClick = (event) => {
    event.preventDefault()
    const { isChatOpen } = this.state
    if (isChatOpen) {
      this.setState({
        isChatOpen: false
      })
    } else {
      this.setState({
        isChatOpen: true
      })
    }
  }

  render() {
    const { isChatOpen } = this.state

    return (
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
              Roberth Baratheon
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
                <div className='active-chat-in-use'>
                  <div className='conversation-extrange'>
                    <figure className='conversation-extrange-figure'>
                      <img src='/image/kendunn.jpg'/>
                    </figure>
                    <div className='conversation-extrange-chat-container'>
                      <p className='conversation-extrange-pharagraph'>
                        Wowzorz
                      </p>
                      <p className='conversation-extrange-pharagraph'>
                        That
                      </p>
                      <p className='conversation-extrange-pharagraph'>
                        Wowzorz
                      </p>
                    </div>
                    <div className='timestamp-container'>
                      <span> 3 min ago </span>
                    </div>
                  </div>
                  <div className='conversation-me'>
                    <div className='conversation-me-chat-container'>
                      <p className='conversation-me-pharagraph'>
                        Wowzorz from me
                      </p>
                    </div>
                    <div className='timestamp-container'>
                      <span> 3 min ago </span>
                    </div>
                  </div>
                </div>
                <div className='conversation-textarea-container'>
                  <textarea/>
                </div>
              </div>
            ) : null
          }
        </div>
      </section>
    )
  }
}

export default ChatConversation
