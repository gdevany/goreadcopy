import React from 'react'
import FollowProfile from './FollowProfile'
import Achievements from './Achievements'
import FavoriteQuotes from './FavoriteQuotes'
import { FavoriteGenres } from '../common'

const LeftProfileContainer = ({
  id,
  genreIds,
  isMyProfile,
  isViewMyProfile,
  fullname,
  profileFollowed,
  favoriteQuotes,
  achievements
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
    <Achievements achievements={achievements} />
    </div>
  )
}

export default LeftProfileContainer
