import React, { PureComponent } from 'react'
import AdsenseDefault from '../AdsenseDefault'
import GoogleAd from 'react-google-ad'

const styles = {
  googleAd: {
    display: 'block',
  },
}

class AdsenseTile extends PureComponent {
  render() {
    const { content } = this.props

    return (
      <AdsenseDefault
        promoted={content.promoted}
        adsense={content.isAdsense}
      >
        <div className='adv-sense-tile-container'>
          <GoogleAd
            className='adsbygoogle'
            style={styles.googleAd}
            client='ca-pub-7843612025672312'
            slot='2948177383'
            format='rectangle'
          />
        </div>
      </AdsenseDefault>
    )
  }
}

export default AdsenseTile
