import React, { PureComponent } from 'react'
import { Scroller } from './'
import TilesWrapper from '../readFeed/TilesWrapper'
import R from 'ramda'

class TileScroller extends PureComponent {
  constructor(props) {
    super(props)
    this.onScroll = this.onScroll.bind(this)
  }

  componentWillMount() {
    if (this.props.fetchOnMount) {
      this.props.fetchTiles(this.initialTileParams())
    }
  }

  initialTileParams() {
    return {
      timestamp: '',
      adsense: 0,
      lastAd: ''
    }
  }

  onScroll(e) {
    const { fetchTiles, tiles, isLocked } = this.props
    const clientHeight = document.body.clientHeight
    const windowHeight = window.innerHeight
    const scrollOffset = window.scrollY || window.pageYOffset
    if (scrollOffset > (clientHeight - windowHeight) * 0.90 && !isLocked) {
      fetchTiles(this.getUpdatedParams(tiles))
    }
  }

  getUpdatedParams(tiles) {
    const tilesWithTimeStamp = R.filter(t => t.timestamp, tiles)
    const advertisementTiles = R.filter(t => t.tileType === 'advertising', tiles)
    const timestamp = R.last(tilesWithTimeStamp).timestamp
    let adsense, lastAd
    if (advertisementTiles.length > 0) {
      adsense = R.filter(
        t => t.advertiser.name === 'adsense',
        advertisementTiles
      ).length
      lastAd = R.last(advertisementTiles).advertiser.name
    }
    return {
      timestamp,
      adsense,
      lastAd
    }
  }

  render() {
    const { tiles } = this.props
    return (
      <Scroller
        onScroll={this.onScroll}
        debounced
        delay={250}
        enabled
        scrollParent={window}
      >
        <TilesWrapper feed={tiles} />
      </Scroller>
    )
  }
}

TileScroller.proptypes = {
  tiles: React.PropTypes.array,
  fetchTiles: React.PropTypes.func,
  isLocked: React.PropTypes.bool,
  fetchOnMount: React.PropTypes.bool,
}

TileScroller.defaultProps = {
  tiles: [],
  fetchTiles: null,
  isLocked: false,
  fetchOnMount: false,
}

export default TileScroller
