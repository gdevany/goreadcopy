import React, { PureComponent } from 'react'
import Rating from 'react-rating'
import StarIcon from 'material-ui/svg-icons/toggle/star'

class Book extends PureComponent {

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  renderRating = (rating) => {
    return (
      <Rating
        readonly={true}
        initialRate={rating}
        full={<img className='rating-icon library-rating-icon' src='/image/star.svg' />}
        empty={<img className='rating-icon library-rating-icon' src='/image/star-empty.svg' />}
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
      bookType,
    } = this.props

    const author = authors.length ? authors[0].fullname : null

    return (
      <div
        className='book-container'
      >
        {bookType === 'topBook' ?
          (
            <div className='favorite-badge'>
              <StarIcon/>
            </div>
          ) : null
        }
        <a href={url}>
          <img className='book' src={image} />
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
        <div className='book-action'>
          {bookType === 'librarySearch' ?
            (
              <a
                onClick={this.props.addAction}
                className='book-action-anchor'
              >
                Add to Library
              </a>
            ) : null
          }
          {bookType === 'wishListSearch' ?
            (
              <a
                onClick={this.props.addAction}
                className='book-action-anchor'
              >
                Add to WishList
              </a>
            ) : null
          }
          {bookType === 'topBooksModal' ?
            (
              <a
                onClick={this.props.addAction}
                className='book-action-anchor'
              >
                Add as Favorite
              </a>
            ) : null
          }

          {bookType === 'currentlyReading' ?
            (
              <a
                onClick={this.props.addAction}
                className='book-action-anchor'
              >
                Add as Currently Reading
              </a>
            ) : null
          }

          {bookType === 'libraryList' || bookType === 'topBook' || bookType === 'wishList' ?
            (
              <a
                onClick={this.props.removeAction}
                className='book-action-anchor'
              >
                Remove
              </a>
            ) : null
          }
        </div>
      </div>
    )
  }
}
export default Book
