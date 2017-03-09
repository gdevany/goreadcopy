import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Images } from '../../../redux/actions'
import Dropzone from 'react-dropzone'
import {
  Card,
  CardText,
  LinearProgress,
} from 'material-ui'
import { Colors } from '../../../constants/style'
import CompleteProfileModal from '../CompleteProfileModal'
import AddBooksModal from '../AddBooksModal'

const { uploadImage } = Images

class ProfileDetailerTile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profileImageUpload: null,
      hasProfileImage: false,
      completeProfileModalOpen: false,
      addBooksModal: false,
    }
    this.handleClickProfileComplete = this.handleClickProfileComplete.bind(this)
    this.handleClickaddBooksModal = this.handleClickaddBooksModal.bind(this)
  }

  handleClickProfileComplete = (event) => {
    event.preventDefault()
    this.setState({ completeProfileModalOpen: true })
  }

  handleClickProfileClose = () => {
    this.setState({ completeProfileModalOpen: false })
  }

  handleClickaddBooksModal = (event) => {
    event.preventDefault()
    this.setState({ addBooksModal: true })
  }

  handleClickaddBooksModalClose = () => {
    this.setState({ addBooksModal: false })
  }

  profileUpload = (file) => {
    this.setState({ profileImageUpload: file })
    this.setState({ hasProfileImage: false })

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

  render() {
    const { loginCount } = this.props

    if (loginCount) {
      return (
        <Card className='profile-detailer-container'>
          <div className='profile-detailer-header'>
            <h3 className='profile-detailer-title'>
              Complete your Profile
            </h3>
            <LinearProgress
              className='profile-detailer-progress-bar'
              mode='determinate'
              color={Colors.blue}
              value={75}
            />
          </div>
          <CardText className='profile-detailer-content'>
            <div className='profile-detailer-actions-content'>
              <Dropzone
                onDrop={this.profileUpload}
                className='dropzone-profile-detailer'
              >
                <a href='#' className='profile-detailer-single-action'>
                  <div className='action-icon'>
                    <span>+</span>
                  </div>
                  <div className='action-content'>
                    <spam className='action-name'>Add Profile Photo</spam>
                    <div className='litcoin-earn-container'>
                      <span className='litcoin-amount'>
                        3,500
                      </span>
                      <img className='litcoin-image' src='./image/litcoin.png' />
                    </div>
                  </div>
                </a>
              </Dropzone>
              <a
                onClick={this.handleClickProfileComplete}
                className='profile-detailer-single-action'
              >
                <div className='action-icon'>
                  <span>+</span>
                </div>
                <div className='action-content'>
                  <spam className='action-name'>Tell us more about your self</spam>
                  <div className='litcoin-earn-container'>
                    <span className='litcoin-amount'>
                      3,500
                    </span>
                    <img className='litcoin-image' src='./image/litcoin.png' />
                  </div>
                </div>
                <CompleteProfileModal
                  modalOpen={this.state.completeProfileModalOpen}
                  handleClose={this.handleClickProfileClose}
                />
              </a>
              <a
                onClick={this.handleClickaddBooksModal}
                className='profile-detailer-single-action'
              >
                <div className='action-icon'>
                  <span>+</span>
                </div>
                <div className='action-content'>
                  <spam className='action-name'>Add Books to Library</spam>
                  <div className='litcoin-earn-container'>
                    <span className='litcoin-amount'>
                      3,500
                    </span>
                    <img className='litcoin-image' src='./image/litcoin.png' />
                  </div>
                </div>
                <AddBooksModal
                  modalOpen={this.state.addBooksModal}
                  handleClose={this.handleClickaddBooksModalClose}
                />
              </a>
            </div>
            <a href='' className='profile-detailer-goto'>
              See your profile >
            </a>
          </CardText>
        </Card>
      )
    }
    return null
  }
}
const mapStateToProps = (state) => {
  return {
    loginCount: state.currentReader.loginCount,
    profileImage: state.currentReader.profileImage
  }
}

export default connect(mapStateToProps, { uploadImage })(ProfileDetailerTile)
