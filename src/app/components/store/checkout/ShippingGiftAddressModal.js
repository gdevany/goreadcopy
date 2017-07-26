import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Dialog } from 'material-ui'
import SingleGiftElement from './SingleGiftElement'
import { Store, Common } from '../../../redux/actions'
import { ShippingForm } from './'
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
const { showAlert } = Common

class ShippingGiftAddressModal extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      sendToSamePerson: false,
      nameShipping: '',
      cityShipping: '',
      countryShipping: '',
      addressShipping: '',
      address2Shipping: '',
      zipcodeShipping: '',
      phoneShipping: '',
      stateShipping: '',
      giftMessage: '',
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSamePersonClick = this.handleSamePersonClick.bind(this)
    this.handleShippingSubmit = this.handleShippingSubmit.bind(this)
  }

  componentWillMount() {
    const { cartElements } = this.props
    const sameGifts = this.checkSameAddressForGiftList(cartElements)
    if (sameGifts.isTrue) {
      this.setState({
        sendToSamePerson: true,
        nameShipping: sameGifts.addressInfo.name,
        cityShipping: sameGifts.addressInfo.city,
        countryShipping: sameGifts.addressInfo.country,
        addressShipping: sameGifts.addressInfo.address,
        address2Shipping: sameGifts.addressInfo.address2,
        zipcodeShipping: sameGifts.addressInfo.zipcode,
        phoneShipping: sameGifts.addressInfo.phone,
        stateShipping: sameGifts.addressInfo.state,
        giftMessage: sameGifts.message,
      })
    }
  }

  checkSameAddressForGiftList = (itemList) => {
    const giftList = itemList.length > 0 ?
      R.filter(item => item.isGiftItem)(itemList) :
      null
    if (giftList && giftList.length > 0) {
      const shippingIdList = R.compose(
        R.pluck('id'),
        R.pluck('shippingAddress'),
        R.pluck('giftcartitemdata'),
      )(giftList)
      return {
        isTrue: R.all(R.equals(R.head(shippingIdList)), shippingIdList),
        addressInfo: R.head(giftList).giftcartitemdata.shippingAddress,
        message: R.head(giftList).giftcartitemdata.giftMessage,
      }
    }
    return { isTrue: false }
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

  handleSelectChange = (type, event, value) => {
    event.preventDefault()
    this.setState({ [type]: value })
  }

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

  sendShippingInfo() {
    const { addGiftData } = this.props
    addGiftData({
      cartItems: this.giftIdsHandler(),
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
    this.props.handleClose()
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

  renderGiftCartItems = () => {
    const { cartElements } = this.props
    return cartElements.map((item, index) => {
      if (item.isGiftItem) return <SingleGiftElement key={`gift_${index}`} giftItem={item}/>
      return null
    })
  }

  renderForm = () => {
    const {
      nameShipping,
      cityShipping,
      countryShipping,
      addressShipping,
      address2Shipping,
      zipcodeShipping,
      phoneShipping,
      stateShipping,
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
        <div className='row'>
          <div className='large-12 columns'>
            <label>Gift Message</label>
            <textarea
              onChange={this.handleOnChange('giftMessage')}
              value={this.state.giftMessage}
            />
          </div>
          <ShippingForm
            shippingInfo={formInfo}
            onChange={this.handleOnChange}
            selectChange={this.handleSelectChange}
            title='Add Gift Shipping address'
            className='chekoutpage-edit-shipping-address-form'
            handleSave={this.handleShippingSubmit}
            handleCancel={this.props.handleClose}
          />
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

export default connect(null, { addGiftData, showAlert })(ShippingGiftAddressModal)
