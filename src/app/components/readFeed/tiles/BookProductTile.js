import React, { PureComponent } from 'react'
import TileDefault from '../TileDefault'
import Rating from 'react-rating'

class BookProductTile extends PureComponent {
  renderRating = (rating) => {
    return (
      <Rating
        readonly={true}
        initialRate={rating}
        full={<img className='rating-icon' src='./image/star.svg' />}
        empty={<img className='rating-icon' src='./image/star-empty.svg' />}
      />
    )
  }

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
        <div className='book-tile-container'>
          <div className='post-excerpt-container'>
            <p className='post-excerpt-pharagraph'>
              {content.socialComment ? content.socialComment : null}
            </p>
          </div>
          <figure className='book-figure'>
            <img className='book-img' src={content.image} alt=''/>
          </figure>
          <div className='book-content'>
            <h2 className='book-title'>{content.title}</h2>
            <h4 className='book-author'>by {content.author}</h4>
            <div className='book-rating-container'>
              {this.renderRating(Math.round(content.rating))}
            </div>
          </div>
        </div>
        <div className='post-excerpt-container'>
          <p className='post-excerpt-pharagraph'>
            {content.description}
            <a href={content.url} className='post-readmore-anchor'>
              Read more
            </a>
          </p>
        </div>
      </TileDefault>
    )
  }
}

export default BookProductTile
