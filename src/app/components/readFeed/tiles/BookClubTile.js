import React, { PureComponent } from 'react'
import TileDefault from '../TileDefault'

class BookClubTile extends PureComponent {
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
        <div className='bookclub-tile-container'>
          <figure className='bookclub-figure'>
            <a href={content.url}>
              <img className='bookclub-img' src={content.image} alt='book-club'/>
            </a>
          </figure>
          <div className='bookclub-content'>
            <a href={content.url}>
              <h2 className='bookclub-name'>{content.title}</h2>
            </a>
            <div className='post-excerpt-container'>
              <p className='post-excerpt-pharagraph'>
                {content.description}
                <a href={content.url} className='post-readmore-anchor'>
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

export default BookClubTile
