import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import WishListBooks from './wishListBooks'
import CartElement from './cartElement'
import { BookStoreNavBar } from '../common'
import { Footer } from '../common'
import { Auth } from '../../services'
import { browserHistory } from 'react-router'

const isUserLoggedIn = Auth.currentUserExists()

class CartPage extends PureComponent {

  componentWillMount = () => {
    if (!isUserLoggedIn) {
      browserHistory.push('/')
    }
  }
  render() {
    return (
      <div>
        <BookStoreNavBar/>
        <div className='cartpage-main-container'>
          <section className='cartpage-main-element-container'>
            <div className='row'>
              <div className='large-6 large-offset-3 columns'>
                <section className='cartpage-container'>
                  <h2 className='cartpage-title'>Your Cart</h2>
                  <div className='cartpage-elements-container'>
                    <CartElement
                      bookImage='/image/example1.png'
                      bookTile='End of Wach'
                      authorFullName='Sthepen King'
                      paperType='Hardcover'
                      bookCount={3}
                      bookPrice={17.28}
                      litcoinsPrice={25502}
                    />
                    <CartElement
                      bookImage='/image/example2.png'
                      bookTile='Harry Potter and the Prisioner of Azkaban'
                      authorFullName='JK Rolling'
                      paperType='Hardcover'
                      bookCount={1}
                      bookPrice={7.28}
                      litcoinsPrice={15502}
                    />
                  </div>
                  <div className='cartpage-subtotal-container'>
                    <span className='bookpage-subtotal-title'>Subtotal</span>
                    <h3 className='bookpage-subtotal-price'>$17.28</h3>
                  </div>
                  <div className='cartpage-action-btns-container'>
                    <a className='cartpage-action-secondary-btn' href='/browse'>
                      Continue shopping
                    </a>
                    <a className='cartpage-action-primary-btn' href='/checkout'>
                      Checkout
                    </a>
                  </div>
                </section>
              </div>
            </div>
          </section>
          {isUserLoggedIn ? <WishListBooks/> : null}
        </div>
        <div className='bookstore-footer-container'>
          <Footer />
        </div>
      </div>
    )
  }
}
export default connect(null, null)(CartPage)
