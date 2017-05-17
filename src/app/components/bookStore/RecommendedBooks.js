import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Store } from '../../redux/actions'

const { getMostPurchased, getRecommendedByAuthorFans } = Store

class RecommendedBooks extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      bestSeller: false,
      mostPurchased: false,
      recommendedByAuthorFans: false,
    }
  }

  componentWillMount = () => {
    if (this.props.category) {
      if (this.props.isUserLogged) {
        this.props.getMostPurchased(this.props.category.id)
      }
      this.props.getRecommendedByAuthorFans(this.props.category.id)
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.bestSellers) {
      this.setState({
        bestSeller: nextProps.bestSellers,
      })
    }
    if (nextProps.mostPurchased) {
      this.setState({
        mostPurchased: nextProps.mostPurchased,
      })
    }
    if (nextProps.recommendedByAuthorFans) {
      this.setState({
        recommendedByAuthorFans: nextProps.recommendedByAuthorFans,
      })
    }
  }

  render() {
    const { bestSeller, recommendedByAuthorFans } = this.state
    const { isUserLogged } = this.props
    if (bestSeller && recommendedByAuthorFans) {
      return (
        <section className='bookstore-recommended-books-container'>
          { isUserLogged ?
            (
              <article className='bookstore-recommended-book-element'>
                <p className='bookstore-recommended-book-text'>
                  17 of your friends purchased this book logged
                </p>
                <figure className='bookstore-recommended-book-figure'>
                  <img src='/image/example1.png'/>
                </figure>
              </article>
            ) : (
              <article className='bookstore-recommended-book-element'>
                <p className='bookstore-recommended-book-text'>
                  17 of your friends purchased this book
                </p>
                <figure className='bookstore-recommended-book-figure'>
                  <img src='/image/example1.png'/>
                </figure>
              </article>
            )
          }
          <article className='bookstore-recommended-book-element'>
            <p className='bookstore-recommended-book-text'>
              Recommended for Stephen King fans
            </p>
            <figure className='bookstore-recommended-book-figure'>
              <img src='/image/example2.png'/>
            </figure>
          </article>
          <article className='bookstore-recommended-book-element'>
            <p className='bookstore-recommended-book-text'>
              Best selling book in Science Fiction
            </p>
            <figure className='bookstore-recommended-book-figure'>
              <img src='/image/example3.png'/>
            </figure>
          </article>
        </section>
      )
    }
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    bestSeller: state.store.bestSellers,
    mostPurchased: state.store.mostPurchased,
    recommendedByAuthorFans: state.store.recommendedByAuthorFans,
  }
}

const mapDistpachToProps = {
  getMostPurchased,
  getRecommendedByAuthorFans
}

export default connect(mapStateToProps, mapDistpachToProps)(RecommendedBooks)
