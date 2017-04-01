import React, { PureComponent } from 'react'
import { Tiles } from '../../redux/actions'
import { connect } from 'react-redux'
import { StatusPost, TileScroller } from '../common'

const { getProfileTiles, prependProfileTile, emptyTiles } = Tiles

class RightProfileContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tilesData: {},
    }
  }

  componentWillMount = () => {
    this.props.emptyTiles()
  }

  componentWillReceiveProps = (nextProps) => {
    const { id } = this.props
    if (id !== nextProps.id) {
      this.props.emptyTiles()
      this.props.getProfileTiles(nextProps.id, {})
    }
  }

  render() {
    const { profile, isUserLoggedIn, id, isProfileLocked } = this.props
    return (
      <div className='center-profile-container small-12 medium-7 large-6 columns'>
        {isUserLoggedIn ?
          <StatusPost
            targetId={id}
            postNewTile={this.props.prependProfileTile}
          /> : null}
        { profile && id ?
          <TileScroller
            fetchTiles={(params) => this.props.getProfileTiles(id, params)}
            tiles={profile}
            isLocked={isProfileLocked}
            fetchOnMount={false}
          /> : null
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
  prependProfileTile,
  emptyTiles,
})(RightProfileContainer)
