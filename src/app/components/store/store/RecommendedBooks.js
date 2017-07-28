import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Store } from '../../../redux/actions'

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
        this.props.getRecommendedByAuthorFans(this.props.category.id)
      } else {
        this.props.getRecommendedByAuthorFans(this.props.category.id)
      }
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.bestSeller && nextProps.bestSeller.count > 0) {
      this.setState({
        bestSeller: nextProps.bestSeller
      })
    }
    if (nextProps.mostPurchased && nextProps.mostPurchased.count > 0) {
      this.setState({
        mostPurchased: nextProps.mostPurchased,
      })
    }
    if (nextProps.recommendedByAuthorFans && nextProps.recommendedByAuthorFans.count > 0) {
      this.setState({
        recommendedByAuthorFans: nextProps.recommendedByAuthorFans,
      })
    }
  }

  renderLeftItem = () => {
    const { bestSeller, mostPurchased } = this.state
    const { isUserLogged } = this.props
    if (isUserLogged && mostPurchased && mostPurchased.count > 0) {
      return (
        <article className='bookstore-recommended-book-element'>
          <p className='bookstore-recommended-book-text'>
            {mostPurchased.results.length && mostPurchased.results[0].purchasedTimes > 0 ?
              `${mostPurchased.results[0].purchasedTimes} ` : 'Some '
            }
            of your friends purchased this book
          </p>
          <figure className='bookstore-recommended-book-figure'>
            <Link to={`/book/${mostPurchased.results[0].slug}`}>
              <img src={mostPurchased.results[0].imageUrl}/>
            </Link>
          </figure>
        </article>
      )
    } else if (bestSeller && bestSeller.count > 1) {
      return (
        <article className='bookstore-recommended-book-element'>
          <p className='bookstore-recommended-book-text'>
            Some People purchased this book
          </p>
          <figure className='bookstore-recommended-book-figure'>
            <Link to={`/book/${bestSeller.results[1].slug}`}>
              <img src={bestSeller.results[1].imageUrl}/>
            </Link>
          </figure>
        </article>
      )
    }
    return false
  }

  renderCenterItem = () => {
    const { recommendedByAuthorFans } = this.state
    if (recommendedByAuthorFans && recommendedByAuthorFans.count > 1) {
      return (
        <article className='bookstore-recommended-book-element'>
          <p className='bookstore-recommended-book-text'>
            Recommended for
            {recommendedByAuthorFans.results[1].authors.length ?
              ` ${recommendedByAuthorFans.results[1].authors[0].fullname} fans` : null
            }
          </p>
          <figure className='bookstore-recommended-book-figure'>
            <Link to={`/book/${recommendedByAuthorFans.results[1].slug}`}>
              <img src={recommendedByAuthorFans.results[1].imageUrl}/>
            </Link>
          </figure>
        </article>
      )
    } else if (recommendedByAuthorFans && recommendedByAuthorFans.count > 0) {
      return (
        <article className='bookstore-recommended-book-element'>
          <p className='bookstore-recommended-book-text'>
            Recommended for
            {recommendedByAuthorFans.results[0].authors.length ?
              ` ${recommendedByAuthorFans.results[0].authors[0].fullname} fans` : null
            }
          </p>
          <figure className='bookstore-recommended-book-figure'>
            <Link to={`/book/${recommendedByAuthorFans.results[0].slug}`}>
              <img src={recommendedByAuthorFans.results[0].imageUrl}/>
            </Link>
          </figure>
        </article>
      )
    }
    return null
  }

  renderRightItem = () => {
    const { bestSeller, recommendedByAuthorFans } = this.state
    if (bestSeller && bestSeller.count > 0) {
      return (
        <article className='bookstore-recommended-book-element'>
          <p className='bookstore-recommended-book-text'>
            Best selling book in the category {this.props.category.name}
          </p>
          <figure className='bookstore-recommended-book-figure'>
            <Link to={`/book/${bestSeller.results[0].slug}`}>
              <img src={bestSeller.results[0].imageUrl}/>
            </Link>
          </figure>
        </article>
      )
    } else if (recommendedByAuthorFans && recommendedByAuthorFans.count > 1) {
      <article className='bookstore-recommended-book-element'>
        <p className='bookstore-recommended-book-text'>
          Recommended for
          {recommendedByAuthorFans.results[1].authors.length ?
            ` ${recommendedByAuthorFans.results[1].authors[0].fullname} fans` : null
          }
        </p>
        <figure className='bookstore-recommended-book-figure'>
          <Link to={`/book/${recommendedByAuthorFans.results[1].slug}`}>
            <img src={recommendedByAuthorFans.results[1].imageUrl}/>
          </Link>
        </figure>
      </article>
    }
    return null
  }

  render() {
    const { bestSeller, recommendedByAuthorFans, mostPurchased } = this.state
    return (
      <section className='bookstore-recommended-books-container'>
        {mostPurchased || bestSeller ?
          this.renderLeftItem() :
          <div className='loading-animation-store' />
        }
        {recommendedByAuthorFans ?
          this.renderCenterItem() : <div className='loading-animation-store' />
        }
        {bestSeller || recommendedByAuthorFans ?
          this.renderRightItem() : <div className='loading-animation-store' />
        }
      </section>
    )
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
