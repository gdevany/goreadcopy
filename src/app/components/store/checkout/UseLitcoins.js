import React, { PropTypes } from 'react'

const UseLitcoins = ({ boxChecked, onChange }) => {
  return (
    <section className='checkoutpage-litcoins-use-container'>
      <h3>Litcoins</h3>
      <div className='checkoutpage-litcoins-use-main'>
        <input
          className='checkoutpage-litcoins-useinput'
          type='checkbox'
          onChange={onChange}
          checked={boxChecked}
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

UseLitcoins.propTypes = {
  boxChecked: PropTypes.bool,
  onChange: PropTypes.func,
}

export default UseLitcoins
