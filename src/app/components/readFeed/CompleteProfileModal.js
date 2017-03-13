import React, { Component } from 'react'
import { Dialog, } from 'material-ui'
import PrimaryButton from '../common/PrimaryButton'

class CompleteProfileModal extends Component {

  render() {
    const {
      modalOpen,
      handleClose,
    } = this.props

    return (
      <div>
        <Dialog
          bodyClassName='complete-profile-modal'
          modal={true}
          open={modalOpen}
          onRequestClose={handleClose}
          autoScrollBodyContent={true}
        >
          <img
            src='./image/close.png'
            className='general-font center-text search-modal-x'
            onClick={handleClose}
          />
          <div className='complete-profile-modal-container row'>
            <div className='small-12 columns'>
              <div className='row'>
                <div className='center-text small-8 collumns small-centered'>
                  <h2>Tell us more about yourself</h2>
                  <h4>We do not share this information on the site</h4>
                </div>
                <form className='form-wrapper general-font small-8 collumns small-centered'>
                  <div className='row'>
                    <div className='small-12 columns'>
                      <span className='form-label'>Where are you from</span>
                    </div>
                    <div className='small-8 columns'>
                      <span className='form-label'>City</span>
                      <input
                        type='text'
                        className='form-input'
                      />
                    </div>
                    <div className='small-4 columns'>
                      <span className='form-label'> State</span>
                      <input
                        type='text'
                        className='form-input'
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='small-12 columns'>
                      <span className='form-label'>What is your occupation?</span>
                      <input
                        type='text'
                        className='form-input'
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='small-12 columns'>
                      <span className='form-label'>Your Birthdate</span>
                    </div>
                    <div className='small-5 columns'>
                      <input
                        type='text'
                        className='form-input'
                        placeholder='Month'
                      />
                    </div>
                    <div className='small-3 columns'>
                      <input
                        type='text'
                        className='form-input'
                        placeholder='Day'
                      />
                    </div>
                    <div className='small-4 columns'>
                      <input
                        type='text'
                        className='form-input'
                        placeholder='Year'
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='small-5 columns'>
                      <span className='form-label'>Your Gender</span>
                      <input
                        type='text'
                        className='form-input'
                      />
                    </div>
                  </div>
                  <div className='center-text'>
                    <PrimaryButton
                      label={'Submit & earn 5.000 Litcoins'}
                      type={'submit'}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default CompleteProfileModal
