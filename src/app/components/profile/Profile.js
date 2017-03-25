import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Auth } from '../../services'
import { ProfilePage, CurrentReader } from '../../redux/actions'
import { NavMenu } from '../common'
import LeftProfileContainer from './LeftProfileContainer'
import MiddleProfileContainer from './MiddleProfileContainer'
import RightProfileContainer from './RightProfileContainer'
import BackgroundImageProfileUpload from './BackgroundImageProfileUpload'
import R from 'ramda'

const { getProfilePage } = ProfilePage
const { getCurrentReader } = CurrentReader
const isUserLoggedIn = Auth.currentUserExists()

class ProfileWrapper extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isMyProfile: false,
      slug: null,
      profileFetched: false,
    }
  }

  componentWillMount = () => {

    if (isUserLoggedIn) {
      this.props.getCurrentReader()
    } else {
      if (!this.state.profileFetched) {
        const profileSlug = this.props.params.slug
        this.props.getProfilePage(profileSlug, isUserLoggedIn)
        debugger
        this.state = {
          isMyProfile: false,
          slug: profileSlug,
          profileFetched: true,
        }
      }
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const profileSlug = this.props.params.slug
    if (nextProps.currentReader) {
      const currentSlug = nextProps.currentReader.slug
      if (currentSlug === profileSlug) {
        this.setState({
          isMyProfile: true,
          slug: currentSlug,
        })
        this.forceUpdate()
      } else {
        if (!this.state.profileFetched) {
          this.props.getProfilePage(profileSlug, isUserLoggedIn)
          this.state = {
            isMyProfile: false,
            slug: profileSlug,
            profileFetched: true,
          }
        }
      }
    }
  }

  componentWillUpdate = (nextProps, nextState) => {
    const profileSlug = this.props.params.slug
    const nextSlug = nextProps.params.slug
    const { currentReader } = this.props
    if (profileSlug !== nextSlug) {
      if (currentReader.slug === nextSlug) {
        this.props.getCurrentReader()
        this.setReaderData(nextSlug)
      } else {
        this.props.getProfilePage(nextSlug, isUserLoggedIn)
      }
    }
  }

  setReaderData = (nextSlug) => {
    this.setState({
      isMyProfile: true,
      slug: nextSlug,
    })
  }

  getGenreIds = (genres) => R.map(R.prop('id'), genres)

  render() {
    const { isMyProfile } = this.state
    const { currentReader, profilePage } = this.props
    const profile = (isMyProfile ? currentReader : profilePage)

    return (
      <div>
        <NavMenu isUserLoggedIn={isUserLoggedIn} />
        <div className='row'>
          <BackgroundImageProfileUpload
            backgroundImage={profile.backgroundImage}
            isMyProfile={isMyProfile}
          />
          <LeftProfileContainer
            isMyProfile={isMyProfile}
            id={profile.id}
            genreIds={profile.genreIds}
            fullname={profile.fullname}
            profileFollowed={isMyProfile ? false : profilePage.isFollower}
            achievements={profile.achievements}
            favoriteQuotes={profile.favoriteQuotes}
            profileImage={profile.profileImage}
          />
          <MiddleProfileContainer
            id={profile.id}
            isProfilePage={true}
            isUserLoggedIn={isUserLoggedIn}
          />
          <RightProfileContainer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentReader: state.currentReader,
    profilePage: state.profilePage,
  }
}

export default connect(mapStateToProps, { getProfilePage, getCurrentReader })(ProfileWrapper)
