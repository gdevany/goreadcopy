import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'

class SignUpFlow extends PureComponent {
  render() {
    const { userData } = this.props
    console.log(userData, books)

    return (
      <div>
      HI THERE
    fds
      </div>
    )
  }
}

const mapStateToProps = ({ userData }) => {
  return { userData }
}
export default connect(mapStateToProps)(SignUpFlow)
