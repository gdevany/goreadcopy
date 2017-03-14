import React, { PureComponent } from 'react'
import { Tiles } from '../../redux/actions'
import { connect } from 'react-redux'
import TilesWrapper from '../readFeed/TilesWrapper'

const { getProfileTiles } = Tiles

class RightProfileContainer extends PureComponent {
  componentDidUpdate = () => {
    const { id, getProfileTiles } = this.props
    getProfileTiles(id)
  }

  render() {
    const { profile } = this.props

    return (
      <div className='right-container small-6 columns'>
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
