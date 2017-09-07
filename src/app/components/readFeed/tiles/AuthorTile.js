import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import TileDefault from '../TileDefault'
import LocationIcon from 'material-ui/svg-icons/communication/location-on'
import Linkify from 'react-linkify'

const mentionRegex = /(\@\[\d+\:\d+\])/gi

class AuthorTile extends PureComponent {

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

    const splittedContent = this.splitContent(content.socialComment)
    const isContentJustified = splittedContent ?
       !(splittedContent[0].split(' ').length < 20) : false

    const {
      city,
      state,
      link,
      name,
      about
    } = content

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
        <div className='author-tile-container'>
          <h2 className='author-name'>
            <a href={link}>
              {name}
            </a>
          </h2>
          <h4 className='author-title'>Author</h4>
          {
            city || state ?
            <div className='author-location-container'>
              <LocationIcon className='author-location-icon'/>
              <h5 className='author-location'>
                {city ? city : null} {state ? state : null}
              </h5>
            </div> : null
          }
          <div className='author-content'>
            <div className='post-excerpt-container'>
              <p className='post-excerpt-pharagraph'>
                {about ? this.truncInfo(about, 150) : null}
                <a href={link} className='post-readmore-anchor'>
                  Read more
                </a>
              </p>
            </div>
          </div>
        </div>
      </TileDefault>
    )
  }
}

export default AuthorTile
