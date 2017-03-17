import React, { PureComponent } from 'react'
import TileDefault from '../TileDefault'
import LocationIcon from 'material-ui/svg-icons/communication/location-on'

class PublisherUpdateTile extends PureComponent {
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
              {content.socialComment ? content.socialComment : null}
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
