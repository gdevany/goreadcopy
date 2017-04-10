import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import SidebarAd from './SidebarAd'
import { Ads } from '../../redux/actions'

const { getSidebarAds } = Ads

class SidebarAdWrapper extends PureComponent {

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      isProfileAd: false,
    }
  }

  componentWillMount = () => {
    this.props.getSidebarAds()
    if (this.context.router.params.slug) {
      this.setState({
        isProfileAd: true,
      })
    }
  }

  mapSidebarAds = () => {
    const { sidebarAds } = this.props
    if (sidebarAds.results) {
      return sidebarAds.results.map((ad, idx) => {
        return <SidebarAd key={idx} content={ad} isProfileAd={this.state.isProfileAd}/>
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
