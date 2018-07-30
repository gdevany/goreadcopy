import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router'
import { Store, CurrentReader, Session } from '../../../redux/actions'
import { StepZero, StepOne, StepTwo, StepThree } from './orderSteps'
import CheckIcon from 'material-ui/svg-icons/navigation/check'
import Snackbar from 'material-ui/Snackbar'
import { Alerts } from '../../common'
import R from 'ramda'
import CV from 'card-validator'
import { Auth } from '../../../services'

const { SnackBarAlert } = Alerts
const { getCurrentReader } = CurrentReader
const { retrieveSession } = Session

const {
  getOrder, getCurrentOrder, setUserAddress, setUserAddressAndShipping, setUsingLitcoins,
  setShipping, setBilling, placeOrder, getPaypalConfig, placeOrderWithChanges,
} = Store

const styles = {
  snackBarError: {
    backgroundColor: '#EC6464',
    textAlign: 'center',
    height: 50,
  },
  contentStyle: {
    fontSize: 16,
  }
}

class CheckoutPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoadingCart: true,
      activeStep: Auth.currentUserExists() ? 1 : 0,
      isCardClicked: true,
      isPaypalClicked: false,
      nameShipping: '',
      phoneShipping: '',
      addressShipping: '',
      address2Shipping: '',
      countryShipping: '',
      cityShipping: '',
      stateShipping: '',
      zipcodeShipping: '',
      shippingMethod: '',
      shippingId: '',
      billingId: '',
      nameOnCard: '',
      cardNumber: '',
      cardCVC: '',
      fullExpDate: '',
      saveCard: false,
      sameShippingAddress: true,
      nameBilling: '',
      addressBilling: '',
      address2Billing: '',
      countryBilling: '',
      cityBilling: '',
      stateBilling: '',
      zipcodeBilling: '',
      useLitcoins: false,
      cardStored: false,
      snackbar: {
        open: false,
        text: '',
        type: '',
      },
      paypalConfig: false,
      orderStatus: false,
      showOverlay: false,
      allGifts: false,
      hasCreatedAccount: false,
    }
  }

  componentWillMount = () => {
    this.props.retrieveSession()
    this.fetchCartData()
    if (this.props.cart && this.props.cart.items.length) {
      this.setState({ allGifts: this.checkIfAllGifts(this.props.cart), isLoadingCart: false })
    }
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (!prevProps.currentReader.token && this.props.currentReader && this.props.currentReader.token) {
      this.fetchCartData()
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { cart, order, paypalConfig, currentReader } = nextProps
    const {
      shippingAddress, billingAddress, cardLast4, cardExpMonth, cardExpYear,
      billingMethod, litcoinsRedeemed, dollarsRedeemed, status
    } = (order ? order : {})
    const {
      fullname, address1, address2, country, state, city, zipcode
    } = (currentReader ? currentReader : {})
    const diff = {}

    if (cart && cart.items.length) {
      diff.allGifts = this.checkIfAllGifts(cart)
      diff.isLoadingCart = false
    }
    if (paypalConfig) {
      diff.paypalConfig = paypalConfig
    }
    if (cardLast4) {
      diff.cardStored = true
      diff.nameOnCard = (shippingAddress ? shippingAddress.name : null) || ''
      diff.cardNumber = `**** **** **** ${cardLast4}` || ''
      diff.fullExpDate = `${cardExpMonth}/${cardExpYear}` || ''
      diff.billingMethod = billingMethod || ''
      diff.cardCVC = '***'
    }
    diff.nameShipping = (shippingAddress ? shippingAddress.name : null) || fullname || ''
    diff.phoneShipping = (shippingAddress ? shippingAddress.phone : null) || ''
    diff.addressShipping = (shippingAddress ? shippingAddress.address : null) || address1 || ''
    diff.address2Shipping = (shippingAddress ? shippingAddress.address2 : null) || address2 || ''
    diff.countryShipping = (shippingAddress ? shippingAddress.country : null) || country || ''
    diff.stateShipping = (shippingAddress ? shippingAddress.state : null) || state || ''
    diff.cityShipping = (shippingAddress ? shippingAddress.city : null) || city || ''
    diff.zipcodeShipping = (shippingAddress ? shippingAddress.zipcode : null) || zipcode || ''
    diff.shippingId = (shippingAddress ? shippingAddress.id : null) || ''
    diff.billingId = (billingAddress ? billingAddress.id : null) || ''
    diff.useLitcoins = (litcoinsRedeemed > 0 || dollarsRedeemed > 0)
    diff.status = status || ''

    this.setState(diff)
  }

  fetchCartData = () => {
    const { currentReader } = this.props
    if (Auth.currentUserExists() && currentReader && !currentReader.id) {
      this.props.getCurrentReader()
        .then(() => this.checkStepOne())
        .then(() => this.fetchStoreOrder())
    } else {
      this.fetchStoreOrder()
    }
  }

  fetchStoreOrder = () => {
    const { currentReader, order, session } = this.props
    const param = {}
    const ref = session && session.referral ? session.referral : null
    if (ref) param.ref = ref
    if (Auth.currentUserExists() && currentReader && currentReader.id && !order) {
      this.props.getCurrentOrder(param, true)
        .then(() => this.checkStepOne())
    }
  }

  checkStepOne = () => {
    const { currentReader, order } = this.props
    if (currentReader.id && order) {
      this.setState({ activeStep: 1 })
    }
  }

  checkIfAllGifts = (cart) => {
    return R.all(R.equals(true), cart.items.map(item => {
      return item.isGiftItem
    }))
  }

  splitCardExp = (date) => {
    return date.split('/')
  }

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  showAlert = (message, type) => {
    this.setState({
      snackbar: {
        open: true,
        text: message,
        type,
      },
    })
  }

  handleAlertClose = () => {
    this.setState({
      snackbar: {
        open: false,
        text: '',
        type: '',
      },
    })
  }

  handleChangePaymentMethod = (type) => {
    if (type === 'paypal') {
      this.setState({
        isPaypalClicked: true,
        isCardClicked: false,
      })
    } else if (type === 'card') {
      this.setState({
        isPaypalClicked: false,
        isCardClicked: true,
      })
    }
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

  handleSelectChange = (type, event, value) => {
    const alterState = {}
    alterState[type] = value
    if (type === 'countryShipping' && value !== 'US' && value !== 'CA') {
      alterState['stateShipping'] = ''
    }
    if (type === 'countryBilling' && value !== 'US' && value !== 'CA') {
      alterState['stateBilling'] = ''
    }
    this.setState(alterState)
  }

  setStep = (step) => {
    this.setState({ activeStep: step })
  }

  resetSteps = (err) => {
    const { currentReader } = this.props
    this.setState({
      activeStep: currentReader && currentReader.id ? 1 : 0,
      isLoadingCart: false,
      isCardClicked: true,
      isPaypalClicked: false,
      nameOnCard: '',
      cardNumber: '',
      cardCVC: '',
      fullExpDate: '',
      saveCard: false,
      sameShippingAddress: true,
      useLitcoins: false,
      cardStored: false,
      snackbar: {
        open: true,
        text: err,
        type: 'error',
      },
      paypalConfig: false,
      orderStatus: false,
      showOverlay: false,
      allGifts: false,
    })
  }

  passToBilling = () => {
    const {
      nameShipping, phoneShipping, addressShipping, address2Shipping,
      countryShipping, stateShipping, cityShipping, zipcodeShipping, shippingMethod,
    } = this.state
    this.props.setUserAddressAndShipping({
      city: cityShipping,
      name: nameShipping,
      country: countryShipping,
      address: addressShipping,
      address2: address2Shipping,
      zipcode: zipcodeShipping,
      state: stateShipping,
      phone: phoneShipping,
      addressType: 'shipping',
      sameBillingAndShipping: true,
    }, shippingMethod)
    .then(() => this.setStep(2))
    .catch(() => this.resetSteps('Unexpected error, please try again.'))
  }

  cleanField = (value) => {
    return value.trim()
  }

  continueToBillingClick = (event) => {
    event.preventDefault()
    const {
      nameShipping, addressShipping, countryShipping, stateShipping, cityShipping,
      zipcodeShipping, shippingMethod
    } = this.state

    if (!nameShipping) { this.showAlert('Please fill the "Name" field!'); return false }
    if (!addressShipping) { this.showAlert('Please fill the "Address" field!'); return false }
    if (!this.cleanField(countryShipping)) {
      this.showAlert('Please select a "Country"!'); return false
    }
    if (!cityShipping) { this.showAlert('Please fill the "City" field!'); return false }
    if (!zipcodeShipping) { this.showAlert('Please fill the "Zip Code" field!'); return false }

    if (countryShipping === 'US' || countryShipping === 'CA') {
      if (!this.cleanField(stateShipping)) {
        this.showAlert('Please select a "State"', 'error')
        return false
      }
    }

    if (!shippingMethod) { this.showAlert('Please select a Shipping Method', 'error'); return false}

    this.passToBilling()
    return true
  }

  passToReview = () => {
    this.setStep(3)
  }

  isUsingOtherCard = () => {
    const { cardExpMonth, cardExpYear, cardLast4 } = this.props.order
    const { fullExpDate, cardNumber } = this.state
    const fullDate = `${cardExpMonth}/${cardExpYear}`
    const lastNums = cardNumber.split(' ')
    if (fullExpDate !== fullDate || cardLast4 !== lastNums[3]) return true
    return false
  }

  continueToReviewClick = (event) => {
    event.preventDefault()
    const { setUserAddress, setBilling } = this.props
    const {
      nameOnCard, cardNumber, cardCVC, fullExpDate, isCardClicked, isPaypalClicked,
      shippingId, billingId, cardStored, sameShippingAddress, nameBilling,
      phoneBilling, addressBilling, address2Billing, countryBilling, stateBilling,
      cityBilling, zipcodeBilling, shippingMethod, useLitcoins
    } = this.state
    if (isPaypalClicked) {
      setBilling({
        shippingMethod: shippingMethod,
        paymentMethod: 'paypal',
        litcoins: useLitcoins,
        avoidCheckCardData: true,
      })
      .then(() => this.passToReview())
      .catch(() => this.resetSteps('Unexpected error, please try again.'))
    } else if (isCardClicked) {
      if (cardStored && this.isUsingOtherCard()) {
        if (nameOnCard && cardNumber && cardCVC && fullExpDate) {
          if (!sameShippingAddress) {
            if (cityBilling && countryBilling && addressBilling && zipcodeBilling) {
              if (countryBilling === 'US' || countryBilling === 'CA') {
                if (stateBilling !== '') {
                  setUserAddress({
                    city: cityBilling,
                    name: nameBilling,
                    country: countryBilling,
                    address: addressBilling,
                    address2: address2Billing || '',
                    zipcode: zipcodeBilling,
                    state: stateBilling,
                    phone: phoneBilling,
                    addressType: 'billing',
                    sameBillingAndShipping: false,
                  })
                    .then(() => this.passToReview())
                    .catch(() => this.resetSteps('Unexpected error, please try again.'))
                } else {
                  this.showAlert('Please Complete all Billing Fields', 'error')
                }
              } else {
                setUserAddress({
                  city: cityBilling,
                  name: nameBilling,
                  phone: phoneBilling,
                  country: countryBilling,
                  address: addressBilling,
                  address2: address2Billing || '',
                  zipcode: zipcodeBilling,
                  state: stateBilling,
                  addressType: 'billing',
                  sameBillingAndShipping: false,
                })
                  .then(() => this.passToReview())
                  .catch(() => this.resetSteps('Unexpected error, please try again.'))
              }
            } else {
              this.showAlert('Please Complete all Billing Fields', 'error')
            }
          } else {
            const validatedNum = CV.number(cardNumber)
            const validatedDate = CV.expirationDate(fullExpDate)
            const isAmex = validatedNum.card.isAmex ? 4 : 3
            const validatedCvv = CV.cvv(cardCVC, isAmex)
            if (validatedNum.isValid && validatedDate.isValid && validatedCvv.isValid) {
              setBilling({
                cardExpYear: validatedDate.year,
                shippingMethod: this.state.shippingMethod,
                cardExpMonth: validatedDate.month,
                paymentMethod: 'cc',
                shippingAddressId: shippingId,
                cardCvc: cardCVC,
                cardNumber: cardNumber,
                billingAddressId: billingId,
                litcoins: this.state.useLitcoins,
                avoidCheckCardData: this.state.cardStored,
              })
                .then(() => this.passToReview())
                .catch(() => this.resetSteps('Unexpected error, please try again.'))
            } else {
              if (!validatedNum.isValid) {
                this.showAlert('Invalid Card Number', 'error')
                return
              }
              if (!validatedDate.isValid) {
                this.showAlert('Invalid Expiration Date', 'error')
                return
              }
              if (!validatedCvv.isValid) {
                this.showAlert('Invalid CVC', 'error')
                return
              }
            }
          }
        } else this.showAlert('Please Complete all your card info', 'error')
      } else if (cardStored) {
        if (!sameShippingAddress) {
          if (cityBilling && countryBilling && addressBilling && zipcodeBilling) {
            if (countryBilling === 'US' || countryBilling === 'CA') {
              if (stateBilling !== '') {
                setUserAddress({
                  city: cityBilling,
                  name: nameBilling,
                  phone: phoneBilling,
                  country: countryBilling,
                  address: addressBilling,
                  address2: address2Billing || '',
                  zipcode: zipcodeBilling,
                  state: stateBilling,
                  addressType: 'billing',
                  sameBillingAndShipping: false,
                })
                  .then(() => {
                    setBilling({
                      shippingMethod: shippingMethod,
                      paymentMethod: 'cc',
                      litcoins: useLitcoins,
                      avoidCheckCardData: cardStored,
                    })
                      .then(() => this.passToReview())
                      .catch(() => this.resetSteps('Unexpected error, please try again.'))
                  })
                .catch(() => this.resetSteps('Unexpected error, please try again.'))
              } else {
                this.showAlert('Please Complete all Billing Fields', 'error')
              }
            } else {
              setUserAddress({
                city: cityBilling,
                name: nameBilling,
                phone: phoneBilling,
                country: countryBilling,
                address: addressBilling,
                address2: address2Billing || '',
                zipcode: zipcodeBilling,
                state: stateBilling,
                addressType: 'billing',
                sameBillingAndShipping: false,
              })
                .then(() => {
                  setBilling({
                    shippingMethod: shippingMethod,
                    paymentMethod: 'cc',
                    litcoins: useLitcoins,
                    avoidCheckCardData: cardStored,
                  })
                  .then(() => this.passToReview())
                  .catch(() => this.resetSteps('Unexpected error, please try again.'))
                })
              .catch(() => this.resetSteps('Unexpected error, please try again.'))
            }
          } else {
            this.showAlert('Please Complete all Billing Fields', 'error')
          }
        } else {
          setBilling({
            shippingMethod: shippingMethod,
            paymentMethod: 'cc',
            litcoins: useLitcoins,
            avoidCheckCardData: cardStored,
          })
            .then(() => this.passToReview())
            .catch(() => this.resetSteps('Unexpected error, please try again.'))
        }
      } else if (nameOnCard && cardNumber && cardCVC && fullExpDate) {
        if (!sameShippingAddress) {
          if (cityBilling && countryBilling && addressBilling && zipcodeBilling) {
            if (countryBilling === 'US' || countryBilling === 'CA') {
              if (stateBilling !== '') {
                setUserAddress({
                  city: cityBilling,
                  name: nameBilling,
                  phone: phoneBilling,
                  country: countryBilling,
                  address: addressBilling,
                  address2: address2Billing || '',
                  zipcode: zipcodeBilling,
                  state: stateBilling,
                  addressType: 'billing',
                  sameBillingAndShipping: false,
                })
                .then(() => this.passToReview())
                .catch(() => this.resetSteps('Unexpected error, please try again.'))
              } else {
                this.showAlert('Please Complete all Billing Fields', 'error')
              }
            } else {
              setUserAddress({
                city: cityBilling,
                name: nameBilling,
                phone: phoneBilling,
                country: countryBilling,
                address: addressBilling,
                address2: address2Billing || '',
                zipcode: zipcodeBilling,
                state: stateBilling,
                addressType: 'billing',
                sameBillingAndShipping: false,
              })
                .then(() => this.passToReview())
                .catch(() => this.resetSteps('Unexpected error, please try again.'))
            }
          } else {
            this.showAlert('Please Complete all Billing Fields', 'error')
          }
        } else {
          const validatedNum = CV.number(cardNumber)
          const validatedDate = CV.expirationDate(fullExpDate)
          const validatedCvv = CV.cvv(cardCVC)
          if (validatedNum.isValid && validatedDate.isValid && validatedCvv.isValid) {
            setBilling({
              cardExpYear: validatedDate.year,
              shippingMethod: this.state.shippingMethod,
              cardExpMonth: validatedDate.month,
              paymentMethod: 'cc',
              shippingAddressId: shippingId,
              cardCvc: cardCVC,
              cardNumber: cardNumber,
              billingAddressId: billingId,
              litcoins: this.state.useLitcoins,
              avoidCheckCardData: this.state.cardStored,
            })
              .then(() => this.passToReview())
              .catch(() => this.resetSteps('Unexpected error, please try again.'))
          } else {
            if (!validatedNum.isValid) {
              this.showAlert('Invalid Card Number', 'error')
            }
            if (!validatedDate.isValid) {
              this.showAlert('Invalid Expiration Date', 'error')
            }
            if (!validatedCvv.isValid) {
              this.showAlert('Invalid CVC', 'error')
            }
          }
        }
      } else this.showAlert('Please Complete all your card info', 'error')
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

  setShippingMethod = (shippingMethod) => {
    const { useLitcoins, activeStep } = this.state
    if (activeStep === 3) {
      this.updateOrderSettings(useLitcoins, shippingMethod)
        .then(()=>{ this.setState({ shippingMethod }) })
    } else {
      this.setState({ shippingMethod })
    }
  }

  handleCheckSave = (event) => this.setState({ saveCard: event.target.checked })

  handleCheckSame = (event) => this.setState({ sameShippingAddress: event.target.checked })

  handleUseLitcoins = (event) => {
    const { useLitcoins, shippingMethod } = this.state
    this.updateOrderSettings(!useLitcoins, shippingMethod)
      .then(()=>{ this.setState({ useLitcoins: !useLitcoins }) })
  }

  updateOrderSettings = (useLitcoins, shippingMethod) => {
    return this.props.setUsingLitcoins({
      'litcoins': useLitcoins,
      'shipping_method': shippingMethod
    })
  }

  handlePlaceOrder = () => {
    if (this.state.isCardClicked && !this.state.isPaypalClicked) {
      this.setState({ showOverlay: true })
      const params = {
        shippingMethod: this.state.shippingMethod,
        paymentMethod: 'cc',
      }
      this.props.placeOrderWithChanges({
        litcoins: this.state.useLitcoins,
        shippingMethod: this.state.shippingMethod,
        paymentMethod: 'cc',
      }, params, { hasCreatedAccount: this.state.hasCreatedAccount })
        .catch(() => this.resetSteps('Unexpected error, please try again.'))
      /*
      // TODO: What is this? Should we remove it ?
      */
      //   this.props.placeOrder({
      //     shippingMethod: this.state.shippingMethod,
      //     paymentMethod: 'cc',
      //   })
    } else if (this.state.isPaypalClicked && !this.state.isCardClicked) {
      this.props.getPaypalConfig()
        .catch(() => this.resetSteps('Unexpected error, please try again.'))
    }
    return true
  }

  onSuccess = (payment) => {
    if (payment.paid) {
      const params = {
        shippingMethod: this.state.shippingMethod,
        paymentMethod: 'paypal',
        paymentId: payment.paymentID,
        payerId: payment.payerID,
      }
      this.props.placeOrder(params, { hasCreatedAccount: this.state.hasCreatedAccount })
      .catch(() => this.resetSteps('Unexpected error, please try again.'))
    }
    this.setState({ showOverlay: true })
  }

  onCancel = (data) => {
    this.showAlert('The payment was cancelled', 'error')
    console.log('Payment canceled!', data)
  }

  onError = (err) => {
    this.showAlert('Error', 'error')
    console.log('Error!', err)
  }

  render() {
    const { activeStep } = this.state
    const shippingInfo = R.pick([
      'nameShipping',
      'phoneShipping',
      'addressShipping',
      'address2Shipping',
      'countryShipping',
      'cityShipping',
      'stateShipping',
      'zipcodeShipping',
    ], this.state);
    const cardInfo = R.pick([
      'nameOnCard',
      'cardNumber',
      'cardCVC',
      'fullExpDate',
    ], this.state);
    const billingInfo = R.pick([
      'nameBilling',
      'phoneBilling',
      'addressBilling',
      'address2Billing',
      'countryBilling',
      'cityBilling',
      'stateBilling',
      'zipcodeBilling',
    ], this.state);
    const title = 'GoRead | Checkout';

    return (
      <section className='checkoutpage-main-container'>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {this.state.showOverlay ?
          (
            <div className='overlay-on-order-place'>
              <div className='loading-animation-store-big'/>
            </div>
          ) : null
        }
        <header className='chekoutpage-header slide-down'>
          <figure className='checkoutpage-header-logo-figure'>
            <Link to='/store'>
              <img src='/image/book-store-logo-mobile.png'/>
            </Link>
          </figure>
        </header>
        <section className='row'>
          <div className='large-12 columns'>
            <div className='chekoutpage-steps-container'>
              <div className={activeStep >= 0 ?
                'chekoutpage-single-step-container-active' :
                'chekoutpage-single-step-container'
                }
              >
                <div className='checkoutpage-single-step-count'>
                  {activeStep > 0 ?
                    (
                      <span className='checkoutpage-single-step-number'>
                        <CheckIcon />
                      </span>
                    ) : (
                      <span className='checkoutpage-single-step-number'>
                        0
                      </span>
                    )
                  }
                </div>
                <span className='checkoutpage-single-step-title'>
                  Auth
                </span>
              </div>
              <div className={activeStep >= 1 ?
                'chekoutpage-single-step-container-active' :
                'chekoutpage-single-step-container'
                }
              >
                <div className='checkoutpage-single-step-count'>
                  {activeStep > 1 ?
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
              <div className={activeStep >= 2 ?
                'chekoutpage-single-step-container-active' :
                'chekoutpage-single-step-container'
                }
              >
                <div className='checkoutpage-single-step-count'>
                  {activeStep > 2 ?
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
              <div className={activeStep === 3 ?
                'chekoutpage-single-step-container-active' :
                'chekoutpage-single-step-container'
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
                  { activeStep === 0 ?
                    <StepZero
                      onAccountCreation={()=>this.setState({ hasCreatedAccount: true, activeStep: 1 })}
                      onLoginSuccess={()=>this.setState({ activeStep: 1 })}
                    /> : null
                  }
                  { activeStep === 1 ?
                    <StepOne
                      isLoadingCart={this.state.isLoadingCart}
                      allGifts={this.state.allGifts}
                      shippingInfo={shippingInfo}
                      selectedShipping={this.state.shippingMethod}
                      shippingMethods={this.props.shippingMethods}
                      onChange={this.handleFormsChanges}
                      selectChange={this.handleSelectChange}
                      setShipping={this.setShippingMethod}
                      next={this.continueToBillingClick}
                    /> : null
                  }
                  { activeStep === 2 ?
                    <StepTwo
                      order={this.props.order}
                      isCard={this.state.isCardClicked}
                      isPaypal={this.state.isPaypalClicked}
                      handleSwitch={this.handlePaymentClick}
                      cardInfo={cardInfo}
                      billingInfo={billingInfo}
                      onChange={this.handleFormsChanges}
                      selectChange={this.handleSelectChange}
                      isSameShipping={this.state.sameShippingAddress}
                      handleCheckSame={this.handleCheckSame}
                      handleUseLitcoins={this.handleUseLitcoins}
                      useLitcoins={this.state.useLitcoins}
                      next={this.continueToReviewClick}
                    /> : null
                  }
                  { activeStep === 3 ?
                    <StepThree
                      order={this.props.order}
                      isPaypal={this.state.isPaypalClicked}
                      isCard={this.state.isCardClicked}
                      shippingMethods={this.props.shippingMethods}
                      handleUseLitcoins={this.handleUseLitcoins}
                      useLitcoins={this.state.useLitcoins}
                      selectedShipping={this.state.shippingMethod}
                      setShipping={this.setShippingMethod}
                      shippingId={this.state.shippingId}
                      changePayment={this.handleChangePaymentMethod}
                      paypalConfig={this.props.paypalConfig}
                      onError={this.onError}
                      onSuccess={this.onSuccess}
                      onCancel={this.onCancel}
                      place={this.handlePlaceOrder}
                    /> : null
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
        <Snackbar
          open={this.state.snackbar.open}
          message={this.state.snackbar.text}
          autoHideDuration={3000}
          onRequestClose={this.handleAlertClose}
          bodyStyle={styles.snackBarError}
          contentStyle={styles.contentStyle}
        />
        <SnackBarAlert />
      </section>
    )
  }
}

const mapStateToProps = ({
  store: { cartItems, order, shippingMethods, paypalConfig },
  currentReader,
  session
}) => {
  return {
    cart: cartItems,
    order, shippingMethods, paypalConfig, currentReader,
    session
  }
}

const mapDistpachToProps = {
  getOrder,
  getCurrentOrder,
  setUserAddress,
  setUserAddressAndShipping,
  setShipping,
  setBilling,
  placeOrder,
  placeOrderWithChanges,
  getPaypalConfig,
  setUsingLitcoins,
  getCurrentReader,
  retrieveSession,
}

export default connect(mapStateToProps, mapDistpachToProps)(CheckoutPage)
