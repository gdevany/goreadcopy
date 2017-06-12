import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import WishListBooks from '../common/wishListBooks'
import CartElement from './cartElement'
import { BookStoreNavBar, Footer } from '../../common'
import { Auth } from '../../../services'
import { Store } from '../../../redux/actions'

const isUserLoggedIn = Auth.currentUserExists()
const { getCartItems } = Store

class CartPage extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      cart: false,
    }
  }

  componentWillMount = () => {
    if (!isUserLoggedIn) {
      browserHistory.push('/')
    }
    this.props.getCartItems({
      perPage: 50,
    })
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.cart && nextProps.cart.itemsCount >= 0) {
      this.setState({
        cart: nextProps.cart
      })
    }
  }

  mapCartItems = () => {
    const { cart } = this.state
    return cart.items.map((item, index) => {
      return (
        <CartElement
          key={item.id}
          bookImage={item.product.imageUrl}
          bookTile={item.product.name}
          authorFullName='Sthepen King'
          paperType='Hardcover'
          bookCount={item.quantity}
          bookPrice={item.product.unitPrice}
          litcoinsPrice={item.product.litcoinsPrice}
          bookId={item.product.id}
        />
      )
    })
  }

  render() {
    const { cart } = this.state
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
                    {cart && cart.itemsCount > 0 ?
                      this.mapCartItems() : null
                    }
                  </div>
                  <div className='cartpage-subtotal-container'>
                    <span className='bookpage-subtotal-title'>Subtotal</span>
                    <h3 className='bookpage-subtotal-price'>
                      ${cart ? cart.subtotalPrice : 0}
                    </h3>
                  </div>
                  <div className='cartpage-action-btns-container'>
                    <a className='cartpage-action-secondary-btn' href='/browse'>
                      Continue shopping
                    </a>
                    <Link className='cartpage-action-primary-btn' to='/shop/checkout'>
                      Checkout
                    </Link>
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

const mapStateToProps = (state) => {
  return {
    cart: state.store.cartItems,
  }
}

export default connect(mapStateToProps, { getCartItems })(CartPage)
