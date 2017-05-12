import React, { PureComponent } from 'react'
import { BookStoreNavBar } from '../common'
import CategoriesHero from './CategoriesHero'
import CategoriesFilters from './CategoriesFilters'
import WishListBooks from './WishListBooks'
import BestSellers from './BestSellers'
import { Footer } from '../common'
import { Auth } from '../../services'

const isUserLoggedIn = Auth.currentUserExists()

class CategoriesPage extends PureComponent {
  render() {
    return (
      <div>
        <BookStoreNavBar/>
        <div className='categorypage-main-container'>
          <CategoriesHero />
          <CategoriesFilters />
          {isUserLoggedIn ? <WishListBooks/> : null}
          <div className='row'>
            <div className='large-12 columns'>
              <BestSellers />
            </div>
          </div>
        </div>
        <div className='bookstore-footer-container'>
          <Footer />
        </div>
      </div>
    )
  }
}

export default CategoriesPage
