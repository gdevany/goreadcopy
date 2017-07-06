import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Store } from '../../../redux/actions'

const { setPromoCode } = Store

class OrderSummary extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      promoCode: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePromoApply = this.handlePromoApply.bind(this)
  }

  handleEnterButton = (event) => {
    if (event.which === 13) {
      event.preventDefault()
    }
  }

  handleChange = (event) => {
    event.preventDefault()
    this.setState({ promoCode: event.target.value })
  }

  handlePromoApply = (event) => {
    event.preventDefault()
    const { orderSummary, setPromoCode } = this.props
    const { promoCode } = this.state

    if (promoCode.length >= 4) {
      setPromoCode(orderSummary.id, promoCode)
    }
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
                  ${orderSummary.shippingCost.toLocaleString()}
                </span>
              </div>
              <div className='checkoutpage-order-summary-list-single'>
                <span className='checkoutpage-order-summary-list-description'>
                  Tax
                </span>
                <span className='checkoutpage-order-summary-list-price'>
                  ${orderSummary.taxes.toLocaleString()}
                </span>
              </div>
              <div className='checkoutpage-order-summary-list-single'>
                <span className='checkoutpage-order-summary-list-description has-litcoins'>
                  Litcoins
                  <div className='has-litcoins-container'>
                    <span className='has-litcoins-ammount'>
                      ({orderSummary.litcoinsRedeemed.toLocaleString()})
                    </span>
                    <img className='has-litcoins-img' src='/image/litcoin.png'/>
                  </div>
                </span>
                <span className='checkoutpage-order-summary-list-price'>
                  - ${orderSummary.dollarsRedeemed.toLocaleString()}
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
            <form
              className='checkoutpage-order-summary-coupon-form'
              onKeyPress={this.handleEnterButton}
            >
              <input
                type='text'
                placeholder='Apply promo code'
                onChange={this.handleChange}
                value={this.state.promoCode}
                className='checkoutpage-order-summary-coupon-input'
              />
              <a
                onClick={this.handlePromoApply}
                className='checkoutpage-order-summary-coupon-submit'
              >
                Apply
              </a>
            </form>
          </section>
          <section className='checkoutpage-order-litcoins-to-earn-container'>
            <span className='checkoutpage-order-litcoins-to-earn-main-text'>
               Yo'll earn <b> ${orderSummary.dollarsToEarn} </b>
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
export default connect(mapStateToProps, { setPromoCode })(OrderSummary)
