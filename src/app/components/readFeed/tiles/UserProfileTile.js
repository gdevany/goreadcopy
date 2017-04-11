import React, { PureComponent } from 'react'
import TileDefault from '../TileDefault'
import LocationIcon from 'material-ui/svg-icons/communication/location-on'
import { Link } from 'react-router'

class UserProfileTile extends PureComponent {

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
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
      name,
      slug,
      userType,
    } = content
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
        <div className='post-excerpt-container'>
          <p className='post-excerpt-pharagraph'>
            {content.socialComment && content.socialComment !== 'None' ?
              content.socialComment : null
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
