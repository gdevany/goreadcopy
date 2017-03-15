import React, { PureComponent } from 'react'
import TileDefault from '../TileDefault'

class AwardTile extends PureComponent {
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
        <div className='award-tile-container'>
          <div className='post-excerpt-container'>
            <p className='post-excerpt-pharagraph'>
              {content.socialComment ? content.socialComment : null}
            </p>
          </div>
          <figure className='award-tile-figure'>
            <img className='award-tile-img' src={content.image} alt='award'/>
          </figure>
        </div>
      </TileDefault>
    )
  }
}

export default AwardTile
