import React, { PureComponent } from 'react'
import TileDefault from '../TileDefault'

const mentionRegex = /(\@\[\d+\:\d+\])/gi

class StatusPostTile extends PureComponent {

  splitContent(content) {
    return content.split(mentionRegex)
  }

  renderContentWithMentions(entry, index, mentionList) {
    if (mentionRegex.test(entry)) {
      for (let i = 0; i < mentionList.length; i++) {
        if (mentionList[i].mention === entry) {
          return (
            <a key={index} href={mentionList[i].url}>
              {mentionList[i].name}
            </a>
          )
        }
      }
    }
    return (<span key={index}>{entry}</span>)
  }

  render() {
    const {
      tileDefaultProps: {
        author,
        description,
        timestamp,
        likes,
        comments,
        shareInfo,
        action,
        id
      },
      content
    } = this.props
    const splittedContent = this.splitContent(content.description)
    return (
      <TileDefault
        tileId={id}
        author={author}
        description={description}
        timestamp={timestamp}
        likes={likes}
        comments={comments}
        shareInfo={shareInfo}
        action={action}
      >
        <div className='statuspost-tile-container'>
          <div className='post-excerpt-container'>
            <p className='post-excerpt-pharagraph'>
              {content.socialComment ? content.socialComment : null}
            </p>
          </div>
          { content.image ?
            (
              <figure className='statuspost-figure'>
                <img className='statuspost-img' src={content.image} alt='status-post'/>
              </figure>
            ) : null
          }
          <div className='statuspost-content'>
            <div className='post-excerpt-container'>
              <p className='post-excerpt-pharagraph'>
                {
                  splittedContent.map((entry, index) => {
                    return this.renderContentWithMentions(entry, index, content.mentionsList)
                  })
                }
              </p>
            </div>
          </div>
        </div>
      </TileDefault>
    )
  }
}

export default StatusPostTile
