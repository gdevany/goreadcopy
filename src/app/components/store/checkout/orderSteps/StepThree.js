import React from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout'
import { ReviewOrder, OrderSummary, CartItems } from '../'

const StepThree = ({
  order,
  isPaypal,
  isCard,
  shippingMethods,
  useLitcoins,
  selectedShipping,
  shippingId,
  changePayment,
  paypalConfig,
  onError,
  onSuccess,
  onCancel,
  place,
}) => {
  let client = {}
  if (paypalConfig) {
    client = {
      [paypalConfig.mode]: paypalConfig.clientId,
    }
  }
  return (
    <div className='row'>
      <div className='large-7 columns'>
        <ReviewOrder
          data={order}
          isPaypal={isPaypal}
          shippingMethods={shippingMethods}
          usingLitcoins={useLitcoins}
          shippingMethod={selectedShipping}
          shippingId={shippingId}
          changePayment={changePayment}
        />
        <CartItems />
      </div>
      <div className='large-4 large-offset-1 columns end'>
        {!paypalConfig || isCard ?
          (
            <a
              onClick={place}
              className='store-primary-button float-left'
            >
              Place Order
            </a>
          ) : null
        }

        {paypalConfig && isPaypal ?
          (
            <PaypalExpressBtn
              env={paypalConfig.mode}
              client={client}
              currency={paypalConfig.currency}
              total={parseFloat(order.orderTotal)}
              onError={onError}
              onSuccess={onSuccess}
              onCancel={onCancel}
            />
          ) : null
        }
        <OrderSummary />
      </div>
    </div>
  )
}
export default StepThree
