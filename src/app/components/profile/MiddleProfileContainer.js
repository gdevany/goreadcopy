import React, { PureComponent } from 'react'
import { Tiles } from '../../redux/actions'
import { connect } from 'react-redux'
import { StatusPost, TileScroller } from '../common'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { Colors } from '../../constants/style'

const { getProfileTiles, prependProfileTile, emptyTiles } = Tiles
const styles = {
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
}

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

  setLoading = () => {
    return (
      <RefreshIndicator
        size={50}
        left={0}
        top={0}
        loadingColor={Colors.blue}
        status='loading'
        style={styles.refresh}
      />
    )
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
            scrollPercent={0.7}
          /> : null
        }
        { isProfileLocked ? this.setLoading() : null }
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
