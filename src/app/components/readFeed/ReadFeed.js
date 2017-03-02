import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import LeftContainer from './LeftContainer'
import MiddleContainer from './MiddleContainer'
import RightContainer from './RightContainer'
import NavMenu from '../common/NavMenu'
import { Auth } from '../../services'
import { CurrentReader } from '../../redux/actions'

const { getCurrentReader } = CurrentReader

class ReadFeed extends PureComponent {
  componentWillMount = () => {
    this.props.getCurrentReader()
  }

  render() {
    const isUserLoggedIn = Auth.currentUserExists()

    return (
      <div className=''>
        <NavMenu isUserLoggedIn={isUserLoggedIn} />
        <div className='row center-text read-feed'>
          {/** pass down backgroundImage and profileImage prop to Left Container**/}
          <LeftContainer isUserLoggedIn={isUserLoggedIn} />
          <MiddleContainer isUserLoggedIn={isUserLoggedIn} />
          <RightContainer isUserLoggedIn={isUserLoggedIn} />
        </div>
      </div>
    )
  }
}

export default connect(null, { getCurrentReader })(ReadFeed)
