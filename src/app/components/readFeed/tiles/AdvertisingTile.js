import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import TileDefault from '../TileDefault'
import Anchorify from 'react-anchorify-text'

const mentionRegex = /(\@\[\d+\:\d+\])/gi

class AdvertisingTile extends PureComponent {

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
        id,
      },
      content
    } = this.props

    const splittedContent = this.splitContent(content.socialComment)

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
        promoted={content.promoted}
      >
        <div className='adv-tile-container'>
          <div className='post-excerpt-container'>
            <p className='post-excerpt-pharagraph'>
              {
                content.mentionsList !== null ?
                  (
                    splittedContent.map((entry, index) => {
                      return this.renderContentWithMentions(entry, index, content.mentionsList)
                    })
                  ) : null
              }
            </p>
          </div>
          <figure className='heading-overflow-figure'>
            <a href={content.link}>
              <img className='heading-img' src={content.image} alt='advertising'/>
            </a>
          </figure>
          <div className='adv-content'>
            <h2 className='adv-title'>
              <a href={content.link}>
                {content.heading}
              </a>
            </h2>
            <div className='post-excerpt-container'>
              <p className='post-excerpt-pharagraph'>
                <a href={content.link}>
                  {content.description}
                </a>
              </p>
            </div>
          </div>
          <div className='action-btn-container'>
            <a href={content.link} className='adv-learn-more-btn'>
              Learn more
            </a>
          </div>
        </div>
      </TileDefault>
    )
  }
}

export default AdvertisingTile
