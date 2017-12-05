import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Numbers } from '../../../utils'

const { parseFloatToUSD, parseIntToLocale } = Numbers

class CartItems extends PureComponent {
  constructor(props) {
    super(props)
  }

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  renderCart = (cart) => {
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
    }
    return (
      <div className='loading-animation-store'/>
    )
  }

  render() {
    const { cart, order } = this.props
    return (
      <section className='checkoutpage-cart-elements-container'>
        <div className='checkoutpage-cart-elements-heading'>
          <h3 className='checkoutpage-cart-elements-heading-title'>
            Cart
          </h3>
          { order && order.status !== 40 ?
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
          {this.renderCart(cart)}
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

export default connect(mapStateToProps, null)(CartItems)
