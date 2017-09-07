import React from 'react'
import BookRecommendations from './BookRecommendations'
import AuthorRecommendations from './AuthorRecommendations'
import BookClubRecommendations from './BookClubRecommendations'
import SidebarAdWrapper from '../common/SidebarAdWrapper'

const RightContainer = () => {
  return (
    <div className='right-container large-3 hide-for-small-only hide-for-medium-only columns'>
      <BookRecommendations />
      <AuthorRecommendations />
      <BookClubRecommendations />
      <SidebarAdWrapper
        view='readfeed'
      />
    </div>
  )
}

export default RightContainer
