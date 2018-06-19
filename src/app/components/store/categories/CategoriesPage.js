import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Store } from '../../../redux/actions'
import { Footer } from '../../common'
import { StoreNavView } from '../../views'
import CategoriesHero from './CategoriesHero'
import CategoriesFilters from './CategoriesFilters'
import SubCategories from './SubCategories'
import WishListBooks from '../common/wishListBooks'
import BestSellers from '../common/BestSellers'
import { Auth } from '../../../services'
import { Store as ApiStore } from '../../../services/api'

const { getChildCategories, resetChildCategories } = Store

class CategoriesPage extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      isSubCategory: false,
      subCategories: false,
      categories: false,
      selectedCategory: '',
      parentCategory: '',
      subCategoryObject: {},
    }
  }

  componentWillMount = () => {
    const { params, getChildCategories } = this.props
    const category = params.slug
    params.subCategory ? this.setState({ isSubCategory: true }) : null
    ApiStore.validateCategory(category)
      .then(() => {
        getChildCategories(category)
      })
      .catch(() => browserHistory.push('/store'))
  }

  componentWillUpdate = (nextProps) => {
    const { params, getChildCategories } = this.props
    nextProps.params.subCategory !== params.subCategory ? nextProps.params.subCategory ?
      this.setState({ isSubCategory: true }) : this.setState({ isSubCategory: false }) : null
    nextProps.params.slug !== params.slug ? nextProps.params.slug ?
      getChildCategories(nextProps.params.slug) : null : null
  }

  componentWillUnmount = () => {
    this.props.resetChildCategories();
  }

  handleCurrentCategory = () => {
    const { categories, params } = this.props
    if (categories) {
      for (let i = 0; i < categories.length; i++) {
        if (categories[i].slug === params.slug) {
          return categories[i]
        }
      }
    }
    return false
  }

  handleChildCategories = () => {
    const { childCategories, params } = this.props
    if (childCategories && params.subCategory) {
      for (let i = 0; i < childCategories.length; i++) {
        if (childCategories[i].slug === params.subCategory) {
          return childCategories[i]
        }
      }
    }
    return {}
  }

  render() {
    const subCategories = this.props.childCategories
    const selectedCategory = this.handleCurrentCategory()
    const subCategoryObject = this.handleChildCategories()
    const { isSubCategory } = this.state
    const isUserLoggedIn = Auth.currentUserExists()
    return (
      <StoreNavView showCategories={this.props.location.query['see-more'] === 'true'}>
        <div className='categorypage-main-container'>
          {selectedCategory && selectedCategory !== '' ?
            <CategoriesHero
              isSubCategory={isSubCategory}
              subCategoryObject={subCategoryObject}
              category={selectedCategory}
            /> : null
          }
          {selectedCategory && subCategories ?
            <CategoriesFilters
              isSubCategory={isSubCategory}
              categoryId={isSubCategory ? subCategoryObject.id : selectedCategory.id}
              categories={!isSubCategory && subCategories ? subCategories : null}
            /> : null
          }
          {isUserLoggedIn ? <WishListBooks/> : null}
          <div className='row'>
            <div className='large-12 columns'>
              {(selectedCategory && selectedCategory !== '') || isSubCategory ?
                <BestSellers
                  category={isSubCategory ? subCategoryObject : selectedCategory}
                /> : null
              }
              {subCategories && subCategories.length && !isSubCategory ?
                <SubCategories
                  parentCategory={selectedCategory.slug}
                  SubCategoriesElement={subCategories}
                /> : null
              }
            </div>
          </div>
        </div>
        <div className='bookstore-footer-container'>
          <Footer />
        </div>
      </StoreNavView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.store.categories,
    childCategories: state.store.childCategories
  }
}

export default connect(mapStateToProps, { getChildCategories, resetChildCategories })(CategoriesPage)
