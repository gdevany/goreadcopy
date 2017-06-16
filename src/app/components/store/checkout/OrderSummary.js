import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class OrderSummary extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { orderSummary } = this.props
    if (orderSummary) {
      return (
        <section>
          <section className='checkoutpage-order-summary-container'>
            <h3 className='checkoutpage-order-summary-title'>
              Order Summary
            </h3>
            <div className='checkoutpage-order-summary-list-elements'>
              <div className='checkoutpage-order-summary-list-single'>
                <span className='checkoutpage-order-summary-list-description'>
                  Subtotal
                </span>
                <span className='checkoutpage-order-summary-list-price'>
                  ${orderSummary.orderSubtotal}
                </span>
              </div>
              <div className='checkoutpage-order-summary-list-single'>
                <span className='checkoutpage-order-summary-list-description'>
                  Shipping
                </span>
                <span className='checkoutpage-order-summary-list-price'>
                  $4.99
                </span>
              </div>
              <div className='checkoutpage-order-summary-list-single'>
                <span className='checkoutpage-order-summary-list-description'>
                  Tax
                </span>
                <span className='checkoutpage-order-summary-list-price'>
                  $0.00
                </span>
              </div>
              <div className='checkoutpage-order-summary-list-single'>
                <span className='checkoutpage-order-summary-list-description has-litcoins'>
                  Litcoins
                  <div className='has-litcoins-container'>
                    <span className='has-litcoins-ammount'>(6,000)</span>
                    <img className='has-litcoins-img' src='/image/litcoin.png'/>
                  </div>
                </span>
                <span className='checkoutpage-order-summary-list-price'>
                  - $4.00
                </span>
              </div>
            </div>
            <hr className='checkoutpage-order-summary-divider'/>
            <div className='checkoutpage-order-summary-total'>
              <span className='checkoutpage-order-summary-total-text'>
                Total
              </span>
              <span className='checkoutpage-order-summary-total-count'>
                ${orderSummary.orderTotal}
              </span>
            </div>
            <hr className='checkoutpage-order-summary-divider'/>
            <form className='checkoutpage-order-summary-coupon-form'>
              <input
                type='text'
                placeholder='Apply promo code'
                className='checkoutpage-order-summary-coupon-input'
              />
              <a className='checkoutpage-order-summary-coupon-submit'>
                Apply
              </a>
            </form>
          </section>
          <section className='checkoutpage-order-litcoins-to-earn-container'>
            <span className='checkoutpage-order-litcoins-to-earn-main-text'>
               Yo'll earn {/*<b> $.170 </b> */}
              <span className='checkoutpage-order-litcoins-to-earn-litcoins-amount'>
                ({orderSummary.litcoinsToEarn ?
                  orderSummary.litcoinsToEarn.toLocaleString() : null
                }
                  <img
                    className='checkoutpage-order-litcoins-to-earn-litcoins-img'
                    src='/image/litcoin.png'
                  />
                )
              </span>
              with this purchase
            </span>
          </section>
        </section>
      )
    }
    return null
  }
}
const mapStateToProps = (state) => {
  return {
    orderSummary: state.store.order
  }
}
export default connect(mapStateToProps, null)(OrderSummary)
