import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Store } from '../../../redux/actions'
import { Dialog } from 'material-ui'
import CheckIcon from 'material-ui/svg-icons/navigation/check'
import R from 'ramda'

const { setUserAddress } = Store

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
    }
    this.editAddressClick = this.editAddressClick.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleFormsChanges = this.handleFormsChanges.bind(this)
  }

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  splitFullName = (fullname) => {
    return fullname.split(' ')
  }

  handleFormsChanges = R.curry((field, event) => {
    event.preventDefault()
    this.setState({ [field]: event.target.value })
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
              <div>Edit Payment</div>
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
  }
}
export default connect(mapStateToProps, { setUserAddress })(EditElementsModal)
