import React, { PureComponent } from 'react'
import TileDefault from '../TileDefault'

class AdvertisingTile extends PureComponent {
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
        id,
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
        promoted={content.promoted}
      >
        <div className='adv-tile-container'>
          <figure className='heading-overflow-figure'>
            <img className='heading-img' src={content.image} alt='advertising'/>
          </figure>
          <div className='adv-content'>
            <h2 className='adv-title'>{content.heading}</h2>
            <div className='post-excerpt-container'>
              <p className='post-excerpt-pharagraph'>
                {content.description}
              </p>
            </div>
          </div>
          <div className='action-btn-container'>
            <a href={content.link} className='adv-learn-more-btn'>
              Learn more
            </a>
          </div>
        </div>
      </TileDefault>
    )
  }
}

export default AdvertisingTile
