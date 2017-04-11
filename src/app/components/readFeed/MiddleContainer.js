import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Tiles } from '../../redux/actions'
import { ProfileDetailerTile, AnnouncementTile } from './tiles'
import { StatusPost, TileScroller } from '../common'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { Colors } from '../../constants/style'

const { getReadFeedTiles, prependReadFeedTile } = Tiles
const styles = {
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
}

class MiddleContainer extends PureComponent {
  constructor(props) {
    super(props)
  }

  checkReaderAwards = () => {
    const { achievements } = this.props
    let hasAward = false
    if (achievements) {
      for (let i = 0; i < achievements.length; i++) {
        if (achievements[i].id === 3) {
          hasAward = true
        }
      }
    }
    return hasAward
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
    const {
      readFeed,
      userId,
      prependReadFeedTile,
      isReadFeedLocked,
      isProfileCompleted
    } = this.props
    return (
      <div className='middle-container small-12 large-6 columns'>
        <AnnouncementTile/>
        {isProfileCompleted && this.checkReaderAwards() ? null : <ProfileDetailerTile />}

        {this.props.readFeed ?
          <StatusPost targetId={userId} postNewTile={prependReadFeedTile}/> : null
        }
        <TileScroller
          fetchTiles={(params) => this.props.getReadFeedTiles(params)}
          tiles={readFeed}
          isLocked={isReadFeedLocked}
          fetchOnMount={true}
        />
        { isReadFeedLocked ? this.setLoading() : null }
      </div>
    )
  }
}

const mapStateToProps = ({
  currentReader: {
    isProfileCompleted,
    achievements,
  },
  tiles: {
    readFeed,
    isReadFeedLocked
  }
}) => {
  return {
    readFeed,
    isReadFeedLocked,
    isProfileCompleted,
    achievements,
  }
}

export default connect(mapStateToProps, {
  getReadFeedTiles,
  prependReadFeedTile
})(MiddleContainer)
