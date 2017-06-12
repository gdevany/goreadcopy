import React, { PureComponent } from 'react'

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
        <article className='checkoutpage-order-review-address-main'>
          <h4>Payment</h4>
          <div className='checkoutpage-order-review-card-details'>
            <div className='checkoutpage-order-review-card-nums'>
              <img className='checkoutpage-order-review-card-type'/>
              <span className='checkoutpage-order-review-card-last'>
                *****4910
              </span>
              <span className='checkoutpage-order-review-card-exp'>
                12/21
              </span>
            </div>
            <span className='checkoutpage-order-review-card-name'>
              Jenny Olofmeister
            </span>
            <span className='checkoutpage-order-review-card-address'>
              Santa Monica, CA 9042, United States
            </span>
          </div>
          <div className='checkoutpage-order-review-edit'>
            <a className='checkoutpage-order-review-edit-btn'>
              Edit
            </a>
          </div>
        </article>
        <article className='checkoutpage-litcoins-use-container'>
          <h3>Litcoins</h3>
          <div className='checkoutpage-litcoins-use-main'>
            <input
              className='checkoutpage-litcoins-use-input'
              type='checkbox'
            />
            <label className='checkoutpage-litcoins-use-label'>
              <span className='checkoutpage-litcoins-use-label-span'>
                Use my Litcoins
              </span>
              <div className='checkoutpage-litcoins-use-details'>
                <span className='checkoutpage-litcoins-use-text'>
                  <b>$6.00</b> (8,000
                  <img
                    className='checkoutpage-litcoins-use-img'
                    src='/image/litcoin.png'
                  /> available)
                </span>
              </div>
            </label>
          </div>
        </article>
      </section>
    )
  }
}
export default ReviewOrder
