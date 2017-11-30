import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Common } from '../../../redux/actions'

const { getCountries, getStates } = Common

class ShippingForm extends PureComponent {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  componentWillMount() {
    const { getCountries, getStates, shippingInfo, countries } = this.props
    if (!countries) {
      getCountries()
        .then((res) => {
          shippingInfo && shippingInfo.countryShipping ?
            getStates(shippingInfo.countryShipping) :
            this.onChange('countryShipping', null, countries[0].pk)
        })
    } else {
      shippingInfo && shippingInfo.countryShipping ?
        getStates(shippingInfo.countryShipping) :
        this.onChange('countryShipping', null, countries[0].pk)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { getStates, shippingInfo } = this.props
    if (nextProps.shippingInfo.countryShipping &&
      nextProps.shippingInfo.countryShipping !== shippingInfo.countryShipping) {
      getStates(nextProps.shippingInfo.countryShipping)
    }
  }

  renderSelects(elems) {
    if (elems) {
      return elems.map((elem, index) => {
        return (
          <option key={elem.pk} value={elem.pk}>
            {elem.name}
          </option>
        )
      })
    }
    return false
  }

  onChange(context, evt, value) {
    if (evt) evt.preventDefault()
    this.props.selectChange(context, evt, value)
  }

  render() {
    const {
      shippingInfo,
      onChange,
      title,
      className,
      handleSave,
      handleCancel,
      countries,
      states,
    } = this.props

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
                Name
              </label>
              <input
                type='text'
                onChange={onChange('nameShipping')}
                className='checkoutpage-steps-shipping-address-form-input'
                value={shippingInfo.nameShipping || ''}
              />
            </div>
            <div className='small-6 columns'>
              <label
                className='checkoutpage-steps-shipping-address-form-label'
              >
                Phone
              </label>
              <input
                type='text'
                className='checkoutpage-steps-shipping-address-form-input'
                onChange={onChange('phoneShipping')}
                value={shippingInfo.phoneShipping || ''}
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
                value={shippingInfo.addressShipping || ''}
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
                value={shippingInfo.address2Shipping || ''}
              />
            </div>
            <div className='small-6 columns'>
              <label
                className='checkoutpage-steps-shipping-address-form-label'
              >
                Country
              </label>
              <select
                className='normal-feel'
                name='Country'
                value={shippingInfo.countryShipping}
                onChange={(evt) => {
                  this.onChange('countryShipping', evt, evt.target.value)
                }}
              >
                {this.renderSelects(countries)}
              </select>
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
                value={shippingInfo.cityShipping || ''}
              />
            </div>
            {shippingInfo.countryShipping === 'CA' || shippingInfo.countryShipping === 'US' ?
              (
                <div className='small-6 columns'>
                  <label
                    className='checkoutpage-steps-shipping-address-form-label'
                  >
                    State
                  </label>
                  <select
                    className='normal-feel'
                    name='State'
                    value={shippingInfo.stateShipping}
                    onChange={(evt) => {
                      this.onChange('stateShipping', evt, evt.target.value)
                    }}
                  >
                    {this.renderSelects(states)}
                  </select>
                </div>
              ) : (
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
                    value={shippingInfo.stateShipping || ''}
                  />
                </div>
              )
            }
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
                value={shippingInfo.zipcodeShipping || ''}
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
  selectChange: PropTypes.func,
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
