import React from 'react'
import BookRecommendations from './BookRecommendations'

const RightContainer = ({ isUserLoggedIn }) => {
  return (
    <div className='right-container small-12 large-3 columns'>
      { isUserLoggedIn ? <BookRecommendations /> : null }
    </div>
  )
}

export default RightContainer
