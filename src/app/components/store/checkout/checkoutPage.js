import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import OrderSummary from './OrderSummary'
import CartItems from './CartItems'
import ReviewOrder from './ReviewOrder'
import { Footer } from '../../common'
import CheckIcon from 'material-ui/svg-icons/navigation/check'
import LockIcon from 'material-ui/svg-icons/action/lock-outline'
import R from 'ramda'

class CheckoutPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isStepOneActive: true,
      isStepTwoActive: false,
      isStepThreeActive: false,
      stepOneComplete: false,
      stepTwoComplete: false,
      stepThreeComplete: false,
      isCardClicked: true,
      isPaypalClicked: false,
      firstNameShipping: '',
      lastNameShipping: '',
      addressShipping: '',
      address2Shipping: '',
      countryShipping: '',
      cityShipping: '',
      stateShipping: '',
      zipcodeShipping: '',
    }
    this.continueToBillingClick = this.continueToBillingClick.bind(this)
    this.continueToReviewClick = this.continueToReviewClick.bind(this)
    this.handlePaymentClick = this.handlePaymentClick.bind(this)
  }

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  handleFormsChanges = R.curry((field, event) => {
    event.preventDefault()
    this.setState({ [field]: event.target.value })
  })

  continueToBillingClick = (event) => {
    event.preventDefault()
    this.setState({
      isStepOneActive: false,
      isStepTwoActive: true,
      isStepThreeActive: false,
      stepOneComplete: true,
    })
  }

  continueToReviewClick = (event) => {
    event.preventDefault()
    this.setState({
      isStepOneActive: false,
      isStepTwoActive: false,
      isStepThreeActive: true,
      stepOneComplete: true,
      stepTwoComplete: true,
    })
  }

  handlePaymentClick = (type) => {
    if (type === 'card' && !this.state.isCardClicked) {
      this.setState({
        isCardClicked: true,
        isPaypalClicked: false,
      })
    } else if (type === 'paypal' && !this.state.isPaypalClicked) {
      this.setState({
        isCardClicked: false,
        isPaypalClicked: true,
      })
    }
  }

  renderStepOne = () => {
    return (
      <div className='row'>
        <div className='large-7 columns'>
          {this.renderShippingAddress()}
          {this.renderShippingMethod()}
          <a
            onClick={this.continueToBillingClick}
            className='checkoutpage-shipping-submit-form-btn'
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
                className='checkoutpage-steps-shipping-address-form-input'
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
    const { isPaypalClicked, isCardClicked } = this.state
    return (
      <div className='row'>
        <div className='large-7 columns'>
          <section className='checkoutpage-payment-selection-container'>
            <section
              className={isCardClicked ?
                'checkoutpage-payment-card-container payment-selected' :
                'checkoutpage-payment-card-container'
              }
            >
              <div className='checkoutpage-payment-selector'>
                <div
                  className={isCardClicked ?
                    'checkoutpage-payment-selector-element selected-payment' :
                    'checkoutpage-payment-selector-element'
                  }
                  onClick={() => this.handlePaymentClick('card')}
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
                <div className='checkoutpage-payment-card-form'>
                  <div className='row'>
                    <div className='large-12 columns'>
                      <div className='checkoutpage-payment-card-inputs'>
                        <label className='checkoutpage-payment-card-inputs-label'>
                          Name on Card
                        </label>
                        <input
                          type='text'
                          className='checkoutpage-payment-card-single-input'
                        />
                      </div>
                    </div>
                    <div className='large-12 columns'>
                      <div className='checkoutpage-payment-card-inputs'>
                        <label className='checkoutpage-payment-card-inputs-label'>
                          Card Number
                        </label>
                        <input
                          type='text'
                          className='checkoutpage-payment-card-single-input'
                        />
                      </div>
                    </div>
                    <div className='large-8 columns'>
                      <div className='checkoutpage-payment-card-inputs'>
                        <label className='checkoutpage-payment-card-inputs-label'>
                          Expiration Date (MM/YY)
                        </label>
                        <input
                          type='text'
                          className='checkoutpage-payment-card-single-input'
                        />
                      </div>
                    </div>
                    <div className='large-4 columns'>
                      <div className='checkoutpage-payment-card-inputs'>
                        <label className='checkoutpage-payment-card-inputs-label'>
                          CVC
                        </label>
                        <input
                          type='text'
                          className='checkoutpage-payment-card-single-input has-lock'
                        />
                        <LockIcon
                          className='checkoutpage-payment-card-single-input-lock'
                        />
                      </div>
                    </div>
                    <div className='large-12 columns'>
                      <div className='checkoutpage-payment-card-inputs'>
                        <input
                          type='checkbox'
                          className='checkoutpage-payment-card-single-input-check'
                        />
                        <label className='checkoutpage-payment-card-inputs-label-check'>
                          Save card for future use
                        </label>
                      </div>
                    </div>
                    <div className='large-12 columns'>
                      <div className='checkoutpage-payment-card-inputs'>
                        <input
                          type='checkbox'
                          className='checkoutpage-payment-card-single-input-check'
                        />
                        <label className='checkoutpage-payment-card-inputs-label-check'>
                          Use shipping address
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section
              className={isPaypalClicked ?
                'checkoutpage-payment-paypal-container payment-selected' :
                'checkoutpage-payment-paypal-container'
              }
            >
              <div className='checkoutpage-payment-selector'>
                <div
                  className={isPaypalClicked ?
                    'checkoutpage-payment-selector-element selected-payment' :
                    'checkoutpage-payment-selector-element'
                  }
                  onClick={() => this.handlePaymentClick('paypal')}
                >
                  <a className='checkoutpage-payment-selector-anchor'/>
                </div>
              </div>
              <div className='checkoutpage-payment-paypal'>
                <img src='/image/paypal-logo.png'/>
              </div>
            </section>
          </section>
          <section className='checkoutpage-litcoins-use-container'>
            <h3>Litcoins</h3>
            <div className='checkoutpage-litcoins-use-main'>
              <input
                className='checkoutpage-litcoins-use-input'
                type='checkbox'
              />
              <label className='checkoutpage-litcoins-use-label'>
                <span className='checkoutpage-litcoins-use-label-span'>
                  Use my Litcoins
                </span>
                <div className='checkoutpage-litcoins-use-details'>
                  <span className='checkoutpage-litcoins-use-text'>
                    <b>$6.00</b> (8,000
                    <img
                      className='checkoutpage-litcoins-use-img'
                      src='/image/litcoin.png'
                    /> available)
                  </span>
                </div>
              </label>
            </div>
          </section>
          <a
            onClick={this.continueToReviewClick}
            className='checkoutpage-review-order-btn'
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

  renderStepThree = () => {
    return (
      <div className='row'>
        <div className='large-7 columns'>
          <ReviewOrder />
        </div>
        <div className='large-4 large-offset-1 columns end'>
          <OrderSummary />
          <CartItems />
        </div>
      </div>
    )
  }

  render() {
    const {
      isStepOneActive,
      isStepTwoActive,
      isStepThreeActive,
      stepOneComplete,
      stepTwoComplete
    } = this.state
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
              <div className={isStepOneActive || stepOneComplete ?
                'chekoutpage-single-step-container-active' : 'chekoutpage-single-step-container'
                }
              >
                <div className='checkoutpage-single-step-count'>
                  {stepOneComplete ?
                    (
                      <span className='checkoutpage-single-step-number'>
                        <CheckIcon />
                      </span>
                    ) : (
                      <span className='checkoutpage-single-step-number'>
                        1
                      </span>
                    )
                  }
                </div>
                <span className='checkoutpage-single-step-title'>
                  Shipping
                </span>
              </div>
              <div className={isStepTwoActive || stepTwoComplete ?
                'chekoutpage-single-step-container-active' : 'chekoutpage-single-step-container'
                }
              >
                <div className='checkoutpage-single-step-count'>
                  {stepTwoComplete ?
                    (
                      <span className='checkoutpage-single-step-number'>
                        <CheckIcon />
                      </span>
                    ) : (
                      <span className='checkoutpage-single-step-number'>
                        2
                      </span>
                    )
                  }
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
            <div className='row'>
              <div className='large-10 columns large-offset-1'>
                <div className='chekoutpage-steps-main-container'>
                  {isStepOneActive ? this.renderStepOne() : null}
                  {isStepTwoActive ? this.renderStepTwo() : null}
                  {isStepThreeActive ? this.renderStepThree() : null}
                </div>
              </div>
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
