import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Dialog } from 'material-ui'
import SingleGiftElement from './singleGiftElement'
import { Store } from '../../../redux/actions'
import R from 'ramda'

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

const { addGiftData } = Store

class ShippingGiftAddressModal extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      sendToSamePerson: false,
      city: '',
      country: '',
      address: '',
      address2: '',
      zipcode: '',
      phone: '',
      state: '',
      giftMessage: '',
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleSamePersonClick = this.handleSamePersonClick.bind(this)
    this.handleShippingSubmit = this.handleShippingSubmit.bind(this)
  }

  handleSamePersonClick = (event) => {
    this.setState({
      sendToSamePerson: event.target.checked
    })
  }

  handleOnChange = R.curry((field, event) => {
    event.preventDefault()
    this.setState({ [field]: event.target.value })
  })

  giftIdsHandler = () => {
    const { cartElements } = this.props
    const giftIds = []
    for (let i = 0; i < cartElements.length; i++) {
      if (cartElements[i].isGiftItem) {
        giftIds.push(cartElements[i].id)
      }
    }
    return giftIds
  }

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
    } = this.state
    addGiftData({
      cartItems: this.giftIdsHandler(),
      city,
      country,
      address,
      address2,
      zipcode,
      phone,
      state,
      giftMessage
    })
    this.props.handleClose()
  }

  renderGiftCartItems = () => {
    const { cartElements } = this.props
    return cartElements.map((item, index) => {
      if (item.isGiftItem) return <SingleGiftElement key={`gift_${index}`} giftItem={item}/>
      return null
    })
  }

  renderForm = () => {
    return (
      <div>
        <div className='row'>
          <div className='large-8 columns'>
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
          </div>
          <div className='large-4 columns'>
            <label>Gift Messagge</label>
            <textarea
              onChange={this.handleOnChange('giftMessage')}
              value={this.state.giftMessage}
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
    )
  }

  render() {
    const {
      modalOpen,
      handleClose,
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
          <div className='row'>
            <div className='large-8 large-offset-2 column'>
              <section className='cartpage-gift-address-modal-message'>
                <input
                  type='checkbox'
                  name='use-same-address'
                  checked={this.state.sendToSamePerson}
                  onChange={this.handleSamePersonClick}
                />
                <label htmlFor='use-same-address'>
                  Use same address for all gifts
                </label>
              </section>
              <hr className='cartpage-gift-address-modal-divider'/>
              <section className='cartpage-gift-address-modal-container'>
                {this.state.sendToSamePerson ? this.renderForm() : this.renderGiftCartItems()}
              </section>
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default connect(null, { addGiftData })(ShippingGiftAddressModal)
