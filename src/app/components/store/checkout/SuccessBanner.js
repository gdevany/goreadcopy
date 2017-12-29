import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

const SuccessBanner = (props) => {
  const { createdAccount, litcoinsEarned } = props
  return (
    <section className='checkout-order-completed-container'>
      <div className='checkout-order-completed'>
        <figure className='checkout-order-completed-figure'>
          <img src='/image/success-icon.png' alt='Payment Success'/>
        </figure>
        <h3 className='checkout-order-completed-title'>
          You successfully placed your order & earned
          <strong>{` ${litcoinsEarned} `}</strong>
          litcoins!
        </h3>
        <p className='checkout-order-completed-description'>
          Thank you for shopping with us! We'll send you a confirmation
          once your book ships.
        </p>
        {
          createdAccount ? (
            <div className='checkout-order-completed-anchor-container'>
              <p className='checkout-order-completed-description'>
                To earn even more Litcoins, set the profile info for your account.
                <Link
                  to='/signup?step=selectGenres'
                  className='store-primary-button'
                  style={{ margin: '1em auto' }}
                >
                  Edit your profile
                </Link>
              </p>
            </div>
          ) : (
            <div className='checkout-order-completed-anchor-container'>
              <Link to='/store' className='store-primary-button' >
                Go to book store
              </Link>
            </div>
          )
        }
      </div>
    </section>
  )
}

SuccessBanner.propTypes = {
  litcoinsEarned: PropTypes.number.isRequired,
  createdAccount: PropTypes.bool,
}

export default SuccessBanner
