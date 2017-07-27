import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Store, Common } from '../../../redux/actions'
import { Numbers } from '../../../utils'
import { ShippingForm } from './'
import R from 'ramda'

const { addGiftData } = Store
const { showAlert } = Common
const { parseFloatToUSD } = Numbers

class SingleGiftElement extends PureComponent {
  constructor(props) {
    super(props)
    const { giftMessage, shippingAddress } = props.giftItem.giftcartitemdata
    this.state = {
      gift: props.giftItem,
      isAddressClicked: false,
      nameShipping: shippingAddress.name || '',
      cityShipping: shippingAddress.city || '',
      countryShipping: shippingAddress.country || '',
      addressShipping: shippingAddress.address || '',
      address2Shipping: shippingAddress.address2 || '',
      zipcodeShipping: shippingAddress.zipcode || '',
      phoneShipping: shippingAddress.phone || '',
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

  sendShippingInfo() {
    const { addGiftData } = this.props
    addGiftData({
      cartItems: [this.state.gift.id],
      name: this.state.nameShipping,
      city: this.state.cityShipping,
      country: this.state.countryShipping,
      address: this.state.addressShipping,
      address2: this.state.address2Shipping,
      zipcode: this.state.zipcodeShipping,
      phone: this.state.phoneShipping,
      state: this.state.stateShipping,
      giftMessage: this.state.giftMessage,
    })
    this.setState({
      isAddressClicked: false,
      hasSavedAddress: true,
    })
  }

  handleShippingSubmit = (event) => {
    event.preventDefault()
    const {
      nameShipping,
      cityShipping,
      countryShipping,
      addressShipping,
      zipcodeShipping,
      stateShipping,
      giftMessage,
    } = this.state
    if (nameShipping !== '' && cityShipping !== '' &&
      countryShipping !== '' && addressShipping !== '' && zipcodeShipping !== '' &&
      giftMessage !== '') {
      if (countryShipping === 'US' || countryShipping === 'CA') {
        if (stateShipping !== '') {
          this.sendShippingInfo()
        } else {
          this.props.showAlert({
            message: 'Please add a State',
            type: 'error'
          })
        }
      } else {
        this.sendShippingInfo()
      }
    } else {
      this.props.showAlert({
        message: 'Please complete all the fields',
        type: 'error'
      })
    }
  }

  render() {
    const {
      gift,
      isAddressClicked,
      nameShipping,
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
      nameShipping,
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
                Unit Price: {parseFloatToUSD(gift.product.unitPrice)}
              </span>
            </div>
          </div>
          <div className='cartpage-gift-address-gift-messagge'>
            <label>Gift Message</label>
            <textarea
              onChange={this.handleOnChange('giftMessage')}
              value={this.state.giftMessage}
            />
            <a
              className='cartpage-set-gifts-btn'
              onClick={this.handleOpenAddress}
            >
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
  addGiftData,
  showAlert,
}

export default connect(null, mapDispatchToProps)(SingleGiftElement)
