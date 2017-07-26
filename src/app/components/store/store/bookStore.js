import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
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
      modalOpen: false,
    }
    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleModalOpen = this.handleModalOpen.bind(this)
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

  handleModalOpen = () => {
    this.setState({ modalOpen: true })
  }

  handleModalClose = () => {
    this.setState({ modalOpen: false })
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
    const { wishList } = this.props
    const isUserLoggedIn = Auth.currentUserExists()
    return (
      <StoreNavView>
        <BookStoreHero
          isUserLogged={isUserLoggedIn}
          openModal={this.handleModalOpen}
          hasWishlist={(wishList.length === 'User has no books in the wish list')}
        />
        <div className='row'>
          <div className='large-12 columns'>
            <CategoriesCarousel />
          </div>
        </div>
        {isUserLoggedIn ? <WishListBooks/> : null}
        <Element name='recommended'>
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
        </Element>
        {isUserLoggedIn ?
          null : (
            <section className='bookstore-announcement-container'>
              <p className='bookstore-announcement-text'>
                Readers Love our book community & it's non fiction
              </p>
              <a
                onClick={this.handleModalOpen}
                className='bookstore-announcement-anchor'
              >
                Ok, i'm sold
              </a>
            </section>
          )
        }
        <SignUpModal
          modalOpen={this.state.modalOpen}
          handleClose={this.handleModalClose}
        />
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
    wishList: state.profilePage.wishList
  }
}

export default connect(mapStateToProps, null)(BookStore)
