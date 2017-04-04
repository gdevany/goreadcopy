import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Dialog } from 'material-ui'
import { Colors } from '../../constants/style'
import { CurrentReader } from '../../redux/actions'
import { ProfilePage } from '../../services/api'
import PrimaryButton from '../common/PrimaryButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import R from 'ramda'

let countryList, stateList
const { updateShippingAddress } = CurrentReader
const { getCountries, getStates } = ProfilePage
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
      country: 0,
      phone: '',
      zipcode: '',
      nameError: '',
      addressError: '',
      cityError: '',
      stateError: '',
      countryError: '',
      phoneError: '',
      zipcodeError: '',
      isContentRenderInput: true,
      isContentRenderList: false,
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

  handleOnChangeCountry = R.curry((e, index, value) => {
    e.preventDefault()
    if (value) {
      this.setState({ country: value })
      getStates(value)
        .then(res => this.displayStateList(res))
    }
  })

  handleOnChangeState = R.curry((e, index, value) => {
    e.preventDefault()
    this.setState({ state: value })
  })

  /*handleCleanModal = () => {
    this.setState({
      name: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      country: 0,
      phone: '',
      zipcode: '',
      nameError: '',
      addressError: '',
      cityError: '',
      stateError: '',
      countryError: '',
      phoneError: '',
      zipcodeError: '',
      isContentRenderInput: true,
      isContentRenderList: false,
    })
  }*/

  handleRenderCountry = () => {
    getCountries()
      .then(res => this.displayCountryList(res))

    return (
      <div className={'small-12 large-8 columns ' + this.state.countryError}>
        <span className='form-label'>Country</span>
        <SelectField
          onChange={this.handleOnChangeCountry()}
          value={this.state.country}
          style={styles.selectStyles}
        >
          <MenuItem
            value={0}
            primaryText='Select your country'
          />
          { countryList ? countryList : null }
        </SelectField>
      </div>
    )
  }

  displayCountryList = (res) => {
    if (res) {
      countryList = res.data.result.map((data, index) => {
        return (
          <MenuItem
            value={data.pk}
            primaryText={data.name}
            key={data.pk}
          />
        )
      })
    }
  }

  handleRenderState = () => {
    return (
      <div className={'small-12 large-8 columns ' + this.state.stateError}>
        <span className='form-label'>State</span>
        <SelectField
          onChange={this.handleOnChangeState()}
          value={this.state.state}
          style={styles.selectStyles}
        >
          <MenuItem
            value={0}
            primaryText='Select a State'
          />
          { stateList ? stateList : null }
        </SelectField>
      </div>
    )
  }

  handleRenderInput = () => {
    return (
      <div className={'small-12 large-3 columns ' + this.state.stateError}>
        <span className='form-label'>State</span>
        <input
          type='text'
          className='form-input profile-editor-form-input'
          onChange={this.handleOnChange('state')}
          value={this.state.state}
        />
      </div>
    )
  }

  displayStateList = (res) => {
    if (res) {
      stateList = res.data.result.map((data, index) => {
        return (
          <MenuItem
            value={data.pk}
            primaryText={data.name}
            key={data.pk}
          />
        )
      })
      this.setState({
        state: 0,
        isContentRenderList: true,
        isContentRenderInput: false,
      })
    } else {
      stateList = false
      this.setState({
        state: '',
        isContentRenderList: false,
        isContentRenderInput: true,
      })
    }
  }

  handleValidation = (data) => {
    let val = true
    if (data.name === '') {
      this.setState({ nameError: 'shipping-address-error' })
      val = false
    } else {
      this.setState({ nameError: '' })
    }
    if (data.address === '') {
      this.setState({ addressError: 'shipping-address-error' })
      val = false
    } else {
      this.setState({ addressError: '' })
    }
    if (data.state === '' || data.state === 0) {
      this.setState({ stateError: 'shipping-address-error' })
      val = false
    } else {
      this.setState({ stateError: '' })
    }
    if (data.city === '') {
      this.setState({ cityError: 'shipping-address-error' })
      val = false
    } else {
      this.setState({ cityError: '' })
    }
    if (data.country === 0) {
      this.setState({ countryError: 'shipping-address-error' })
      val = false
    } else {
      this.setState({ countryError: '' })
    }
    if (data.phone === '' && typeof data.phone === 'number') {
      this.setState({ phoneError: 'shipping-address-error' })
      val = false
    } else {
      this.setState({ phoneError: '' })
    }
    if (data.zipcode === '') {
      this.setState({ zipcodeError: 'shipping-address-error' })
      val = false
    } else {
      this.setState({ zipcodeError: '' })
    }
    return val
  }

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
    if (this.handleValidation(readerData) === true) {
      this.props.updateShippingAddress(readerData)
      this.props.handleClose()
    }
  }

  renderShippingAddress = () => {
    const {
      name,
      address,
      address2,
      city,
      phone,
      zipcode,
      nameError,
      addressError,
      cityError,
      phoneError,
      zipcodeError,
      isContentRenderInput,
      isContentRenderList,
    } = this.state
    return (
      <article className='settings-single-tab-content small-10 columns small-centered'>
        <div className='profile-editor-section-container'>
          <div className='shipping-form-container'>
            <form className='shipping-form' action=''>
              <div className='row'>
                <div className={'small-12 large-6 columns ' + nameError}>
                  <span className='form-label'>Full Name</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                    onChange={this.handleOnChange('name')}
                    value={name}
                  />
                </div>
                <div className={'small-12 large-6 columns ' + phoneError}>
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
                <div className={'small-12 columns ' + addressError}>
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
                {this.handleRenderCountry()}
                <div className={'small-12 large-4 columns ' + zipcodeError}>
                  <span className='form-label'>Zip code</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                    onChange={this.handleOnChange('zipcode')}
                    value={zipcode}
                  />
                </div>
              </div>
              {isContentRenderList ? this.handleRenderState() : null}
              {isContentRenderInput ? this.handleRenderInput() : null}
              <div className='row'>
                <div className={'small-12 large-4 columns ' + cityError}>
                  <span className='form-label'>City</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                    onChange={this.handleOnChange('city')}
                    value={city}
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
