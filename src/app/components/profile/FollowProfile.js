import React, { PureComponent } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import { Follow } from '../../redux/actions'
import { FollowModal } from '../common'
import { ExternalRoutes } from '../../constants'
import { Chip } from 'material-ui'
import { Colors } from '../../constants/style'
import R from 'ramda'

const { editProfile } = ExternalRoutes

const { getFollowers, getFollowed, updateFollowed } = Follow

const styles = {
  chip: {
    backgroundColor: Colors.white,
    border: `1px solid ${Colors.blue}`,
    borderRadius: 25,
    color: Colors.blue,
    cursor: 'pointer',
    display: 'inline-block',
    margin: '15px 15px 0px 20px',
    padding: 5,

    ':hover': {
      backgroundColor: Colors.blue,
      color: Colors.white,
      cursor: 'pointer',
    },
  },

  chipText: {
    color: Colors.blue,
    fontSize: 14,
  },

  checkmark: {
    marginRight: 7,
  },
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
    }

    this.handleClose = this.handleClose.bind(this)
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
        className={'chosenFollow'}
        labelStyle={styles.chipText}
        style={styles.chip}
      >
        {
          isCurrentReader ?
            <a href={editProfile()}> + Edit Profile </a> :
            <a onClick={isViewMyProfile ? this.cantFollow : this.handleFollow}>
              {
                followingUser ? '(checkmark) Following' : 'Follow'
              }
            </a>
        }
      </Chip>
    )
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
      <div>
        <div>
            <div className='follow-wrapper row center-text'>
              <div className='followers small-4 columns'>
                <div
                  className='profile-link'
                  onClick={() => this.handleOpen('followers')}
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
                  onClick={() => this.handleOpen('following')}
                >
                <div className='profile-link' onClick={() => this.handleOpen('following')}>
                  <span className='small-title'>
                    Following
                  </span>
                  <br />
                  <span className='profile-large-text'> {followedCount} </span>
                </div>
              </div>
            </div>
            <div className='small-4 columns'>
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
