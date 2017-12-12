import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Dialog } from 'material-ui'
import { Colors } from '../../constants/style'
import { CurrentReader, Common } from '../../redux/actions'
import PrimaryButton from '../common/PrimaryButton'
import R from 'ramda'
import moment from 'moment'

const { getCountries, getStates } = Common
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
    const {
      gender, birthdate, address1,
      city, state, country, zipcode,
      profession
    } = props && props.currentReader ? props.currentReader : {}
    const frmBirthdate = birthdate ? moment(birthdate, 'YYYY-MM-DD') : null

    this.state = {
      gender: gender || '',
      birthdate: birthdate || '',
      birthdateMonth: frmBirthdate ? frmBirthdate.format('MMMM') : '',
      birthdateDay: frmBirthdate ? frmBirthdate.format('DD') : '',
      birthdateYear: frmBirthdate ? frmBirthdate.format('YYYY') : '',
      address1: address1 || '',
      city: city || '',
      country: country || '',
      state: state || '',
      zipcode: zipcode || '',
      profession: profession || '',
      genderError: false,
      birthdateMonthError: false,
      birthdateDayError: false,
      birthdateYearError: false,
      address1Error: '',
      cityError: '',
      countryError: '',
      stateInputError: '',
      stateListError: false,
      zipcodeError: '',
      professionError: '',
      isContentRenderList: false,
      isContentRenderInput: true,
    }
  }

  handleOnChange = R.curry((field, e) => {
    e.preventDefault()
    this.setState({
      [field]: e.target.value,
      [field + 'Error']: false
    })
  })

  handleOnChangeCountry = R.curry((e) => {
    if (e) { e.preventDefault() }
    this.setState({
      country: e.target.value,
      countryError: '',
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
      stateInputError: '',
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
          <option key='-1' value=''> Select your country: </option>
          {
            countries ? countries.map((data, index) => {
              return (
                <option key={data.pk} value={data.pk}>
                  {data.name}
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
      <div className={'small-12 large-6 columns ' + this.state.stateInputError}>
        <span className='form-label'>State</span>
        <select
          className='normal-feel'
          onChange={this.handleOnChangeState()}
          value={this.state.state}
          style={styles.selectStyles}
        >
          <option key='-1' value={''}> Select a State: </option>
          {
            states ?
              states.map((data, index) => {
                return (
                  <option key={data.pk} value={data.pk}>
                    {data.name}
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
      <div className={'small-12 large-6 columns ' + this.state.stateInputError}>
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
    if (data.country === '') {
      this.setState({ countryError: 'profile-error' })
      val = false
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
      country,
      zipcode,
      profession,
      genderError,
      address1Error,
      cityError,
      zipcodeError,
      professionError,
    } = this.state
    const renderList = country && (country === 'US' || country === 'CA')
    return (
      <article className='settings-single-tab-content small-10 columns small-centered'>
        <div className='profile-editor-section-container'>
          <div className='profile-editor-form-container'>
            <form className='profile-editor-form'>
              <div className='row'>
                <div className={'small-12 large-6 columns ' + genderError}>
                  <span className='form-label'>Gender</span>
                  <select
                    className='normal-feel'
                    onChange={this.handleOnChange('gender')}
                    value={gender}
                    style={styles.selectStyles}
                  >
                    <option value='M'>
                      Male
                    </option>
                    <option value='F'>
                      Female
                    </option>
                  </select>
                </div>
              </div>
              <div className='row'>
                <div className='small-12 columns '>
                  <span className='form-label'>Your Birthday</span>
                </div>
                <div className='small-12 large-4 columns '>
                  <span className='form-label'>Month</span>
                  <select
                    className='normal-feel'
                    value={birthdateMonth}
                    onChange={this.handleOnChange('birthdateMonth')}
                    style={styles.selectStyles}
                  >
                    <option value='January'>
                      January
                    </option>
                    <option value='February'>
                      February
                    </option>
                    <option value='March'>
                      March
                    </option>
                    <option value='April'>
                      April
                    </option>
                    <option value='May'>
                      May
                    </option>
                    <option value='June'>
                      June
                    </option>
                    <option value='July'>
                      July
                    </option>
                    <option value='August'>
                      August
                    </option>
                    <option value='September'>
                      September
                    </option>
                    <option value='October'>
                      October
                    </option>
                    <option value='November'>
                      November
                    </option>
                    <option value='December'>
                      December
                    </option>
                  </select>
                </div>
                <div className='small-12 large-4 columns '>
                  <span className='form-label'>Day</span>
                  <select
                    className='normal-feel'
                    value={birthdateDay}
                    onChange={this.handleOnChange('birthdateDay')}
                    style={styles.selectStyles}
                  >
                    <option value='01'>
                      01
                    </option>
                    <option value='02'>
                      02
                    </option>
                    <option value='03'>
                      03
                    </option>
                    <option value='04'>
                      04
                    </option>
                    <option value='05'>
                      05
                    </option>
                    <option value='06'>
                      06
                    </option>
                    <option value='07'>
                      07
                    </option>
                    <option value='08'>
                      08
                    </option>
                    <option value='09'>
                      09
                    </option>
                    <option value='10'>
                      10
                    </option>
                    <option value='11'>
                      11
                    </option>
                    <option value='12'>
                      12
                    </option>
                    <option value='13'>
                      13
                    </option>
                    <option value='14'>
                      14
                    </option>
                    <option value='15'>
                      15
                    </option>
                    <option value='16'>
                      16
                    </option>
                    <option value='17'>
                      17
                    </option>
                    <option value='18'>
                      18
                    </option>
                    <option value='19'>
                      19
                    </option>
                    <option value='20'>
                      20
                    </option>
                    <option value='21'>
                      21
                    </option>
                    <option value='22'>
                      22
                    </option>
                    <option value='23'>
                      23
                    </option>
                    <option value='24'>
                      24
                    </option>
                    <option value='25'>
                      25
                    </option>
                    <option value='26'>
                      26
                    </option>
                    <option value='27'>
                      27
                    </option>
                    <option value='28'>
                      28
                    </option>
                    <option value='29'>
                      29
                    </option>
                    <option value='30'>
                      30
                    </option>
                    <option value='31'>
                      31
                    </option>
                  </select>
                </div>
                <div className='small-12 large-4 columns '>
                  <span className='form-label'>Year</span>
                  <select
                    className='normal-feel'
                    value={birthdateYear}
                    onChange={this.handleOnChange('birthdateYear')}
                    style={styles.selectStyles}
                  >
                    <option value='1910'>
                      1910
                    </option>
                    <option value='1911'>
                      1911
                    </option>
                    <option value='1912'>
                      1912
                    </option>
                    <option value='1913'>
                      1913
                    </option>
                    <option value='1914'>
                      1914
                    </option>
                    <option value='1915'>
                      1915
                    </option>
                    <option value='1916'>
                      1916
                    </option>
                    <option value='1917'>
                      1917
                    </option>
                    <option value='1918'>
                      1918
                    </option>
                    <option value='1919'>
                      1919
                    </option>
                    <option value='1920'>
                      1920
                    </option>
                    <option value='1921'>
                      1921
                    </option>
                    <option value='1922'>
                      1922
                    </option>
                    <option value='1923'>
                      1923
                    </option>
                    <option value='1924'>
                      1924
                    </option>
                    <option value='1925'>
                      1925
                    </option>
                    <option value='1926'>
                      1926
                    </option>
                    <option value='1927'>
                      1927
                    </option>
                    <option value='1928'>
                      1928
                    </option>
                    <option value='1929'>
                      1929
                    </option>
                    <option value='1930'>
                      1930
                    </option>
                    <option value='1931'>
                      1931
                    </option>
                    <option value='1932'>
                      1932
                    </option>
                    <option value='1933'>
                      1933
                    </option>
                    <option value='1934'>
                      1934
                    </option>
                    <option value='1935'>
                      1935
                    </option>
                    <option value='1936'>
                      1936
                    </option>
                    <option value='1937'>
                      1937
                    </option>
                    <option value='1938'>
                      1938
                    </option>
                    <option value='1939'>
                      1939
                    </option>
                    <option value='1940'>
                      1940
                    </option>
                    <option value='1941'>
                      1941
                    </option>
                    <option value='1942'>
                      1942
                    </option>
                    <option value='1943'>
                      1943
                    </option>
                    <option value='1944'>
                      1944
                    </option>
                    <option value='1945'>
                      1945
                    </option>
                    <option value='1946'>
                      1946
                    </option>
                    <option value='1947'>
                      1947
                    </option>
                    <option value='1948'>
                      1948
                    </option>
                    <option value='1949'>
                      1949
                    </option>
                    <option value='1950'>
                      1950
                    </option>
                    <option value='1951'>
                      1951
                    </option>
                    <option value='1952'>
                      1952
                    </option>
                    <option value='1953'>
                      1953
                    </option>
                    <option value='1954'>
                      1954
                    </option>
                    <option value='1955'>
                      1955
                    </option>
                    <option value='1956'>
                      1956
                    </option>
                    <option value='1957'>
                      1957
                    </option>
                    <option value='1958'>
                      1958
                    </option>
                    <option value='1959'>
                      1959
                    </option>
                    <option value='1960'>
                      1960
                    </option>
                    <option value='1961'>
                      1961
                    </option>
                    <option value='1962'>
                      1962
                    </option>
                    <option value='1963'>
                      1963
                    </option>
                    <option value='1964'>
                      1964
                    </option>
                    <option value='1965'>
                      1965
                    </option>
                    <option value='1966'>
                      1966
                    </option>
                    <option value='1967'>
                      1967
                    </option>
                    <option value='1968'>
                      1968
                    </option>
                    <option value='1969'>
                      1969
                    </option>
                    <option value='1970'>
                      1970
                    </option>
                    <option value='1971'>
                      1971
                    </option>
                    <option value='1972'>
                      1972
                    </option>
                    <option value='1973'>
                      1973
                    </option>
                    <option value='1974'>
                      1974
                    </option>
                    <option value='1975'>
                      1975
                    </option>
                    <option value='1976'>
                      1976
                    </option>
                    <option value='1977'>
                      1977
                    </option>
                    <option value='1978'>
                      1978
                    </option>
                    <option value='1979'>
                      1979
                    </option>
                    <option value='1980'>
                      1980
                    </option>
                    <option value='1981'>
                      1981
                    </option>
                    <option value='1982'>
                      1982
                    </option>
                    <option value='1983'>
                      1983
                    </option>
                    <option value='1984'>
                      1984
                    </option>
                    <option value='1985'>
                      1985
                    </option>
                    <option value='1986'>
                      1986
                    </option>
                    <option value='1987'>
                      1987
                    </option>
                    <option value='1988'>
                      1988
                    </option>
                    <option value='1989'>
                      1989
                    </option>
                    <option value='1990'>
                      1990
                    </option>
                    <option value='1991'>
                      1991
                    </option>
                    <option value='1992'>
                      1992
                    </option>
                    <option value='1993'>
                      1993
                    </option>
                    <option value='1994'>
                      1994
                    </option>
                    <option value='1995'>
                      1995
                    </option>
                    <option value='1996'>
                      1996
                    </option>
                    <option value='1997'>
                      1997
                    </option>
                    <option value='1998'>
                      1998
                    </option>
                    <option value='1999'>
                      1999
                    </option>
                    <option value='2000'>
                      2000
                    </option>
                    <option value='2001'>
                      2001
                    </option>
                    <option value='2002'>
                      2002
                    </option>
                    <option value='2003'>
                      2003
                    </option>
                    <option value='2004'>
                      2004
                    </option>
                    <option value='2005'>
                      2005
                    </option>
                    <option value='2006'>
                      2006
                    </option>
                    <option value='2007'>
                      2007
                    </option>
                    <option value='2008'>
                      2008
                    </option>
                    <option value='2009'>
                      2009
                    </option>
                    <option value='2010'>
                      2010
                    </option>
                    <option value='2011'>
                      2011
                    </option>
                    <option value='2012'>
                      2012
                    </option>
                    <option value='2013'>
                      2013
                    </option>
                    <option value='2014'>
                      2014
                    </option>
                    <option value='2015'>
                      2015
                    </option>
                    <option value='2016'>
                      2016
                    </option>
                    <option value='2017'>
                      2017
                    </option>
                  </select>
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
  updateReader,
  getCountries,
  getStates
}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteProfileModal)
