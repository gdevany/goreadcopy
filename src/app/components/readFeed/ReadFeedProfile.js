import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Follow, Images } from '../../redux/actions'
import { Paper } from 'material-ui'
import FollowModal from './FollowModal'
import Dropzone from 'react-dropzone'
import R from 'ramda'

const { getFollowers, getFollowed } = Follow
const { uploadProfileImage, uploadBackgroundImage } = Images

class ReadFeedProfile extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      backgroundImageUpload: null,
      profileImageUpload: null,
      hasProfileImage: false,
      hasBackgroundImage: false,
      modalFollowingOpen: false,
      modalFollowersOpen: false,
    }

    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount = () => {
    // check if profile and background images exist from prop passed down.
    const { backgroundImage, profileImage } = this.props
    const checkProfileImage = backgroundImage !== ''
    const checkBackgroundImage = profileImage !== ''
    if (checkProfileImage) { this.setState({ hasProfileImage: profileImage }) }
    if (checkBackgroundImage) { this.setState({ hasBackgroundImage: backgroundImage }) }
    this.props.getFollowers()
    this.props.getFollowed()
  }

  handleOpen = (followType) => {
    if (followType === 'following') this.setState({ modalFollowingOpen: true })
    else if (followType === 'followers') this.setState({ modalFollowersOpen: true })
  }

  handleClose = (followType) => {
    if (followType === 'following') this.setState({ modalFollowingOpen: false })
    else if (followType === 'followers') this.setState({ modalFollowersOpen: false })
  }

  backgroundUpload = (file) => {
    this.setState({ backgroundImageUpload: file })
    this.setState({ hasBackgroundImage: false })
    this.props.uploadBackgroundImage(file)
  }

  profileUpload = (file) => {
    this.setState({ profileImageUpload: file })
    this.setState({ hasProfileImage: false })
    this.props.uploadProfileImage(file)
  }

  renderImage = (hasImage, upload, imageType) => {
    const { isUserLoggedIn } = this.props
    const isProfile = imageType === 'profile'
    const type = isProfile ? 'profile-image' : 'background-image'
    const result = []

    if (hasImage) {
      result.push(
        <img
          className={type}
          src={hasImage}
          key={type}
        />
      )

      if (isProfile && isUserLoggedIn) {
        result.push(
          <img
            className='camera-profile camera-transparent'
            src='./image/camera-material-ui.png'
            key='camera'
          />
        )
      }
    } else if (upload) {
      result.push(
        <img
          className={type}
          src={upload[0].preview}
          key={type}
        />
      )

      if (isProfile && isUserLoggedIn) {
        result.push(
          <img
            className='camera-profile camera-transparent'
            src='./image/camera-material-ui.png'
            key='camera'
          />
        )
      }
    } else if (isProfile && isUserLoggedIn) {
      {/** Derrick: Placeholder for profile image **/}
      result.push(
        <img
          className={type}
          src={'./image/portrait2.png'}
          key={type}
        />,
        <img
          className='camera-profile camera-solid'
          src='./image/camera-material-ui.png'
          key='camera'
        />
      )
    } else {
      {/** Derrick: This is placeholder for background **/}
      result.push(
        <img
          src='./image/discover.jpg'
          className='backgroundImage'
          key={type}
        />
      )
    }

    return result
  }

  render() {
    const {
      backgroundImageUpload,
      hasBackgroundImage,
      profileImageUpload,
      hasProfileImage,
      modalFollowersOpen,
      modalFollowingOpen,
    } = this.state

    const {
      followed,
      followers,
      isUserLoggedIn,
    } = this.props

    const cameraBackgroundClass = (backgroundImageUpload || hasBackgroundImage) ?
      'camera-transparent' :
      'camera-solid'

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
      'followed' :
      'followers'

    return (
      <Paper>
        <div className='profile-wrapper'>
          <div className='profile-top'>
            <div className='background-image-wrapper'> {/** dont remove this for hover to work **/}
              { this.renderImage(hasBackgroundImage, backgroundImageUpload, 'background') }
            </div>
            <Dropzone onDrop={this.backgroundUpload} className='dropzone-background'>
              {
                isUserLoggedIn ?
                  <img
                    className={R.concat('camera-background ', cameraBackgroundClass)}
                    src='./image/camera-material-ui.png'
                  /> : null
              }
            </Dropzone>
          </div> <br />
          <div className='profile-bottom'>
            <div>
              {/** Derrick: You can remove paper and add border instead if you want **/}
              <div className='profile-image-wrapper' >
                <Paper>
                  <Dropzone onDrop={this.profileUpload} className='dropzone-profile'>
                    { this.renderImage(hasProfileImage, profileImageUpload, 'profile') }
                  </Dropzone>
                </Paper>
              </div>
              <div className='follow-wrapper row center-text'>
                <h4> Mary Reynolds </h4>
                <div className='followers small-6 columns'>
                  <div onClick={() => this.handleOpen('followers')}>
                    <h4> {followersCount} </h4>
                    <span>
                      Followers
                    </span>
                  </div>
                </div>
                <div className='following small-6 columns'>
                  <div onClick={() => this.handleOpen('following')}>
                    <h4> {followedCount} </h4>
                    <span>
                      Following
                    </span>
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
          </div>
        </div>
      </ Paper>
    )
  }
}

const mapStateToProps = ({
  social: {
    followed = {},
    followers = {},
  },
  currentReader: {
    backgroundImage = '',
    profileImage = '',
  }
}) => {
  return {
    followed,
    followers,
    backgroundImage,
    profileImage,
  }
}

const mapDispatchToProps = {
  uploadProfileImage,
  uploadBackgroundImage,
  getFollowers,
  getFollowed
}
export default connect(mapStateToProps, mapDispatchToProps)(ReadFeedProfile)
