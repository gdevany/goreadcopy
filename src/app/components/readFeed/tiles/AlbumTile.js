import React, { PureComponent } from 'react'
import TileDefault from '../TileDefault'
import Anchorify from 'react-anchorify-text'

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
          <div className='post-excerpt-container'>
            <p className='post-excerpt-pharagraph'>
              {content.socialComment ?
                <Anchorify text={content.socialComment} target='_blank'/> : null
              }
            </p>
          </div>
          <figure className='album-tile-figure'>
            <img className='album-tile-img' src={content.image} alt='album'/>
          </figure>
        </div>
      </TileDefault>
    )
  }
}

export default AlbumTile
