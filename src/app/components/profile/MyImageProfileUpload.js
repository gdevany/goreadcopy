import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Images } from '../../redux/actions'
import { Auth } from '../../services'
import Dropzone from 'react-dropzone'
import R from 'ramda'

const { uploadImage } = Images

class MyImageProfileUpload extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      profileImageUpload: null,
      hasProfileImage: false
    }
  }

  profileUpload = (file) => {
    this.setState({
      hasProfileImage: false,
      profileImageUpload: file
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

  renderImage = (image, upload) => {
    return (
      <img
        className='profile-image-profilepage'
        src={upload ? upload[0].preview : image}
        key='profile-image-profilepage'
      />
    )
  }

  render() {
    const { profileImage } = this.props
    const { profileImageUpload } = this.state

    const isUserLoggedIn = Auth.currentUserExists()
    const hasProfileImage = !R.isEmpty(profileImage)
    const cameraBackgroundClass = (profileImageUpload || hasProfileImage) ?
      'camera-transparent' :
      'camera-solid'

    return (
      <div className='profile-bottom'>
        <div>
          <Dropzone
            onDrop={this.profileUpload}
            className='dropzone-profile-profilepage'
          >
            {
              profileImage || profileImageUpload ?
                this.renderImage(profileImage, profileImageUpload) : null
            }

            {
              isUserLoggedIn ?
                <img
                  className={R.concat('camera-profile-profilepage ', cameraBackgroundClass)}
                  src='./image/upload-photo-icon.svg'
                /> : null
            }
          </Dropzone>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  currentReader: {
    profileImage = '',
  }
}) => { return { profileImage } }

export default connect(mapStateToProps, { uploadImage })(MyImageProfileUpload)
