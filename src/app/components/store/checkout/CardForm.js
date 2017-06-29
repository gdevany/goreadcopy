import React, { PropTypes } from 'react'
import LockIcon from 'material-ui/svg-icons/action/lock-outline'

const CardFrom = ({ cardInfo, onChange, handleCheckSame, isSameShippingChecked }) => {
  return (
    <div className='checkoutpage-payment-card-form'>
      <div className='row'>
        <div className='large-12 columns'>
          <div className='checkoutpage-payment-card-inputs'>
            <label className='checkoutpage-payment-card-inputs-label'>
              Name on Card
            </label>
            <input
              type='text'
              className='checkoutpage-payment-card-single-input'
              onChange={onChange('nameOnCard')}
              value={cardInfo.nameOnCard}
            />
          </div>
        </div>
        <div className='large-12 columns'>
          <div className='checkoutpage-payment-card-inputs'>
            <label className='checkoutpage-payment-card-inputs-label'>
              Card Number
            </label>
            <input
              type='text'
              className='checkoutpage-payment-card-single-input'
              onChange={onChange('cardNumber')}
              value={cardInfo.cardNumber}
            />
          </div>
        </div>
        <div className='large-8 columns'>
          <div className='checkoutpage-payment-card-inputs'>
            <label className='checkoutpage-payment-card-inputs-label'>
              Expiration Date (MM/YY)
            </label>
            <input
              type='text'
              className='checkoutpage-payment-card-single-input'
              onChange={onChange('fullExpDate')}
              value={cardInfo.fullExpDate}
            />
          </div>
        </div>
        <div className='large-4 columns'>
          <div className='checkoutpage-payment-card-inputs'>
            <label className='checkoutpage-payment-card-inputs-label'>
              CVC
            </label>
            <input
              type='number'
              min='100'
              min='999'
              className='checkoutpage-payment-card-single-input has-lock'
              onChange={onChange('cardCVC')}
              value={cardInfo.cardCVC}
            />
            <LockIcon
              className='checkoutpage-payment-card-single-input-lock'
            />
          </div>
        </div>
        {/* <div className='large-12 columns'>
          <div className='checkoutpage-payment-card-inputs'>
            <input
              type='checkbox'
              className='checkoutpage-payment-card-single-input-check'
              onChange={this.handleCheckSave}
              checked={this.state.saveCard}
            />
            <label className='checkoutpage-payment-card-inputs-label-check'>
              Save card for future use
            </label>
          </div>
        </div> */}
        <div className='large-12 columns'>
          <div className='checkoutpage-payment-card-inputs'>
            <input
              type='checkbox'
              className='checkoutpage-payment-card-single-input-check'
              onChange={handleCheckSame}
              checked={isSameShippingChecked}
            />
            <label className='checkoutpage-payment-card-inputs-label-check'>
              Use shipping address
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

CardFrom.propTypes = {
  cardInfo: PropTypes.object,
  onChange: PropTypes.func,
  handleCheckSame: PropTypes.func,
  isSameShippingChecked: PropTypes.bool,
}

export default CardFrom
