import React, { PropTypes } from 'react'

const ShippingFrom = ({ shippingInfo, onChange }) => {
  return (
    <section className='checkoutpage-steps-shipping-address-container'>
      <h3 className='checkoutpage-steps-shipping-address-title'>
        Shipping Address
      </h3>
      <form className='checkoutpage-steps-shipping-address-form'>
        <div className='row'>
          <div className='small-6 columns'>
            <label
              className='checkoutpage-steps-shipping-address-form-label'
            >
              First Name
            </label>
            <input
              type='text'
              onChange={onChange('firstNameShipping')}
              className='checkoutpage-steps-shipping-address-form-input'
              value={shippingInfo.firstNameShipping}
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
              onChange={onChange('lastNameShipping')}
              value={shippingInfo.lastNameShipping}
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
              onChange={onChange('addressShipping')}
              value={shippingInfo.addressShipping}
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
              onChange={onChange('address2Shipping')}
              value={shippingInfo.address2Shipping}
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
              onChange={onChange('countryShipping')}
              value={shippingInfo.countryShipping}
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
              onChange={onChange('cityShipping')}
              value={shippingInfo.cityShipping}
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
              onChange={onChange('stateShipping')}
              value={shippingInfo.stateShipping}
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
              onChange={onChange('zipcodeShipping')}
              value={shippingInfo.zipcodeShipping}
            />
          </div>
        </div>
      </form>
    </section>
  )
}

ShippingFrom.propTypes = {
  shippingInfo: PropTypes.object.isRequired,
  onChange: PropTypes.func
}

export default ShippingFrom
