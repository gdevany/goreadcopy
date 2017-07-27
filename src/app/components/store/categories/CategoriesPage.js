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

const { getChildCategories } = Store

const isUserLoggedIn = Auth.currentUserExists()

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
    const categorySlug = this.props.params.slug
    ApiStore.validateCategory(categorySlug)
      .then(() => {
        this.props.getChildCategories(categorySlug)
      })
      .catch((err) => {
        if (err.response.status === 400) browserHistory.push('/browse')
      })
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.childCategories) {
      this.setState({ subCategories: nextProps.childCategories })
      if (this.props.params.subCategory) {
        for (let i = 0; i < nextProps.childCategories.length; i++) {
          if (nextProps.childCategories[i].slug === this.props.params.subCategory) {
            this.setState({
              subCategoryObject: nextProps.childCategories[i],
              isSubCategory: true,
            })
          }
        }
      }
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
    const { selectedCategory, subCategories, isSubCategory, subCategoryObject } = this.state
    return (
      <StoreNavView>
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
              {this.state.subCategories && this.state.subCategories.length ?
                <SubCategories
                  parentCategory={selectedCategory.slug}
                  SubCategoriesElement={this.state.subCategories}
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

export default connect(mapStateToProps, { getChildCategories })(CategoriesPage)
