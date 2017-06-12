import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class CartItems extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      cart: false,
    }
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps)
    if (nextProps.cart && nextProps.cart.itemsCount >= 0) {
      console.log(nextProps.cart)
      this.setState({
        cart: nextProps.cart
      })
    }
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
                {elem.product.name ? this.truncInfo(elem.product.name, 100) : null}
              </span>
              <span className='checkoutpage-cart-single-element-author'>
                by Stephen King
              </span>
              <span className='checkoutpage-cart-single-element-paper'>
                Hardcover
              </span>
              <span className='checkoutpage-cart-single-element-price'>
                ${elem.product.unitPrice}
              </span>
              <div className='checkoutpage-cart-single-element-litcoins'>
                <span className='checkoutpage-cart-single-element-litcoins-count'>
                  {elem.product.litcoinsPrice}
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
      <div>
        No elements in the cart
      </div>
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

const mapStateToProps = (state) => {
  return {
    cart: state.store.cartItems,
  }
}

export default connect(mapStateToProps, null)(CartItems)
