import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import { Footer } from '../common'
import { BaseNavView } from '../views'
import { connect } from 'react-redux'
import { Auth } from '../../services'
import { ProfilePage, CurrentReader } from '../../redux/actions'
import ReferralCallToActionTop from './ReferralCallToActionTop'
import CallToActionBottom from '../home/CallToActionBottom'
import PriorityReasons from '../home/PriorityReasons'
import BookLanding from '../home/BookLanding'
import TestimonialCarousel from '../home/TestimonialCarousel'

const { getProfilePage } = ProfilePage
const { getCurrentReader } = CurrentReader
const isUserLoggedIn = Auth.currentUserExists()

class ReferralHome extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isMyProfile: false,
      slug: null,
      isLogged: false,
      referrerFetched: false,
    }
  }

  componentWillMount = () => {
    if (isUserLoggedIn) {
      this.props.getCurrentReader()
    } else {
      if (!this.state.referrerFetched) {
        const profileSlug = this.props.params.slug
        this.props.getProfilePage(profileSlug, isUserLoggedIn)
        this.state = {
          isMyProfile: false,
          slug: profileSlug,
          referrerFetched: true,
        }
      }
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const profileSlug = this.props.params.slug
    if (nextProps.currentReader) {
      const currentSlug = nextProps.currentReader.slug
      if (profileSlug && currentSlug === profileSlug) {
        this.setState({
          isMyProfile: true,
          slug: currentSlug,
          isLogged: true,
        })
        this.forceUpdate()
      } else {
        if (!this.state.referrerFetched) {
          this.props.getProfilePage(profileSlug, isUserLoggedIn)
          this.state = {
            isMyProfile: false,
            slug: profileSlug,
            referrerFetched: true,
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

  renderReferralSignup = (referrer) => {
    return (
      <BaseNavView>
        <Helmet>
          <title>GoRead</title>
        </Helmet>
        <div className='home'>
          <ReferralCallToActionTop referrerName={referrer.fullname}/>
          <BookLanding />
          <PriorityReasons />
          <TestimonialCarousel />
          <CallToActionBottom />
          <Footer />
        </div>
      </BaseNavView>
    )
  }

  render() {
    const { isMyProfile, currentReader, profilePage } = this.props
    const referrer = (isMyProfile ? currentReader : profilePage)
    const result = referrer.fullname ? this.renderReferralSignup(referrer) : null;
    if (Auth.currentUserExists()) {
      this.props.router.push('/');
    }
    return result;
  }
}

const mapStateToProps = (state) => {
  return {
    currentReader: state.currentReader,
    profilePage: state.profilePage,
  }
}

export default connect(mapStateToProps, { getProfilePage, getCurrentReader })(ReferralHome)
