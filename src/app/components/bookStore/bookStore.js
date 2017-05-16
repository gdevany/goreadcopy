import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { BookStoreNavBar } from '../common'
import BookStoreHero from './BookStoreHero'
import CategoriesCarousel from './CategoriesCarousel'
import WishListBooks from './WishListBooks'
import RecommendedBooks from './RecommendedBooks'
import BestSellers from './BestSellers'
import TrendingBooks from './TrendingBooks'
import { Footer } from '../common'
import { Store } from '../../redux/actions'
import { Auth } from '../../services'

const isUserLoggedIn = Auth.currentUserExists()
const { getCategories } = Store

class BookStore extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      categories: null,
      randomCategory: null,
      isRandomSelected: false,
    }
  }

  componentWillMount = () => {
    this.props.getCategories()
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.categories) {
      this.setState({
        categories: nextProps.categories
      })
      if (!this.state.isRandomSelected) {
        this.setRandomCategory()
      }
    }
  }

  setRandomCategory = () => {
    const { categories } = this.state
    if (categories) {
      const catLength = categories.length
      this.setState({
        randomCategory: categories[Math.floor((Math.random() * catLength) + 1)],
        isRandomSelected: true,
      })
    }
  }

  render() {
    const { randomCategory } = this.state
    return (
      <div>
        <BookStoreNavBar/>
        <BookStoreHero isUserLogged={isUserLoggedIn}/>
        <div className='row'>
          <div className='large-12 columns'>
            <CategoriesCarousel />
          </div>
        </div>
        {isUserLoggedIn ? <WishListBooks/> : null}
        <div className='row'>
          <div className='large-12 columns'>
            <RecommendedBooks />
          </div>
        </div>
        <div className='row'>
          <div className='large-12 columns'>
            {randomCategory ? <BestSellers category={randomCategory} /> : null}
          </div>
        </div>
        {randomCategory ? <TrendingBooks category={randomCategory} /> : null}
        {isUserLoggedIn ?
          null : (
            <section className='bookstore-announcement-container'>
              <p className='bookstore-announcement-text'>
                Readers Love our book community & it's non fiction
              </p>
              <a href='#' className='bookstore-announcement-anchor'>
                Ok, i'm sold
              </a>
            </section>
          )
        }
        <div className='bookstore-footer-container'>
          <Footer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.store.categories,
  }
}

export default connect(mapStateToProps, { getCategories })(BookStore)
