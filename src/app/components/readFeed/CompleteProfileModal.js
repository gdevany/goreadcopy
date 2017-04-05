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
import moment from 'moment'

let countryList, stateList
const { getCountries, getStates } = ProfilePage
const { updateReader } = CurrentReader
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

class CompleteProfileModal extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      gender: '',
      birthdate: '',
      birthdateMonth: '',
      birthdateDay: '',
      birthdateYear: '',
      address1: '',
      city: '',
      country: 0,
      state: '',
      zipcode: '',
      profession: '',
      genderError: false,
      birthdateMonthError: false,
      birthdateDayError: false,
      birthdateYearError: false,
      address1Error: '',
      cityError: '',
      countryError: false,
      stateInputError: '',
      stateListError: false,
      zipcodeError: '',
      professionError: '',
      isContentRenderList: false,
      isContentRenderInput: true,
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleCompleteSubmit = this.handleCompleteSubmit.bind(this)
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.currentReader.firstName || nextProps.currentReader.socialaccounts) {
      const momentDate = moment(nextProps.currentReader.birthdate, 'YYYY-MM-DD')

      this.setState({
        gender: nextProps.currentReader.gender,
        birthdate: nextProps.currentReader.birthdate,
        birthdateMonth: momentDate.format('MMMM'),
        birthdateDay: momentDate.format('DD'),
        birthdateYear: momentDate.format('YYYY'),
        address1: (nextProps.currentReader.address1 || ''),
        city: (nextProps.currentReader.city || ''),
        state: (nextProps.currentReader.state || ''),
        country: (nextProps.currentReader.country || 0),
        zipcode: (nextProps.currentReader.zipcode || ''),
        profession: (nextProps.currentReader.profession || ''),
      })
    }
  }

  handleOnChange = R.curry((field, e) => {

    e.preventDefault()
    if (field === 'gender') {
      this.setState({
        gender: (e.target.innerText === 'Male' ? 'M' : 'F'),
        genderError: false,
      })
    }

    if (field === 'birthdateDay' || field === 'birthdateMonth' ||
      field === 'birthdateYear') {
      this.setState({
        [field]: e.target.innerText,
        [field + 'Error']: false,
      })
    }

    if (field !== 'gender' && field !== 'birthdateDay' &&
      field !== 'birthdateMonth' && field !== 'birthdateYear') {

      this.setState({ [field]: e.target.value })

    }
  })

  handleOnChangeCountry = R.curry((e, index, value) => {
    e.preventDefault()
    if (value) {
      this.setState({
        country: value,
        countryError: false,
      })
      getStates(value)
        .then(res => this.displayStateList(res))
    }
  })

  handleOnChangeState = R.curry((e, index, value) => {
    e.preventDefault()
    this.setState({
      state: value,
      stateError: false,
    })
  })

  handleRenderCountry = () => {
    getCountries()
      .then(res => this.displayCountryList(res))

    return (
      <div className='small-12 large-8 columns '>
        <span className='form-label'>Country</span>
        <SelectField
          onChange={this.handleOnChangeCountry()}
          value={this.state.country}
          style={styles.selectStyles}
          errorText={this.state.countryError && 'Please select an option'}
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

  renderStateList = () => {
    return (
      <div className='small-12 large-8 columns '>
        <span className='form-label'>State</span>
        <SelectField
          onChange={this.handleOnChangeState()}
          value={this.state.state}
          style={styles.selectStyles}
          errorText={this.state.stateListError}
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

  renderStateInput = () => {
    return (
      <div className={'small-12 large-3 columns ' + this.state.stateInputError}>
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
    if (data.gender === '') {
      this.setState({ genderError: true })
      val = false
    } else {
      this.setState({ genderError: false })
    }
    if (data.birthdate === 'Invalid date') {
      this.setState({
        birthdateYearError: true,
        birthdateMonthError: true,
        birthdateDayError: true,
      })
      val = false
    } else {
      this.setState({
        birthdateYearError: false,
        birthdateMonthError: false,
        birthdateDayError: false,
      })
    }
    if (data.address1 === '') {
      this.setState({ address1Error: 'profile-error' })
      val = false
    } else {
      this.setState({ address1Error: '' })
    }
    if (data.profession === '') {
      this.setState({ professionError: 'profile-error' })
      val = false
    }
    if (data.country === 0) {
      this.setState({ countryError: true })
      val = false
    } else {
      this.setState({ countryError: false })
    }
    if (data.state === '') {
      this.setState({ stateInputError: 'profile-error' })
      val = false
    } else {
      this.setState({ stateInputError: '' })
    }
    if (data.state === 0) {
      this.setState({ stateListError: true })
      val = false
    } else {
      this.setState({ stateListError: false })
    }
    if (data.city === '') {
      this.setState({ cityError: 'shipping-address-error' })
      val = false
    } else {
      this.setState({ cityError: '' })
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
      gender,
      birthdateYear,
      birthdateMonth,
      birthdateDay,
      address1,
      city,
      state,
      country,
      zipcode,
      profession
    } = this.state

    let readerData = {}
    if (birthdateYear || birthdateMonth || birthdateDay) {
      const monthName = moment().month(birthdateMonth).format('M')
      const fullDate = moment(`${birthdateYear}-${monthName}-${birthdateDay}`, 'YYYY-MM-DD')
      readerData = {
        gender,
        birthdate: fullDate.format('YYYY-MM-DD') ? fullDate.format('YYYY-MM-DD') : '',
        address1,
        city,
        state,
        country,
        zipcode,
        profession,
        context: 'readfeed',
      }
    } else {
      readerData = {
        gender,
        address1,
        city,
        state,
        country,
        zipcode,
        profession,
        context: 'readfeed'
      }
    }
    if (this.handleValidation(readerData) === true) {
      this.props.updateReader(readerData)
      this.props.handleClose()
    }
  }

  renderSettings = () => {
    const {
      gender,
      birthdateMonth,
      birthdateDay,
      birthdateYear,
      address1,
      city,
      zipcode,
      profession,
      genderError,
      birthdateMonthError,
      birthdateDayError,
      birthdateYearError,
      address1Error,
      cityError,
      zipcodeError,
      professionError,
      isContentRenderList,
      isContentRenderInput,
    } = this.state
    return (
      <article className='settings-single-tab-content small-10 columns small-centered'>
        <div className='profile-editor-section-container'>
          <div className='profile-editor-form-container'>
            <form className='profile-editor-form'>
              <div className='row'>
                <div className={'small-12 large-6 columns ' + genderError}>
                  <span className='form-label'>Gender</span>
                  <SelectField
                    onChange={this.handleOnChange('gender')}
                    value={gender}
                    style={styles.selectStyles}
                    errorText={genderError && 'Please fill in the blanks'}
                  >
                    <MenuItem value='M' primaryText='Male' />
                    <MenuItem value='F' primaryText='Female' />
                  </SelectField>
                </div>
              </div>
              <div className='row'>
                <div className='small-12 columns '>
                  <span className='form-label'>Your Birthday</span>
                </div>
                <div className='small-12 large-4 columns '>
                  <SelectField
                    floatingLabelText='Month'
                    value={birthdateMonth}
                    onChange={this.handleOnChange('birthdateMonth')}
                    style={styles.selectStyles}
                    errorText={birthdateMonthError && 'Please fill in the blanks'}
                  >
                    <MenuItem value='January' primaryText='January' />
                    <MenuItem value='February' primaryText='February' />
                    <MenuItem value='March' primaryText='March' />
                    <MenuItem value='April' primaryText='April' />
                    <MenuItem value='May' primaryText='May' />
                    <MenuItem value='June' primaryText='June' />
                    <MenuItem value='July' primaryText='July' />
                    <MenuItem value='August' primaryText='August' />
                    <MenuItem value='September' primaryText='September' />
                    <MenuItem value='October' primaryText='October' />
                    <MenuItem value='November' primaryText='November' />
                    <MenuItem value='December' primaryText='December' />
                  </SelectField>
                </div>
                <div className='small-12 large-4 columns '>
                  <SelectField
                    floatingLabelText='Day'
                    value={birthdateDay}
                    onChange={this.handleOnChange('birthdateDay')}
                    style={styles.selectStyles}
                    errorText={birthdateDayError && 'Please fill in the blanks'}
                  >
                    <MenuItem value='01' primaryText='01' />
                    <MenuItem value='02' primaryText='02' />
                    <MenuItem value='03' primaryText='03' />
                    <MenuItem value='04' primaryText='04' />
                    <MenuItem value='05' primaryText='05' />
                    <MenuItem value='06' primaryText='06' />
                    <MenuItem value='07' primaryText='07' />
                    <MenuItem value='08' primaryText='08' />
                    <MenuItem value='09' primaryText='09' />
                    <MenuItem value='10' primaryText='10' />
                    <MenuItem value='11' primaryText='11' />
                    <MenuItem value='12' primaryText='12' />
                    <MenuItem value='13' primaryText='13' />
                    <MenuItem value='14' primaryText='14' />
                    <MenuItem value='15' primaryText='15' />
                    <MenuItem value='16' primaryText='16' />
                    <MenuItem value='17' primaryText='17' />
                    <MenuItem value='18' primaryText='18' />
                    <MenuItem value='19' primaryText='19' />
                    <MenuItem value='20' primaryText='20' />
                    <MenuItem value='21' primaryText='21' />
                    <MenuItem value='22' primaryText='22' />
                    <MenuItem value='23' primaryText='23' />
                    <MenuItem value='24' primaryText='24' />
                    <MenuItem value='25' primaryText='25' />
                    <MenuItem value='26' primaryText='26' />
                    <MenuItem value='27' primaryText='27' />
                    <MenuItem value='28' primaryText='28' />
                    <MenuItem value='29' primaryText='29' />
                    <MenuItem value='30' primaryText='30' />
                    <MenuItem value='31' primaryText='31' />
                  </SelectField>
                </div>
                <div className='small-12 large-4 columns '>
                  <SelectField
                    floatingLabelText='Year'
                    value={birthdateYear}
                    onChange={this.handleOnChange('birthdateYear')}
                    style={styles.selectStyles}
                    errorText={birthdateYearError && 'Please fill in the blanks'}
                  >
                    <MenuItem value='1910' primaryText='1910' />
                    <MenuItem value='1911' primaryText='1911' />
                    <MenuItem value='1912' primaryText='1912' />
                    <MenuItem value='1913' primaryText='1913' />
                    <MenuItem value='1914' primaryText='1914' />
                    <MenuItem value='1915' primaryText='1915' />
                    <MenuItem value='1916' primaryText='1916' />
                    <MenuItem value='1917' primaryText='1917' />
                    <MenuItem value='1918' primaryText='1918' />
                    <MenuItem value='1919' primaryText='1919' />
                    <MenuItem value='1920' primaryText='1920' />
                    <MenuItem value='1921' primaryText='1921' />
                    <MenuItem value='1922' primaryText='1922' />
                    <MenuItem value='1923' primaryText='1923' />
                    <MenuItem value='1924' primaryText='1924' />
                    <MenuItem value='1925' primaryText='1925' />
                    <MenuItem value='1926' primaryText='1926' />
                    <MenuItem value='1927' primaryText='1927' />
                    <MenuItem value='1928' primaryText='1928' />
                    <MenuItem value='1929' primaryText='1929' />
                    <MenuItem value='1930' primaryText='1930' />
                    <MenuItem value='1931' primaryText='1931' />
                    <MenuItem value='1932' primaryText='1932' />
                    <MenuItem value='1933' primaryText='1933' />
                    <MenuItem value='1934' primaryText='1934' />
                    <MenuItem value='1935' primaryText='1935' />
                    <MenuItem value='1936' primaryText='1936' />
                    <MenuItem value='1937' primaryText='1937' />
                    <MenuItem value='1938' primaryText='1938' />
                    <MenuItem value='1939' primaryText='1939' />
                    <MenuItem value='1940' primaryText='1940' />
                    <MenuItem value='1941' primaryText='1941' />
                    <MenuItem value='1942' primaryText='1942' />
                    <MenuItem value='1943' primaryText='1943' />
                    <MenuItem value='1944' primaryText='1944' />
                    <MenuItem value='1945' primaryText='1945' />
                    <MenuItem value='1946' primaryText='1946' />
                    <MenuItem value='1947' primaryText='1947' />
                    <MenuItem value='1948' primaryText='1948' />
                    <MenuItem value='1949' primaryText='1949' />
                    <MenuItem value='1950' primaryText='1950' />
                    <MenuItem value='1951' primaryText='1951' />
                    <MenuItem value='1952' primaryText='1952' />
                    <MenuItem value='1953' primaryText='1953' />
                    <MenuItem value='1954' primaryText='1954' />
                    <MenuItem value='1955' primaryText='1955' />
                    <MenuItem value='1956' primaryText='1956' />
                    <MenuItem value='1957' primaryText='1957' />
                    <MenuItem value='1958' primaryText='1958' />
                    <MenuItem value='1959' primaryText='1959' />
                    <MenuItem value='1960' primaryText='1960' />
                    <MenuItem value='1961' primaryText='1961' />
                    <MenuItem value='1962' primaryText='1962' />
                    <MenuItem value='1963' primaryText='1963' />
                    <MenuItem value='1964' primaryText='1964' />
                    <MenuItem value='1965' primaryText='1965' />
                    <MenuItem value='1966' primaryText='1966' />
                    <MenuItem value='1967' primaryText='1967' />
                    <MenuItem value='1968' primaryText='1968' />
                    <MenuItem value='1969' primaryText='1969' />
                    <MenuItem value='1970' primaryText='1970' />
                    <MenuItem value='1971' primaryText='1971' />
                    <MenuItem value='1972' primaryText='1972' />
                    <MenuItem value='1973' primaryText='1973' />
                    <MenuItem value='1974' primaryText='1974' />
                    <MenuItem value='1975' primaryText='1975' />
                    <MenuItem value='1976' primaryText='1976' />
                    <MenuItem value='1977' primaryText='1977' />
                    <MenuItem value='1978' primaryText='1978' />
                    <MenuItem value='1979' primaryText='1979' />
                    <MenuItem value='1980' primaryText='1980' />
                    <MenuItem value='1981' primaryText='1981' />
                    <MenuItem value='1982' primaryText='1982' />
                    <MenuItem value='1983' primaryText='1983' />
                    <MenuItem value='1984' primaryText='1984' />
                    <MenuItem value='1985' primaryText='1985' />
                    <MenuItem value='1986' primaryText='1986' />
                    <MenuItem value='1987' primaryText='1987' />
                    <MenuItem value='1988' primaryText='1988' />
                    <MenuItem value='1989' primaryText='1989' />
                    <MenuItem value='1990' primaryText='1990' />
                    <MenuItem value='1991' primaryText='1991' />
                    <MenuItem value='1992' primaryText='1992' />
                    <MenuItem value='1993' primaryText='1993' />
                    <MenuItem value='1994' primaryText='1994' />
                    <MenuItem value='1995' primaryText='1995' />
                    <MenuItem value='1996' primaryText='1996' />
                    <MenuItem value='1997' primaryText='1997' />
                    <MenuItem value='1998' primaryText='1998' />
                    <MenuItem value='1999' primaryText='1999' />
                    <MenuItem value='2000' primaryText='2000' />
                    <MenuItem value='2001' primaryText='2001' />
                    <MenuItem value='2002' primaryText='2002' />
                    <MenuItem value='2003' primaryText='2003' />
                    <MenuItem value='2004' primaryText='2004' />
                    <MenuItem value='2005' primaryText='2005' />
                    <MenuItem value='2006' primaryText='2006' />
                    <MenuItem value='2007' primaryText='2007' />
                    <MenuItem value='2008' primaryText='2008' />
                    <MenuItem value='2009' primaryText='2009' />
                    <MenuItem value='2010' primaryText='2010' />
                    <MenuItem value='2011' primaryText='2011' />
                    <MenuItem value='2012' primaryText='2012' />
                    <MenuItem value='2013' primaryText='2013' />
                    <MenuItem value='2014' primaryText='2014' />
                    <MenuItem value='2015' primaryText='2015' />
                    <MenuItem value='2016' primaryText='2016' />
                    <MenuItem value='2017' primaryText='2017' />
                  </SelectField>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='profile-editor-section-container'>
          <h4 className='profile-editor-section-title' >Address</h4>
          <div className='shipping-form-container'>
            <form className='shipping-form' action=''>
              <div className='row'>
                <div className={'small-12 columns ' + address1Error}>
                  <span className='form-label'>Address Line 1</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                    onChange={this.handleOnChange('address1')}
                    value={address1}
                  />
                </div>
                <div className={'small-12 columns ' + professionError}>
                  <span className='form-label'>What is your occupation?</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                    onChange={this.handleOnChange('profession')}
                    value={profession}
                  />
                </div>
              </div>
              <div className='row'>
                {this.handleRenderCountry()}
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
              <div className='row'>
                {isContentRenderList ? this.renderStateList() : null}
                {isContentRenderInput ? this.renderStateInput() : null}
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
              <div
                className='profile-editor-save-btn-container'
                style={styles.submitButton}
              >
                <PrimaryButton
                  label='Submit & earn 5.000 Litcoins'
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
          bodyClassName='complete-profile-modal'
          modal={true}
          open={modalOpen}
          onRequestClose={handleClose}
          autoScrollBodyContent={true}
        >
          <img
            src='./image/close.png'
            className='general-font center-text search-modal-x'
            onClick={handleClose}
          />
          <div className='complete-profile-modal-container row'>
            <div className='small-12 columns'>
              <div className='row'>
                <div className='center-text small-8 collumns small-centered'>
                  <h2 className='searchbooks-readfeeed-title'>Tell us more about yourself</h2>
                  <h4 className='searchbooks-readfeeed-subtitle'>
                    We do not share this information on the site
                  </h4>
                </div>
                {this.renderSettings()}
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
  updateReader,
}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteProfileModal)
