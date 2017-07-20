import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Books } from '../../redux/actions'
import { Book } from '../common'
import { ExternalRoutes } from '../../constants'
import R from 'ramda'

const styles = {
  container: {
    textAlign: 'left',
  },

  book: {
    marginBottom: 30,
  },
}

const { bookStore } = ExternalRoutes
const { getBookRecommendations } = Books

class BookRecommendations extends PureComponent {
  componentWillMount = () => {
    this.props.getBookRecommendations(4)
  }

  renderBooks(books) {
    return R.take(4, books).map(book => {
      return (
        <div style={styles.book} className='small-6 columns' key={book.id}>
          <Book book={book} />
        </div>
      )
    })
  }

  render() {
    const { recommended } = this.props
    const books = recommended ? recommended.books : null

    return (
      <div
        id='book-recommendations'
        className='left-container box small-12 columns'
      >
        <div className='rec-header'>
          <h4> {"We think you'll love these books"} </h4>
        </div>
        <div style={styles.container} className='row small-up-1 medium-up-2 large-up-2'>
          { books ?
            this.renderBooks(books) : <div className='loading-animation'/>
          }
        </div>
        <div className='sub-link'>
          <a href={bookStore()}>
            See more books
          </a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  currentReader: {
    recommended
  }
}) => {
  return { recommended }
}

export default connect(mapStateToProps, { getBookRecommendations })(BookRecommendations)
