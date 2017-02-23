import React from 'react'
import ReactTooltip from 'react-tooltip'
import { Colors } from '../../constants/style'

const styles = {
  bookImage: {
    position: 'relative',
    textAlign: 'center',
  },
  tooltip: {
    maxWidth: '120px',
    backgroundColor: '#FFF',
    fontSize: '14px',
    opacity: '1',
    color: Colors.blue,
  },
  tooltipAuthor: {
    color: Colors.black,
  },
}
const bookInfoCharLimit = 40

const Book = ({ book }) => {
  const truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : null
  }
  const renderBookInfo = (book) => {
    const truncText = truncInfo(`${book.title}`, bookInfoCharLimit)
    const authorText = `by ${book.author}`
    return truncText ? (
      <div style={styles.tooltip}>
        <span className='link'>
          {truncText}
        </span>
        <br />
        <span className='link' style={styles.tooltipAuthor}>
          {authorText}
        </span>
      </div>
    ) : (
      <div style={styles.tooltip}>
        <span className='link'>
          {book.title}
        </span>
        <br/>
        <span className='link' style={styles.tooltipAuthor}>
          by {book.author}
        </span>
      </div>
    )
  }

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
      <ReactTooltip
        id={book.slug}
        type='light'
        effect='solid'
        place='top'
      >
        {renderBookInfo(book)}
      </ReactTooltip>
    </div>
  )
}

export default Book
