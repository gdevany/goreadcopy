import React, { PureComponent } from 'react'

class UseLitcoins extends PureComponent {
  render() {
    return (
      <section className='checkoutpage-litcoins-use-container'>
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
      </section>
    )
  }
}
export default UseLitcoins
