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
    if (nextProps.bestSeller) {
      this.setState({
        bestSeller: nextProps.bestSeller
      })
    }
    if (nextProps.mostPurchased !== false) {
      this.setState({
        mostPurchased: nextProps.mostPurchased,
      })
    }
    if (nextProps.recommendedByAuthorFans !== false) {
      this.setState({
        recommendedByAuthorFans: nextProps.recommendedByAuthorFans,
      })
    }
  }

  render() {
    const { bestSeller, recommendedByAuthorFans, mostPurchased } = this.state
    const { isUserLogged } = this.props
    return (
      <section className='bookstore-recommended-books-container'>
        {isUserLogged && mostPurchased && mostPurchased.count > 0 ?
          (
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
          ) : bestSeller && bestSeller.count > 0 ? (
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
            ) : <div className='loading-animation-store' />
        }
        {recommendedByAuthorFans && recommendedByAuthorFans.count > 0 ?
          (
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
          ) : recommendedByAuthorFans && recommendedByAuthorFans.count > 1 ?
            (
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
            ) : <div className='loading-animation-store' />
        }
        {bestSeller && bestSeller.count > 0 ?
          (
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
          ) : recommendedByAuthorFans && recommendedByAuthorFans.count > 1 ?
              (
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
              ) : null
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
