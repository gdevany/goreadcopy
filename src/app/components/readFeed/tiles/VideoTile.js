import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import TileDefault from '../TileDefault'
import ReactPlayer from 'react-player'
import Anchorify from 'react-anchorify-text'

const mentionRegex = /(\@\[\d+\:\d+\])/gi

class VideoTile extends PureComponent {

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
        {
          entry ? (
            <Anchorify
              text={entry}
              target='_blank'
            />
          ) : null
        }
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
    const splittedContent = content.socialComment !== null && content.socialComment !== undefined ?
       this.splitContent(content.socialComment) : null

    return (
      <TileDefault
        tileId={id}
        author={author}
        target={target}
        description={description}
        timestamp={timestamp}
        likes={likes}
        comments={comments}
        shareInfo={shareInfo}
        action={action}
      >
        <div className='video-tile-container'>
          <div className='post-excerpt-container'>
            <p className='post-excerpt-pharagraph'>
              {
                splittedContent !== null && content.mentionList ?
                  (
                    splittedContent.map((entry, index) => {
                      return this.renderContentWithMentions(entry, index, content.mentionList)
                    })
                  ) : null
              }
            </p>
          </div>
          <div className='video-iframe-container'>
            <ReactPlayer
              className='video-player'
              controls={true}
              url={content.originUrl}
            />
          </div>
          <div className='video-content'>
            <h2 className='video-title'>{content.tile}</h2>
            <div className='post-excerpt-container'>
              <p className='post-excerpt-pharagraph'>
              {
                content.description ? content.description : null
              }
              </p>
            </div>
          </div>
        </div>
      </TileDefault>
    )
  }
}

export default VideoTile
