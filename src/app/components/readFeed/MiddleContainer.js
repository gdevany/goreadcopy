import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Tiles } from '../../redux/actions'
import TilesWrapper from './TilesWrapper'
import { AnnouncementTile } from './tiles'
import R from 'ramda'
import { debounce } from 'lodash'

const { getReadFeedTiles } = Tiles

class MiddleContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.handleWindowScroll = debounce(this.handleWindowScroll.bind(this), 250)
  }

  handleWindowScroll(e) {
    const clientHeight = document.body.clientHeight
    const windowHeight = window.innerHeight
    const scrollOffset = window.scrollY || window.pageYOffset
    if (scrollOffset > (clientHeight - windowHeight) * 0.90) {
      this.props.getReadFeedTiles(this.getUpdatedParams(this.props.readFeed))
    }
  }

  getUpdatedParams(tiles) {
    const tilesWithTimeStamp = R.filter(t => t.timestamp, tiles)
    const advertisementTiles = R.filter(t => t.tileType === 'advertising', tiles)
    const adsense = R.filter(
      t => t.advertiser.name === 'adsense',
      advertisementTiles
    ).length
    const timestamp = R.last(tilesWithTimeStamp).timestamp
    const lastAd = R.last(advertisementTiles).advertiser.name
    return {
      adsense,
      lastAd,
      timestamp
    }
  }

  componentWillMount = () => this.props.getReadFeedTiles({
    timestamp: '',
    adsense: 0,
    lastAd: ''
  })

  componentDidMount() {
    window.addEventListener('scroll', this.handleWindowScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll)
  }

  render() {
    const { readFeed } = this.props
    return (
      <div className='middle-container small-12 large-6 columns'>
        <AnnouncementTile/>
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

export default connect(mapStateToProps, { getReadFeedTiles })(MiddleContainer)
