import React from 'react'
import BookRecommendations from './BookRecommendations'
import AuthorRecommendations from './AuthorRecommendations'
import BookClubRecommendations from './BookClubRecommendations'
import SidebarAd from './SidebarAd'

const RightContainer = () => {
  return (
    <div className='right-container small-12 large-3 columns'>
      <SidebarAd />
      <BookRecommendations />
      <AuthorRecommendations />
      <BookClubRecommendations />
    </div>

  )
}

export default RightContainer
