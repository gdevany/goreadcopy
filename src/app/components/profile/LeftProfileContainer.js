import React from 'react'
import FollowProfile from './FollowProfile'
import { FavoriteGenres } from '../common'

const LeftProfileContainer = ({
  id,
  genreIds,
  isMyProfile,
  username,
  profileFollowed
}) => {
  return (
    <div className='right-container small-6 columns'>
      {
        id ?
          <FollowProfile
            id={7}
            profileUsername={username}
            isMyProfile={isMyProfile}
            profileFollowed={profileFollowed}
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
