import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Follow, Images } from '../../redux/actions'
import FollowModal from './FollowModal'
import Dropzone from 'react-dropzone'
import R from 'ramda'

const styles = {
  nameText: {
    margin: '22px 0 0 -47px',
    display: 'inline-block',
  },

  followContainer: {
    marginTop: 20,
    paddingBottom: 20,
  },

  profileImageWrapper: {
    display: 'inline-block',
    float: 'left',
  },

  followersSection: {
    marginLeft: 32,
  },

  followingSection: {
    marginRight: 32,
    margin: '-28px 0 0 10px',
    fontSize: 18,
  },
}
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
            src='./image/upload-photo-icon.svg'
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
            src='./image/upload-photo-icon.svg'
            key='camera'
          />
        )
      }
    } else if (isProfile && isUserLoggedIn) {
      {/** Derrick: Placeholder for profile image **/}
      result.push(
        <div
          className='backgroundImage rf-profile-photo'
          key={type}
        />,
        <img
          className='camera-profile camera-solid'
          src='./image/upload-photo-icon.svg'
          key='camera'
        />
      )
    } else {
      {/** Derrick: This is placeholder for background **/}
      result.push(
        <div
          className='backgroundImage rf-cover-photo'
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
      'followers' :
      'followed'

    return (
      <div className='box'>
        <div className='profile-wrapper'>
          <div className='profile-top'>
            <div className='background-image-wrapper'> {/** dont remove this for hover to work **/}
              { this.renderImage(hasBackgroundImage, backgroundImageUpload, 'background') }
            </div>

            <div className='overlay'>
              <Dropzone onDrop={this.backgroundUpload} className='dropzone-background'>
                {
                  isUserLoggedIn ?
                    <img
                      className={R.concat('camera-background ', cameraBackgroundClass)}
                      src='./image/upload-photo-icon.svg'
                    /> : null
                }
              </Dropzone>
            </div>
          </div>

            <Dropzone onDrop={this.backgroundUpload} className='dropzone-background'>
              <img src='./image/upload-photo-icon.svg' />
              {
                isUserLoggedIn ?
                  <img
                    className={R.concat('camera-background ', cameraBackgroundClass)}
                    src='./image/camera-material-ui.png'
                  /> : null
              }
            </Dropzone>
          </div>
          <div className='profile-bottom'>
              {/** Derrick: You can remove paper and add border instead if you want **/}
              <div style={styles.profileImageWrapper}>
                <Dropzone onDrop={this.profileUpload} className='dropzone-profile'>
                  { this.renderImage(hasProfileImage, profileImageUpload, 'profile') }
                </Dropzone>
              </div>

              <h4
                style={styles.nameText}
                className='profile-large-text profile-link'
              >
                Mary Reynolds
              </h4>

          <div style={styles.followContainer} className='follow-wrapper row center-text'>
              <div className='follow-wrapper row center-text'>
                <h4 style={styles.nameText}> Mary Reynolds </h4>
                <div className='followers small-6 columns'>
                  <div
                    style={styles.followersSection}
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

                <div className='following small-6 columns'>
                  <div
                    style={styles.followingSection}
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
