import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Auth } from '../../services'
import { browserHistory } from 'react-router'
import LeftProfileContainer from './LeftProfileContainer'
import RightProfileContainer from './RightProfileContainer'
import BackgroundImageProfileUpload from './BackgroundImageProfileUpload'
import MyImageProfileUpload from './MyImageProfileUpload'
import NavMenu from '../common/NavMenu'
import { CurrentReader, ProfilePage } from '../../redux/actions'
import R from 'ramda'

const { getCurrentReader } = CurrentReader
const { getProfilePage } = ProfilePage
const isUserLoggedIn = Auth.currentUserExists()

class Profile extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isMyProfile: false,
      slug: null,
    }
  }

  staticTypes = {
    router: React.PropTypes.object,
    location: React.PropTypes.object
  }

  componentWillMount = () => {
    const { getCurrentReader, getProfilePage, router } = this.props
    const slug = router.params.slug

    if (slug) {
      getProfilePage(slug)
      this.setState({
        slug,
        isMyProfile: false
      })
    } else if (isUserLoggedIn) {
      this.setState({ isMyProfile: true })
    } else {
      browserHistory.push('/')
    }

    getCurrentReader()
  }

  getGenreIds = (genres) => R.map(R.prop('id'), genres)

  isViewMyProfile = (profilePageId, id) => profilePageId === id

  render() {
    const {
      id,
      profileImage,
      backgroundImage,
      genreIds,
      fullname,
      favoriteQuotes,
      achievements,
      profilePage
    } = this.props

    const { isMyProfile } = this.state

    const myProfile = {
      profileImage,
      backgroundImage,
      fullname,
      genreIds,
      favoriteQuotes,
      achievements,
      id
    }

    const notMyProfile = profilePage.id ? {
      profileImage: profilePage.profileImage,
      backgroundImage: profilePage.backgroundImage,
      followed: this.getGenreIds(profilePage.genreIds),
      fullname: profilePage.fullname,
      genreIds: profilePage.genreIds,
      favoriteQuotes: profilePage.favoriteQuotes,
      achievements: profilePage.achievements,
      id: profilePage.id
    } : {}

    const profile = isMyProfile ? myProfile : notMyProfile

    return (
      <div>
        <NavMenu isUserLoggedIn={isUserLoggedIn} />
        <div className='row'>
          <BackgroundImageProfileUpload
            backgroundImage={profile.backgroundImage}
            isMyProfile={isMyProfile}
          />
          <MyImageProfileUpload
            profileImage={profile.profileImage}
            isMyProfile={isMyProfile}
          />
          <LeftProfileContainer
            id={profile.id}
            genreIds={profile.genreIds}
            isMyProfile={isMyProfile}
            fullname={profile.fullname}
            profileFollowed={notMyProfile.followed}
            achievements={profile.achievements}
            isViewMyProfile={this.isViewMyProfile(profilePage.id, id)}
            favoriteQuotes={profile.favoriteQuotes}
          />
          <RightProfileContainer
            id={profile.id}
            isProfilePage={true}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  currentReader: {
    id,
    fullname = '',
    backgroundImage = '',
    profileImage = '',
    genreIds = [],
    favoriteQuotes = [],
    achievements = [],
  },
  profilePage
}) => {
  return {
    id,
    fullname,
    backgroundImage,
    profileImage,
    genreIds,
    achievements,
    profilePage,
  }
}

const mapDispatchToProps = {
  getCurrentReader,
  getProfilePage
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
