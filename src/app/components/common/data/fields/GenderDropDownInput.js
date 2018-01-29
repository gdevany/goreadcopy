import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { DropDownListInput } from './'

const genderList = [
  { pk: 'M', name: 'Male' },
  { pk: 'F', name: 'Female' }
]

class GenderDropDownInput extends PureComponent {

  constructor(props) {
    super(props)
  }

  ifError = () => {
    return this.props.showError && this.props.errorText !== ''
  }

  wrapperClass = () => {
    return cls(this.props.customClasses || 'small-12 columns')
  }

  render() {
    const { currentState, fields: { gender } } = this.props
    const { showErrors } = currentState
    return (
      <DropDownListInput
        placeholder=' --- '
        customClasses={this.wrapperClass()}
        label='Gender'
        text={currentState[gender] || ''}
        list={genderList || []}
        onFieldChanged={this.props.handleFieldChanged([gender])}
        errorText={this.props.errorFor(gender)}
        showError={showErrors}
      />
    )
  }
}

GenderDropDownInput.propTypes = {
  customClasses: PropTypes.string,
  currentState: PropTypes.object.isRequired,
  handleFieldChanged: PropTypes.func.isRequired,
  errorFor: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
}

export default GenderDropDownInput
