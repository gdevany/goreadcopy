import React, { PureComponent } from 'react'
import { Dialog, } from 'material-ui'
import { connect } from 'react-redux'
import { ProfilePage } from '../../redux/actions'
import { PageScroller } from '../common'
import Book from './Book'
import R from 'ramda'

const { fetchLibrary, updateTopBooks } = ProfilePage

class SearchBookModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      myLibrary: '',
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

  fetchHandler = R.curry((id, params) => {
    this.props.fetchLibrary(id, params)
  })

  handleUpdateTopBook = (bookId) => {
    const { userId } = this.state
    this.props.updateTopBooks(bookId, userId)
    this.props.handleClose()
  }

  renderCurrentLibrary = () => {
    const { myLibrary } = this.state
    return myLibrary && myLibrary.results ? myLibrary.results.map((book, index) => {
      return (
        <Book
          key={`${book.id}_edit_library_${index}`}
          image={book.imageUrl}
          id={book.id}
          title={book.title}
          slug={book.slug}
          authors={book.authors}
          rating={book.rating}
          bookType='topBooksModal'
          addAction={() => this.handleUpdateTopBook(book.id)}
        />
      )
    }) : null
  }

  render() {
    const {
      modalOpen,
      handleClose,
    } = this.props
    const { userId, myLibrary } = this.state

    return (
      <div>
        <Dialog
          bodyClassName='complete-profile-books-modal'
          modal={false}
          open={modalOpen}
          onRequestClose={handleClose}
          autoScrollBodyContent={true}
        >
          <img
            src='/image/close.png'
            className='general-font center-text search-modal-x'
            onClick={handleClose}
          />
          <div className='complete-profile-modal-container row'>
            <div className='small-12 columns'>
              <div className='row'>
                <div className='center-text small-8 collumns small-centered'>
                  <h4 className='searchbooks-readfeeed-subtitle'>
                    Click on your top 5 favorite books!
                  </h4>
                </div>
                <div className='library-list-container'>
                  <PageScroller
                    clsName='current-library-elements-container'
                    fetchOnLoad={false}
                    fetchHandler={this.fetchHandler(userId)}
                    isLocked={myLibrary ? myLibrary.locked : false}
                    currentPage={myLibrary && myLibrary.page ? myLibrary.page : 0
                    }
                  >
                    {myLibrary ? this.renderCurrentLibrary() : null}
                  </PageScroller>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

const mapDistpachToProps = {
  fetchLibrary,
  updateTopBooks,
}
export default connect(null, mapDistpachToProps)(SearchBookModal)
