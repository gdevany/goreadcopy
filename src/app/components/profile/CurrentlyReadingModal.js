import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dialog } from 'material-ui'
import { ProfilePage } from '../../redux/actions'

const { setCurrentlyReading } = ProfilePage

const styles = {
  modalBody: {
    marginTop: -80,
  },
  modalContent: {
    maxWidth: '100%',
  },
}

class CurrentlyReadingModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      myLibrary: '',
      userId: '',
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.myLibrary !== nextProps.myLibrary) {
      this.setState({
        myLibrary: nextProps.myLibrary,
        userId: nextProps.userId,

      })
    }
  }

  handleCurrentlyReading = (bookId) => {
    const { userId } = this.state
    this.props.setCurrentlyReading(bookId, userId)
    this.props.handleClose()
  }

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  renderCurrentLibrary = () => {
    const { myLibrary } = this.state
    return myLibrary.map((book, index) => {
      const author = book.authors.length ? book.authors[0].fullname : null
      return (
        <div className='library-book-container' key={book.id}>
          <div
            className='book-container'
          >
            <a
              onClick={() => this.handleCurrentlyReading(book.id)}
            >
              <img className='book' src={book.imageUrl} />
            </a>
          </div>
          <div className='library-book-details-container'>
            <a
              onClick={() => this.handleCurrentlyReading(book.id)}
              className='library-book-details-anchor'
            >
              <span className='link'>
                {book.title ? this.truncInfo(book.title, 30) : null}
              </span>
              <p className='link subheader library-book-details-element'>
                by: { author ? this.truncInfo(author, 15) : <i> unknown </i>}
              </p>
            </a>
          </div>
        </div>
      )
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
          bodyClassName='edit-library-modal'
          bodyStyle={styles.modalBody}
          contentStyle={styles.modalContent}
          modal={true}
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
          <div className='edit-library-modal-container'>
            <div className='edit-library-heading-container'>
              <h4>Add your currently reading book</h4>
            </div>
            <div className='current-library-bottom-wrapper'>
              <div className='current-library-container currently-reading-container'>
                <div className='current-library-heading-container'>
                  <h5>
                    Click on a book to add it as Currently Reading
                  </h5>
                  <hr/>
                </div>
                <div className='current-library-elements-container'>
                  {this.state.myLibrary ? this.renderCurrentLibrary() : null}
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default connect(null, { setCurrentlyReading })(CurrentlyReadingModal)
