import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Tiles } from '../../redux/actions'
import TilesWrapper from './TilesWrapper'
<<<<<<< HEAD
import { ProfileDetailerTile, AnnouncementTile } from './tiles'
import { StatusPost } from '../common'
=======
import { AnnouncementTile } from './tiles'
import { StatusPost, TileScroller } from '../common'
>>>>>>> master

const { getReadFeedTiles, prependReadFeedTile } = Tiles

class MiddleContainer extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { readFeed, userId, prependReadFeedTile, isReadFeedLocked } = this.props
    return (
      <div className='middle-container small-12 large-6 columns'>
        <ProfileDetailerTile />
        <AnnouncementTile/>
        <StatusPost targetId={userId} postNewTile={prependReadFeedTile}/>
        {readFeed ? <TilesWrapper feed={readFeed}/> : null}
        <TileScroller
          fetchTiles={(params) => this.props.getReadFeedTiles(params)}
          tiles={readFeed}
          isLocked={isReadFeedLocked}
        />
      </div>
    )
  }
}

const mapStateToProps = ({
  tiles: {
    readFeed,
    isReadFeedLocked
  }
}) => {
  return {
    readFeed,
    isReadFeedLocked
  }
}

export default connect(mapStateToProps, {
  getReadFeedTiles,
  prependReadFeedTile
})(MiddleContainer)
