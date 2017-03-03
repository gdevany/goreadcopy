import React from 'react'
import { BaseTile } from './tiles'
const MiddleContainer = () => {
  return (
    <div className='middle-container small-12 large-6 columns'>
        <BaseTile tileType='AlbumTile' />
        <BaseTile tileType='ArticleTile' />
    </div>
  )
}

export default MiddleContainer
