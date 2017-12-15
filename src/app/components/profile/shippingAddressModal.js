import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Dialog } from 'material-ui'
import { Colors } from '../../constants/style'
import { CurrentReader, Common } from '../../redux/actions'
import PrimaryButton from '../common/PrimaryButton'
import R from 'ramda'

const { updateShippingAddress } = CurrentReader
const { getCountries, getStates } = Common
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

    const {
      name, address, address2, city,
      state, country, phone, zipcode
    } = props && props.currentReader && props.currentReader.shippingAddress ?
      props.currentReader.shippingAddress :
      {}

    this.state = {
      name: name || '',
      address: address || '',
      address2: address2 || '',
      city: city || '',
      state: state || '',
      country: country || '',
      phone: phone || '',
      zipcode: zipcode || '',
      nameError: '',
      addressError: '',
      cityError: '',
      stateError: '',
      countryError: '',
      phoneError: '',
      zipcodeError: '',
    }
  }

  handleOnChange = R.curry((field, e) => {
    e.preventDefault()
    this.setState({ [field]: e.target.value })
  })

  handleOnChangeCountry = R.curry((e) => {
    e.preventDefault()
    this.setState({
      country: e.target.value,
      countryError: ''
    })
    this.props.getStates(e.target.value)
      .then(res => {
        this.setState({
          state: '',
          stateInputError: ''
        })
      })
  })

  handleOnChangeState = R.curry((e) => {
    e.preventDefault()
    this.setState({
      state: e.target.value,
      stateError: ''
    })
  })

  handleRenderCountry = () => {
    const { countries, getCountries } = this.props
    if (!countries) {
      getCountries()
    }
    return (
      <div className={'small-12 large-6 columns ' + this.state.countryError}>
        <span className='form-label'>Country</span>
        <select
          className='normal-feel'
          onChange={this.handleOnChangeCountry()}
          value={this.state.country}
          style={styles.selectStyles}
        >
          {
            countries ? countries.map((elem, index) => {
              return (
                <option
                  key={index}
                  value={elem && elem.value ? elem.value : elem.pk}
                  disabled={elem && elem.disabled ? elem.disabled : false}
                >
                  {elem.name}
                </option>
              )
            }) :
            null
          }
        </select>
      </div>
    )
  }

  renderStateList = () => {
    const { states } = this.props
    return (
      <div className={'small-12 large-6 columns ' + this.state.stateError}>
        <span className='form-label'>State</span>
        <select
          className='normal-feel'
          onChange={this.handleOnChangeState()}
          value={this.state.state}
          style={styles.selectStyles}
        >
          {
            states ?
              states.map((elem, index) => {
                return (
                  <option
                    key={index}
                    value={elem && elem.value ? elem.value : elem.pk}
                    disabled={elem && elem.disabled ? elem.disabled : false}
                  >
                    {elem.name}
                  </option>
                )
              }) :
              null
          }
        </select>
      </div>
    )
  }

  renderStateInput = () => {
    return (
      <div className={'small-12 large-6 columns ' + this.state.stateError}>
        <span className='form-label'>State</span>
        <input
          type='text'
          className='form-input normal-feel'
          onChange={this.handleOnChange()}
          value={this.state.state}
          disabled={!this.state.country}
        />
      </div>
    )
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
    if (data.country === '') {
      this.setState({ countryError: 'shipping-address-error' })
      val = false
    } else {
      this.setState({ countryError: '' })
    }
    if (data.phone === '') {
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
      addressType: 'shipping',
      sameBillingAndShipping: true,
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
      country,
      phone,
      zipcode,
      nameError,
      addressError,
      cityError,
      phoneError,
      zipcodeError
    } = this.state
    const renderList = country && (country === 'US' || country === 'CA')
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
                {
                  renderList ?
                   this.renderStateList() :
                   this.renderStateInput()
                }
              </div>
              <div className='row'>
                <div className={'small-12 large-6 columns ' + cityError}>
                  <span className='form-label'>City</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                    onChange={this.handleOnChange('city')}
                    value={city}
                  />
                </div>
                <div className={'small-12 large-6 columns ' + zipcodeError}>
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

const mapStateToProps = ({
  currentReader,
  common: {
    countries,
    states
  }
}) => {
  return {
    currentReader,
    countries,
    states
  }
}

const mapDispatchToProps = {
  updateShippingAddress,
  getCountries,
  getStates
}

export default connect(mapStateToProps, mapDispatchToProps)(shippingAddressModal)
