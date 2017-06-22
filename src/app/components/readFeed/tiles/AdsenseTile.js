import React, { PureComponent } from 'react'
import AdsenseDefault from '../AdsenseDefault'

class AdsenseTile extends PureComponent {

  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  }

  handleAd() {
    return (
      <div className='adv-sense-tile-container'>
        <ins className='adsbygoogle'
          style={{ display: 'block' }}
          data-ad-client='ca-pub-7843612025672312'
          data-ad-slot='2948177383'
          data-ad-format='rectangle'
        />
      </div>
    )
  }

  render() {
    const { content } = this.props

    return (
      <AdsenseDefault
        promoted={content.promoted}
        adsense={content.isAdsense}
        adchild={this.handleAd()}
      />
    )
  }
}

export default AdsenseTile
