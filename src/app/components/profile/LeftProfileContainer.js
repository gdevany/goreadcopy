import React from 'react'
import FollowProfile from './FollowProfile'
import { FavoriteGenres } from '../common'

const LeftProfileContainer = ({
  id,
  genreIds,
  isMyProfile,
  isViewMyProfile,
  username,
  profileFollowed
}) => {
  return (
    <div className='right-container small-6 columns'>
      {
        id ?
          <FollowProfile
            id={id}
            profileUsername={username}
            isCurrentReader={isMyProfile}
            profileFollowed={profileFollowed}
            isViewMyProfile={isViewMyProfile}
          /> : null
      }
      <FavoriteGenres
        genreIds={genreIds}
        isCurrentReader={isMyProfile}
        username={username}
      />
    </div>
  )
}

export default LeftProfileContainer
