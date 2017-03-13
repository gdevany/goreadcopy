import React, { PureComponent } from 'react'
import BaseMergedTile from '../BaseMergedTile'

class MergedTile extends PureComponent {
  render() {
    const { content } = this.props
    return (
      <BaseMergedTile content={content}>
        <div className='adv-sense-tile-container'>
          <img className='adv-sense-img' src='image/kendunn.jpg'/>
        </div>
      </BaseMergedTile>
    )
  }
}

export default MergedTile
