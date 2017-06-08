import React, { PureComponent } from 'react'
import { Link } from 'react-router'

class CartItems extends PureComponent {

  renderCart = () => {
    return (
      <article className='checkoutpage-cart-single-element'>
        <figure className='checkoutpage-cart-single-element-figure'>
          <img
            className='checkoutpage-cart-single-element-img'
            src='/image/example1.png'
          />
          <span className='checkoutpage-cart-single-element-count'>
            1
          </span>
        </figure>
        <div className='checkoutpage-cart-single-element-info'>
          <span className='checkoutpage-cart-single-element-title'>
            End of Watch
          </span>
          <span className='checkoutpage-cart-single-element-author'>
            by Stephen King
          </span>
          <span className='checkoutpage-cart-single-element-paper'>
            Hardcover
          </span>
          <span className='checkoutpage-cart-single-element-price'>$17,28</span>
          <div className='checkoutpage-cart-single-element-litcoins'>
            <span className='checkoutpage-cart-single-element-litcoins-count'>
              25,502
            </span>
            <img
              className='checkoutpage-cart-single-element-litcoins-img'
              src='/image/litcoin.png'
            />
          </div>
        </div>
      </article>
    )
  }

  render() {
    return (
      <section className='checkoutpage-cart-elements-container'>
        <div className='checkoutpage-cart-elements-heading'>
          <h3 className='checkoutpage-cart-elements-heading-title'>
            Cart
          </h3>
          <Link
            className='checkoutpage-cart-elements-heading-anchor'
            to='/shop/cart'
          >
            Edit Cart
          </Link>
        </div>
        <section className='checkoutpage-cart-elements'>
          {this.renderCart()}
        </section>
      </section>
    )
  }
}
export default CartItems
