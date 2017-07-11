import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { Common } from '../../../redux/actions'

const { getCountries, getStates } = Common

class ShippingForm extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (!this.props.countries) {
      this.props.getCountries()
    }
  }

  renderCountries(countries) {
    if (countries) {
      return countries.map((country, index) => {
        return <MenuItem key={country.pk} value={country.pk} primaryText={country.name} />
      })
    }
    return false
  }

  render() {
    const {
      shippingInfo,
      onChange,
      title,
      className,
      handleSave,
      handleCancel,
      countries
    } = this.props

    console.log(shippingInfo)
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
              <SelectField
                floatingLabelText='Country'
                value={shippingInfo.countryShipping}
                onChange={onChange('countryShipping')}
              >
                {this.renderCountries(countries)}
              </SelectField>
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
}

ShippingForm.propTypes = {
  shippingInfo: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  title: PropTypes.string,
  className: PropTypes.string,
  handleSave: PropTypes.func,
  handleCancel: PropTypes.func,
}

const mapDispatchToProps = {
  getCountries,
  getStates,
}

const mapStateToProps = ({
  common: {
    countries,
    states
  }
}) => {
  return {
    countries,
    states,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingForm)
