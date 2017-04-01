import React, { PureComponent } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import { Follow } from '../../redux/actions'
import { Link } from 'react-router'
import { FollowModal } from '../common'
import { Chip } from 'material-ui'
import { RegisterSignInModal } from '../common'
import { Colors } from '../../constants/style'
import { Auth } from '../../services'
import { ExternalRoutes as routes } from '../../constants'

import R from 'ramda'

const { getFollowers, getFollowed, updateFollowed, followOrUnfollow } = Follow

const styles = {
  chip: {
    backgroundColor: Colors.white,
    border: `1px solid ${Colors.lightMedGrey}`,
    borderRadius: 25,
    color: Colors.lightMedGrey,
    cursor: 'pointer',
    alignSelf: 'center',
    padding: '3px 8px',
    marginTop: 5,

    ':hover': {
      backgroundColor: Colors.blue,
      color: Colors.white,
      cursor: 'pointer',
    },
  },

  chipText: {
    color: Colors.blue,
    fontSize: 12,
  },

  checkmark: {
    marginRight: 7,
  },
  chipContainer: {
    padding: 0,
  }
}

class FollowProfile extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      modalFollowingOpen: false,
      modalFollowersOpen: false,
      followingUser: false,
      followed: false,
      modalLogInOpen: false,
      profileFollowed: false,
      profileFetched: false,
      authorProfile: '',
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleLogInModalClose = this.handleLogInModalClose.bind(this)
  }

  componentWillMount = () => {
    this.setState({
      profileFetched: false,
      fetchedFollows: false,
    })
  }

  componentDidMount = () => {
    const { id } = this.props
    id ? this.getFollow(id) : null
  }

  componentWillReceiveProps = (nextProps) => {

    if (!this.state.profileFetched && nextProps.profileFollowed !== null) {
      this.setState({
        profileFollowed: nextProps.profileFollowed,
        profileFetched: true
      })
    }
    if (this.props.fullname !== nextProps.fullname) this.getFollow(nextProps.id)

    if (nextProps.isCurrentReader) {
      this.setState({
        isMyProfile: nextProps.isCurrentReader,
      })
    }

    if (nextProps.authorProfile) {
      this.setState({
        authorProfile: nextProps.authorProfile,
      })
    }
  }

  getFollow = (id) => {
    this.props.getFollowers(id)
    this.props.getFollowed(id)
  }

  handleOpen = (followType) => {
    if (followType === 'following') this.setState({ modalFollowingOpen: true })
    else if (followType === 'followers') this.setState({ modalFollowersOpen: true })
  }

  handleClose = (followType) => {
    if (followType === 'following') this.setState({ modalFollowingOpen: false })
    else if (followType === 'followers') this.setState({ modalFollowersOpen: false })
  }

  handleFollow = () => {
    this.props.followOrUnfollow({
      follow: !this.state.profileFollowed,
      context: '',
      userType: 'READER',
      ids: [this.props.id],
    })
    this.setState({
      profileFollowed: !this.state.profileFollowed
    })
  }

  renderChip = () => {
    const { isCurrentReader } = this.props
    const { profileFollowed } = this.state
    return (
      <Chip
        labelStyle={styles.chipText}
        style={styles.chip}
      >
        {
          isCurrentReader ?
            <Link to='/profile/settings'>Edit</Link> :
            <div>
              {Auth.currentUserExists() ?
                (
                  <a onClick={this.handleFollow}>
                    {
                      profileFollowed ? 'Following' : 'Follow'
                    }
                  </a>
                ) : (
                  <a onClick={this.handleLogInModalOpen}>
                    Follow
                  </a>
                )
              }
            </div>
        }
      </Chip>
    )
  }

  handleLogInModalClose = () => {
    this.setState({ modalLogInOpen: false })
  }

  handleLogInModalOpen = (event) => {
    event.preventDefault()
    this.setState({ modalLogInOpen: true })
  }

  render() {
    const {
      modalFollowersOpen,
      modalFollowingOpen,
      authorProfile,
    } = this.state

    const {
      followed,
      followers,
      isCurrentReader,
    } = this.props

    const followersCount = R.prop('count', followers)
    const followedCount = R.prop('count', followed)

    const openedModal = modalFollowersOpen ?
      modalFollowersOpen :
      modalFollowingOpen
    const toCloseModal = modalFollowersOpen ?
      () => this.handleClose('followers') :
      () => this.handleClose('following')
    const modalFollowCount = modalFollowersOpen ?
      followersCount :
      followedCount
    const modalFollowType = modalFollowersOpen ?
      'followers' :
      'followed'

    return (
      <div className='follow-profile-card-container'>
        <div className='follow-wrapper row center-text'>
          <div className='follow-profile-card-name-cont small-12 columns'>
            <h4 className='follow-profile-card-name'>{this.props.fullname}</h4>
          </div>
          <div className='follows-profile-actions-container small-12 columns'>
            <div className='followers small-4 columns'>
              <div
                className='profile-link'
                onClick={Auth.currentUserExists() ?
                  () => this.handleOpen('followers') : this.handleLogInModalOpen
                }
              >
                <span className='small-title'>
                  Followers
                </span>
                <br />
                <span className='profile-large-text'> {followersCount} </span>
              </div>
            </div>
            <div className='following small-4 columns'>
              <div
                className='profile-link'
                onClick={Auth.currentUserExists() ?
                  () => this.handleOpen('following') : this.handleLogInModalOpen
                }
              >
                <span className='small-title'>
                  Following
                </span>
                <br />
                <span className='profile-large-text'> {followedCount} </span>
              </div>
            </div>
            <div className='small-4 columns' style={styles.chipContainer}>
              {this.renderChip()}
            </div>
          </div>
          <div className='small-12 columns'>
            {authorProfile ?
              (
                <a
                  className='author-profile-link-button'
                  href={authorProfile.url}
                >
                  Author Page
                </a>
              ) : null
            }
          </div>
          <div className='small-12 columns'>
            {isCurrentReader ?
              (
                <a
                  className='referral-link-on-profile'
                  href={routes.referrals()}
                >
                  Earn LitCoins Referring Your Friends, Click Here!
                </a>
              ) : null
            }
          </div>
        </div>
        <div>
          <FollowModal
            modalOpen={openedModal}
            handleClose={toCloseModal}
            count={modalFollowCount}
            followType={modalFollowType}
          />
          <RegisterSignInModal
            modalOpen={this.state.modalLogInOpen}
            handleClose={this.handleLogInModalClose}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  social: {
    followed = {},
    followers = {},
  }
}) => {
  return {
    followed,
    followers,
  }
}

const mapDispatchToProps = {
  getFollowers,
  getFollowed,
  updateFollowed,
  followOrUnfollow
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(FollowProfile))
