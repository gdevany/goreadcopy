import React, { PureComponent } from 'react'
import { BookStoreNavBar } from '../common'
import BookStoreHero from './bookStoreHero'
import { Auth } from '../../services'

const isUserLoggedIn = Auth.currentUserExists()

class BookStore extends PureComponent {
  render() {
    return (
      <div>
        <BookStoreNavBar/>
        <BookStoreHero isUserLogged={isUserLoggedIn}/>
      </div>
    )
  }
}

export default BookStore
