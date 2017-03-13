import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import LeftProfileContainer from './LeftProfileContainer'
import RightProfileContainer from './RightProfileContainer'
import BackgroundImageProfileUpload from './BackgroundImageProfileUpload'
import MyImageProfileUpload from './MyImageProfileUpload'
import { CurrentReader } from '../../redux/actions'

const { getCurrentReader } = CurrentReader

class Profile extends PureComponent {
  componentWillMount = () => {
    this.props.getCurrentReader()
  }

  render() {
    return (
      <div className='row'>
        <BackgroundImageProfileUpload />
        <MyImageProfileUpload />
        <LeftProfileContainer />
        <RightProfileContainer />
      </div>
    )
  }
}

export default connect(null, { getCurrentReader })(Profile)
