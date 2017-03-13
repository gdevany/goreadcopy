import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Follow } from '../../redux/actions'
// TODO: move this over to common when bug fixed
import FollowModal from '../readFeed/FollowModal'
import { Chip } from 'material-ui'
import { Colors, Breakpoints } from '../../constants/style'
import R from 'ramda'

const { getFollowers, getFollowed } = Follow

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

    [Breakpoints.tablet]: {
      marginRight: 0,
    },

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
    }

    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount = () => {
    const { id } = this.props
    id ? this.getFollow(id) : null
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

  render() {
    const {
      modalFollowersOpen,
      modalFollowingOpen,
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
              <Chip
                className={'chosenFollow'}
                labelStyle={styles.chipText}
                style={styles.chip}
              >
               Edit Profile
              </Chip>
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
  getFollowed
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowProfile)
