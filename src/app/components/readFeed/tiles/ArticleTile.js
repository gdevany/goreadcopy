import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import TileDefault from '../TileDefault'
import Linkify from 'react-linkify'

const mentionRegex = /(\@\[\d+\:\d+\])/gi

class ArticleTile extends PureComponent {

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
        timestamp={timestamp}
        likes={likes}
        comments={comments}
        shareInfo={shareInfo}
        action={action}
      >
        <div className='article-tile-container'>
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
          <figure className='heading-overflow-figure'>
            <img className='heading-img' src={content.image} alt=''/>
          </figure>
          <div className='article-content'>
            <h2 className='article-title'>{content.title}</h2>
            <div className='post-excerpt-container'>
              <p className='post-excerpt-pharagraph'>
                <Linkify properties={{ target: '_blank' }} >
                  { content.header }
                </Linkify>
                <a href={content.link} className='post-readmore-anchor'>Read more</a>
              </p>
            </div>
          </div>
        </div>
      </TileDefault>
    )
  }
}

export default ArticleTile
