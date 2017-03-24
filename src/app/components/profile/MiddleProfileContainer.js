import React, { PureComponent } from 'react'
import { Tiles } from '../../redux/actions'
import { connect } from 'react-redux'
import { StatusPost, TileScroller } from '../common'
import TilesWrapper from '../readFeed/TilesWrapper'

const { getProfileTiles, prependProfileTile } = Tiles

class RightProfileContainer extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { profile, isUserLoggedIn, id, isProfileLocked } = this.props
    return (
      <div className='right-container small-6 columns'>
        {isUserLoggedIn ?
          <StatusPost
            targetId={id}
            postNewTile={this.props.prependProfileTile}
          /> : null}
        {profile ? <TilesWrapper feed={profile} /> : null}
        { id ? (
            <TileScroller
              fetchTiles={(params) => this.props.getProfileTiles(id, params)}
              tiles={profile}
              isLocked={isProfileLocked}
            />
          ) : null
        }
      </div>
    )
  }
}

const mapStateToProps = ({
  tiles: {
    profile,
    isProfileLocked
  }
}) => {
  return {
    profile,
    isProfileLocked
  }
}

export default connect(mapStateToProps, {
  getProfileTiles,
  prependProfileTile
})(RightProfileContainer)
