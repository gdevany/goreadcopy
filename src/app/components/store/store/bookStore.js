import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Footer } from '../../common'
import { StoreNavView } from '../../views'
import BookStoreHero from './bookStoreHero'
import CategoriesCarousel from './categoriesCarousel'
import WishListBooks from '../common/wishListBooks'
import RecommendedBooks from './RecommendedBooks'
import BestSellers from '../common/BestSellers'
import TrendingBooks from '../common/TrendingBooks'
import { Auth } from '../../../services'

class BookStore extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      categories: null,
      randomCategory: null,
      isRandomSelected: false,
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.categories) {
      if (!this.state.isRandomSelected && nextProps.categories.length > 5) {
        this.setState({
          categories: nextProps.categories
        })
        this.setRandomCategory(nextProps.categories)
      }
    }
  }

  setRandomCategory = (categories) => {
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
    const isUserLoggedIn = Auth.currentUserExists()
    return (
      <StoreNavView>
        <BookStoreHero isUserLogged={isUserLoggedIn}/>
        <div className='row'>
          <div className='large-12 columns'>
            <CategoriesCarousel />
          </div>
        </div>
        {isUserLoggedIn ? <WishListBooks/> : null}
        <div className='row'>
          <div className='large-12 columns'>
            {randomCategory && randomCategory !== undefined ?
              <RecommendedBooks
                category={randomCategory}
                isUserLogged={isUserLoggedIn}
              /> : null
            }
          </div>
        </div>
        <div className='row'>
          <div className='large-12 columns'>
            {randomCategory && randomCategory !== undefined ?
              <BestSellers category={randomCategory} /> :
              <div className='loading-animation-store'/>
            }
          </div>
        </div>
        {randomCategory && randomCategory !== undefined ?
          <TrendingBooks category={randomCategory} /> :
          <div className='loading-animation-store' />
        }
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
      </StoreNavView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.store.popularCategories,
  }
}

export default connect(mapStateToProps, null)(BookStore)
