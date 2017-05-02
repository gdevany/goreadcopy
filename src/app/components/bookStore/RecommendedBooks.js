import React, { PureComponent } from 'react'

class RecommendedBooks extends PureComponent {
  render() {
    return (
      <section className='bookstore-recommended-books-container'>
        <article className='bookstore-recommended-book-element'>
          <p className='bookstore-recommended-book-text'>
            17 of your friends purchased this book
          </p>
          <figure className='bookstore-recommended-book-figure'>
            <img src='/image/example1.png'/>
          </figure>
        </article>
        <article className='bookstore-recommended-book-element'>
          <p className='bookstore-recommended-book-text'>
            Recommended for Stephen King fans
          </p>
          <figure className='bookstore-recommended-book-figure'>
            <img src='/image/example2.png'/>
          </figure>
        </article>
        <article className='bookstore-recommended-book-element'>
          <p className='bookstore-recommended-book-text'>
            Best selling book in Science Fiction
          </p>
          <figure className='bookstore-recommended-book-figure'>
            <img src='/image/example3.png'/>
          </figure>
        </article>
      </section>
    )
  }
}

export default RecommendedBooks
