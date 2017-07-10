import React from 'react'
import PropTypes from 'prop-types'

const ShippingFrom = ({ shippingInfo, onChange, title, className, handleSave, handleCancel }) => {
  return (
    <section className={className}>
      <h3 className='checkoutpage-steps-shipping-address-title'>
        {title}
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
      {handleSave && handleCancel ?
        (
          <div className='chekoutpage-edit-shipping-address-btns-container'>
            <a
              onClick={handleSave}
              className='chekoutpage-edit-shipping-address-btn-save'
            >
              Save Address
            </a>
            <a
              onClick={handleCancel}
              className='chekoutpage-edit-shipping-address-btn-cancel'
            >
              Cancel
            </a>
          </div>
        ) : null
      }
    </section>
  )
}

ShippingFrom.propTypes = {
  shippingInfo: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  title: PropTypes.string,
  className: PropTypes.string,
  handleSave: PropTypes.func,
  handleCancel: PropTypes.func,
}

export default ShippingFrom
