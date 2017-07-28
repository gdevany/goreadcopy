import React from 'react'
import LockIcon from 'material-ui/svg-icons/action/lock-outline'
import { CardForm, BillingForm, UseLitcoins, OrderSummary, CartItems } from '../'

const StepTwo = ({
  isCard,
  isPaypal,
  handleSwitch,
  cardInfo,
  billingInfo,
  onChange,
  selectChange,
  isSameShipping,
  handleCheckSame,
  handleUseLitcoins,
  useLitcoins,
  next,
  order,
}) => {
  return (
    <div className='row'>
      <div className='large-7 columns'>
        <section className='checkoutpage-payment-selection-container'>
          <section
            className={isCard ?
              'checkoutpage-payment-card-container payment-selected' :
              'checkoutpage-payment-card-container'
            }
          >
            <div className='checkoutpage-payment-selector'>
              <div
                className={isCard ?
                  'checkoutpage-payment-selector-element selected-payment' :
                  'checkoutpage-payment-selector-element'
                }
                onClick={() => handleSwitch('card')}
              >
                <a className='checkoutpage-payment-selector-anchor'/>
              </div>
            </div>
            <div className='checkoutpage-payment-card'>
              <div className='checkoutpage-payment-card-head'>
                <span className='checkoutpage-payment-card-head-title'>
                  Card / Credit Card
                </span>
                <img
                  className='checkoutpage-payment-card-head-img'
                  src='/image/credit-cards.png'
                />
              </div>
              <div className='checkoutpage-payment-card-subhead'>
                <LockIcon className='checkoutpage-payment-card-subhead-icon'/>
                <span className='checkoutpage-payment-card-subhead-text'>
                  Secure and encrypted
                </span>
              </div>
              <CardForm
                cardInfo={cardInfo}
                onChange={onChange}
                handleCheckSame={handleCheckSame}
                isSameShippingChecked={isSameShipping}
                context='firstStep'
              />
              {!isSameShipping ?
                <BillingForm
                  billingInfo={billingInfo}
                  onChange={onChange}
                  selectChange={selectChange}
                /> : null
              }
            </div>
          </section>
          <section
            className={isPaypal ?
              'checkoutpage-payment-paypal-container payment-selected' :
              'checkoutpage-payment-paypal-container'
            }
          >
            <div className='checkoutpage-payment-selector'>
              <div
                className={isPaypal ?
                  'checkoutpage-payment-selector-element selected-payment' :
                  'checkoutpage-payment-selector-element'
                }
                onClick={() => handleSwitch('paypal')}
              >
                <a className='checkoutpage-payment-selector-anchor'/>
              </div>
            </div>
            <div className='checkoutpage-payment-paypal'>
              <img src='/image/paypal-logo.png'/>
            </div>
          </section>
        </section>
        <UseLitcoins
          currentOrder={order}
          onChange={handleUseLitcoins}
          boxChecked={useLitcoins}
        />
        <a
          onClick={next}
          className='store-primary-button float-left'
        >
          Review Order
        </a>
        <span className='checkoutpage-review-order-text'>
          You will not be charged ultil you confirm your order
        </span>
      </div>
      <div className='large-4 large-offset-1 columns end'>
        <OrderSummary />
        <CartItems />
      </div>
    </div>
  )
}
export default StepTwo
