import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Auth } from '../../services'
import { ProfilePage, CurrentReader } from '../../redux/actions'
import { NavMenu, SocketHandler } from '../common'
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
      isLogged: false,
    }
  }

  componentWillMount = () => {

    if (isUserLoggedIn) {
      this.props.getCurrentReader()
    } else {
      if (!this.state.profileFetched) {
        const profileSlug = this.props.params.slug
        this.props.getProfilePage(profileSlug, isUserLoggedIn)
        this.state = {
          isMyProfile: false,
          slug: profileSlug,
          profileFetched: true,
        }
      }
    }
  }

  componentDidMount = () => window.scrollTo(0, 0)

  componentWillReceiveProps = (nextProps) => {
    const profileSlug = this.props.params.slug
    if (nextProps.currentReader) {
      const currentSlug = nextProps.currentReader.slug
      if (currentSlug === profileSlug) {
        this.setState({
          isMyProfile: true,
          slug: currentSlug,
          isLogged: true,
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
      if (nextProps.currentReader.token && nextProps.currentReader.slug) {
        const currentSlug = nextProps.currentReader.slug
        if (currentSlug === profileSlug) {
          this.setState({
            isLogged: true,
            isMyProfile: true,
            slug: currentSlug,
          })
        } else {
          this.setState({
            isLogged: true,
            isMyProfile: false,
            slug: profileSlug,
          })
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
        <Helmet>
          <title>{`GoRead | Profile | Library of ${profile.fullname}`}</title>
          <meta
            name='description'
            content='Earn Litcoins sharing your favorite books with others.'
          />
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:site' content='@TheRealGoRead' />
          <meta
            name='twitter:title'
            content={`GoRead | Profile | Library of ${profile.fullname}`}
          />
          <meta
            name='twitter:description'
            content='Earn Litcoins sharing your favorite books with others.'
          />
          <meta name='twitter:image' content='https://goread.com/image/281x281.png'/>
          <meta
            property='og:title'
            content={`GoRead | Profile | Library of ${profile.fullname}`}
          />
          <meta
            property='og:description'
            content='Earn Litcoins sharing your favorite books with others.'
          />
          <meta property='og:image' content='https://goread.com/image/281x281.png' />
          <meta property='og:image:width' content='281' />
          <meta property='og:image:height' content='281' />
          <meta property='og:image:type' content='image/png' />
        </Helmet>
        <NavMenu isUserLoggedIn={isUserLoggedIn} />
        <BackgroundImageProfileUpload
          backgroundImage={profile.backgroundImage}
          isMyProfile={isMyProfile}
        />
        <div className='row'>
          <LeftProfileContainer
            isMyProfile={isMyProfile}
            id={profile.id}
            genreIds={profile.genreIds}
            fullname={profile.fullname}
            profileFollowed={isMyProfile ? false : profilePage.isFollower}
            authorProfile={profile.author ? profile.author : null}
            achievements={profile.achievements}
            favoriteQuotes={profile.favoriteQuotes}
            profileImage={profile.profileImage}
          />
          <MiddleProfileContainer
            id={profile.id}
            isProfilePage={true}
            isUserLoggedIn={this.state.isLogged}
          />
          <RightProfileContainer />
        </div>
        <SocketHandler/>
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
