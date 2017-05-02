import React, { PureComponent } from 'react'
import Book from './Book'

class BestSellers extends PureComponent {
  render() {
    return (
      <section className='bookstore-best-sellers-container'>
        <h4 className='bookstore-row-books-title'>
          Science Fiction best sellers
        </h4>
        <div className='bookstore-row-books-contaier'>
          <Book
            url='#'
            image='/image/example1.png'
            id='1'
            title='Harry Potter'
            authors='J.K Rowling'
            rating={{
              count: 2,
              average: 5,
              total: 10
            }}
          />
          <Book
            url='#'
            image='/image/example2.png'
            id='1'
            title='Harry Potter'
            authors='J.K Rowling'
            rating={{
              count: 2,
              average: 5,
              total: 10
            }}
          />
          <Book
            url='#'
            image='/image/example3.png'
            id='1'
            title='Harry Potter'
            authors='J.K Rowling'
            rating={{
              count: 2,
              average: 5,
              total: 10
            }}
          />
          <Book
            url='#'
            image='/image/example4.png'
            id='1'
            title='Harry Potter'
            authors='J.K Rowling'
            rating={{
              count: 2,
              average: 5,
              total: 10
            }}
          />
          <Book
            url='#'
            image='/image/example5.png'
            id='1'
            title='Harry Potter'
            authors='J.K Rowling'
            rating={{
              count: 2,
              average: 5,
              total: 10
            }}
          />
        </div>
      </section>
    )
  }
}

export default BestSellers
