import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { Common } from '../../../redux/actions'

const { getCountries, getStates } = Common

class BillingForm extends PureComponent {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  componentWillMount() {
    const { getCountries } = this.props
    if (!this.props.countries) {
      getCountries()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { getStates, billingInfo } = this.props

    if (nextProps.billingInfo.countryBilling &&
      nextProps.billingInfo.countryBilling !== billingInfo.countryBilling) {
      getStates(nextProps.billingInfo.countryBilling)
    }
  }

  onChange(context, evt, value) {
    evt.preventDefault()
    this.props.selectChange(context, evt, value)
  }

  renderSelects(elems) {
    if (elems) {
      return elems.map((elem, index) => {
        return <MenuItem key={elem.pk} value={elem.pk} primaryText={elem.name} />
      })
    }
    return false
  }

  render() {
    const { billingInfo, onChange, countries, states } = this.props
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
                Name
              </label>
              <input
                type='text'
                onChange={onChange('nameBilling')}
                className='checkoutpage-steps-shipping-address-form-input'
                value={billingInfo.nameBilling}
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
                onChange={onChange('phoneBilling')}
                value={billingInfo.phoneBilling}
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
              <SelectField
                name='Country'
                floatingLabelText='Country'
                value={billingInfo.countryBilling}
                onChange={(evt, index, value) => {
                  this.onChange('countryBilling', evt, value)
                }}
              >
                {this.renderSelects(countries)}
              </SelectField>
            </div>
            <div className='small-5 small-offset-1 columns'>
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
            {billingInfo.countryBilling === 'CA' || billingInfo.countryBilling === 'US' ?
              (
                <div className='small-6 columns'>
                  <SelectField
                    name='State'
                    floatingLabelText='State'
                    value={billingInfo.stateBilling}
                    onChange={(evt, index, value) => {
                      this.onChange('stateBilling', evt, value)
                    }}
                  >
                    {this.renderSelects(states)}
                  </SelectField>
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
                    onChange={onChange('stateBilling')}
                    value={billingInfo.stateBilling}
                  />
                </div>
              )
            }
            <div className='small-5 small-offset-1 columns'>
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
}

BillingForm.propTypes = {
  billingInfo: PropTypes.object.isRequired,
  onChange: PropTypes.func
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

const mapDispatchToProps = {
  getCountries,
  getStates,
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingForm)
