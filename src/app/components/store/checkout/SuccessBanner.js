import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router'

const SuccessBanner = () => (
  <section className='checkout-order-completed-container'>
    <div className='checkout-order-completed'>
      <figure className='checkout-order-completed-figure'>
        <img src='/image/success-icon.png' alt='Payment Success'/>
      </figure>
      <h3 className='checkout-order-completed-title'>
        You successfully placed your order
        & earned
      </h3>
      <p className='checkout-order-completed-description'>
        Thank you for shopping with us! We'll send you a confirmation
        once your book ships.
      </p>
      <div className='checkout-order-completed-anchor-container'>
        <Link
          to='/browse'
          className='store-primary-button'
        >
          Go to book store
        </Link>
      </div>
    </div>
  </section>
)
//
// SuccessBanner.propTypes = {
//   litcoinsEarned: PropTypes.string.isRequired,
// }

export default SuccessBanner
