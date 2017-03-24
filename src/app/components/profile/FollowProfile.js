import React, { PureComponent } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import { Follow } from '../../redux/actions'
import { Link } from 'react-router'
import { FollowModal } from '../common'
import { Chip } from 'material-ui'
import { LogInModal } from '../common'
import { Colors } from '../../constants/style'
import { Auth } from '../../services'

import R from 'ramda'

const isUserLoggedIn = Auth.currentUserExists()

const { getFollowers, getFollowed, updateFollowed } = Follow

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
      triggerCantFollow: false,
      followingUser: false,
      followed: [],
      modalLogInOpen: false,
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleLogInModalClose = this.handleLogInModalClose.bind(this)
  }

  componentDidMount = () => {
    const { id } = this.props
    id ? this.getFollow(id) : null
  }

  componentDidUpdate = () => {
    const { followed } = this.state
    const { profileFollowed, id } = this.props
    if (this.isChosen(id)) this.setState({ followingUser: true })

    if (followed && followed.length) this.props.updateFollowed(followed)
    else this.setState({ followed: profileFollowed })
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
    const { followed } = this.state
    const { id } = this.props
    if (this.isChosen(id)) {
      const collectionWithoutMember = R.reject(R.equals(id), followed)
      this.setState({
        followed: [...collectionWithoutMember],
        followingUser: false
      })
    } else {
      this.setState({
        followed: [...followed, id],
        followingUser: true
      })
    }
  }

  isChosen = (id) => R.contains(id, this.state.followed || [])

  cantFollow = () => this.setState({ triggerCantFollow: true })

  renderChip = () => {
    const { isCurrentReader, isViewMyProfile } = this.props
    const { followingUser } = this.state
    return (
      <Chip
        labelStyle={styles.chipText}
        style={styles.chip}
      >
        {
          isCurrentReader ?
            <Link to='/profile/settings'>Edit</Link> :
            <div>
              {isUserLoggedIn ?
                (
                  <a onClick={isViewMyProfile ? this.cantFollow : this.handleFollow}>
                    {
                      followingUser ? 'Following' : 'Follow'
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
      triggerCantFollow
    } = this.state

    const {
      followed,
      followers,
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
                onClick={isUserLoggedIn ?
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
                onClick={isUserLoggedIn ?
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
              {triggerCantFollow ? <span> You can't follow yourself!</span> : null}
            </div>
          </div>
        </div>
        <div>
          <FollowModal
            modalOpen={openedModal}
            handleClose={toCloseModal}
            count={modalFollowCount}
            followType={modalFollowType}
          />
          <LogInModal
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
  updateFollowed
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(FollowProfile))
