import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Store } from '../../../redux/actions'
import { Dialog } from 'material-ui'
import { CardForm, ShippingForm } from './'
import CheckIcon from 'material-ui/svg-icons/navigation/check'
import LockIcon from 'material-ui/svg-icons/action/lock-outline'
import R from 'ramda'

const { setUserAddress, setBilling } = Store

const styles = {
  modalBody: {
    marginTop: -80,
  },
  modalContent: {
    maxWidth: '100%',
    width: '100%',
    opacity: 0.93,
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
}

class EditElementsModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      firstNameShipping: '',
      lastNameShipping: '',
      addressShipping: '',
      address2Shipping: '',
      countryShipping: '',
      cityShipping: '',
      stateShipping: '',
      zipcodeShipping: '',
      editClicked: false,
      nameOnCard: '',
      cardNumber: '',
      cardCVC: '',
      fullExpDate: '',
      selectedPayment: '',
    }
    this.editAddressClick = this.editAddressClick.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleSaveCard = this.handleSaveCard.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleFormsChanges = this.handleFormsChanges.bind(this)
    this.handlePaymentSwitch = this.handlePaymentSwitch.bind(this)
  }

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  splitFullName = (fullname) => {
    return fullname.split(' ')
  }

  splitCardExp = (date) => {
    return date.split('/')
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

  handlePaymentSwitch = (type) => {
    if (type === 'paypal') {
      this.props.setBilling({
        shippingMethod: this.props.shippingMethod,
        paymentMethod: 'paypal',
      })
      this.setState({ selectedPayment: 'paypal' })
    }
  }

  editAddressClick = (event) => {
    event.preventDefault()
    const { shippingAddress } = this.props
    const fullName = this.splitFullName(shippingAddress.name)
    this.setState({
      firstNameShipping: fullName[0],
      lastNameShipping: fullName[1],
      addressShipping: shippingAddress.address,
      address2Shipping: shippingAddress.address2,
      countryShipping: shippingAddress.country,
      cityShipping: shippingAddress.city,
      stateShipping: shippingAddress.state,
      zipcodeShipping: shippingAddress.zipcode,
      editClicked: true
    })
  }

  handleSave = (event) => {
    event.preventDefault()
    const { setUserAddress, shippingAddress, handleClose } = this.props
    const {
      firstNameShipping,
      lastNameShipping,
      addressShipping,
      address2Shipping,
      countryShipping,
      cityShipping,
      stateShipping,
      zipcodeShipping
    } = this.state
    if (firstNameShipping !== '' && lastNameShipping !== '' &&
      addressShipping !== '' && countryShipping !== '' &&
      cityShipping !== '' && stateShipping !== '' && zipcodeShipping !== '') {
      if (shippingAddress.name !== `${firstNameShipping} ${lastNameShipping}` ||
        shippingAddress.address !== addressShipping ||
        shippingAddress.address2 !== address2Shipping ||
        shippingAddress.country !== countryShipping ||
        shippingAddress.city !== cityShipping ||
        shippingAddress.state !== stateShipping ||
        shippingAddress.zipcode !== zipcodeShipping) {
        setUserAddress({
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
        handleClose()
      } else handleClose()
    }
    this.handleCancel()
  }

  handleSaveCard = (event) => {
    const {
      cardNumber,
      cardCVC,
      fullExpDate,
    } = this.state
    event.preventDefault()
    const expDate = this.splitCardExp(fullExpDate)
    this.props.setBilling({
      cardExpYear: expDate[1],
      cardExpMonth: expDate[0],
      paymentMethod: 'cc',
      cardCvc: cardCVC,
      cardNumber: cardNumber,
      shippingMethod: this.props.shippingMethod,
    })
    this.props.handleClose()
    this.handleCancel()
  }

  handleCancel = () => {
    this.setState({
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
      editClicked: false,
    })
    this.props.handleClose()
  }

  renderEditShipping = () => {
    const { shippingAddress } = this.props
    const {
      firstNameShipping, lastNameShipping, addressShipping, address2Shipping,
      countryShipping, cityShipping, stateShipping, zipcodeShipping
    } = this.state
    const formInfo = {
      firstNameShipping, lastNameShipping, addressShipping, address2Shipping,
      countryShipping, cityShipping, stateShipping, zipcodeShipping
    }
    return (
      <div className='row'>
        <div className='large-5 large-offset-4'>
          <section className='chekoutpage-edit-shipping-modal'>
            <h2 className='chekoutpage-edit-shipping-modal-title'>
              Shipping Address
            </h2>
            <section className='chekoutpage-edit-shipping-address-container'>
              <CheckIcon className='chekoutpage-edit-shipping-address-icon'/>
              <div className='chekoutpage-edit-shipping-address-overview'>
                <h3 className='chekoutpage-edit-shipping-address-name'>
                  {shippingAddress.name}
                </h3>
                <h3 className='chekoutpage-edit-shipping-address-address'>
                  {this.truncInfo(shippingAddress.address, 25)}
                </h3>
                <span className='chekoutpage-edit-shipping-address-state'>
                  {`${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.country}`}
                </span>
                <span className='chekoutpage-edit-shipping-address-phone'>
                  {shippingAddress.phone}
                </span>
              </div>
              <div className='chekoutpage-edit-shipping-address-edit'>
                <a
                  onClick={this.editAddressClick}
                  className='chekoutpage-edit-shipping-address-edit-btn'
                >
                  Edit
                </a>
              </div>
            </section>
            <ShippingForm
              shippingInfo={formInfo}
              onChange={this.handleFormsChanges}
              title={this.state.editClicked ? 'Edit Shipping Address' : 'Add new Shipping Address'}
              className='chekoutpage-edit-shipping-address-form'
              handleSave={this.handleSave}
              handleCancel={this.handleCancel}
            />
          </section>
        </div>
      </div>
    )
  }

  renderEditPayment = () => {
    const { cardDetails } = this.props
    const {
      nameOnCard,
      cardNumber,
      cardCVC,
      fullExpDate,
    } = this.state
    const cardInfo = {
      nameOnCard,
      cardNumber,
      cardCVC,
      fullExpDate,
    }

    return (
      <div className='row'>
        <div className='large-5 large-offset-4'>
          <section className='chekoutpage-edit-payment-modal'>
            <h2 className='chekoutpage-edit-payment-modal-title'>
              Payment
            </h2>
            <section
              className={!this.props.isPaypal && cardDetails ?
                'chekoutpage-edit-payment-container active' :
                'chekoutpage-edit-payment-container'
              }
            >
              <CheckIcon className='chekoutpage-edit-payment-icon'/>
              <div className='chekoutpage-edit-payment-overview'>
                <div className='checkoutpage-order-review-card-details'>
                  <div className='checkoutpage-order-review-card-nums'>
                    {cardDetails.cardType === 'Visa' ?
                      (
                        <img
                          src='/image/visa-black.png'
                          className='checkoutpage-order-review-card-type'
                        />
                      ) : null
                    }
                    {cardDetails.cardType === 'Master' ?
                      (
                        <img
                          src='/image/master-black.png'
                          className='checkoutpage-order-review-card-type'
                        />
                      ) : null
                    }

                    {cardDetails.cardType === 'American' ?
                      (
                        <img
                          src='/image/american-black.png'
                          className='checkoutpage-order-review-card-type'
                        />
                      ) : null
                    }
                    {cardDetails.cardType === 'Discover' ?
                      (
                        <img
                          src='/image/discover-black.png'
                          className='checkoutpage-order-review-card-type'
                        />
                      ) : null
                    }
                    <span className='checkoutpage-order-review-card-last'>
                      {`**** **** **** ${cardDetails.cardLast4}`}
                    </span>
                    <span className='checkoutpage-order-review-card-exp'>
                      Expires {`${cardDetails.cardExpMonth}/${cardDetails.cardExpYear}`}
                    </span>
                  </div>
                  <span className='checkoutpage-order-review-card-name'>
                    {cardDetails.billing.name}
                  </span>
                  <span className='checkoutpage-order-review-card-address'>
                    {`${cardDetails.billing.city}, ${cardDetails.billing.state},
                    ${cardDetails.billing.country}`}
                  </span>
                </div>
              </div>
            </section>
            <section
              className={this.props.isPaypal ?
                'chekoutpage-edit-payment-container active' :
                'chekoutpage-edit-payment-container'
              }
            >
              <CheckIcon
                onClick={() => this.handlePaymentSwitch('paypal')}
                className='chekoutpage-edit-payment-icon'
              />
              <div className='chekoutpage-edit-payment-overview'>
                <img className='paypal-image' src='/image/paypal-logo.png'/>
              </div>
            </section>
            <section className='checkoutpage-edit-payment-card-container'>
              <div className='checkoutpage-edit-payment-selector'>
                <div className='checkoutpage-edit-payment-selector-element'>
                  <a className='checkoutpage-edit-payment-selector-anchor'/>
                </div>
              </div>
              <div className='checkoutpage-edit-payment-card'>
                <div className='checkoutpage-edit-payment-card-head'>
                  <span className='checkoutpage-edit-payment-card-head-title'>
                    Add New Card / Credit Card
                  </span>
                  <img
                    className='checkoutpage-edit-payment-card-head-img'
                    src='/image/credit-cards.png'
                  />
                </div>
                <div className='checkoutpage-edit-payment-card-subhead'>
                  <LockIcon className='checkoutpage-edit-payment-card-subhead-icon'/>
                  <span className='checkoutpage-edit-payment-card-subhead-text'>
                    Secure and encrypted
                  </span>
                </div>
                <CardForm
                  cardInfo={cardInfo}
                  onChange={this.handleFormsChanges}
                  handleSave={this.handleSaveCard}
                  handleCancel={this.handleCancel}
                  context='editModal'
                />
              </div>
            </section>
          </section>
        </div>
      </div>
    )
  }

  render() {
    const {
      modalOpen,
      handleClose,
      refference,
    } = this.props

    return (
      <div>
        <Dialog
          bodyClassName='search-modal-content'
          bodyStyle={styles.modalBody}
          contentStyle={styles.modalContent}
          modal={false}
          open={modalOpen}
          onRequestClose={handleClose}
          autoDetectWindowHeight={false}
          autoScrollBodyContent={true}
        >
          <img
            src='/image/close.png'
            className='general-font center-text search-modal-x'
            onClick={handleClose}
          />
          {refference === 'shipping' && this.props.shippingAddress ?
            this.renderEditShipping() : null
          }
          {refference === 'card' ?
            (
              this.renderEditPayment() : null
            ) : null
          }
        </Dialog>
      </div>
    )
  }
}

export default connect(null, { setUserAddress, setBilling })(EditElementsModal)
