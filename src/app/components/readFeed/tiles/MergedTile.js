import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import MergedTileDefault from '../MergedTileDefault'

class MergedTile extends PureComponent {

  mapMergedUserTiles = () => {
    const { content } = this.props
    return content.targets.map((tile, index) => {
      if (tile.contentType === 'userprofile') {
        return (
          <Link
            className='merged-users'
            to={`profile/${tile.slug}`}
            key={`${content.ids[index]}-${tile.id}`}
          >
            <span>{tile.fullname || tile.name}</span>
          </Link>
        )
      }
      return (
        <a className='merged-users' key={`${content.ids[index]}-${tile.id}`} href={tile.url}>
          <span>{tile.fullname || tile.name}</span>
        </a>
      )
    })
  }

  mapMergedBookTiles = () => {
    const { content } = this.props
    return content.targets.map((tile, index) => {
      return (
        <a
          className='merged-books'
          key={`${content.ids[index]}-${tile.id}`}
          href={`/book/${tile.slug}`}
        >
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
