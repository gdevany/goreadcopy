import React, { PureComponent } from 'react'
import UseLitcoins from './UseLitcoins'

class ReviewOrder extends PureComponent {
  render() {
    return (
      <section className='checkoutpage-order-review'>
        <h3> Review your order</h3>
        <hr className='checkoutpage-order-review-divider'/>
        <article className='checkoutpage-order-review-address-main'>
          <div className='checkoutpage-order-review-address-container'>
            <h4>Shipping Address</h4>
            <div className='checkoutpage-order-review-address-details'>
              <span className='checkoutpage-order-review-name'>
                Jenny Olofmeister
              </span>
              <span className='checkoutpage-order-review-address-text'>
                1615 16th St.
              </span>
              <span className='checkoutpage-order-review-text-two'>
                Santa Monica, CA 9042, United States
              </span>
            </div>
          </div>
          <div className='checkoutpage-order-review-edit'>
            <a className='checkoutpage-order-review-edit-btn'>
              Edit
            </a>
          </div>
        </article>
        <hr className='checkoutpage-order-review-divider'/>
        <article className='checkoutpage-order-review-card-main'>
          <div className='checkoutpage-order-review-card-container'>
            <h4>Payment</h4>
            <div className='checkoutpage-order-review-card-details'>
              <div className='checkoutpage-order-review-card-nums'>
                <img src='/image/visa-black.png' className='checkoutpage-order-review-card-type'/>
                <span className='checkoutpage-order-review-card-last'>
                  *****4910
                </span>
                <span className='checkoutpage-order-review-card-exp'>
                  Expires 12/21
                </span>
              </div>
              <span className='checkoutpage-order-review-card-name'>
                Jenny Olofmeister
              </span>
              <span className='checkoutpage-order-review-card-address'>
                Santa Monica, CA 9042, United States
              </span>
            </div>
          </div>
          <div className='checkoutpage-order-review-edit'>
            <a className='checkoutpage-order-review-edit-btn'>
              Edit
            </a>
          </div>
        </article>
        <UseLitcoins />
      </section>
    )
  }
}
export default ReviewOrder
