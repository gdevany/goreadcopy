import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Dialog } from 'material-ui'
import { Colors } from '../../constants/style'
import { CurrentReader } from '../../redux/actions'
import PrimaryButton from '../common/PrimaryButton'
import R from 'ramda'

const { updateShippingAddress } = CurrentReader
const styles = {
  lableStyle: {
    fontSize: 18,
  },
  elementStyle: {
    padding: '1em 0',
  },
  thumbSwitched: {
    backgroundColor: Colors.blue,
  },
  trackSwitched: {
    backgroundColor: '#d3ebfb',
  },
  selectStyles: {
    width: '100%'
  },
  submitButton: {
    width: '100%',
    textAlign: 'center',
  }
}
class shippingAddressModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      country: '',
      phone: '',
      zipcode: '',
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleCompleteSubmit = this.handleCompleteSubmit.bind(this)
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.currentReader.shippingAddress) {

      this.setState({
        name: (nextProps.currentReader.shippingAddress.name || ''),
        address: (nextProps.currentReader.shippingAddress.address || ''),
        address2: (nextProps.currentReader.shippingAddress.address2 || ''),
        city: (nextProps.currentReader.shippingAddress.city || ''),
        state: (nextProps.currentReader.shippingAddress.state || ''),
        country: (nextProps.currentReader.shippingAddress.country || ''),
        phone: (nextProps.currentReader.shippingAddress.phone || ''),
        zipcode: (nextProps.currentReader.shippingAddress.zipcode || ''),
      })
    }
  }
  handleOnChange = R.curry((field, e) => {
    e.preventDefault()
    this.setState({ [field]: e.target.value })
  })
  handleCompleteSubmit = (event) => {
    event.preventDefault()
    const {
      name,
      address,
      address2,
      city,
      state,
      country,
      phone,
      zipcode,
    } = this.state

    const readerData = {
      name,
      address,
      address2,
      city,
      state,
      country,
      phone,
      zipcode,
    }
    this.props.updateShippingAddress(readerData)
    this.props.handleClose()
  }

  renderShippingAddress = () => {
    const {
      name,
      address,
      address2,
      city,
      state,
      country,
      phone,
      zipcode,
    } = this.state
    return (
      <article className='settings-single-tab-content small-10 columns small-centered'>
        <div className='profile-editor-section-container'>
          <div className='shipping-form-container'>
            <form className='shipping-form' action=''>
              <div className='row'>
                <div className='small-12 large-6 columns'>
                  <span className='form-label'>Full Name</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                    onChange={this.handleOnChange('name')}
                    value={name}
                  />
                </div>
                <div className='small-12 large-6 columns'>
                  <span className='form-label'>Phone</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                    onChange={this.handleOnChange('phone')}
                    value={phone}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='small-12 columns'>
                  <span className='form-label'>Address Line 1</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                    onChange={this.handleOnChange('address')}
                    value={address}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='small-12 columns'>
                  <span className='form-label'>Address Line 2</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                    onChange={this.handleOnChange('address2')}
                    value={address2}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='small-12 large-5 columns'>
                  <span className='form-label'>City</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                    onChange={this.handleOnChange('city')}
                    value={city}
                  />
                </div>
                <div className='small-12 large-3 columns'>
                  <span className='form-label'>State</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                    onChange={this.handleOnChange('state')}
                    value={state}
                  />
                </div>
                <div className='small-12 large-4 columns'>
                  <span className='form-label'>Country</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                    onChange={this.handleOnChange('country')}
                    value={country}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='small-12 large-4 columns'>
                  <span className='form-label'>Zip code</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                    onChange={this.handleOnChange('zipcode')}
                    value={zipcode}
                  />
                </div>
              </div>
              <div
                className='profile-editor-save-btn-container'
                style={styles.submitButton}
              >
                <PrimaryButton
                  label='Save Shipping Address'
                  onClick={this.handleCompleteSubmit}
                />
              </div>
            </form>
          </div>
        </div>
      </article>
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
          bodyClassName='edit-profile-modal'
          modal={true}
          open={modalOpen}
          onRequestClose={handleClose}
          autoScrollBodyContent={true}
        >
          <img
            src='/image/close.png'
            className='general-font center-text search-modal-x'
            onClick={handleClose}
          />
          <div className='complete-profile-modal-container row'>
            <div className='small-12 columns'>
              <div className='row'>
                <div className='center-text small-8 collumns small-centered'>
                  <h2 className='searchbooks-readfeeed-title'>Add your Shipping Address</h2>
                  <h4 className='searchbooks-readfeeed-subtitle'>
                    We do not share this information on the site
                  </h4>
                </div>
                {this.renderShippingAddress()}
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    currentReader: state.currentReader
  }
}
const mapDispatchToProps = {
  updateShippingAddress,
}
export default connect(mapStateToProps, mapDispatchToProps)(shippingAddressModal)
