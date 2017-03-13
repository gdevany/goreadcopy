import React, { PureComponent } from 'react'
import MergedTileDefault from '../MergedTileDefault'

class MergedTile extends PureComponent {

  mapMergedUserTiles = () => {
    const { content } = this.props
    return content.targets.map((tile) => {
      return (
        <a className='merged-users' key={tile.id} href={tile.url}>
          <span>{tile.fullname || tile.name}</span>
        </a>
      )
    })
  }

  mapMergedBookTiles = () => {
    const { content } = this.props
    return content.targets.map((tile) => {
      return (
        <a className='merged-books' key={tile.id} href={tile.url}>
          <img src={tile.imageUrl} alt={tile.title}/>
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
      },
      content
    } = this.props
    return (
      <MergedTileDefault
        action={action}
        author={author}
        timestamp={timestamp}
      >
        <div className='merged-tile-container'>
          {content.mergedType === 'users' ? this.mapMergedUserTiles() : this.mapMergedBookTiles()}
        </div>
      </MergedTileDefault>
    )
  }
}

export default MergedTile
