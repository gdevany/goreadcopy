import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

const Success = ({ litcoinsEarned }) => (
  <section className='checkout-order-completed-container'>
    <figure className='checkout-order-completed-figure'>
      <img src='#' alt='Payment Success'/>
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
        className='checkout-order-completed-anchor'
      >
        Go to book store
      </Link>
    </div>
  </section>
)

Success.propTypes = {
  litcoinsEarned: PropTypes.string.isRequired,
}

export default Success