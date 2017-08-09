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
    const { category, getBestSellers } = this.props
    if (category) {
      getBestSellers(category.id)
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { category, getBestSellers } = this.props
    if (nextProps.category.id !== category.id) {
      this.setState({ bestSellers: false })
      getBestSellers(nextProps.category.id)
    }
    if (nextProps.bestSellers) {
      this.setState({
        bestSellers: nextProps.bestSellers,
      })
    }
  }

  renderBestSellers = () => {
    const { bestSellers } = this.state
    if (bestSellers.count > 1) {
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
    } else if (bestSellers.count === 1) {
      return (
        <Book
          url={`/book/${bestSellers.results[0].book.slug}`}
          image={bestSellers.results[0].book.imageUrl}
          id={bestSellers.results[0].book.id}
          title={bestSellers.results[0].book.title}
          authors={bestSellers.results[0].book.authors}
          rating={bestSellers.results[0].book.rating}
        />
      )
    }
    return null
  }

  render() {
    const { bestSellers } = this.state
    const { category } = this.props
    if (bestSellers !== undefined && bestSellers.count > 1) {
      return (
        <section className='bookstore-best-sellers-container'>
          <h4 className='bookstore-row-books-title'>
            {category.name} best sellers
          </h4>
          <div className='bookstore-row-books-contaier'>
            {bestSellers ? this.renderBestSellers() : <div className='loading-animation-store'/>}
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
