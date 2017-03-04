import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import LeftContainer from './LeftContainer'
import MiddleContainer from './MiddleContainer'
import RightContainer from './RightContainer'
import NavMenuLogged from '../common/NavMenuLogged'
import { CurrentReader } from '../../redux/actions'
import { Auth } from '../../services'

const { getCurrentReader } = CurrentReader

class ReadFeed extends PureComponent {
  componentWillMount = () => {
    this.props.getCurrentReader()
  }

  render() {
    const isUserLoggedIn = Auth.currentUserExists()
    return (
      <div className=''>
        <NavMenuLogged isUserLoggedIn={isUserLoggedIn} />
        <div className='row center-text read-feed'>
          {/** pass down backgroundImage and profileImage prop to Left Container**/}
          <LeftContainer/>
          <MiddleContainer />
          <RightContainer />
        </div>
      </div>
    )
  }
}

export default connect(null, { getCurrentReader })(ReadFeed)
