import React, { PureComponent } from 'react'
import { BookStoreNavBar } from '../common'
import { Footer } from '../common'

class CategoriesPage extends PureComponent {
  render() {
    return (
      <div>
        <BookStoreNavBar/>
        <div className='categorypage-main-container'>
          Categories Page
        </div>
        <div className='bookstore-footer-container'>
          <Footer />
        </div>
      </div>
    )
  }
}

export default CategoriesPage
