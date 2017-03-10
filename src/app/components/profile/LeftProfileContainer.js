import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import FollowProfile from './FollowProfile'

class LeftProfileContainer extends PureComponent {
  render() {
    const { id } = this.props
    return (
      <div className='right-container small-6 columns'>
        { id ? <FollowProfile id={id} /> : null}
      </div>
    )
  }
}

const mapStateToProps = ({
  currentReader: {
    id
  }
}) => {
  return {
    id
  }
}

export default connect(mapStateToProps)(LeftProfileContainer)
