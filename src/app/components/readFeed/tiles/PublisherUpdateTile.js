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
          <figure className='publisher-figure'>
            <a href={content.link}>
              <img className='publisher-img' src={content.image} alt='publisher'/>
            </a>
          </figure>
          <div className='publisher-content'>
            <a href={content.link}>
              <h2 className='publisher-name'>{content.name}</h2>
            </a>
            <h4 className='publisher-title'>Publisher</h4>
            <div className='publisher-location-container'>
              <LocationIcon className='publisher-location-icon'/>
              <h5 className='publisher-location'>
                {content.location}
              </h5>
            </div>
          </div>
        </div>
        <div className='post-excerpt-container'>
          <p className='post-excerpt-pharagraph'>
            {content.description}
            <a href={content.link} className='post-readmore-anchor'>
              Read more
            </a>
          </p>
        </div>
      </TileDefault>
    )
  }
}

export default PublisherUpdateTile
