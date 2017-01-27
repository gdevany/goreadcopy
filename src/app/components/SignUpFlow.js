import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'

class SignUpFlow extends PureComponent {
  render() {
    const { userData, books } = this.props
    console.log(userData, books)

    return (
      <div>
      HI THERE
    fds
      </div>
    )
  }
}

const mapStateToProps = ({ userData, books }) => {
  return { userData, books }
}
export default connect(mapStateToProps)(SignUpFlow)
