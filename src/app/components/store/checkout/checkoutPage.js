import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Store } from '../../../redux/actions'
import { StepOne, StepTwo, StepThree } from './orderSteps'
import { Auth } from '../../../services'
import CheckIcon from 'material-ui/svg-icons/navigation/check'
import Snackbar from 'material-ui/Snackbar'
import { Alerts } from '../../common'
import R from 'ramda'
import CV from 'card-validator'

const { SnackBarAlert } = Alerts

const {
  getOrder, getCurrentOrder, setUserAddress, setUserAddressAndShipping,
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

let isUserLoggedIn = Auth.currentUserExists()

class CheckoutPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoadingCart: true,
      isStepOneActive: true,
      isStepTwoActive: false,
      isStepThreeActive: false,
      stepOneComplete: false,
      stepTwoComplete: false,
      stepThreeComplete: false,
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
    }
    this.continueToBillingClick = this.continueToBillingClick.bind(this)
    this.continueToReviewClick = this.continueToReviewClick.bind(this)
    this.handleCheckSame = this.handleCheckSame.bind(this)
    this.handleCheckSave = this.handleCheckSave.bind(this)
    this.handlePaymentClick = this.handlePaymentClick.bind(this)
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this)
    this.handleUseLitcoins = this.handleUseLitcoins.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.setStep = this.setStep.bind(this)
    this.resetSteps = this.resetSteps.bind(this)
  }

  componentWillMount = () => {
    this.props.getCurrentOrder({}, isUserLoggedIn)
    if (this.props.cart && this.props.cart.items.length) {
      this.setState({ allGifts: this.checkIfAllGifts(this.props.cart), isLoadingCart: false })
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.cart && nextProps.cart.items.length) {
      this.setState({ allGifts: this.checkIfAllGifts(nextProps.cart), isLoadingCart: false })
    }
    if (nextProps.order) {
      const {
        shippingAddress, billingAddress, cardLast4, cardExpMonth, cardExpYear,
        billingMethod, litcoinsRedeemed,
      } = nextProps.order
      if (shippingAddress) {
        this.setState({
          nameShipping: shippingAddress.name,
          phoneShipping: shippingAddress.phone,
          addressShipping: shippingAddress.address,
          address2Shipping: shippingAddress.address2,
          countryShipping: shippingAddress.country,
          stateShipping: shippingAddress.state,
          cityShipping: shippingAddress.city,
          zipcodeShipping: shippingAddress.zipcode,
          shippingId: shippingAddress.id,
          billingId: billingAddress.id,
          useLitcoins: (litcoinsRedeemed > 0),
        })
      }
      if (cardLast4) {
        this.setState({
          cardStored: true,
          nameOnCard: shippingAddress.name || '',
          cardNumber: `**** **** **** ${cardLast4}` || '',
          fullExpDate: `${cardExpMonth}/${cardExpYear}` || '',
          billingMethod: billingMethod || '',
          cardCVC: '***',
        })
      }
      this.setState({ status: nextProps.order.status })
    }
    if (nextProps.paypalConfig) {
      this.setState({ paypalConfig: nextProps.paypalConfig })
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
    this.setState({
      isStepOneActive: step === 1,
      isStepTwoActive: step === 2,
      isStepThreeActive: step === 3,
      stepOneComplete: step > 1,
      stepTwoComplete: step > 2,
      stepThreeComplete: step > 3,
    })
  }

  resetSteps(err) {
    this.setState({
      isLoadingCart: false,
      isStepOneActive: true,
      isStepTwoActive: false,
      isStepThreeActive: false,
      stepOneComplete: false,
      stepTwoComplete: false,
      stepThreeComplete: false,
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
        text: err.message,
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

  continueToBillingClick = (event) => {
    event.preventDefault()
    const {
      addressShipping, countryShipping, stateShipping, cityShipping,
      zipcodeShipping, shippingMethod,
    } = this.state
    if (cityShipping && countryShipping && addressShipping &&
      zipcodeShipping && shippingMethod !== '') {
      if ((countryShipping === 'US' || countryShipping === 'CA')) {
        if (stateShipping !== '') {
          this.passToBilling()
        } else {
          this.showAlert('Please selet an State', 'error')
        }
      } else {
        this.passToBilling()
      }
    } else {
      if (!(cityShipping || countryShipping || addressShipping ||
        zipcodeShipping) && shippingMethod === '') {
        this.showAlert('Please fill all fields', 'error')
      }
      if ((cityShipping || countryShipping || addressShipping ||
        zipcodeShipping) && shippingMethod === '') {
        this.showAlert('Please select a Shipping Method', 'error')
      }
      if (!cityShipping || !countryShipping || !addressShipping ||
        !zipcodeShipping && shippingMethod !== '') {
        this.showAlert('Please Fill all Shipping address Form', 'error')
      }
    }
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
    this.setState({ shippingMethod }, ()=>{
      this.passToBilling()
    })
  }

  handleCheckSave = (event) => this.setState({ saveCard: event.target.checked })

  handleCheckSame = (event) => this.setState({ sameShippingAddress: event.target.checked })

  handleUseLitcoins = (event) => {
    this.setState({ useLitcoins: event.target.checked })
  }

  handlePlaceOrder = () => {
    if (this.state.isCardClicked && !this.state.isPaypalClicked) {
      this.setState({ showOverlay: true })
      this.props.placeOrderWithChanges({
        litcoins: this.state.useLitcoins,
        shippingMethod: this.state.shippingMethod,
        paymentMethod: 'cc',
      }, {
        shippingMethod: this.state.shippingMethod,
        paymentMethod: 'cc',
      })
        .then(() => console.log(' '))
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
        .then(() => console.log(' '))
        .catch(() => this.resetSteps('Unexpected error, please try again.'))
    }
    return true
  }

  onSuccess = (payment) => {
    if (payment.paid) {
      this.props.placeOrder({
        shippingMethod: this.state.shippingMethod,
        paymentMethod: 'paypal',
        paymentId: payment.paymentID,
        payerId: payment.payerID,
      })
      .then(() => console.log(' '))
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
    isUserLoggedIn = Auth.currentUserExists()
    const shippingInfo = R.pick([
      'nameShipping',
      'phoneShipping',
      'addressShipping',
      'address2Shipping',
      'countryShipping',
      'cityShipping',
      'stateShipping',
      'zipcodeShipping',
    ], this.state)
    const cardInfo = R.pick([
      'nameOnCard',
      'cardNumber',
      'cardCVC',
      'fullExpDate',
    ], this.state)
    const billingInfo = R.pick([
      'nameBilling',
      'phoneBilling',
      'addressBilling',
      'address2Billing',
      'countryBilling',
      'cityBilling',
      'stateBilling',
      'zipcodeBilling',
    ], this.state)

    return (
      <section className='checkoutpage-main-container'>
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
            {this.props.order ?
              (
                <div className='chekoutpage-steps-container'>
                  <div className={this.state.isStepOneActive || this.state.stepOneComplete ?
                    'chekoutpage-single-step-container-active' :
                    'chekoutpage-single-step-container'
                    }
                  >
                    <div className='checkoutpage-single-step-count'>
                      {this.state.stepOneComplete ?
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
                  <div className={this.state.isStepTwoActive || this.state.stepTwoComplete ?
                    'chekoutpage-single-step-container-active' :
                    'chekoutpage-single-step-container'
                    }
                  >
                    <div className='checkoutpage-single-step-count'>
                      {this.state.stepTwoComplete ?
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
                  <div className={this.state.isStepThreeActive ?
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
              ) : null
            }
            <div className='row'>
              <div className='large-10 columns large-offset-1'>
                <div className='chekoutpage-steps-main-container'>
                  {this.state.isStepOneActive ?
                    (
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
                      />
                    ) : null
                  }
                  {this.state.isStepTwoActive ?
                    (
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
                      />
                    ) : null
                  }
                  {this.state.isStepThreeActive ?
                    (
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
                      />
                    ) : null
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

const mapStateToProps = (state) => {
  return {
    cart: state.store.cartItems,
    order: state.store.order,
    shippingMethods: state.store.shippingMethods,
    paypalConfig: state.store.paypalConfig,
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
}

export default connect(mapStateToProps, mapDistpachToProps)(CheckoutPage)
