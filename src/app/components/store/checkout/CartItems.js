import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Store } from '../../../redux/actions'
import { Numbers } from '../../../utils'

const { getCartItems } = Store
const { parseFloatToUSD, parseIntToLocale } = Numbers

class CartItems extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      cart: false,
      status: false,
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.cart && nextProps.cart.itemsCount >= 0) {
      this.setState({
        cart: nextProps.cart
      })
    }
    if (nextProps.order) this.setState({ status: nextProps.order.status })
  }

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  renderCart = () => {
    const { cart } = this.state
    if (cart && cart.itemsCount > 0) {
      return cart.items.map((elem, index) => {
        return (
          <article
            key={`${index}_${elem.product.id}`}
            className='checkoutpage-cart-single-element'
          >
            <figure className='checkoutpage-cart-single-element-figure'>
              <img
                className='checkoutpage-cart-single-element-img'
                src={elem.product.imageUrl}
              />
              <span className='checkoutpage-cart-single-element-count'>
                {elem.quantity}
              </span>
            </figure>
            <div className='checkoutpage-cart-single-element-info'>
              <span className='checkoutpage-cart-single-element-title'>
                {elem.product.name ? this.truncInfo(elem.product.name, 50) : null}
              </span>
              <span className='checkoutpage-cart-single-element-author'>
                by {elem.product.seller ? this.truncInfo(elem.product.seller, 50) : null}
              </span>
              {/* <span className='checkoutpage-cart-single-element-paper'>
                Hardcover
              </span> */}
              <span className='checkoutpage-cart-single-element-price'>
                { parseFloatToUSD(elem.product.unitPrice) }
              </span>
              <div className='checkoutpage-cart-single-element-litcoins'>
                <span className='checkoutpage-cart-single-element-litcoins-count'>
                  { parseIntToLocale(elem.product.litcoinsPrice) }
                </span>
                <img
                  className='checkoutpage-cart-single-element-litcoins-img'
                  src='/image/litcoin.png'
                />
              </div>
            </div>
          </article>
        )
      })
    } return (
      <div className='loading-animation-store'/>
    )
  }

  render() {
    const { status } = this.state
    return (
      <section className='checkoutpage-cart-elements-container'>
        <div className='checkoutpage-cart-elements-heading'>
          <h3 className='checkoutpage-cart-elements-heading-title'>
            Cart
          </h3>
          {status !== 40 ?
            (
              <Link
                className='checkoutpage-cart-elements-heading-anchor'
                to='/shop/cart'
              >
                Edit Cart
              </Link>
            ) : null
          }
        </div>
        <section className='checkoutpage-cart-elements'>
          {this.renderCart()}
        </section>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.store.cartItems,
    order: state.store.order,
  }
}

export default connect(mapStateToProps, { getCartItems })(CartItems)
