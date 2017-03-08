import React, { PureComponent } from 'react'
import AdsenseDefault from '../AdsenseDefault'

const promoted = true
const isAdsense = true

class AdsenseTile extends PureComponent {
  render() {
    return (
      <AdsenseDefault
        promoted={promoted}
        adsense={isAdsense}
      >
        <div className='adv-sense-tile-container'>
          <img className='adv-sense-img' src='./image/adv-sense.png'/>
        </div>
      </AdsenseDefault>
    )
  }
}

export default AdsenseTile
