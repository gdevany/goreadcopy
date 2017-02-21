import React from 'react'

const styles = {
  bookImage: {
    position: 'relative',
    textAlign: 'center',
  },
}
const bookInfoCharLimit = 40

const Book = ({ book }) => {
  const truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : null
  }
  const renderBookInfo = (book) => {
    const renderText = truncInfo(`${book.title} by ${book.author}`, bookInfoCharLimit)
    return renderText ? (
      <span className='link'>
        {renderText}
      </span>
    ) : (
      <span className='link'>
        {book.title}
        <br />
        by {book.author}
      </span>
    )
  }

  return (
    <div style={styles.bookSection}>
      <div style={styles.bookImage} className='book-container'>
        <a href={book.slug}>
          <div className='book-info'>
            {renderBookInfo(book)}
          </div>
          <img className='book' src={book.imageUrl} />
        </a>
      </div>
    </div>
  )
}

export default Book
