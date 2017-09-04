import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import TileDefault from '../TileDefault'
import ReactPlayer from 'react-player'
import UrlParser from 'js-video-url-parser'
import Linkify from 'react-linkify'

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
          if (splitResult && splitResult[3] === 'profile') {
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
        <Linkify properties={{ target: '_blank' }}>
          {entry}
        </Linkify>
      </span>)
  }

  render() {
    const {
      tileDefaultProps: {
        author,
        target,
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

    const splittedContent = content.description ?
    this.splitContent(content.description) : null
    const splittedPostContent = this.splitContent(content.socialPostComment)
    const isContentJustified = !(splittedContent[0].split(' ').length < 20)
    const isShareJustified = !(splittedPostContent[0].split(' ').length < 20)
    const sharePostStyle =
      content.mentionsPostList.length > 0 ||
      content.socialPostComment.length > 0 ?
      'shared' : ''
    let videoInfo = ''
    if (content.activeContent && content.activeContent.providerName === 'Dailymotion') {
      videoInfo = UrlParser.parse(content.activeContent.url)
    }
    return (
      <TileDefault
        tileId={id}
        author={author}
        target={target}
        description={description ? description : content.description}
        timestamp={timestamp}
        likes={likes}
        comments={comments}
        shareInfo={shareInfo}
        action={action}
        isPostEditable={true}
        mentionsList={content.mentionsList}
        activeContent={content.activeContent}
        tileType={content.tileType}
      >
        <div className='statuspost-tile-container'>
          <div className={isShareJustified ?
            'sharepost-excerpt-container' : 'sharepost-excerpt-left-container'}
          >
            <p className='sharepost-excerpt-pharagraph'>
              {
                content.mentionsPostList.length > 0 || content.socialPostComment !== 'None' ?
                  (
                    splittedPostContent.map((entry, index) => {
                      return this.renderContentWithMentions(entry, index, content.mentionsPostList)
                    })
                  ) : null
              }
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
                          {content.activeContent.thumbnailUrl !== undefined ?
                            (
                              <figure className='active-content-link-figure'>
                                <img src={content.activeContent.thumbnailUrl}/>
                              </figure>
                            ) : null
                          }
                          <div className='active-content-description'>
                            {content.activeContent.title !== undefined ?
                              (
                                <h5>
                                  {content.activeContent.title}
                                </h5>
                              ) : null
                            }
                            <div className='post-excerpt-container'>
                              <p className='post-excerpt-pharagraph'>
                                {content.activeContent.description !== undefined ?
                                  this.truncInfo(content.activeContent.description, 120) : null
                                }
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
            <div className={isContentJustified ?
              `post-excerpt-container ${sharePostStyle}` :
              `post-excerpt-left-container ${sharePostStyle}`}
            >
              <p className='post-excerpt-pharagraph'>
                {
                  splittedContent ?
                  (
                    splittedContent.map((entry, index) => {
                      return this.renderContentWithMentions(entry, index, content.mentionsList)
                    })
                  ) : null
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
