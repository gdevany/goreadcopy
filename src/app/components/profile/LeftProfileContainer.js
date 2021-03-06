import React, { PureComponent } from 'react'
import FollowProfile from './FollowProfile'
import Achievements from './Achievements'
import FavoriteQuotes from './FavoriteQuotes'
import BooksSection from './BooksSection'
import { FavoriteGenres } from '../common'
import MyImageProfileUpload from './MyImageProfileUpload'
import { CONTEXTS as C } from '../../constants/litcoins'

class LeftProfileContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      genreIds: [],
      isMyProfile: false,
      fullname: '',
      profileFollowed: '',
      favoriteQuotes: '',
      achivements: '',
      profileImage: '',
      authorProfile: '',
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      id: nextProps.id,
      genreIds: nextProps.genreIds,
      isMyProfile: nextProps.isMyProfile,
      fullname: nextProps.fullname,
      profileFollowed: nextProps.profileFollowed,
      favoriteQuotes: nextProps.favoriteQuotes,
      achievements: nextProps.achievements,
      profileImage: nextProps.profileImage,
      authorProfile: nextProps.authorProfile,
    })
  }

  render() {
    const {
      id,
      genreIds,
      isMyProfile,
      fullname,
      profileFollowed,
      favoriteQuotes,
      achievements,
      profileImage,
      authorProfile,
    } = this.state
    return (
      <div className='left-profile-container small-12 medium-5 large-4 columns'>
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
              authorProfile={authorProfile}
            /> : <div className='loading-animation'/>
        }
      <BooksSection
        id={id}
        isCurrentReader={isMyProfile}
      />
      <div className='sidebar-element-container sidebar-favorite-genres-container box '>
        <FavoriteGenres
          genreIds={genreIds}
          isCurrentReader={isMyProfile}
          fullname={fullname}
          context={C.PROFILE_PAGE}
        />
      </div>
      <FavoriteQuotes quotes={favoriteQuotes} />
      <Achievements achievements={achievements} />
      </div>
    )
  }
}
export default LeftProfileContainer
