import React, { PureComponent } from 'react'
import { BookStoreNavBar } from '../common'
import BookStoreHero from './bookStoreHero'
import CategoriesCarousel from './categoriesCarousel'
import WishListBooks from './wishListBooks'
import RecommendedBooks from './RecommendedBooks'
import { Auth } from '../../services'

const isUserLoggedIn = Auth.currentUserExists()

class BookStore extends PureComponent {
  render() {
    return (
      <div>
        <BookStoreNavBar/>
        <BookStoreHero isUserLogged={isUserLoggedIn}/>
        <div className='row'>
          <div className='large-12 columns'>
            <CategoriesCarousel />
          </div>
        </div>
        {isUserLoggedIn ? <WishListBooks/> : null}
        <div className='row'>
          <div className='large-12 columns'>
            <RecommendedBooks />
          </div>
        </div>
      </div>
    )
  }
}

export default BookStore
