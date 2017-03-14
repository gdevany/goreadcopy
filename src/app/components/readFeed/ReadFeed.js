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
    const { isMyReadFeed } = this.props
    const isUserLoggedIn = Auth.currentUserExists()
    return (
      <div className=''>
        <NavMenu isUserLoggedIn={isUserLoggedIn} />
        <div className='row center-text read-feed'>
          <LeftContainer isMyReadFeed={isMyReadFeed}/>
          <MiddleContainer />
          <RightContainer />
        </div>
      </div>
    )
  }
}

export default connect(null, { getCurrentReader })(ReadFeed)
