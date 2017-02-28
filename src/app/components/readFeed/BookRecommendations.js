import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Books } from '../../redux/actions'
import Book from '../home/Book'
import { ExternalRoutes } from '../../constants'
import R from 'ramda'

const { bookStore } = ExternalRoutes
const { getBookRecommendations } = Books

class BookRecommendations extends PureComponent {
  componentWillMount = () => {
    this.props.getBookRecommendations()
  }

  renderBooks(books) {
    return R.take(4, books).map(book => {
      return (
        <div className='small-6 columns' key={book.id}>
          <Book book={book} />
        </div>
      )
    })
  }

  render() {
    const { recommended } = this.props

    return (
      <div className='left-container small-12 columns'>
        <div className='lead'>
          <h4> {"We think you'll love these books"} </h4>
        </div>
        {/** Derrick, feel free to change how it's rendered in different views: **/}
        <div className='row small-up-1 medium-up-2 large-up-2'>
          { recommended ? this.renderBooks(recommended.books) : null }
        </div>
        <div>
          {/** TODO: Where does this link go to? **/}
          <a href={bookStore()}>
            See more books >
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
