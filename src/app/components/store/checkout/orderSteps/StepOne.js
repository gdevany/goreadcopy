import React from 'react'
import { OrderSummary, CartItems, ShippingMethods, ShippingForm } from '../'

const StepOne = ({
  shippingInfo,
  shippingMethods,
  onChange,
  setShipping,
  selectedShipping,
  selectChange,
  next,
  allGifts,
  isLoadingCart
}) => {
  return (
    <div className='row'>
      <div className='large-7 columns'>
        {
          isLoadingCart ?
            <div className='loading-animation-store-big'/> :
            allGifts ?
              <div className='cart-blank-state'>
                <figure>
                  <img src='/image/happyBook.png' alt='Gift addresses are set'/>
                </figure>
                <span className='cart-blank-title'>
                  All your gift's addresses are set!
                </span>
                <span className='cart-blank-subtitle'>
                  Please, select your delivery method.
                </span>
              </div> :
              <ShippingForm
                shippingInfo={shippingInfo}
                onChange={onChange}
                selectChange={selectChange}
                title='Shipping Address'
                className='checkoutpage-steps-shipping-address-container'
              />
        }
        {
          shippingMethods ?
            <ShippingMethods
              shippingMethod={selectedShipping}
              shippingMethods={shippingMethods}
              onClick={setShipping}
            /> :
            null
        }
        <a
          onClick={next}
          className='store-primary-button float-left'
        >
          Continue to Billing
        </a>
      </div>
      <div className='large-4 large-offset-1 columns end'>
        <OrderSummary />
        <CartItems />
      </div>
    </div>
  )
}
export default StepOne
