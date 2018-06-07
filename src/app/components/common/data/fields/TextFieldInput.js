import React from 'react'
import { OptionalDisplay } from '../utils'
import PropTypes from 'prop-types'
import cls from 'classnames'

export default class TextField extends React.Component {

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

  render() {
    return (
      <div className={this.wrapperClass()}>
        {
          this.props.label ?
            <span className='form-label'>{this.props.label}</span> :
            null
        }
        {
          this.props.hint ?
            <span className='form-hint'>{this.props.hint}</span> :
            null
        }
        <input
          type={this.props.type || 'text'}
          placeholder={this.props.placeholder}
          value={this.props.text}
          onChange={this.props.onFieldChanged}
          disabled={this.props.disabled}
          className={this.props.fieldClasses}
        />
        <OptionalDisplay display={this.ifError()}>
          <div className='validation-error message'>
            <span className='text'>{this.props.errorText}</span>
          </div>
        </OptionalDisplay>
      </div>
    )
  }
}

TextField.propTypes = {
  label: PropTypes.string,
  hint: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
  customClasses: PropTypes.string,
  fieldClasses: PropTypes.string,
  showError: PropTypes.bool.isRequired,
  onFieldChanged: PropTypes.func.isRequired,
}
