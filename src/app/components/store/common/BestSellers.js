import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Store } from '../../../redux/actions'
import Book from './Book'

const { getBestSellers } = Store

class BestSellers extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      bestSellers: false,
    }
  }

  componentWillMount = () => {
    if (this.props.category) {
      this.props.getBestSellers(this.props.category.id)
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.bestSellers) {
      this.setState({
        bestSellers: nextProps.bestSellers,
      })
    }
  }

  renderBestSellers = () => {
    const { bestSellers } = this.state
    return bestSellers.results.slice(1, 6).map((book, index) => {
      if (book && book.slug) {
        return (
          <Book
            key={`${index}_${book.id}`}
            url={`/book/${book.slug}`}
            image={book.imageUrl}
            id={book.id}
            title={book.title}
            authors={book.authors}
            rating={book.rating}
          />
        )
      }
      return null
    })
  }

  render() {
    if (this.state.bestSellers !== undefined && this.state.bestSellers.count > 1) {
      return (
        <section className='bookstore-best-sellers-container'>
          <h4 className='bookstore-row-books-title'>
            {this.props.category.name} best sellers
          </h4>
          <div className='bookstore-row-books-contaier'>
            {this.renderBestSellers()}
          </div>
        </section>
      )
    }
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    bestSellers: state.store.bestSellers,
  }
}

export default connect(mapStateToProps, { getBestSellers })(BestSellers)
