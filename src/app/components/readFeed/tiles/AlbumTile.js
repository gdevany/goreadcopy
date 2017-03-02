import React, { Component } from 'react'

class AlbumTile extends Component {
  render() {
    return (
      <div className='album-tile-container'>
        <figure className='album-tile-figure'>
          <img className='album-tile-img' src='./image/image.jpg' alt=''/>
        </figure>
      </div>
    )
  }
}

export default AlbumTile
