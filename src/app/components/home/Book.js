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
    return text.length > limit ? `${text.slice(0, limit)}...` : null
  }
  const renderedText = truncInfo(`${book.title} by ${book.author}`, bookInfoCharLimit)

  return (
    <div style={styles.bookSection}>
      <div style={styles.bookImage} className='book-container'>
        <a href={book.slug}>
          { renderedText != null ? (
              <div className='book-info'>
                <span className='link'>
                  {renderedText}
                </span>
              </div>
            ) : (
              <div className='book-info'>
                <span className='link'>
                  {book.title}
                </span><br />
                <span className='link'>
                  by {book.author}
                </span>
              </div>
            )
          }
          <img className='book' src={book.imageUrl} />
        </a>
      </div>

    </div>
  )
}

export default Book
