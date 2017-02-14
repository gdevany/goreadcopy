import React from 'react'

const styles = {
  bookImage: {
    position: 'relative',
    textAlign: 'center',
  },
}

const Book = ({ book }) => {
  return (
    <div style={styles.bookSection}>
      <div style={styles.bookImage} className='book-container'>
        <a href={book.slug}>
        <div className='book-info'>
          <span className='link'>
            {book.title}
          </span><br />
          <span className='link'>
            by {book.author}
          </span>
        </div>
          <img className='book' src={book.imageUrl} />
        </a>
      </div>

    </div>
  )
}

export default Book
