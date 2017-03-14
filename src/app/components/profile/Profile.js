import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Auth } from '../../services'
import { browserHistory } from 'react-router'
import LeftProfileContainer from './LeftProfileContainer'
import RightProfileContainer from './RightProfileContainer'
import BackgroundImageProfileUpload from './BackgroundImageProfileUpload'
import MyImageProfileUpload from './MyImageProfileUpload'
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
      profilePage
    } = this.props

    const {
      isMyProfile,
    } = this.state

    const myProfile = {
      profileImage,
      backgroundImage,
      fullname,
      genreIds,
      id
    }

    const notMyProfile = profilePage.id ? {
      profileImage: profilePage.profileImage,
      backgroundImage: profilePage.backgroundImage,
      followed: this.getGenreIds(profilePage.genreIds),
      fullname: profilePage.fullname,
      genreIds: profilePage.genreIds,
      id: profilePage.id
    } : {}

    const profile = isMyProfile ? myProfile : notMyProfile

    return (
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
          isViewMyProfile={this.isViewMyProfile(profilePage.id, id)}
        />
        <RightProfileContainer
          id={profile.id}
          isProfilePage={true}
        />
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
  },
  profilePage
}) => {
  return {
    id,
    fullname,
    backgroundImage,
    profileImage,
    genreIds,
    profilePage,
  }
}

const mapDispatchToProps = {
  getCurrentReader,
  getProfilePage
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
