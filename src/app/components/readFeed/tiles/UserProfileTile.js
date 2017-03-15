import React, { PureComponent } from 'react'
import TileDefault from '../TileDefault'
import LocationIcon from 'material-ui/svg-icons/communication/location-on'

class UserProfileTile extends PureComponent {
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
        <div className='userprofile-tile-container'>
          <figure className='userprofile-figure'>
            <a href={link}>
              <img className='userprofile-img' src={image} alt='profile-update'/>
            </a>
          </figure>
          <div className='userprofile-content'>
            <a href={link}>
              <h2 className='userprofile-name'>{name}</h2>
            </a>
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

export default UserProfileTile
