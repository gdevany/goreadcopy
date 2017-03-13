import React, { PureComponent } from 'react'
import BaseMergedTile from '../BaseMergedTile'

class MergedTile extends PureComponent {

  mapMergedTiles = () => {
    const { content } = this.props
    return content.targets.map((tile) => {
      return (
        <a key={tile.id} href={tile.url}>
          <span>{tile.fullname || tile.name}</span>
        </a>
      )
    })
  }

  render() {
    const {
      tileDefaultProps: {
        author,
        timestamp,
        action,
      }
    } = this.props
    return (
      <BaseMergedTile
        action={action}
        author={author}
        timestamp={timestamp}
      >
        <div className='merged-tile-container'>
          {this.mapMergedTiles()}
        </div>
      </BaseMergedTile>
    )
  }
}

export default MergedTile
