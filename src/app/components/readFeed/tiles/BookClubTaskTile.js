import React, { PureComponent } from 'react'
import TileDefault from '../TileDefault'

class BookClubTaskTile extends PureComponent {
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
        <div className='bookclubtask-tile-container'>
          <div className='post-excerpt-container'>
            <p className='post-excerpt-pharagraph'>
              {content.socialComment ? content.socialComment : null}
            </p>
          </div>
          <div className='bookclubtask-content'>
            <div className='post-excerpt-container'>
              <p className='post-excerpt-pharagraph'>
                {content.description}
                <a href={content.link} className='post-readmore-anchor'>Read more</a>
              </p>
            </div>
          </div>
        </div>
      </TileDefault>
    )
  }
}

export default BookClubTaskTile
