import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import TileDefault from '../TileDefault'
import Anchorify from 'react-anchorify-text'
import LocationIcon from 'material-ui/svg-icons/communication/location-on'

const mentionRegex = /(\@\[\d+\:\d+\])/gi

class PublisherUpdateTile extends PureComponent {

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
        id
      },
      content
    } = this.props

    const {
      city,
      state,
      link,
      image,
      name
    } = content

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
      >
        <div className='publisher-tile-container'>
          <div className='post-excerpt-container'>
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
          <figure className='publisher-figure'>
            <a href={link}>
              <img className='publisher-img' src={image} alt='publisher'/>
            </a>
          </figure>
          <div className='publisher-content'>
            <a href={link}>
              <h2 className='publisher-name'>{name}</h2>
            </a>
            <h4 className='publisher-title'>Publisher</h4>
            {
              city || state ?
                <div className='publisher-location-container'>
                  <LocationIcon className='publisher-location-icon'/>
                  <h5 className='publisher-location'>
                    {city ? city : null} {state ? state : null}
                  </h5>
                </div> : null
            }
          </div>
        </div>
        <div className='post-excerpt-container'>
          <p className='post-excerpt-pharagraph'>
            {content.description ? content.description : null}
            <a href={link} className='post-readmore-anchor'>
              Read more
            </a>
          </p>
        </div>
      </TileDefault>
    )
  }
}

export default PublisherUpdateTile
