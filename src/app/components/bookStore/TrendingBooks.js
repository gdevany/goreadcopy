import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Store } from '../../redux/actions'
import Book from './Book'

const { getTrendingBooks } = Store

class TrendingBooks extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      trendingBooks: false,
    }
  }

  componentWillMount = () => {
    if (this.props.category) {
      this.props.getTrendingBooks(this.props.category.id)
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.trendingBooks) {
      this.setState({
        trendingBooks: nextProps.trendingBooks,
      })
    }
  }

  renderTrendingBooks = () => {
    const { trendingBooks } = this.state
    return trendingBooks.results.map((book, index) => {
      return (
        <Book
          key={book.id}
          url={book.link}
          image={book.imageUrl}
          id={book.id}
          title={book.title}
          authors={book.authors}
          rating={book.rating}
        />
      )
    })
  }

  render() {
    if (this.state.trendingBooks && this.state.trendingBooks.count > 0) {
      return (
        <div className='bookstore-trending-main-container'>
          <section className='bookstore-trending-books-container'>
            <h4 className='bookstore-row-books-title'>
              {this.props.category.name} trendings
            </h4>
            <div className='bookstore-row-books-contaier'>
              {this.renderTrendingBooks()}
            </div>
          </section>
        </div>
      )
    }
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    trendingBooks: state.store.trendingBooks,
  }
}

export default connect(mapStateToProps, { getTrendingBooks })(TrendingBooks)
