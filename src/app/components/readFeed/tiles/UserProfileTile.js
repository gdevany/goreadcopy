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
            <a href={content.link}>
              <img className='userprofile-img' src={content.image} alt='profile-update'/>
            </a>
          </figure>
          <div className='userprofile-content'>
            <a href={content.link}>
              <h2 className='userprofile-name'>{content.name}</h2>
            </a>
            <h4 className='userprofile-title'>{content.userType}</h4>
            <div className='userprofile-location-container'>
              <LocationIcon className='userprofile-location-icon'/>
              <h5 className='userprofile-location'>
                {content.location}
              </h5>
            </div>
          </div>
        </div>
        <div className='post-excerpt-container'>
          <p className='post-excerpt-pharagraph'>
            { content.description ? content.description : null}
            <a href={content.link} className='post-readmore-anchor'>
              Read more
            </a>
          </p>
        </div>
      </TileDefault>
    )
  }
}

export default UserProfileTile
