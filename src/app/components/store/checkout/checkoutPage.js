import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Store } from '../../../redux/actions'
import {
  OrderSummary,
  CartItems,
  ReviewOrder,
  ShippingForm,
  CardForm,
  BillingForm,
  UseLitcoins,
  ShippingMethods
} from './'

import CheckIcon from 'material-ui/svg-icons/navigation/check'
import LockIcon from 'material-ui/svg-icons/action/lock-outline'
import R from 'ramda'

const {
  setOrder,
  getOrder,
  getCurrentOrder,
  getShippingMethods,
  setUserAddress,
  setShipping,
  setBilling,
  placeOrder
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
      shippingMethod: '',
      shippingId: '',
      billingId: '',
      setShippingMethod: '',
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
      useLitcoins: false,
      cardStored: false,
    }
    this.continueToBillingClick = this.continueToBillingClick.bind(this)
    this.continueToReviewClick = this.continueToReviewClick.bind(this)
    this.handleCheckSame = this.handleCheckSame.bind(this)
    this.handleCheckSave = this.handleCheckSave.bind(this)
    this.handlePaymentClick = this.handlePaymentClick.bind(this)
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this)
    this.handleUseLitcoins = this.handleUseLitcoins.bind(this)
  }

  componentWillMount = () => {
    this.props.getCurrentOrder()
    this.props.getShippingMethods()
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.order) {
      const {
        shippingAddress,
        billingAddress,
        cardLast4,
        cardExpMonth,
        cardExpYear,
        billingMethod
      } = nextProps.order
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
        shippingId: shippingAddress.id,
        billingId: billingAddress.id,
        nameOnCard: shippingAddress.name || '',
        cardNumber: `**** **** **** ${cardLast4}` || '',
        fullExpDate: `${cardExpMonth}/${cardExpYear}` || '',
        billingMethod: billingMethod || '',
      })
      if (cardLast4) this.setState({ cardStored: true })
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
    if (field === 'cardCVC' && event.target.value.length <= 4) {
      this.setState({
        [field]: event.target.value
      })
    }

    if (field === 'cardNumber') {
      this.setState({
        [field]: event.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()
      })
    }

    if (field === 'fullExpDate' && event.target.value.length <= 5) {
      if (event.target.value.length === 2) {
        this.setState({
          [field]: `${event.target.value}/`
        })
      } else {
        this.setState({
          [field]: event.target.value
        })
      }
    }

    if (field !== 'cardNumber' && field !== 'fullExpDate' && field !== 'cardCVC') {
      this.setState({ [field]: event.target.value })
    }
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
      shippingId,
      shippingMethod,
    } = this.state
    if (cityShipping && countryShipping && addressShipping &&
      address2Shipping && zipcodeShipping && stateShipping && shippingMethod !== '') {
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
      this.props.setShipping({
        shippingAddressId: shippingId,
        shippingMethod: shippingMethod,
      })
    } else alert('Fill everything')
  }

  continueToReviewClick = (event) => {
    event.preventDefault()
    const { setUserAddress } = this.props
    const {
      nameOnCard,
      cardNumber,
      cardCVC,
      fullExpDate,
      isCardClicked,
      shippingId,
      billingId,
    } = this.state
    if (isCardClicked && nameOnCard && cardNumber && cardCVC && fullExpDate) {
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
        const expDate = this.splitCardExp(fullExpDate)
        if (this.state.cardStored) {
          this.props.setBilling({
            shippingMethod: this.state.shippingMethod,
            paymentMethod: 'cc',
            litcoins: this.state.useLitcoins,
            avoidCheckCardData: this.state.cardStored,
          })
        } else {
          this.props.setBilling({
            cardExpYear: expDate[1],
            shippingMethod: this.state.shippingMethod,
            cardExpMonth: expDate[0],
            paymentMethod: 'cc',
            shippingAddressId: shippingId,
            cardCvc: cardCVC,
            cardNumber: cardNumber,
            billingAddressId: billingId,
            litcoins: this.state.useLitcoins,
            avoidCheckCardData: this.state.cardStored,
          })
        }

        this.setState({
          isStepOneActive: false,
          isStepTwoActive: false,
          isStepThreeActive: true,
          stepOneComplete: true,
          stepTwoComplete: true,
        })
      }
    } else if (this.state.isPaypalClicked) {
      this.setState({
        isStepOneActive: false,
        isStepTwoActive: false,
        isStepThreeActive: true,
        stepOneComplete: true,
        stepTwoComplete: true,
      })
      this.props.setBilling({
        shippingMethod: this.state.shippingMethod,
        paymentMethod: 'paypal',
        litcoins: this.state.useLitcoins,
      })
    } else alert('Complete all card fields')
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
    const info = {
      firstNameShipping,
      lastNameShipping,
      addressShipping,
      address2Shipping,
      countryShipping,
      cityShipping,
      stateShipping,
      zipcodeShipping,
    }
    const { shippingMethods } = this.props
    return (
      <div className='row'>
        <div className='large-7 columns'>
          <ShippingForm
            shippingInfo={info}
            onChange={this.handleFormsChanges}
          />
          {shippingMethods ?
            <ShippingMethods
              shippingMethods={shippingMethods}
              onClick={this.setShippingMethod}
            /> : null
          }
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

  setShippingMethod = (shippingMethod) => this.setState({ shippingMethod })

  handleCheckSave = (event) => this.setState({ saveCard: event.target.checked })

  handleCheckSame = (event) => this.setState({ sameShippingAddress: event.target.checked })

  handleUseLitcoins = (event) => this.setState({ useLitcoins: event.target.checked })

  renderStepTwo = () => {
    const {
      isPaypalClicked,
      isCardClicked,
      nameOnCard,
      cardNumber,
      cardCVC,
      fullExpDate,
      sameShippingAddress,
      firstNameBilling,
      lastNameBilling,
      addressBilling,
      address2Billing,
      countryBilling,
      cityBilling,
      stateBilling,
      zipcodeBilling,
      useLitcoins
    } = this.state
    const cardInfo = {
      nameOnCard,
      cardNumber,
      cardCVC,
      fullExpDate,
    }
    const billingFields = {
      firstNameBilling,
      lastNameBilling,
      addressBilling,
      address2Billing,
      countryBilling,
      cityBilling,
      stateBilling,
      zipcodeBilling
    }
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
                <CardForm
                  cardInfo={cardInfo}
                  onChange={this.handleFormsChanges}
                  handleCheckSame={this.handleCheckSame}
                  isSameShippingChecked={sameShippingAddress}
                  context='firstStep'
                />
                {!sameShippingAddress ?
                  <BillingForm
                    billingInfo={billingFields}
                    onChange={this.handleFormsChanges}
                  /> : null
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
          <UseLitcoins
            onChange={this.handleUseLitcoins}
            boxChecked={useLitcoins}
          />
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

  handlePlaceOrder = () => {
    if (this.state.isCardClicked) {
      this.props.placeOrder({
        shippingMethod: this.state.shippingMethod,
        paymentMethod: 'cc'
      })
    }
  }

  renderStepThree = () => {
    const { shippingId, shippingMethod } = this.state
    return (
      <div className='row'>
        <div className='large-7 columns'>
          <ReviewOrder
            data={this.props.order}
            isPaypal={this.state.isPaypalClicked}
            shippingMethods={this.props.shippingMethods}
            usingLitcoins={this.state.useLitcoins}
            shippingMethod={shippingMethod}
            shippingId={shippingId}
          />
          <CartItems />
        </div>
        <div className='large-4 large-offset-1 columns end'>
          <a
            onClick={this.handlePlaceOrder}
            className='checkoutpage-place-order-btn'
          >
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
  setShipping,
  setBilling,
  placeOrder
}

export default connect(mapStateToProps, mapDistpachToProps)(CheckoutPage)
