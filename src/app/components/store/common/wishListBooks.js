import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Scroll from 'react-scroll'
import { ProfilePage } from '../../../redux/actions'
import Book from './Book'

const { getProfileBookInfo } = ProfilePage
const { Element } = Scroll

class WishListBooks extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      booksInfoFetched: false,
    }
  }

  componentWillMount = () => {
    this.setState({
      booksInfoFetched: false,
    })
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.currentReader.id && !this.state.booksInfoFetched) {
      this.props.getProfileBookInfo(nextProps.currentReader.id)
      this.setState({
        booksInfoFetched: true,
      })
    }
  }

  renderWishList = () => {
    const { wishList } = this.props.profilePage
    if (wishList === 'User has no books in the wish list') {
      return (
        <div>
          You don't have books in the wish list
        </div>
      )
    }
    return wishList.map((book, index) => {
      return (
        <Book
          key={book.id}
          url={`/book/${book.slug}`}
          image={book.imageUrl}
          id={book.id}
          title={book.title}
          authors={book.authors}
          rating={book.rating}
        />
      )
    })
  }

  render() {
    const { profilePage } = this.props
    if (profilePage.wishList === 'User has no books in the wish list') {
      return null
    }
    return profilePage && profilePage.wishList ? (
      <Element
        name='wishlist'
        className='wishlist-books-main-container'
      >
        <div className='wishlist-columns-container'>
          <h4 className='wishlist-books-title'>
            Books in your wish list
          </h4>
          <div className='wishlist-books-container'>
            {profilePage && profilePage.wishList ? this.renderWishList() : null}
          </div>
        </div>
      </Element>
    ) : null
  }
}

const mapStateToProps = ({ currentReader, profilePage }) => {
  return {
    profilePage: {
      wishList: profilePage.wishList,
    },
    currentReader: currentReader,
  }
}

export default connect(mapStateToProps, { getProfileBookInfo })(WishListBooks)
