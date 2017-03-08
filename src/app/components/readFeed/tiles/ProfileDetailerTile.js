import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Card,
  CardText,
} from 'material-ui'

class ProfileDetailerTile extends Component {

  render() {
    const { loginCount } = this.props
    if (loginCount) {
      return (
        <Card className='profile-detailer-container'>
          <div className='profile-detailer-header'>
            <h3 className='profile-detailer-title'>
              Complete your Profile
            </h3>
            <div className='profile-detailer-progress-bar'/>
          </div>
          <CardText className='profile-detailer-content'>
            <div className='profile-detailer-actions-content'>
              <a href='' className='profile-detailer-single-action'>
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
              <a href='' className='profile-detailer-single-action'>
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
              </a>
              <a href='' className='profile-detailer-single-action'>
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
              </a>
              <a href='' className='profile-detailer-single-action'>
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
    loginCount: state.currentReader.loginCount
  }
}

export default connect(mapStateToProps, null)(ProfileDetailerTile)
