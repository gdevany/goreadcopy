import React, { PureComponent } from 'react'
import { Tiles } from '../../redux/actions'
import { connect } from 'react-redux'
import TilesWrapper from '../readFeed/TilesWrapper'
import { StatusPost } from '../common'

const { getProfileTiles } = Tiles

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
    const { profile } = this.props
    return (
      <div className='right-container small-6 columns'>
        <StatusPost />
        {profile ? <TilesWrapper feed={profile} /> : null}
      </div>
    )
  }
}

const mapStateToProps = ({
  tiles: {
    profile
  }
}) => { return { profile } }

export default connect(mapStateToProps, { getProfileTiles })(RightProfileContainer)
