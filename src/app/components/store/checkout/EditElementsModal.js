import React, { PureComponent } from 'react'
import { Dialog } from 'material-ui'

const styles = {
  modalBody: {
    marginTop: -80,
  },
  modalContent: {
    maxWidth: '100%',
    width: '100%',
    opacity: 0.93,
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
}

class EditElementsModal extends PureComponent {

  render() {
    const {
      modalOpen,
      handleClose,
      refference,
    } = this.props

    return (
      <div>
        <Dialog
          bodyClassName='search-modal-content'
          bodyStyle={styles.modalBody}
          contentStyle={styles.modalContent}
          modal={false}
          open={modalOpen}
          onRequestClose={handleClose}
          autoDetectWindowHeight={false}
          autoScrollBodyContent={true}
        >
          <img
            src='/image/close.png'
            className='general-font center-text search-modal-x'
            onClick={handleClose}
          />
          {refference === 'shipping' ?
            (
              <div>Edit Shipping</div>
            ) : null
          }
          {refference === 'card' ?
            (
              <div>Edit Payment</div>
            ) : null
          }
        </Dialog>
      </div>
    )
  }
}

export default EditElementsModal
