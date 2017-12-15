import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Images } from '../../../redux/actions'
import CompleteProfileModal from '../CompleteProfileModal'
import AddBooksModal from '../AddBooksModal'
import Dropzone from 'react-dropzone'
import { Colors } from '../../../constants/style'
import {
  Card,
  CardText,
  LinearProgress,
} from 'material-ui'

const { uploadImage } = Images

class ProfileDetailerTile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profileImageUpload: null,
      hasProfileImage: false,
      completeProfileModalOpen: false,
      addBooksModal: false,
      percentage: 0,
      hasFiveBooks: false,
      hasPhoto: false,
      hasAddress: false,
    }

    this.handleClickProfileComplete = this.handleClickProfileComplete.bind(this)
    this.handleClickaddBooksModal = this.handleClickaddBooksModal.bind(this)
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.awards || nextProps.address1) {
      this.percentageCalculator()
    }
  }

  checkReaderAwards = () => {
    const { awards } = this.props
    let hasAward = false
    if (awards) {
      for (let i = 0; i < awards.length; i++) {
        if (awards[i].id === 3) {
          hasAward = true
        }
      }
    }
    return hasAward
  }

  percentageCalculator = () => {
    this.statesCalculator()
    const { hasFiveBooks, hasPhoto, hasAddress } = this.state
    if ((hasFiveBooks && hasPhoto) || (hasFiveBooks && hasAddress) ||
    (hasFiveBooks && hasPhoto)) {
      this.setState({
        percentage: 66,
      })
    } else {
      if (hasFiveBooks || hasPhoto || hasAddress) {
        this.setState({
          percentage: 33,
        })
      }
    }
  }

  statesCalculator = () => {
    if (this.checkReaderAwards()) {
      this.setState({
        hasFiveBooks: true
      })
    }
    if (this.props.hasProfileImage) {
      this.setState({
        hasPhoto: true
      })
    }
    if (this.props.address1 &&
        this.props.city &&
        this.props.country &&
        this.props.profession) {
      this.setState({
        hasAddress: true
      })
    }
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
    this.setState({
      profileImageUpload: file,
      hasProfileImage: false,
      hasPhoto: true,
    })
    this.percentageCalculator()
    this.getBase64AndUpdate(file[0], 'profileImage')
  }

  getBase64AndUpdate = (file, imageType) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(`Error in getBase64: ${error}`)
    }).then(res => this.props.uploadImage({ imageType, file: res, context: 'readfeed' }))
  }

  render() {
    const { userId } = this.props
    const { hasPhoto, hasFiveBooks, hasAddress } = this.state
    if (userId) {
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
              value={hasPhoto && hasFiveBooks ? 66 : (
                hasPhoto || hasFiveBooks ? 33 : 0
              )}
            />
          </div>
          <CardText className='profile-detailer-content'>
            <div className='profile-detailer-actions-content'>
              {hasPhoto ? null : (
                <Dropzone
                  onDrop={this.profileUpload}
                  className='dropzone-profile-detailer'
                >
                  <a href='#' className='profile-detailer-single-action'>
                    <div className='profile-detailer-left-elements'>
                      <div className='action-icon'>
                        <span>+</span>
                      </div>
                      <div className='action-content'>
                        <spam className='action-name'>Add Profile Photo</spam>
                      </div>
                    </div>
                    <div className='litcoin-earn-container'>
                      <span className='litcoin-amount'>
                        2,500
                      </span>
                      <img className='litcoin-image' src='./image/litcoin.png' />
                    </div>
                  </a>
                </Dropzone>
              )}
              {hasAddress ? null : (
                <a
                  onClick={this.handleClickProfileComplete}
                  className='profile-detailer-single-action'
                >
                  <div className='profile-detailer-left-elements'>
                    <div className='action-icon'>
                      <span>+</span>
                    </div>
                    <div className='action-content'>
                      <spam className='action-name'>Tell us more about your self</spam>
                    </div>
                  </div>
                  <div className='litcoin-earn-container'>
                    <span className='litcoin-amount'>
                      5,000
                    </span>
                    <img className='litcoin-image' src='./image/litcoin.png' />
                  </div>
                  <CompleteProfileModal
                    modalOpen={this.state.completeProfileModalOpen}
                    handleClose={this.handleClickProfileClose}
                  />
                </a>
              )}
              {hasFiveBooks ? null : (
                <a
                  onClick={this.handleClickaddBooksModal}
                  className='profile-detailer-single-action'
                >
                  <div className='profile-detailer-left-elements'>
                    <div className='action-icon'>
                      <span>+</span>
                    </div>
                    <div className='action-content'>
                      <spam className='action-name'>Add Books to Library</spam>
                    </div>
                  </div>
                  <div className='litcoin-earn-container'>
                    <span className='litcoin-amount'>
                      500/ea
                    </span>
                    <img className='litcoin-image' src='./image/litcoin.png' />
                  </div>
                  <AddBooksModal
                    modalOpen={this.state.addBooksModal}
                    handleClose={this.handleClickaddBooksModalClose}
                    userId={userId.id}
                  />
                </a>
              )}
            </div>
          </CardText>
        </Card>
      )
    }
    return null
  }
}
const mapStateToProps = (state) => {
  return {
    profileImage: state.currentReader.profileImage,
    userId: state.currentReader.id,
    awards: state.currentReader.achievements,
    hasProfileImage: state.currentReader.hasProfileImage,
    fullname: state.currentReader.fullname,
    address1: state.currentReader.address1,
    country: state.currentReader.country,
    city: state.currentReader.city,
    profession: state.currentReader.profession,
  }
}

export default connect(mapStateToProps, { uploadImage })(ProfileDetailerTile)
