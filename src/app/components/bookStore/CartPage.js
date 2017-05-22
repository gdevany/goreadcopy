import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { BookStoreNavBar } from '../common'
import { Footer } from '../common'

class CartPage extends PureComponent {
  render() {
    return (
      <div>
        <BookStoreNavBar/>
        <div className='cartpage-main-container'>
          <div className='row'>
            <div className='large-12 columns'>
              Cart Page
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
export default connect(null, null)(CartPage)
