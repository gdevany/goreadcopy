import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import TileDefault from '../TileDefault'
import Linkify from 'react-linkify'

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
        id,
      },
      content
    } = this.props

    const splittedContent = this.splitContent(content.socialComment)
    const isContentJustified = splittedContent ?
       !(splittedContent[0].split(' ').length < 20) : false

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
        promoted={content.promoted}
      >
        <div className='adv-tile-container'>
          <div className={isContentJustified ?
            'post-excerpt-container' :
            'post-excerpt-left-container'}
          >
            <p className='post-excerpt-pharagraph'>
              {
                content.mentionsList !== null || content.socialComment !== 'None' ?
                  (
                    splittedContent.map((entry, index) => {
                      return this.renderContentWithMentions(entry, index, content.mentionsList)
                    })
                  ) : null
              }
            </p>
          </div>
          <a href={content.link}>
            <figure className='heading-overflow-figure'>
              <img className='heading-img' src={content.image} alt='advertising'/>
            </figure>
            <div className='adv-content'>
              <h2 className='adv-title'>
                {content.heading}
              </h2>
              <div className='post-excerpt-container'>
                <p className='post-excerpt-pharagraph'>
                  <Linkify properties={{ target: '_blank' }}>
                    {content.description}
                  </Linkify>
                </p>
              </div>
            </div>
            <div className='action-btn-container'>
              <span href={content.link} className='adv-learn-more-btn'>
                Learn more
              </span>
            </div>
          </a>
        </div>
      </TileDefault>
    )
  }
}

export default AdvertisingTile
