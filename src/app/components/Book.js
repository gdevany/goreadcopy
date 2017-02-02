import React from 'react'

const Book = ({ book }) => {
  return (
    <div className='single-book'>
      <a href={book.slug}>
       {/** TODO: quick image fix till we know what the exact url will be **/}
        <img src={`./image/${book.imageUrl}`} />
      </a><br />

      <div className='book-info'>
        <a className='link' href={book.slug}>
          {book.title}
        </a><br />
        <a className='link' href='#'> {/** TODO: need authors link?**/}
          {book.author}
        </a>
      </div>

    </div>
  )
}

export default Book
