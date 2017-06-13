import React, { PureComponent } from 'react'
import { Dialog } from 'material-ui'
import Book from '../common/Book'

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

class ShippingGiftAddressModal extends PureComponent {

  renderGiftCartItems = () => {
    const { cartElements } = this.props
    return cartElements.map((item, index) => {
      if (item.isGiftItem) {
        return (
          <Book
            key={`gifts_${index}`}
            url={`/book/${item.product.slug}`}
            image={item.product.imageUrl}
            id={item.product.id}
            title={item.product.name}
            authors={item.product.seller}
          />
        )
      }
      return null
    })
  }

  render() {
    const {
      modalOpen,
      handleClose,
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
          <div className='row'>
            <div className='large-8 large-offset-2 column'>
              {this.renderGiftCartItems()}
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default ShippingGiftAddressModal
