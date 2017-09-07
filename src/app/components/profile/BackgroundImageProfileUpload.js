import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Images } from '../../redux/actions'
import Dropzone from 'react-dropzone'
import R from 'ramda'
import Promise from 'bluebird'

const { uploadImage } = Images

class BackgroundImageProfileUpload extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      backgroundImageUpload: null,
      hasBackgroundImage: false,
    }
  }

  backgroundUpload = (file) => {
    this.setState({
      backgroundImageUpload: file,
      hasBackgroundImage: false
    })
    this.getBase64AndUpdate(file[0], 'backgroundImage')
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
        className='background-image-profile'
        src={upload ? upload[0].preview : image}
        key='background-image-profile'
      />
    )
  }

  render() {
    const { backgroundImage, fullname, isMyProfile, isUserLoggedIn } = this.props
    const { backgroundImageUpload } = this.state
    const hasBackgroundImage = !R.isEmpty(backgroundImage)
    const cameraBackgroundClass = (backgroundImageUpload || hasBackgroundImage) ?
      'camera-transparent' :
      'camera-solid'

    return (
      <div className={isUserLoggedIn ?
        'profile-top profile-page-img-wrapper-logged' :
        'profile-top profile-page-img-wrapper-anon'}
      >
        <div className='background-image-wrapper'>
          {
            backgroundImage || backgroundImageUpload ?
             this.renderImage(backgroundImage, backgroundImageUpload) :
             null
           }
        </div>

        <div className={isMyProfile ? 'overlay' : ''}>
          {
            isMyProfile ?
              <Dropzone onDrop={this.backgroundUpload} className='dropzone-background'>
                <img
                  className={R.concat('camera-background ', cameraBackgroundClass)}
                  src='../image/upload-photo-icon.svg'
                />
              </Dropzone> : null
          }
        </div>

        <div className='profile-name'>
          <h2> {fullname} </h2>
        </div>
      </div>
    )
  }
}

export default connect(null, { uploadImage })(BackgroundImageProfileUpload)
