import React from 'react'
import PropTypes from 'prop-types'

const BillingForm = ({ billingInfo, onChange }) => {
  return (
    <div className='row'>
      <div className='large-12 columns'>
        Billing Address
        <hr/>
        <div className='row'>
          <div className='small-6 columns'>
            <label
              className='checkoutpage-steps-shipping-address-form-label'
            >
              First Name
            </label>
            <input
              type='text'
              onChange={onChange('firstNameBilling')}
              className='checkoutpage-steps-shipping-address-form-input'
              value={billingInfo.firstNameBilling}
            />
          </div>
          <div className='small-6 columns'>
            <label
              className='checkoutpage-steps-shipping-address-form-label'
            >
              Last Name
            </label>
            <input
              type='text'
              className='checkoutpage-steps-shipping-address-form-input'
              onChange={onChange('lastNameBilling')}
              value={billingInfo.lastNameBilling}
            />
          </div>
          <div className='small-12 columns'>
            <label
              className='checkoutpage-steps-shipping-address-form-label'
            >
              Address
            </label>
            <input
              type='text'
              className='checkoutpage-steps-shipping-address-form-input'
              onChange={onChange('addressBilling')}
              value={billingInfo.addressBilling}
            />
          </div>
          <div className='small-12 columns'>
            <label
              className='checkoutpage-steps-shipping-address-form-label'
            >
              Address Line 2 *Optional
            </label>
            <input
              type='text'
              className='checkoutpage-steps-shipping-address-form-input'
              onChange={onChange('address2Billing')}
              value={billingInfo.address2Billing}
            />
          </div>
          <div className='small-6 columns'>
            <label
              className='checkoutpage-steps-shipping-address-form-label'
            >
              Country
            </label>
            <input
              type='text'
              className='checkoutpage-steps-shipping-address-form-input'
              onChange={onChange('countryBilling')}
              value={billingInfo.countryBilling}
            />
          </div>
          <div className='small-6 columns'>
            <label
              className='checkoutpage-steps-shipping-address-form-label'
            >
              City
            </label>
            <input
              type='text'
              className='checkoutpage-steps-shipping-address-form-input'
              onChange={onChange('cityBilling')}
              value={billingInfo.cityBilling}
            />
          </div>
          <div className='small-6 columns'>
            <label
              className='checkoutpage-steps-shipping-address-form-label'
            >
              State
            </label>
            <input
              type='text'
              className='checkoutpage-steps-shipping-address-form-input'
              onChange={onChange('stateBilling')}
              value={billingInfo.stateBilling}
            />
          </div>
          <div className='small-6 columns'>
            <label
              className='checkoutpage-steps-shipping-address-form-label'
            >
              Zipcode
            </label>
            <input
              type='text'
              className='checkoutpage-steps-shipping-address-form-input'
              onChange={onChange('zipcodeBilling')}
              value={billingInfo.zipcodeBilling}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

BillingForm.propTypes = {
  billingInfo: PropTypes.object.isRequired,
  onChange: PropTypes.func
}

export default BillingForm
