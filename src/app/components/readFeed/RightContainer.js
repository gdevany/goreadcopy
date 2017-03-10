import React from 'react'
import BookRecommendations from './BookRecommendations'
import AuthorRecommendations from './AuthorRecommendations'
import BookClubRecommendations from './BookClubRecommendations'
import SidebarAd from './SidebarAd'

const RightContainer = () => {
  return (
    <div className='right-container large-3 hide-for-small-only hide-for-medium-only columns'>
      <SidebarAd />
      <BookRecommendations />
      <AuthorRecommendations />
      <BookClubRecommendations />
    </div>
  )
}

export default RightContainer
