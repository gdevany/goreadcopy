import React, { PureComponent } from 'react'
import { BookStoreNavBar } from '../common'
import WishListBooks from './wishListBooks'
import BookInfo from './BookInfo'
import { Footer } from '../common'
import { Auth } from '../../services'

const isUserLoggedIn = Auth.currentUserExists()

class BookPage extends PureComponent {
  render() {
    return (
      <div>
        <BookStoreNavBar/>
        <div className='bookpage-main-container'>
          <BookInfo />
          {isUserLoggedIn ? <WishListBooks/> : null}
        </div>
        <div className='bookstore-footer-container'>
          <Footer />
        </div>
      </div>
    )
  }
}

export default BookPage
