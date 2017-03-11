import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Images } from '../../redux/actions'
import { Auth } from '../../services'
import Dropzone from 'react-dropzone'
import R from 'ramda'

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
    const { backgroundImage, fullname } = this.props
    const { backgroundImageUpload } = this.state

    const isUserLoggedIn = Auth.currentUserExists()
    const hasBackgroundImage = !R.isEmpty(backgroundImage)
    const cameraBackgroundClass = (backgroundImageUpload || hasBackgroundImage) ?
      'camera-transparent' :
      'camera-solid'
    return (
      <div className='profile-top'>
        <div className='background-image-wrapper'> {/** dont remove this for hover to work **/}
          {
            backgroundImage || backgroundImageUpload ?
             this.renderImage(backgroundImage, backgroundImageUpload) :
             null
           }
        </div>

        <div className='overlay' style={{ backgroundColor: 'grey' }}>
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

        <div className='profile-name'>
          <h2> {fullname} </h2>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  currentReader: {
    fullname = '',
    backgroundImage = '',
  }
}) => { return { backgroundImage, fullname } }

export default connect(mapStateToProps, { uploadImage })(BackgroundImageProfileUpload)
