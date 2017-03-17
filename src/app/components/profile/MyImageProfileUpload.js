import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Images } from '../../redux/actions'
import Dropzone from 'react-dropzone'
import R from 'ramda'
import Promise from 'bluebird'

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
    const { profileImage, isMyProfile } = this.props
    const { profileImageUpload } = this.state
    const hasProfileImage = !R.isEmpty(profileImage)
    const cameraBackgroundClass = (profileImageUpload || hasProfileImage) ?
      'camera-transparent' :
      'camera-solid'
    const getImage = profileImage || profileImageUpload ?
      this.renderImage(profileImage, profileImageUpload) : null

    return (
      <div className='profile-bottom'>
        <div>
          {
            isMyProfile ?
              <Dropzone
                onDrop={this.profileUpload}
                className='dropzone-profile-profilepage'
              >
                {getImage}

                <img
                  className={R.concat('camera-profile-profilepage ', cameraBackgroundClass)}
                  src='../image/upload-photo-icon.svg'
                />
            </Dropzone> :
            getImage
          }
        </div>
      </div>
    )
  }
}

export default connect(null, { uploadImage })(MyImageProfileUpload)
