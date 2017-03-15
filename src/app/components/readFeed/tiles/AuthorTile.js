import React, { PureComponent } from 'react'
import TileDefault from '../TileDefault'
import LocationIcon from 'material-ui/svg-icons/communication/location-on'

class AuthorTile extends PureComponent {
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
      name,
      about
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
            {content.socialComment ? content.socialComment : null}
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
                {about ? about : null}
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
