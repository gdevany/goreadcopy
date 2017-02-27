import React, { PureComponent } from 'react'
import LeftContainer from './LeftContainer'
import MiddleContainer from './MiddleContainer'
import RightContainer from './RightContainer'
import NavMenu from '../common/NavMenu'
import { Auth } from '../../services'

class ReadFeed extends PureComponent {
  componentDidMount = () => {
    // call currentReader endpoint here and pass down the info each container needs.
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

export default ReadFeed
