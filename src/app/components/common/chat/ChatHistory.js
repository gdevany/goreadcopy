import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import moment from 'moment'
import R from 'ramda'

class ChatHistory extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.scroll()
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
        <Link className='conversation-extrange-figure' to={user.url} onClick={e=>e.stopPropagation()}>
          <figure>
            <img src={user.imageUrl} />
          </figure>
        </Link>
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

  render() {
    const { conversation, id, user } = this.props
    const blocks = this.splitConversation(conversation)

    return (
      <div>
        {
          blocks.map((block, idx)=>{
            const userID = R.last(block).sender
            if (userID === id) {
              return this.renderContactPostList(block, user, idx)
            }
            return this.renderOwnPostList(block, idx)
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (
  {
    chat: {
      conversations
    }
  }
) => {
  return {
    conversations
  }
}

export default connect(mapStateToProps, null)(ChatHistory)
