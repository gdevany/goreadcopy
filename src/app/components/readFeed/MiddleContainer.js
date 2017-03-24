import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Tiles } from '../../redux/actions'
import TilesWrapper from './TilesWrapper'
import { AnnouncementTile } from './tiles'
import { StatusPost } from '../common'

const { getReadFeedTiles, prependReadFeedTile } = Tiles

class MiddleContainer extends PureComponent {
  componentWillMount = () => this.props.getReadFeedTiles()

  render() {
    const { readFeed, userId, prependReadFeedTile } = this.props
    return (
      <div className='middle-container small-12 large-6 columns'>
        <AnnouncementTile/>
        <StatusPost targetId={userId} postNewTile={prependReadFeedTile}/>
        {readFeed ? <TilesWrapper feed={readFeed}/> : null}
      </div>
    )
  }
}

const mapStateToProps = ({
  tiles: {
    readFeed
  }
}) => { return { readFeed } }

export default connect(mapStateToProps, {
  getReadFeedTiles,
  prependReadFeedTile
})(MiddleContainer)
