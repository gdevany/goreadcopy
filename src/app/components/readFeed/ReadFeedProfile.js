import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Follow, Images } from '../../redux/actions'
import { FollowModal } from '../common'
import Dropzone from 'react-dropzone'
import { Auth } from '../../services'
import R from 'ramda'
import Promise from 'bluebird'

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
    fontSize: 18,
  },

  container: {
    padding: 0,
  },
}
const { getFollowers, getFollowed } = Follow
const { uploadImage } = Images

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
    this.getFollow(this.props.id)
  }

  backgroundUpload = (file) => {
    this.setState({
      hasBackgroundImage: false,
      backgroundImageUpload: file
    })
    this.getBase64AndUpdate(file[0], 'backgroundImage')
  }

  profileUpload = (file) => {
    this.setState({
      profileImageUpload: file,
      hasProfileImage: false
    })
    this.getBase64AndUpdate(file[0], 'profileImage')
  }

  getBase64AndUpdate = (file, imageType) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(`Error in getBase64: ${error}`)
    }).then(res => this.props.uploadImage({ imageType, file: res }))
  }

  renderImage = (hasImage, upload, imageType) => {
    const { isUserLoggedIn } = this.props
    const isProfile = imageType === 'profile'
    const type = isProfile ? 'profile-image' : 'background-image'
    const result = []

    if (upload) {
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
    } else if (hasImage) {
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
    }

    return result
  }

  render() {
    const {
      backgroundImageUpload,
      profileImageUpload,
      modalFollowersOpen,
      modalFollowingOpen,
    } = this.state

    const {
      id,
      followed,
      followers,
      profileImage,
      backgroundImage,
      fullname,
    } = this.props

    const hasProfileImage = profileImage !== '' ? profileImage : null
    const hasBackgroundImage = backgroundImage !== '' ? backgroundImage : null

    const isUserLoggedIn = Auth.currentUserExists()

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
      <div style={styles.container} className='box'>
        <div className='profile-wrapper'>
          <div className='profile-top'>
            <div className='background-image-wrapper'>
              {
                backgroundImage || backgroundImageUpload ?
                this.renderImage(hasBackgroundImage, backgroundImageUpload, 'background') : null
              }
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

          <div className='profile-bottom'>
            <div style={styles.profileImageWrapper}>
              <Dropzone onDrop={this.profileUpload} className='dropzone-profile'>
                {
                  profileImage || profileImageUpload ?
                    this.renderImage(hasProfileImage, profileImageUpload, 'profile') : null
                }
              </Dropzone>
            </div>

            <h4
              style={styles.nameText}
              className='profile-large-text profile-link'
            >
              {fullname}
            </h4>

            <div style={styles.followContainer} className='follow-wrapper row center-text'>
              <div className='small-12 columns'>
                <div className='follow-wrapper row center-text'>
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

            <FollowModal
              currentReaderId={id}
              followed={followed}
              followers={followers}
              modalOpen={openedModal}
              handleClose={toCloseModal}
              count={modalFollowCount}
              followType={modalFollowType}
            />

          </div>
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
    fullname = '',
  }
}) => {
  return {
    followed,
    followers,
    backgroundImage,
    profileImage,
    fullname,
  }
}

const mapDispatchToProps = {
  uploadImage,
  getFollowers,
  getFollowed
}
export default connect(mapStateToProps, mapDispatchToProps)(ReadFeedProfile)
