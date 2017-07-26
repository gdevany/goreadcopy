import React from 'react'
import PropTypes from 'prop-types'
import Scroll from 'react-scroll'

const Anchor = Scroll.Link

const BookStoreHero = ({ isUserLogged }) => {

  if (isUserLogged) {
    return (
      <section className='bookstore-hero-logged-container'>
        <h1>Shop My Wishlist</h1>
        <Anchor
          to='wishlist'
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
          className='bookstore-hero-logged-shop-wishlist'
        >
          My Wishlist
        </Anchor>
        <div className='books-effect-in-hero-container'>
          <div className='book-effect-column'>
            <figure>
              <img src='/image/example7.png'/>
            </figure>
          </div>
          <div className='book-effect-column'>
            <figure>
              <img src='/image/example1.png'/>
            </figure>
            <figure>
              <img src='/image/example2.png'/>
            </figure>
          </div>
          <div className='book-effect-column'>
            <figure>
              <img src='/image/example3.png'/>
            </figure>
            <figure>
              <img src='/image/example4.png'/>
            </figure>
          </div>
          <div className='book-effect-column'>
            <figure>
              <img src='/image/example5.png'/>
            </figure>
            <figure>
              <img src='/image/example6.png'/>
            </figure>
          </div>
          <div className='book-effect-column'>
            <figure>
              <img src='/image/example8.png'/>
            </figure>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className='bookstore-hero-anon-container'>
      <h1>Unlock your next adventure</h1>
      <a href=''>Yes, i'm interested</a>
      <div className='books-effect-in-hero-container'>
        <div className='book-effect-column'>
          <figure>
            <img src='/image/example7.png'/>
          </figure>
        </div>
        <div className='book-effect-column'>
          <figure>
            <img src='/image/example1.png'/>
          </figure>
          <figure>
            <img src='/image/example2.png'/>
          </figure>
        </div>
        <div className='book-effect-column'>
          <figure>
            <img src='/image/example3.png'/>
          </figure>
          <figure>
            <img src='/image/example4.png'/>
          </figure>
        </div>
        <div className='book-effect-column'>
          <figure>
            <img src='/image/example5.png'/>
          </figure>
          <figure>
            <img src='/image/example6.png'/>
          </figure>
        </div>
        <div className='book-effect-column'>
          <figure>
            <img src='/image/example8.png'/>
          </figure>
        </div>
      </div>
    </section>
  )
}

BookStoreHero.propTypes = {
  isUserLogged: PropTypes.bool,
}

export default BookStoreHero
