import React from 'react'
import PropTypes from 'prop-types'

class OptionallyDisplayed extends React.Component {
  render() {
    return this.props.display ?
      <div>{this.props.children}</div> :
      null
  }
}

OptionallyDisplayed.propTypes = {
  display: PropTypes.bool.isRequired
}

export default OptionallyDisplayed
