import React, { PropTypes } from 'react'

const BookStoreHero = ({ isUserLogged }) => {

  if (isUserLogged) {
    return (
      <section className='bookstore-hero-logged-container'>
        <h1>Dive into your next adventure</h1>
        <a href=''>Shop My Wishlist</a>
      </section>
    )
  }
  return (
    <section className='bookstore-hero-anon-container'>
      <h1>Unlock your next adventure</h1>
      <a href=''>Yes, i'm interested</a>
    </section>
  )
}

BookStoreHero.propTypes = {
  isUserLogged: PropTypes.bool,
}

export default BookStoreHero
