import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import SignUpStepper from './SignUpStepper'

class SignUpFlow extends PureComponent {
  render() {
    const { userData } = this.props

    return (
      <div>
        <SignUpStepper />
      </div>
    )
  }
}

const mapStateToProps = ({ userData }) => {
  return { userData }
}
export default connect(mapStateToProps)(SignUpFlow)
