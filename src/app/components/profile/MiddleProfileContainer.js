import React, { PureComponent } from 'react'
import { Tiles } from '../../redux/actions'
import { connect } from 'react-redux'
import { StatusPost } from '../common'
import TilesWrapper from '../readFeed/TilesWrapper'

const { getProfileTiles, prependProfileTile } = Tiles

class RightProfileContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      gotFirstTiles: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const { id, getProfileTiles } = nextProps
    const { gotFirstTiles } = this.state
    if (id && getProfileTiles && !gotFirstTiles) {
      getProfileTiles(id)
      this.setState({ gotFirstTiles: true })
    }
  }

  render() {
    const { profile, isUserLoggedIn, id } = this.props
    return (
      <div className='right-container small-6 columns'>
        {isUserLoggedIn ?
          <StatusPost
            targetId={id}
            addPostedTile={prependProfileTile}
          /> : null}
        {profile ? <TilesWrapper feed={profile} /> : null}
      </div>
    )
  }
}

const mapStateToProps = ({
  tiles: {
    profile
  },
  profilePage: {
    id
  }
}) => { return { profile, id } }

export default connect(mapStateToProps, {
  getProfileTiles,
  prependProfileTile
})(RightProfileContainer)
