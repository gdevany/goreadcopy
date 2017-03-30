import React, { PureComponent } from 'react'
import TileDefault from '../TileDefault'
import ReactPlayer from 'react-player'

const mentionRegex = /(\@\[\d+\:\d+\])/gi

class StatusPostTile extends PureComponent {

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

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
          {
            content.activeContent ?
            (
              <div>
                {content.activeContent.type === 'video' ?
                  (
                    <div className='video-iframe-container'>
                      {content.activeContent.providerName === 'Dailymotion' ?
                        (
                          <figure className='video-player'>
                            <a href={content.activeContent.url} target='_blank'>
                              <img src={content.activeContent.thumbnailUrl}/>
                            </a>
                          </figure>
                        ) : (
                          <ReactPlayer
                            className='video-player'
                            controls={true}
                            url={content.activeContent.url}
                          />
                        )
                      }
                    </div>
                  ) : null
                }
                { content.activeContent.type === 'link' ?
                  (
                    <div className='active-content-link-container'>
                      <figure className='active-content-link-figure'>
                        <img src={content.activeContent.thumbnailUrl}/>
                      </figure>
                      <div className='active-content-description'>
                        <h5>
                          {content.activeContent.title}
                        </h5>
                        <div className='post-excerpt-container'>
                          <p className='post-excerpt-pharagraph'>
                            {this.truncInfo(content.activeContent.description, 120)}
                            <a
                              href={content.activeContent.link}
                              className='post-readmore-anchor'
                            >
                              Read more
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null
                }
              </div>
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
