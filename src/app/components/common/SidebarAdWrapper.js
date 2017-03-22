import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import SidebarAd from './SidebarAd'
import { Ads } from '../../redux/actions'

const { getSidebarAds } = Ads

class SidebarAdWrapper extends PureComponent {

  componentWillMount = () => {
    this.props.getSidebarAds()
  }

  mapSidebarAds = () => {
    const { sidebarAds } = this.props
    if (sidebarAds.results) {
      return sidebarAds.results.map((ad, idx) => {
        return <SidebarAd key={idx} content={ad}/>
      })
    }
    return null
  }

  render() {
    return (
      <div>
        {this.mapSidebarAds()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sidebarAds: state.sidebarAds,
  }
}

export default connect(mapStateToProps, { getSidebarAds })(SidebarAdWrapper)
