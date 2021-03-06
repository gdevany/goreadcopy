import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Scroll from 'react-scroll'
import { Footer } from '../../common'
import { StoreNavView } from '../../views'
import SignUpModal from '../../common/SignUpModal'
import BookStoreHero from './bookStoreHero'
import CategoriesCarousel from './categoriesCarousel'
import WishListBooks from '../common/wishListBooks'
import RecommendedBooks from './RecommendedBooks'
import BestSellers from '../common/BestSellers'
import TrendingBooks from '../common/TrendingBooks'
import { Auth } from '../../../services'

const { Element } = Scroll

class BookStore extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      categories: null,
      randomCategory: null,
      isRandomSelected: false,
      isUserLoggedIn: Auth.currentUserExists(),
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { isUserLoggedIn } = this.state
    const checkLog = Auth.currentUserExists()
    if (nextProps.categories) {
      if (!this.state.isRandomSelected && nextProps.categories.length > 5) {
        this.setState({
          categories: nextProps.categories
        })
        this.setRandomCategory(nextProps.categories)
      }
    }
    isUserLoggedIn !== checkLog ?
    this.setState({ isUserLoggedIn: checkLog }) : null
  }

  handleRandom = (categories) => {
    const catLength = categories.length
    let rand = false
    do {
      rand = categories[Math.floor((Math.random() * catLength) + 1)]
    } while (!rand)
    return rand
  }

  setRandomCategory = (categories) => {
    if (categories) {
      this.setState({
        randomCategory: this.handleRandom(categories),
        isRandomSelected: true,
      })
    }
  }

  render() {
    const { randomCategory, isUserLoggedIn } = this.state
    const { wishList, currentReader } = this.props
    return (
      <StoreNavView>
        <BookStoreHero
          isUserLogged={isUserLoggedIn}
          hasWishlist={(wishList.length === 'User has no books in the wish list')}
        />
        <div className='row'>
          <div className='large-12 columns'>
            <CategoriesCarousel />
          </div>
        </div>
        {isUserLoggedIn && currentReader ? <WishListBooks/> : null}
        <Element name='recommended'>
          <div className='recommended-books row'>
            <div className='large-12 columns'>
              {randomCategory ?
                <RecommendedBooks
                  category={randomCategory}
                  isUserLogged={isUserLoggedIn}
                /> : null
              }
            </div>
          </div>
          <div className='row'>
            <div className='large-12 columns'>
              {randomCategory ?
                <BestSellers category={randomCategory} /> :
                <div className='loading-animation-store'/>
              }
            </div>
          </div>
          {randomCategory ?
            <TrendingBooks category={randomCategory} /> :
            <div className='loading-animation-store' />
          }
        </Element>
        {isUserLoggedIn ?
          null : (
            <section className='bookstore-announcement-container'>
              <p className='bookstore-announcement-text'>
                Readers Love our book community & it's non fiction
              </p>
              <Link
                className='bookstore-announcement-anchor'
                to="/accounts/signup"
              >
                Ok, i'm sold
              </Link>
            </section>
          )
        }
        <div className='bookstore-footer-container'>
          <Footer />
        </div>
      </StoreNavView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.store.popularCategories,
    wishList: state.profilePage.wishList,
    currentReader: state.currentReader.id
  }
}

export default connect(mapStateToProps, null)(BookStore)
