import React, { PureComponent } from 'react'
import AdsenseDefault from '../AdsenseDefault'

class AdsenseTile extends PureComponent {
  render() {
    const { content } = this.props

    return (
      <AdsenseDefault
        promoted={content.promoted}
        adsense={content.isAdsense}
      >
        <div className='adv-sense-tile-container'>
          <img className='adv-sense-img' src={content.image}/>
        </div>
      </AdsenseDefault>
    )
  }
}

export default AdsenseTile
