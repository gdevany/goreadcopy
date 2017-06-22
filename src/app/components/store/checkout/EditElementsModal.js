import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Dialog } from 'material-ui'
import CheckIcon from 'material-ui/svg-icons/navigation/check'

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

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
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
                <a className='chekoutpage-edit-shipping-address-edit-btn'>
                  Edit
                </a>
              </div>
            </section>
            <section className='chekoutpage-edit-shipping-address-form'>
              <h4 className='chekoutpage-edit-shipping-address-form-title'>
                Add new Shipping Address
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
                  />
                </div>
              </div>
              <div className='chekoutpage-edit-shipping-address-btns-container'>
                <a className='chekoutpage-edit-shipping-address-btn-save'>
                  Save Address
                </a>
                <a className='chekoutpage-edit-shipping-address-btn-cancel'>
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
export default connect(mapStateToProps, null)(EditElementsModal)
