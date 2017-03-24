import React from 'react'
import FollowProfile from './FollowProfile'
import Achievements from './Achievements'
import FavoriteQuotes from './FavoriteQuotes'
import BooksSection from './BooksSection'
import { FavoriteGenres } from '../common'
import MyImageProfileUpload from './MyImageProfileUpload'

const LeftProfileContainer = ({
  id,
  genreIds,
  isMyProfile,
  isViewMyProfile,
  fullname,
  profileFollowed,
  favoriteQuotes,
  achievements,
  profileImage,
}) => {
  return (
    <div className='small-3 columns'>
      <MyImageProfileUpload
        profileImage={profileImage}
        isMyProfile={isMyProfile}
        isProfilePage={true}
      />
      {
        id ?
          <FollowProfile
            id={id}
            profileImage={profileImage}
            fullname={fullname}
            isCurrentReader={isMyProfile}
            profileFollowed={profileFollowed}
            isViewMyProfile={isViewMyProfile}
          /> : null
      }
    <BooksSection id={id}/>
    <div className='sidebar-element-container sidebar-favorite-genres-container box '>
      <FavoriteGenres
        genreIds={genreIds}
        isCurrentReader={isMyProfile}
        fullname={fullname}
      />
    </div>
    <FavoriteQuotes quotes={favoriteQuotes} />
    <Achievements achievements={achievements} />
    </div>
  )
}

export default LeftProfileContainer
