import React, { PureComponent } from 'react'
import TileDefault from '../TileDefault'

class AlbumTile extends PureComponent {
  render() {
    const {
      tileDefaultProps: {
        author,
        description,
        timestamp,
        likes,
        comments,
        shareInfo,
        action,
        id
      },
      content
    } = this.props

    return (
      <TileDefault
        tileId={id}
        author={author}
        description={description}
        timestamp={timestamp}
        likes={likes}
        comments={comments}
        shareInfo={shareInfo}
        action={action}
      >
        <div className='album-tile-container'>
          <figure className='album-tile-figure'>
            <img className='album-tile-img' src={content.image} alt='album'/>
          </figure>
        </div>
      </TileDefault>
    )
  }
}

export default AlbumTile
