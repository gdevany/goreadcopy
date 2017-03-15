import React, { PureComponent } from 'react'
import TileDefault from '../TileDefault'

class StatusPostTile extends PureComponent {
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
        <div className='statuspost-tile-container'>
          <div className='post-excerpt-container'>
            <p className='post-excerpt-pharagraph'>
              {content.socialComment ? content.socialComment : null}
            </p>
          </div>
          <figure className='statuspost-figure'>
            <img className='statuspost-img' src={content.image} alt='status-post'/>
          </figure>
          <div className='statuspost-content'>
            <div className='post-excerpt-container'>
              <p className='post-excerpt-pharagraph'>
                {content.description}
                {/** TODO: Do we need this?
                  <a href='#' className='post-readmore-anchor'>Read more</a>
                **/}
              </p>
            </div>
          </div>
        </div>
      </TileDefault>
    )
  }
}

export default StatusPostTile
