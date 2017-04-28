import React, { PureComponent } from 'react'
import { BookStoreNavBar } from '../common'
import BookStoreHero from './bookStoreHero'
import CategoriesCarousel from './categoriesCarousel'
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
      </div>
    )
  }
}

export default BookStore
