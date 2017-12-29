import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { DropDownListInput } from './'
import moment from 'moment'

class DateDropdownInput extends PureComponent {

  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    const { fields: { date }, currentState } = this.props
    if (currentState[date] !== this.getDate()) {
      this.props.handleFieldChanged([null, [date, this.getDate()]])(null)
    }
  }

  ifError = () => {
    const { currentState: { showErrors }, fields: { year, month, day } } = this.props
    return showErrors && (
      this.props.errorFor(year) ||
      this.props.errorFor(month) ||
      this.props.errorFor(day)
    )
  }

  wrapperClass = () => {
    return cls(this.props.customClasses || 'small-12 columns',
      {
        'error': this.ifError()
      }
    )
  }

  constructYears = () => {
    const currentYear = moment().year()
    return Array
      .from(Array(currentYear).keys())
      .slice(Math.max(currentYear - 100, 1))
      .map((el, idx) => {
        return {
          pk: (el + 1).toString(),
          name: el + 1
        }
      })
  }

  constructMonths = () => {
    return moment.months().map((el, idx) => {
      const monthNum = idx + 1
      return {
        pk: monthNum < 10 ? `0${monthNum}` : monthNum.toString(),
        name: el
      }
    })
  }

  constructDays = () => {
    const { currentState, fields: { year, month } } = this.props
    const isValid = currentState[year] && currentState[month]
    const noOfDays = isValid ?
      moment(`${currentState[year]}-${currentState[month]}`, 'YYYY-MM').daysInMonth() :
      31
    return Array
      .from(Array(noOfDays).keys())
      .map((el, idx) => {
        const dayNum = idx + 1
        return {
          pk: dayNum < 10 ? `0${dayNum}` : dayNum.toString(),
          name: el + 1
        }
      })
  }

  getDate = () => {
    const { currentState, fields: { year, month, day } } = this.props
    const values = [currentState[year], currentState[month], currentState[day]]
    const areValid = values[0] && values[1] && values[2]
    const dateString = `${values[0]}-${values[1]}-${values[2]}`
    if (areValid && moment(dateString).isValid()) return dateString
    return ''
  }

  render() {
    const { fields: { year, month, day } } = this.props
    return (
      <div className={this.wrapperClass()}>
        {
          this.props.label ?
            <span className={'form-label'}>{this.props.label}</span> :
            null
        }
        <div className='row'>
          <DropDownListInput
            placeholder='----'
            customClasses='small-12 medium-4 columns'
            label={!this.props.hideSubLabels ? 'Year' : ''}
            text={this.props.currentState[year] || ''}
            list={this.constructYears() || []}
            onFieldChanged={this.props.handleFieldChanged([year, [day, '']])}
            errorText={this.props.errorFor(year)}
            showError={this.props.currentState.showErrors}
          />
          <DropDownListInput
            placeholder='----'
            customClasses='small-12 medium-4 columns'
            label={!this.props.hideSubLabels ? 'Month' : ''}
            text={this.props.currentState[month] || ''}
            list={this.constructMonths() || []}
            onFieldChanged={this.props.handleFieldChanged([month, [day, '']])}
            errorText={this.props.errorFor(month)}
            showError={this.props.currentState.showErrors}
          />
          <DropDownListInput
            placeholder='----'
            customClasses='small-12 medium-4 columns'
            label={!this.props.hideSubLabels ? 'Day' : ''}
            text={this.props.currentState[day] || ''}
            list={this.constructDays() || []}
            onFieldChanged={this.props.handleFieldChanged([day])}
            errorText={this.props.errorFor(day)}
            showError={this.props.currentState.showErrors}
          />
        </div>
      </div>
    )
  }
}

DateDropdownInput.propTypes = {
  customClasses: PropTypes.string,
  currentState: PropTypes.object.isRequired,
  errorFor: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  handleFieldChanged: PropTypes.func.isRequired,
  hideSubLabels: PropTypes.bool,
  label: PropTypes.string,
}

DateDropdownInput.defaultProps = {
  hideSubLabels: false
}

export default DateDropdownInput
