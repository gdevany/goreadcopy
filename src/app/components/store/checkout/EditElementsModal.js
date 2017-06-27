import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Store } from '../../../redux/actions'
import { Dialog } from 'material-ui'
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
      firstName: '',
      lastName: '',
      address: '',
      address2: '',
      country: '',
      city: '',
      state: '',
      zipcode: '',
      editClicked: false,
      nameOnCard: '',
      cardNumber: '',
      cardCVC: '',
      fullExpDate: '',
    }
    this.editAddressClick = this.editAddressClick.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleSaveCard = this.handleSaveCard.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleFormsChanges = this.handleFormsChanges.bind(this)
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

  editAddressClick = (event) => {
    event.preventDefault()
    const { shippingAddress } = this.props
    const fullName = this.splitFullName(shippingAddress.name)
    this.setState({
      firstName: fullName[0],
      lastName: fullName[1],
      address: shippingAddress.address,
      address2: shippingAddress.address2,
      country: shippingAddress.country,
      city: shippingAddress.city,
      state: shippingAddress.state,
      zipcode: shippingAddress.zipcode,
      editClicked: true
    })
  }

  handleSave = (event) => {
    event.preventDefault()
    const { setUserAddress, shippingAddress } = this.props
    const {
      firstName,
      lastName,
      address,
      address2,
      country,
      city,
      state,
      zipcode
    } = this.state
    if (shippingAddress.name === `${firstName} ${lastName}` &&
      shippingAddress.address === address &&
      shippingAddress.address2 === address2 &&
      shippingAddress.country === country &&
      shippingAddress.city === city &&
      shippingAddress.state === state &&
      shippingAddress.zipcode === zipcode) {
      alert('Todo es igual dud')
    } else {
      setUserAddress({
        city: city,
        name: `${firstName} ${lastName}`,
        country: country,
        address: address,
        address2: address2,
        zipcode: zipcode,
        state: state,
        addressType: 'shipping',
        sameBillingAndShipping: true,
      })
      this.props.handleClose()
    }
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
  }

  handleCancel = () => {
    this.setState({
      firstName: '',
      lastName: '',
      address: '',
      address2: '',
      country: '',
      city: '',
      state: '',
      zipcode: '',
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
            <section className='chekoutpage-edit-shipping-address-form'>
              <h4 className='chekoutpage-edit-shipping-address-form-title'>
                {this.state.editClicked ? 'Edit Shipping Address' : 'Add new Shipping Address'}
              </h4>
              <div className='row'>
                <div className='small-6 columns'>
                  <label
                    className='checkoutpage-steps-shipping-address-form-label'
                  >
                    First Name
                  </label>
                  <input
                    type='text'
                    className='checkoutpage-steps-shipping-address-form-input'
                    onChange={this.handleFormsChanges('firstName')}
                    value={this.state.firstName}
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
                    onChange={this.handleFormsChanges('lastName')}
                    value={this.state.lastName}
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
                    onChange={this.handleFormsChanges('address')}
                    value={this.state.address}
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
                    onChange={this.handleFormsChanges('address2')}
                    value={this.state.address2}
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
                    onChange={this.handleFormsChanges('country')}
                    value={this.state.country}
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
                    onChange={this.handleFormsChanges('city')}
                    value={this.state.city}
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
                    onChange={this.handleFormsChanges('state')}
                    value={this.state.state}
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
                    onChange={this.handleFormsChanges('zipcode')}
                    value={this.state.zipcode}
                  />
                </div>
              </div>
              <div className='chekoutpage-edit-shipping-address-btns-container'>
                <a
                  onClick={this.handleSave}
                  className='chekoutpage-edit-shipping-address-btn-save'
                >
                  Save Address
                </a>
                <a
                  onClick={this.handleCancel}
                  className='chekoutpage-edit-shipping-address-btn-cancel'
                >
                  Cancel
                </a>
              </div>
            </section>
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
              <CheckIcon className='chekoutpage-edit-payment-icon'/>
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
                <div className='checkoutpage-edit-payment-card-form'>
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
                          type='text'
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
                      <div className='chekoutpage-edit-payment-btns-container'>
                        <a
                          onClick={this.handleSaveCard}
                          className='chekoutpage-edit-payment-btn-save'
                        >
                          Save Address
                        </a>
                        <a
                          onClick={this.handleCancel}
                          className='chekoutpage-edit-payment-btn-cancel'
                        >
                          Cancel
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
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

const mapStateToProps = (state) => {
  return {
    shippingAddress: state.store.order.shippingAddress,
    cardDetails: {
      cardExpYear: state.store.order.cardExpYear,
      cardExpMonth: state.store.order.cardExpMonth,
      cardLast4: state.store.order.cardLast4,
      cardType: state.store.order.cardType,
      billing: state.store.order.billingAddress,
    },
  }
}
export default connect(mapStateToProps, { setUserAddress, setBilling })(EditElementsModal)
