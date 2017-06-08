import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import OrderSummary from './OrderSummary'
import CartItems from './CartItems'
import { Footer } from '../../common'
import R from 'ramda'

class CheckoutPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isStepOneActive: true,
      isStepTwoActive: false,
      isStepThreeActive: false,
      firstNameShipping: '',
      lastNameShipping: '',
      addressShipping: '',
      address2Shipping: '',
      countryShipping: '',
      cityShipping: '',
      stateShipping: '',
      zipcodeShipping: '',
    }
  }

  handleFormsChanges = R.curry((field, event) => {
    event.preventDefault()
    this.setState({ [field]: event.target.value })
  })

  renderStepOne = () => {
    return (
      <div className='row'>
        <div className='large-7 columns'>
          {this.renderShippingAddress()}
          {this.renderShippingMethod()}
          <a href='#' className='checkoutpage-shipping-submit-form-btn'>
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

  renderShippingMethod = () => {
    return (
      <section className='checkoutpage-steps-delivery-method-container'>
        <h3 className='checkoutpage-steps-delivery-method-title'>
          Delivery
        </h3>
        <div className='row'>
          <div className='small-6 columns'>
            <div className='checkoutpage-steps-delivery-method'>
              <input
                className='checkoutpage-steps-delivery-method-input'
                type='radio'
              />
              <label className='checkoutpage-steps-delivery-method-label'>
                <span className='checkoutpage-steps-delivery-method-vendor'>
                  USPS Media Mail
                </span>
                <span className='checkoutpage-steps-delivery-method-days'>
                  ~5 - 7 business days
                </span>
                <spam className='checkoutpage-steps-delivery-method-price'>
                  $4.99
                </spam>
              </label>
            </div>
          </div>
          <div className='small-6 columns'>
            <div className='checkoutpage-steps-delivery-method'>
              <input
                className='checkoutpage-steps-delivery-method-input'
                type='radio'
              />
              <label className='checkoutpage-steps-delivery-method-label'>
                <span className='checkoutpage-steps-delivery-method-vendor'>
                  USPS Priority Mail
                </span>
                <span className='checkoutpage-steps-delivery-method-days'>
                 2 - 3 business days
                </span>
                <spam className='checkoutpage-steps-delivery-method-price'>
                  $8.99
                </spam>
              </label>
            </div>
          </div>
        </div>
      </section>
    )
  }

  renderShippingAddress = () => {
    const {
      firstNameShipping,
      lastNameShipping,
      addressShipping,
      address2Shipping,
      countryShipping,
      cityShipping,
      stateShipping,
      zipcodeShipping,
    } = this.state
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
                onChange={this.handleFormsChanges('firstNameShipping')}
                className='checkoutpage-steps-shipping-address-form-input'
                value={firstNameShipping}
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
                onChange={this.handleFormsChanges('lastNameShipping')}
                value={lastNameShipping}
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
                onChange={this.handleFormsChanges('addressShipping')}
                value={addressShipping}
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
                onChange={this.handleFormsChanges('address2Shipping')}
                value={address2Shipping}
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
                onChange={this.handleFormsChanges('countryShipping')}
                value={countryShipping}
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
                onChange={this.handleFormsChanges('cityShipping')}
                value={cityShipping}
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
                onChange={this.handleFormsChanges('stateShipping')}
                value={stateShipping}
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
                onChange={this.handleFormsChanges('zipcodeShipping')}
                value={zipcodeShipping}
              />
            </div>
          </div>
        </form>
      </section>
    )
  }

  renderStepTwo = () => {
    return (
      <div className='row'>
        <div className='large-6 columns'>
          Left Side
        </div>
        <div className='large-4 large-offset-1 columns end'>
          <OrderSummary />
          <CartItems />
        </div>
      </div>
    )
  }

  renderStepThree = () => {
    return (
      <div className='row'>
        <div className='large-6 columns'>
          Left Side
        </div>
        <div className='large-5 columns end'>
          Right Side
        </div>
      </div>
    )
  }

  render() {
    const { isStepOneActive, isStepTwoActive, isStepThreeActive } = this.state
    return (
      <section className='checkoutpage-main-container'>
        <header className='chekoutpage-header slide-down'>
          <figure className='checkoutpage-header-logo-figure'>
            <Link to='/'>
              <img src='/image/book-store-logo-mobile.png'/>
            </Link>
          </figure>
        </header>
        <section className='row'>
          <div className='large-12 columns'>
            <div className='chekoutpage-steps-container'>
              <div className={isStepOneActive ?
                'chekoutpage-single-step-container-active' : 'chekoutpage-single-step-container'
                }
              >
                <div className='checkoutpage-single-step-count'>
                  <span className='checkoutpage-single-step-number'>
                    1
                  </span>
                </div>
                <span className='checkoutpage-single-step-title'>
                  Shipping
                </span>
              </div>
              <div className={isStepTwoActive ?
                'chekoutpage-single-step-container-active' : 'chekoutpage-single-step-container'
                }
              >
                <div className='checkoutpage-single-step-count'>
                  <span className='checkoutpage-single-step-number'>
                    2
                  </span>
                </div>
                <span className='checkoutpage-single-step-title'>
                  Billing
                </span>
              </div>
              <div className={isStepThreeActive ?
                'chekoutpage-single-step-container-active' : 'chekoutpage-single-step-container'
                }
              >
                <div className='checkoutpage-single-step-count'>
                  <span className='checkoutpage-single-step-number'>
                    3
                  </span>
                </div>
                <span className='checkoutpage-single-step-title'>
                  Review
                </span>
              </div>
            </div>
            <div className='chekoutpage-steps-main-container'>
              {isStepOneActive ? this.renderStepOne() : null}
              {isStepTwoActive ? this.renderStepTwo() : null}
              {isStepThreeActive ? this.renderStepThree() : null}
            </div>
          </div>
        </section>
        <div className='bookstore-footer-container'>
          <Footer />
        </div>
      </section>
    )
  }
}

export default CheckoutPage
