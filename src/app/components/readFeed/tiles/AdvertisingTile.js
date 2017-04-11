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
          <div className='post-excerpt-container'>
            <p className='post-excerpt-pharagraph'>
              {content.socialComment && content.socialComment !== 'None' ?
                content.socialComment : null
              }
            </p>
          </div>
          <figure className='heading-overflow-figure'>
            <a href={content.link}>
              <img className='heading-img' src={content.image} alt='advertising'/>
            </a>
          </figure>
          <div className='adv-content'>
            <h2 className='adv-title'>
              <a href={content.link}>
                {content.heading}
              </a>
            </h2>
            <div className='post-excerpt-container'>
              <p className='post-excerpt-pharagraph'>
                <a href={content.link}>
                  {content.description}
                </a>
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
