import React from 'react'
import PropTypes from 'prop-types'
import Numbers from '../../../utils/Numbers'

const { parseFloatToUSD, parseIntToLocale } = Numbers

const UseLitcoins = ({ boxChecked, onChange, currentOrder }) => {
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
          {
            currentOrder && currentOrder.dollarsRedeemed && currentOrder.litcoinsRedeemed ?
              <div className='checkoutpage-litcoins-use-details'>
                <span className='checkoutpage-litcoins-use-text'>
                  <b>{parseFloatToUSD(currentOrder.dollarsRedeemed)}</b>
                  ({parseIntToLocale(currentOrder.litcoinsRedeemed)}
                  <img
                    className='checkoutpage-litcoins-use-img'
                    src='/image/litcoin.png'
                  />
                  will be used!)
                </span>
              </div> :
              null
          }
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
