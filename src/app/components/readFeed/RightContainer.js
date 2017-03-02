import React from 'react'
import BookRecommendations from './BookRecommendations'
import AuthorRecommendations from './AuthorRecommendations'
import BookClubRecommendations from './BookClubRecommendations'

const RightContainer = ({ isUserLoggedIn }) => {
  const isLoggedIn = () => {
    return (
      <div>
        <BookRecommendations />
        <AuthorRecommendations />
        <BookClubRecommendations />
      </div>
    )
  }

  return (
    <div className='right-container small-12 large-3 columns'>
      { isUserLoggedIn ? isLoggedIn() : null }
    </div>

  )
}

export default RightContainer
