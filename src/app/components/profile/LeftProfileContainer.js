import React from 'react'
import FollowProfile from './FollowProfile'
import { FavoriteGenres } from '../common'
import FavoriteQuotes from './FavoriteQuotes'

const LeftProfileContainer = ({
  id,
  genreIds,
  isMyProfile,
  isViewMyProfile,
  fullname,
  profileFollowed,
  favoriteQuotes,
}) => {
  return (
    <div className='right-container small-6 columns'>
      {
        id ?
          <FollowProfile
            id={id}
            isCurrentReader={isMyProfile}
            profileFollowed={profileFollowed}
            isViewMyProfile={isViewMyProfile}
          /> : null
      }
      <FavoriteGenres
        genreIds={genreIds}
        isCurrentReader={isMyProfile}
        fullname={fullname}
      />
    <FavoriteQuotes quotes={favoriteQuotes} />
    </div>
  )
}

export default LeftProfileContainer
