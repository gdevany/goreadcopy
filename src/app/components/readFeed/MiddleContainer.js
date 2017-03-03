import React from 'react'
import { BaseTile } from './tiles'
const MiddleContainer = () => {
  return (
    <div className='middle-container small-12 large-6 columns'>
        <BaseTile tileType='Album' />
        <BaseTile tileType='Article' />
        <BaseTile tileType='Author' />
        <BaseTile tileType='StatusPost' />
        <BaseTile tileType='Award' />
        <BaseTile tileType='Appearance' />
        <BaseTile tileType='BookClubTask' />
    </div>
  )
}

export default MiddleContainer
