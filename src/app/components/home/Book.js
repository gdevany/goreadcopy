import React from 'react'
import { Colors } from '../../constants/style'
import Rating from 'react-rating'

const styles = {
  bookImage: {
    position: 'relative',
    textAlign: 'center',
  },

  tooltip: {
    color: Colors.black,
    fontSize: '14px',
    margin: '15px auto',
    maxWidth: '120px',
    opacity: '1',
  },

  tooltipAuthor: {
    color: Colors.grey,
  },

  rating: {
    width: 30,
    display: 'none',
  },
}

const Book = ({ book }) => {
  const truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  const renderRating = (rating) => {
    {
      /** TODO:
      Derrick replace full with a full star icon
      and empty with an empty star icon
      **/
    }
    return (
      <Rating
        readonly={true}
        initialRate={rating}
        full={<img className='rating-icon' src='./image/star.svg' />}
        empty={<img className='rating-icon' src='./image/star-empty.svg' />}
      />
    )
  }

  const author = `${book.authors[0].firstName} ${book.authors[0].lastName}`
  return (
    <div style={styles.bookSection}>
      <div
        data-tip data-for={book.slug}
        style={styles.bookImage}
        className='book-container'
      >
        <a href={book.slug}>
          <img className='book' src={book.imageUrl} />
        </a>
      </div>
      <div style={styles.tooltip}>
        <span className='link'>
          {truncInfo(book.title, 20)}
        </span>
        <br />
        <span className='link subheader' style={styles.tooltipAuthor}>
          by {truncInfo(author, 20)}
        </span> <br />
        <span className='rating' >
          {renderRating(Math.round(book.rating.average))}
        </span>
      </div>
    </div>
  )
}

export default Book
