import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import TileDefault from '../TileDefault'
import ReactPlayer from 'react-player'
import urlParser from 'js-video-url-parser'
import Anchorify from 'react-anchorify-text'

const mentionRegex = /(\@\[\d+\:\d+\])/gi

class StatusPostTile extends PureComponent {

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  splitContent(content) {
    return content.split(mentionRegex)
  }

  splitMention(content) {
    return content.split('/')
  }

  renderContentWithMentions(entry, index, mentionList) {
    if (mentionRegex.test(entry)) {
      for (let i = 0; i < mentionList.length; i++) {
        if (mentionList[i].mention === entry) {
          const splitResult = this.splitMention(mentionList[i].url)
          if (splitResult[splitResult.length - 3] === 'profile') {
            return (
              <Link key={index} to={`profile/${splitResult[splitResult.length - 2]}`}>
                {mentionList[i].name}
              </Link>
            )
          }
          return (
            <a key={index} href={mentionList[i].url}>
              {mentionList[i].name}
            </a>
          )
        }
      }
    }
    return (
      <span key={index}>
        <Anchorify
          text={entry}
          target='_blank'
        />
      </span>)
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
    let videoInfo = ''
    if (content.activeContent && content.activeContent.providerName === 'Dailymotion') {
      videoInfo = urlParser.parse(content.activeContent.url)
    }
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
                          <iframe
                            className='video-player'
                            src={`https://www.dailymotion.com/embed/video/${videoInfo.id}`}
                          />
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
                    <a href={content.activeContent.url}>
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
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
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
