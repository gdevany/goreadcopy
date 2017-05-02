import React, { PureComponent } from 'react'
import { BookStoreNavBar } from '../common'
import BookStoreHero from './bookStoreHero'
import CategoriesCarousel from './categoriesCarousel'
import WishListBooks from './wishListBooks'
import RecommendedBooks from './RecommendedBooks'
import BestSellers from './BestSellers'
import TrendingBooks from './TrendingBooks'
import { Footer } from '../common'
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
        <div className='row'>
          <div className='large-12 columns'>
            <BestSellers />
          </div>
        </div>
        <TrendingBooks />
        {isUserLoggedIn ?
          null : (
            <section className='bookstore-announcement-container'>
              <p className='bookstore-announcement-text'>
                Readers Love our book community & it's non fiction
              </p>
              <a href='#' className='bookstore-announcement-anchor'>
                Ok, i'm sold
              </a>
            </section>
          )
        }
        <div className='bookstore-footer-container'>
          <Footer />
        </div>
      </div>
    )
  }
}

export default BookStore
