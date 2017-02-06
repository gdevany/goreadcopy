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
         {/** TODO: quick image fix till we know what the exact url will be **/}
           <div className='book-info'>
             <a className='link' href={book.slug}>
              {book.title}
             </a><br />
             <a className='link' href='#'> {/** TODO: need authors link?**/}
              by {book.author}
             </a>
           </div>
          <img className='book' src={`./image/${book.imageUrl}`} />
        </a>
      </div>

    </div>
  )
}

export default Book
