import React from 'react'
import { OptionalDisplay } from '../utils'
import cls from 'classnames'
import PropTypes from 'prop-types'

class DropDownListInput extends React.Component {

  constructor(props) {
    super(props)
  }

  ifError = () => {
    return this.props.showError && this.props.errorText !== ''
  }

  wrapperClass = () => {
    return cls(
      this.props.customClasses || 'small-12 columns',
      {
        'error': this.ifError()
      }
    )
  }

  constructOptionList = () => {
    const { list } = this.props
    return list && list.length ? list.map((el, idx) => {
      return (
        <option key={idx} value={el.pk} disabled={el.disabled}>
          { el.name }
        </option>
      )
    }) : null
  }

  render() {
    return (
      <div className={this.wrapperClass()}>
        {
          this.props.label ?
            <span className='form-label'>{this.props.label}</span> :
            null
        }
        <select
          value={this.props.text}
          onChange={this.props.onFieldChanged}
          disabled={this.props.disabled}
        >
          {
            this.props.placeholder ? (
              <option value=''>
                { this.props.placeholder }
              </option>
            ) : null
          }
          { this.constructOptionList() }
        </select>
        <OptionalDisplay display={this.ifError()}>
          <div className='validation-error message'>
            <span className='text'>{this.props.errorText}</span>
          </div>
        </OptionalDisplay>
      </div>
    )
  }
}

DropDownListInput.propTypes = {
  showError: PropTypes.bool.isRequired,
  onFieldChanged: PropTypes.func.isRequired
}

export default DropDownListInput
