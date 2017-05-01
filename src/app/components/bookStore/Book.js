import React, { PureComponent } from 'react'
import Rating from 'react-rating'

class Book extends PureComponent {

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  renderRating = (rating) => {
    return (
      <Rating
        readonly={true}
        initialRate={rating}
        full={<img className='rating-icon' src='/image/star-rating.png' />}
        empty={<img className='rating-icon' src='/image/star-empty.png' />}
      />
    )
  }

  render() {

    const {
      url,
      image,
      title,
      authors,
      rating,
    } = this.props

    const author = authors.length ? authors[0].fullname : null

    return (
      <div
        className='book-container'
      >
        <a href={url}>
          <img className='book' src={image} />
          <div className='favorite-badge'>
            <figure>
              <img src='image/wish-list-icon.svg'/>
            </figure>
          </div>
        </a>
        <div className='book-info-container'>
          <span className='book-info-title'>
            {title ? this.truncInfo(title, 15) : <i> unknown </i>}
          </span>
          <span className='book-info-author'>
            {authors[0] ?
              (
                `by ${author}`
              ) : <i> unknown </i>
            }
          </span>
        </div>
        {rating ?
          (
            <span className='rating'>
              {this.renderRating(Math.round(rating.average))}
            </span>
          ) : null
        }
      </div>
    )
  }
}
export default Book
