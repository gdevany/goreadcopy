import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Store } from '../../../redux/actions'
import { ShippingForm } from './'
import R from 'ramda'

const { addGiftData } = Store

class SingleGiftElement extends PureComponent {
  constructor(props) {
    super(props)
    const { giftMessage, shippingAddress } = props.giftItem.giftcartitemdata
    this.state = {
      gift: props.giftItem,
      isAddressClicked: false,
      firstNameShipping: shippingAddress.name || '',
      lastNameShipping: '',
      cityShipping: shippingAddress.city || '',
      countryShipping: shippingAddress.country || '',
      addressShipping: shippingAddress.address || '',
      address2Shipping: shippingAddress.address2 || '',
      zipcodeShipping: shippingAddress.zipcode || '',
      phoneShipping: shippingAddress.address || '',
      stateShipping: shippingAddress.state || '',
      giftMessage: giftMessage || '',
      hasSavedAddress: shippingAddress.id || false,
    }
    this.handleOpenAddress = this.handleOpenAddress.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleShippingSubmit = this.handleShippingSubmit.bind(this)
  }

  handleOpenAddress = (event) => {
    event.preventDefault()
    this.setState({ isAddressClicked: !this.state.isAddressClicked })
  }

  handleOnChange = R.curry((field, event) => {
    event.preventDefault()
    this.setState({ [field]: event.target.value })
  })

  handleSelectChange = (type, event, value) => {
    event.preventDefault()
    this.setState({ [type]: value })
  }

  handleShippingSubmit = (event) => {
    event.preventDefault()
    const { addGiftData } = this.props
    const {
      firstNameShipping,
      lastNameShipping,
      cityShipping,
      countryShipping,
      addressShipping,
      address2Shipping,
      zipcodeShipping,
      phoneShipping,
      stateShipping,
      giftMessage,
      gift
    } = this.state
    addGiftData({
      cartItems: [gift.id],
      firstName: firstNameShipping,
      lastName: lastNameShipping,
      city: cityShipping,
      country: countryShipping,
      address: addressShipping,
      address2: address2Shipping,
      zipcode: zipcodeShipping,
      phone: phoneShipping,
      state: stateShipping,
      giftMessage
    })
    this.setState({
      isAddressClicked: false,
      hasSavedAddress: true,
    })
  }

  render() {
    const {
      gift,
      isAddressClicked,
      firstNameShipping,
      lastNameShipping,
      cityShipping,
      countryShipping,
      addressShipping,
      address2Shipping,
      zipcodeShipping,
      phoneShipping,
      stateShipping,
      hasSavedAddress,
    } = this.state
    const formInfo = {
      firstNameShipping,
      lastNameShipping,
      cityShipping,
      countryShipping,
      addressShipping,
      address2Shipping,
      zipcodeShipping,
      phoneShipping,
      stateShipping,
    }
    return (
      <div>
        <article className='cartpage-gift-address-modal-item'>
          <div className='cartpage-gift-address-product'>
            <figure className='cartpage-gift-address-product-figure'>
              <img src={gift.product.imageUrl}/>
            </figure>
            <div className='cartpage-gift-address-product-details'>
              <span className='cartpage-gift-address-product-name'>
                {gift.product.name}
              </span>
              <span className='cartpage-gift-address-product-price'>
                Unit Price: ${gift.product.unitPrice.toFixed(2)}
              </span>
            </div>
          </div>
          <div className='cartpage-gift-address-gift-messagge'>
            <label>Gift Message</label>
            <textarea
              onChange={this.handleOnChange('giftMessage')}
              value={this.state.giftMessage}
            />
            <a onClick={this.handleOpenAddress}>
              {
                isAddressClicked ?
                  'Hide Shipping Address Form' :
                  hasSavedAddress ?
                    'Update Shipping Address' :
                    'Add a Shipping Address'
              }
            </a>
          </div>
        </article>
        {isAddressClicked ?
          <ShippingForm
            shippingInfo={formInfo}
            onChange={this.handleOnChange}
            selectChange={this.handleSelectChange}
            title='Add Gift Shipping address'
            className='chekoutpage-edit-shipping-address-form'
            handleSave={this.handleShippingSubmit}
            handleCancel={this.handleOpenAddress}
          /> : null
        }
      </div>
    )
  }
}

const mapDispatchToProps = {
  addGiftData
}

export default connect(null, mapDispatchToProps)(SingleGiftElement)
