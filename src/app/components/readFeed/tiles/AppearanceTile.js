import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import TileDefault from '../TileDefault'
import Linkify from 'react-linkify'

const mentionRegex = /(\@\[\d+\:\d+\])/gi

class AppearanceTile extends PureComponent {

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

    const splittedContent = this.splitContent(content.socialComment)
    const isContentJustified = !(splittedContent[0].split(' ').length < 20)

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
        <div className='appearance-tile-container'>
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
          <div className='appearance-container'>
            <h4 className='appearance-title'>{content.title}</h4>
            <div className='appearance-row'>
              <div className='appearance-column'>
                <span className='appearance-label'>Starts</span>
                <h4 className='appearance-date'>{content.start.date}</h4>
                <h5 className='appearance-time'>@ {content.start.time}</h5>
              </div>
              <div className='appearance-column'>
                <span className='appearance-label'>Ends</span>
                <h4 className='appearance-date'>{content.end.date}</h4>
                <h5 className='appearance-time'>@ {content.end.time}</h5>
              </div>
            </div>
            <div className='post-excerpt-container'>
              <p className='post-excerpt-pharagraph'>
                {content.description}
                {
                  content.url ?
                    (
                      <a
                        href={content.url}
                        className='post-readmore-anchor'
                      >
                        See full details
                      </a>
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

export default AppearanceTile
