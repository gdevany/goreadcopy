import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Store } from '../../../redux/actions'
import OrderSummary from './OrderSummary'
import CartItems from './CartItems'
import ReviewOrder from './ReviewOrder'
import CheckIcon from 'material-ui/svg-icons/navigation/check'
import UseLitcoins from './UseLitcoins'
import LockIcon from 'material-ui/svg-icons/action/lock-outline'
import R from 'ramda'

const {
  setOrder,
  getOrder,
  getCurrentOrder,
  getShippingMethods,
  setUserAddress
} = Store

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
      nameOnCard: '',
      cardNumber: '',
      cardCVC: '',
      fullExpDate: '',
      saveCard: false,
      sameShippingAddress: true,
      firstNameBilling: '',
      lastNameBilling: '',
      addressBilling: '',
      address2Billing: '',
      countryBilling: '',
      cityBilling: '',
      stateBilling: '',
      zipcodeBilling: '',
    }
    this.continueToBillingClick = this.continueToBillingClick.bind(this)
    this.continueToReviewClick = this.continueToReviewClick.bind(this)
    this.handlePaymentClick = this.handlePaymentClick.bind(this)
    this.handleCheckSave = this.handleCheckSave.bind(this)
    this.handleCheckSame = this.handleCheckSame.bind(this)
  }

  componentWillMount = () => {
    this.props.getCurrentOrder()
    this.props.getShippingMethods()
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.order) {
      const { shippingAddress } = nextProps.order
      const fullname = this.splitFullName(shippingAddress.name)
      this.setState({
        firstNameShipping: fullname[0],
        lastNameShipping: fullname[1],
        addressShipping: shippingAddress.address,
        address2Shipping: shippingAddress.address2,
        countryShipping: shippingAddress.country,
        stateShipping: shippingAddress.state,
        cityShipping: shippingAddress.city,
        zipcodeShipping: shippingAddress.zipcode,
      })
    }
  }

  splitFullName = (fullname) => {
    return fullname.split(' ')
  }

  splitCardExp = (date) => {
    return date.split('/')
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
    const {
      firstNameShipping,
      lastNameShipping,
      addressShipping,
      address2Shipping,
      countryShipping,
      stateShipping,
      cityShipping,
      zipcodeShipping,
    } = this.state
    if (cityShipping && countryShipping && addressShipping &&
      address2Shipping && zipcodeShipping && stateShipping) {
      this.setState({
        isStepOneActive: false,
        isStepTwoActive: true,
        isStepThreeActive: false,
        stepOneComplete: true,
      })
      this.props.setUserAddress({
        city: cityShipping,
        name: `${firstNameShipping} ${lastNameShipping}`,
        country: countryShipping,
        address: addressShipping,
        address2: address2Shipping,
        zipcode: zipcodeShipping,
        state: stateShipping,
        addressType: 'shipping',
        sameBillingAndShipping: true,
      })
    }
  }

  continueToReviewClick = (event) => {
    event.preventDefault()
    const { setUserAddress } = this.props
    const {
      nameOnCard,
      cardNumber,
      cardCVC,
      fullExpDate,
    } = this.state
    if (nameOnCard && cardNumber && cardCVC && fullExpDate) {
      // const expDate = this.splitCardExp(fullExpDate)
      if (!this.state.sameShippingAddress) {
        const {
          firstNameBilling,
          lastNameBilling,
          addressBilling,
          address2Billing,
          countryBilling,
          stateBilling,
          cityBilling,
          zipcodeBilling,
        } = this.state
        if (cityBilling && countryBilling && addressBilling &&
          address2Billing && zipcodeBilling && stateBilling) {
          this.setState({
            isStepOneActive: false,
            isStepTwoActive: false,
            isStepThreeActive: true,
            stepOneComplete: true,
            stepTwoComplete: true,
          })
          setUserAddress({
            city: cityBilling,
            name: `${firstNameBilling} ${lastNameBilling}`,
            country: countryBilling,
            address: addressBilling,
            address2: address2Billing,
            zipcode: zipcodeBilling,
            state: stateBilling,
            addressType: 'billing',
            sameBillingAndShipping: false,
          })
        } else alert('Complete all billing fields')
      } else {
        this.setState({
          isStepOneActive: false,
          isStepTwoActive: false,
          isStepThreeActive: true,
          stepOneComplete: true,
          stepTwoComplete: true,
        })
      }
    } else {
      alert('Complete all card fields')
    }
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
        sameShippingAddress: true,
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

  mapShippingMethods = (shippingMethods) => {
    return shippingMethods.map((method, index) => {
      return (
        <div className='small-6 columns'>
          <div className='checkoutpage-steps-delivery-method'>
            <input
              className='checkoutpage-steps-delivery-method-input'
              name='delivery-method'
              type='radio'
            />
            <label className='checkoutpage-steps-delivery-method-label'>
              <span className='checkoutpage-steps-delivery-method-vendor'>
                {method.title}
              </span>
              <span className='checkoutpage-steps-delivery-method-days'>
                5 - 7 business days
              </span>
              {/* <spam className='checkoutpage-steps-delivery-method-price'>
                $4.99
              </spam> */}
            </label>
          </div>
        </div>
      )
    })
  }
  renderShippingMethod = () => {
    return (
      <section className='checkoutpage-steps-delivery-method-container'>
        <h3 className='checkoutpage-steps-delivery-method-title'>
          Delivery
        </h3>
        <div className='row'>
          {this.props.shippingMethods ?
            this.mapShippingMethods(this.props.shippingMethods) : null
          }
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

  handleCheckSave = (event) => this.setState({ saveCard: event.target.checked })

  handleCheckSame = (event) => this.setState({ sameShippingAddress: event.target.checked })

  renderStepTwo = () => {
    const {
      isPaypalClicked,
      isCardClicked,
      nameOnCard,
      cardNumber,
      cardCVC,
      fullExpDate,
    } = this.state
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
                          onChange={this.handleFormsChanges('nameOnCard')}
                          value={nameOnCard}
                        />
                      </div>
                    </div>
                    <div className='large-12 columns'>
                      <div className='checkoutpage-payment-card-inputs'>
                        <label className='checkoutpage-payment-card-inputs-label'>
                          Card Number
                        </label>
                        <input
                          type='number'
                          className='checkoutpage-payment-card-single-input'
                          onChange={this.handleFormsChanges('cardNumber')}
                          value={cardNumber}
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
                          onChange={this.handleFormsChanges('fullExpDate')}
                          value={fullExpDate}
                        />
                      </div>
                    </div>
                    <div className='large-4 columns'>
                      <div className='checkoutpage-payment-card-inputs'>
                        <label className='checkoutpage-payment-card-inputs-label'>
                          CVC
                        </label>
                        <input
                          type='number'
                          min='100'
                          min='999'
                          className='checkoutpage-payment-card-single-input has-lock'
                          onChange={this.handleFormsChanges('cardCVC')}
                          value={cardCVC}
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
                          onChange={this.handleCheckSave}
                          checked={this.state.saveCard}
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
                          onChange={this.handleCheckSame}
                          checked={this.state.sameShippingAddress}
                        />
                        <label className='checkoutpage-payment-card-inputs-label-check'>
                          Use shipping address
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {!this.state.sameShippingAddress ?
                  (
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
                              onChange={this.handleFormsChanges('firstNameBilling')}
                              className='checkoutpage-steps-shipping-address-form-input'
                              value={this.state.firstNameBilling}
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
                              onChange={this.handleFormsChanges('lastNameBilling')}
                              value={this.state.lastNameBilling}
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
                              onChange={this.handleFormsChanges('addressBilling')}
                              value={this.state.addressBilling}
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
                              onChange={this.handleFormsChanges('address2Billing')}
                              value={this.state.address2Billing}
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
                              onChange={this.handleFormsChanges('countryBilling')}
                              value={this.state.countryBilling}
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
                              onChange={this.handleFormsChanges('cityBilling')}
                              value={this.state.cityBilling}
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
                              onChange={this.handleFormsChanges('stateBilling')}
                              value={this.state.stateBilling}
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
                              onChange={this.handleFormsChanges('zipcodeBilling')}
                              value={this.state.zipcodeBilling}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null
                }
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
          <UseLitcoins />
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
          <ReviewOrder data={this.props.order} />
          <CartItems />
        </div>
        <div className='large-4 large-offset-1 columns end'>
          <a className='checkoutpage-place-order-btn'>
            Place Order
          </a>
          <OrderSummary />
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
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.store.order,
    shippingMethods: state.store.shippingMethods,
  }
}

const mapDistpachToProps = {
  setOrder,
  getOrder,
  getCurrentOrder,
  getShippingMethods,
  setUserAddress,
}

export default connect(mapStateToProps, mapDistpachToProps)(CheckoutPage)
