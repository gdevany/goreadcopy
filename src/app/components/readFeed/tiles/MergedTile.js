import React, { PureComponent } from 'react'
import BaseMergedTile from '../BaseMergedTile'

class MergedTile extends PureComponent {
  render() {
    const {
      tileDefaultProps: {
        author,
        timestamp,
        action,
      },
      content
    } = this.props
    console.log(content)
    return (
      <BaseMergedTile
        action={action}
        author={author}
        timestamp={timestamp}
      >
        <div className='adv-sense-tile-container'>
          <img className='adv-sense-img' src='image/kendunn.jpg'/>
        </div>
      </BaseMergedTile>
    )
  }
}

export default MergedTile
