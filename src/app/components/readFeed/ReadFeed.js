import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import LeftContainer from './LeftContainer'
import MiddleContainer from './MiddleContainer'
import RightContainer from './RightContainer'
import { NavMenu, SocketHandler, Chat } from '../common'
import { Auth } from '../../services'
import { CurrentReader } from '../../redux/actions'

const { getCurrentReader } = CurrentReader
const { ChatTabWrapper } = Chat

class ReadFeed extends PureComponent {
  componentWillMount = () => this.props.getCurrentReader()

  componentDidMount = () => window.scrollTo(0, 0)

  render() {
    const { isMyReadFeed, id } = this.props
    const isUserLoggedIn = Auth.currentUserExists()
    return (
      <div className=''>
        <NavMenu isUserLoggedIn={isUserLoggedIn} />
        <div className='row center-text read-feed'>
          <ChatTabWrapper />
          <LeftContainer isMyReadFeed={isMyReadFeed}/>
          <MiddleContainer userId={id} />
          <RightContainer />
        </div>
        <SocketHandler/>
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

export default connect(mapStateToProps, { getCurrentReader })(ReadFeed)
