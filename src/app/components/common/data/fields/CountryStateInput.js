import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cls from 'classnames'
import R from 'ramda'
import { DropDownListInput, TextFieldInput } from './'
import { Common } from '../../../../redux/actions'

const { getCountries } = Common
const SPECIAL_COUNTRIES = ['US', 'CA']

class CountryStateInput extends PureComponent {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (!this.props.countries) {
      this.props.getCountries()
    }
  }

  ifError = () => {
    return this.props.showError && this.props.errorText !== ''
  }

  wrapperClass = () => {
    return cls(this.props.customClasses || 'small-12 columns')
  }

  isSpecialCountry = (country) => {
    return R.contains(country, SPECIAL_COUNTRIES)
  }

  getStates = () => {
    const { currentState: { country }, countries } = this.props
    if (countries) {
      const el = R.find(R.propEq('pk', country))(countries)
      return el && el.states && el.states.length ? el.states : []
    }
    return []
  }

  render() {
    const {
      currentState: { showErrors, country, state },
      countries
    } = this.props
    return (
      <div className={this.wrapperClass()}>
        <div className='row'>
          <DropDownListInput
            //placeholder='Select your country:'
            customClasses='small-12 medium-6 columns'
            label='Country'
            text={country || ''}
            list={countries || []}
            onFieldChanged={this.props.handleFieldChanged(['country', ['state', '']])}
            errorText={this.props.errorFor('country')}
            showError={showErrors}
          />
          {
            this.isSpecialCountry(country) ? (
              <DropDownListInput
                //placeholder='Select your state:'
                customClasses='small-12 medium-6 columns'
                label='State'
                text={state || ''}
                list={this.getStates()}
                disabled={!country}
                onFieldChanged={this.props.handleFieldChanged(['state'])}
                errorText={this.props.errorFor('state')}
                showError={showErrors}
              />
            ) : (
              <TextFieldInput
                placeholder=''
                customClasses='small-12 medium-6 columns'
                label='State/Province'
                showError={showErrors}
                text={state || ''}
                disabled={!country}
                onFieldChanged={this.props.handleFieldChanged(['state'])}
                errorText={this.props.errorFor('state')}
              />
            )
          }
        </div>
      </div>
    )
  }
}

CountryStateInput.propTypes = {
  customClasses: PropTypes.string,
  currentState: PropTypes.object.isRequired,
  handleFieldChanged: PropTypes.func.isRequired
}

const mapStateToProps = ({
  common: {
    countries
  }
}) => {
  return {
    countries
  }
}

const mapDispatchToProps = {
  getCountries
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryStateInput)
