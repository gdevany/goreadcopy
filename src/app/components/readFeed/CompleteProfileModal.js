import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Dialog } from 'material-ui'
import { ProfileForm } from '../common/data/forms'
import { Common } from '../../redux/actions'

const { showAlert } = Common

class CompleteProfileModal extends PureComponent {

  constructor(props) {
    super(props)
  }

  render() {
    const { modalOpen, handleClose } = this.props
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
                <div className='center-text small-8 columns small-centered'>
                  <h2 className='searchbooks-readfeeed-title'>Tell us more about yourself</h2>
                  <h4 className='searchbooks-readfeeed-subtitle'>
                    We do not share this information on the site
                  </h4>
                </div>
                <article className='settings-single-tab-content small-10 columns small-centered'>
                  <div className='profile-editor-section-container'>
                    <div className='profile-editor-form-container'>
                      <ProfileForm
                        onSuccess={()=>{
                          this.props.handleClose()
                          this.props.showAlert({ message: 'Form saved successfully!' })
                        }}
                        submitButtonText='Submit & earn 5.000 Litcoins'
                        context='readfeed'
                      />
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = ({
  currentReader,
}) => {
  return {
    currentReader,
  }
}

const mapDispatchToProps = {
  showAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteProfileModal)
