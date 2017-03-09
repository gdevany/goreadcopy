import React, { Component } from 'react'
import { Dialog, } from 'material-ui'

class AddBooksModal extends Component {

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
        >
          <img
            src='./image/close.png'
            className='general-font center-text search-modal-x'
            onClick={handleClose}
          />
          <div className='profile-complete-modal-container'>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Repellendus nesciunt quaerat debitis sapiente distinctio eaque
              minus perferendis assumenda temporibus magni delectus commodi,
              ullam expedita quam omnis quae nulla, quos praesentium!
            </p>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default AddBooksModal
