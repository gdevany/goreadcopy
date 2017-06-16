import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Store } from '../../../redux/actions'
import R from 'ramda'

const { addGiftData } = Store

class SingleGiftElement extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      gift: props.giftItem,
      isAddressClicked: false,
      city: '',
      country: '',
      address: '',
      address2: '',
      zipcode: '',
      phone: '',
      state: '',
      giftMessage: '',
    }
    this.handleOpenAddress = this.handleOpenAddress.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
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

  handleShippingSubmit = (event) => {
    event.preventDefault()
    const { addGiftData } = this.props
    const {
      city,
      country,
      address,
      address2,
      zipcode,
      phone,
      state,
      giftMessage,
      gift
    } = this.state
    addGiftData({
      cartItems: [gift.id],
      city,
      country,
      address,
      address2,
      zipcode,
      phone,
      state,
      giftMessage
    })
    this.setState({ isAddressClicked: false, })
  }

  render() {
    const { gift, isAddressClicked } = this.state
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
                Unit Price: ${gift.product.unitPrice}
              </span>
            </div>
          </div>
          <div className='cartpage-gift-address-gift-messagge'>
            <label>Gift Messagge</label>
            <textarea
              onChange={this.handleOnChange('giftMessage')}
              value={this.state.giftMessage}
            />
            {isAddressClicked ?
              (
                <a onClick={this.handleOpenAddress}>
                  Hide Shipping Address Form
                </a>
              ) : (
                <a onClick={this.handleOpenAddress}>
                  Add a Shipping Address
                </a>
              )
            }
          </div>
        </article>
        {isAddressClicked ?
          (
            <div className='cartpage-gift-address-form'>
              <div className='row'>
                <div className='large-6 columns'>
                  <label>Country</label>
                  <input
                    type='text'
                    onChange={this.handleOnChange('country')}
                    value={this.state.country}
                  />
                </div>
                <div className='large-6 columns'>
                  <label>State</label>
                  <input
                    type='text'
                    onChange={this.handleOnChange('state')}
                    value={this.state.state}
                  />
                </div>
                <div className='large-12 columns'>
                  <label>Address</label>
                  <input
                    type='text'
                    onChange={this.handleOnChange('address')}
                    value={this.state.address}
                  />
                </div>
                <div className='large-12 columns'>
                  <label>Address 2</label>
                  <input
                    type='text'
                    onChange={this.handleOnChange('address2')}
                    value={this.state.address2}
                  />
                </div>
                <div className='large-4 columns'>
                  <label>Phone</label>
                  <input
                    type='text'
                    onChange={this.handleOnChange('phone')}
                    value={this.state.phone}
                  />
                </div>
                <div className='large-4 columns'>
                  <label>City</label>
                  <input
                    type='text'
                    onChange={this.handleOnChange('city')}
                    value={this.state.city}
                  />
                </div>
                <div className='large-4 columns'>
                  <label>Zipcode</label>
                  <input
                    type='text'
                    onChange={this.handleOnChange('zipcode')}
                    value={this.state.zipcode}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='large-3 large-offset-4 columns'>
                  <a
                    className='checkoutpage-place-order-btn'
                    onClick={this.handleShippingSubmit}
                  >
                      Save Address
                  </a>
                </div>
              </div>
            </div>
          ) : null
        }
      </div>
    )
  }
}

export default connect(null, { addGiftData })(SingleGiftElement)
