import React from 'react'
import { OrderSummary, CartItems, ShippingMethods, ShippingForm } from '../'

const StepOne = ({ shippingInfo, shippingMethods, onChange, setShipping, selectChange, next }) => {
  return (
    <div className='row'>
      <div className='large-7 columns'>
        <ShippingForm
          shippingInfo={shippingInfo}
          onChange={onChange}
          selectChange={selectChange}
          title='Shipping Address'
          className='checkoutpage-steps-shipping-address-container'
        />
        {shippingMethods ?
          <ShippingMethods
            shippingMethods={shippingMethods}
            onClick={setShipping}
          /> : null
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
