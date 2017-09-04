import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import TileDefault from '../TileDefault'
import LocationIcon from 'material-ui/svg-icons/communication/location-on'
import Linkify from 'react-linkify'

const mentionRegex = /(\@\[\d+\:\d+\])/gi

class UserProfileTile extends PureComponent {

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
    const isContentJustified = !(splittedContent[0].split(' ').length < 20)

    const {
      city,
      state,
      link,
      image,
      name,
      slug,
      userType,
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
        <div className='userprofile-tile-container'>
          <figure className='userprofile-figure'>
            { userType === 'Reader' || userType === '' ?
              (
                <Link to={`profile/${slug}`}>
                  <img className='userprofile-img' src={image} alt='profile-update'/>
                </Link>
              ) : (
                <a href={link}>
                  <img className='userprofile-img' src={image} alt='profile-update'/>
                </a>
              )
            }
          </figure>
          <div className='userprofile-content'>
            {userType === 'Reader' || userType === '' ?
              (
                <Link to={`profile/${slug}`}>
                  <h2 className='userprofile-name'>{name}</h2>
                </Link>
              ) : (
                <a href={link}>
                  <h2 className='userprofile-name'>{name}</h2>
                </a>
              )
            }
            <h4 className='userprofile-title'>{userType}</h4>
            {
              city || state ?
                <div className='userprofile-location-container'>
                  <LocationIcon className='userprofile-location-icon'/>
                  <h5 className='userprofile-location'>
                    {city ? city : null} {state ? state : null}
                  </h5>
                </div> : null
            }
          </div>
        </div>
        <div className='post-excerpt-container'>
          <p className='post-excerpt-pharagraph'>
            {content.description ? this.truncInfo(content.description, 150) : null}
            {userType === 'Reader' || userType === '' ?
              (
                <Link to={`profile/${slug}`}>
                  Read more
                </Link>
              ) : (
                <a href={link}>
                  Read more
                </a>
              )
            }
          </p>
        </div>
      </TileDefault>
    )
  }
}

export default UserProfileTile
