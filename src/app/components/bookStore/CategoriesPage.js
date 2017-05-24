import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Store } from '../../redux/actions'
import { BookStoreNavBar } from '../common'
import CategoriesHero from './CategoriesHero'
import CategoriesFilters from './CategoriesFilters'
import SubCategories from './SubCategories'
import WishListBooks from './WishListBooks'
import BestSellers from './BestSellers'
import { Footer } from '../common'
import { Auth } from '../../services'

const { getChildCategories } = Store

const isUserLoggedIn = Auth.currentUserExists()

class CategoriesPage extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      subCategories: false,
      categories: false,
      selectedCategory: '',
    }
  }

  componentWillMount = () => {
    const categorySlug = this.props.params.slug
    this.props.getChildCategories(categorySlug)
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.childCategories) {
      this.setState({ subCategories: nextProps.childCategories })
    }
    if (nextProps.categories) {
      this.setState({ categories: nextProps.categories })
      for (let i = 0; i < nextProps.categories.length; i++) {
        if (nextProps.categories[i].slug === this.props.params.slug) {
          this.setState({ selectedCategory: nextProps.categories[i] })
        }
      }
    }
  }

  render() {
    const { selectedCategory } = this.state

    return (
      <div>
        <BookStoreNavBar/>
        <div className='categorypage-main-container'>
          {selectedCategory && selectedCategory !== '' ?
            <CategoriesHero category={selectedCategory}/> : null
          }
          <CategoriesFilters />
          {isUserLoggedIn ? <WishListBooks/> : null}
          <div className='row'>
            <div className='large-12 columns'>
              {selectedCategory && selectedCategory !== '' ?
                <BestSellers category={selectedCategory} /> : null
              }
              {this.state.subCategories ?
                <SubCategories SubCategoriesElement={this.state.subCategories}/> : null
              }
            </div>
          </div>
        </div>
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
    childCategories: state.store.childCategories
  }
}

export default connect(mapStateToProps, { getChildCategories })(CategoriesPage)
