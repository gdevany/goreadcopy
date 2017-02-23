import React, { PureComponent } from 'react'
import LeftContainer from './LeftContainer'
import MiddleContainer from './MiddleContainer'
import RightContainer from './RightContainer'
import NavMenuLogged from '../common/NavMenuLogged'
import { Auth } from '../../services'

class ReadFeed extends PureComponent {
  componentDidMount = () => {
    // call currentReader endpoint here and pass down the info each container needs.
  }

  render() {
    const isUserLoggedIn = Auth.currentUserExists()

    return (
      <div className='read-feed'>
        <NavMenuLogged isUserLoggedIn={isUserLoggedIn} />
        <div className='row center-text'>
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
