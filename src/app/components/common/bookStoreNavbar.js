import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ExternalRoutes as routes } from '../../constants'
import { Auth, CurrentReader, Store } from '../../redux/actions'
import { Auth as AuthService } from '../../services'
import SignUpModal from './SignUpModal'
import LogInModal from './SignInModal'
import LitcoinStatus from './LitcoinStatus'
import { Colors } from '../../constants/style'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import Badge from 'material-ui/Badge'
import { Search } from '../../redux/actions'
import { debounce } from 'lodash'
import Book from '../store/common/Book'
import { stack as MobileMenu, slide as CategoriesMenu } from 'react-burger-menu'
import R from 'ramda'

const { mainSearch, updateSearch } = Search
const { verifyUserToken, processUserLogout } = Auth
const { usePlatformAs, getCurrentReader, logoutCurrentReader } = CurrentReader
const { getCategories, getPopularCategories } = Store

const styles = {
  categoriesMenu: {
    left: 0,
  },
  mobileMenu: {
    left: 0,
  }
}

class BookStoreNavBar extends PureComponent {

  constructor(props) {
    super(props)
    this.locals = {}
    this.state = {
      isUserLogged: false,
      currentReader: false,
      categories: false,
      popularCategories: false,
      profileMenuOpen: false,
      readerFetched: false,
      usePlatformAs: false,
      modalSignUpOpen: false,
      modalLogInOpen: false,
      isMobileMenuOpen: false,
      isMobileLoggedMenuOpen: false,
      categoriesOpen: false,
      categoriesMenuOpen: false,
      searchTerm: '',
      searchResults: '',
      isSearchResultsOpen: false,
    }
    this.handleSignUpModalClose = this.handleSignUpModalClose.bind(this)
    this.handleLogInModalClose = this.handleLogInModalClose.bind(this)
    this.handleProfileMenuShow = this.handleProfileMenuShow.bind(this)
    this.handleProfileMenuHide = this.handleProfileMenuHide.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
    this.handleCategoriesClick = this.handleCategoriesClick.bind(this)
    this.handleWheelScroll = this.handleWheelScroll.bind(this)
    this.handleSeach = this.handleSeach.bind(this)
    this.debouncedSearch = this.debouncedSearch.bind(this)
  }

  componentWillMount = () => {
    const isUserLoggedIn = AuthService.currentUserExists()
    if (!this.state.readerFetched && isUserLoggedIn) {
      this.props.getCurrentReader()
      this.setState({
        readerFetched: true
      })
    }
    this.props.getCategories()
    this.props.getPopularCategories()
  }

  componentWillReceiveProps = (nextProps) => {
    const isUserLoggedIn = AuthService.currentUserExists()
    if (isUserLoggedIn && !this.state.readerFetched) {
      this.props.getCurrentReader()
      this.setState({
        readerFetched: true
      })
    }

    if (!this.state.usePlatformAs && nextProps.currentReader.publishingAs) {
      this.setState({ usePlatformAs: nextProps.currentReader.publishingAs })
    }
    if (nextProps.currentReader && nextProps.currentReader.cartItems &&
      (nextProps.currentReader.cartItems !== this.state.currentReader.cartItems)) {
      this.setState({
        currentReader: nextProps.currentReader
      })
    }
    if (nextProps.categories) {
      this.setState({ categories: nextProps.categories })
    }
    if (nextProps.popularCategories) {
      this.setState({ popularCategories: nextProps.popularCategories })
    }
    if (nextProps.searchResults) {
      this.setState({
        searchResults: nextProps.searchResults,
        isSearchResultsOpen: true
      })
    }
  }

  handleSeach = R.curry((field, e) => {
    e.persist()
    this.setState({ [field]: e.target.value })
    this.debouncedSearch(e)
  })

  debouncedSearch = debounce((event) => {
    if (event.target.value.length > 3) {
      this.props.mainSearch(event.target.value, 'book-search')
    }
  }, 1000)

  handleSignUpModalOpen = () => {
    this.setState({ modalSignUpOpen: true })
  }

  handleSignUpModalClose = () => {
    this.setState({ modalSignUpOpen: false })
  }

  handleLogInModalOpen = (event) => {
    event.preventDefault()
    this.setState({ modalLogInOpen: true })
  }

  handleLogInModalClose = () => {
    this.setState({ modalLogInOpen: false })
  }

  handleProfileMenuShow = () => {
    if (!this.state.profileMenuOpen) {
      this.setState({ profileMenuOpen: true })
    } else {
      this.setState({ profileMenuOpen: false })
    }
  }

  handleProfileMenuHide = () => {
    this.setState({ profileMenuOpen: false })
  }

  handleLogoutClick(event) {
    event.preventDefault()
    this.props.logoutCurrentReader()
    this.props.processUserLogout()
  }

  handleCategoriesMenuClick = (event) => {
    event.preventDefault()
    if (this.state.categoriesMenuOpen) {
      this.setState({
        categoriesMenuOpen: false,
      })
    } else {
      this.setState({ categoriesMenuOpen: true })
    }
  }

  handleMenuClick = (event) => {
    event.preventDefault()
    if (this.state.isMobileMenuOpen) {
      this.setState({
        isMobileMenuOpen: false,
        categoriesOpen: false,
      })
    } else {
      this.setState({ isMobileMenuOpen: true })
    }
  }

  handleLoggedMenuClick = (event) => {
    event.preventDefault()
    if (this.state.isMobileLoggedMenuOpen) {
      this.setState({ isMobileLoggedMenuOpen: false })
    } else {
      this.setState({ isMobileLoggedMenuOpen: true })
    }
  }

  handleCategoriesClick = (event) => {
    event.preventDefault()
    if (this.state.categoriesOpen) {
      this.setState({ categoriesOpen: false })
    } else {
      this.setState({ categoriesOpen: true })
    }
  }

  handlePlatformUse(platformUse) {
    this.setState({ usePlatformAs: platformUse })
    this.props.usePlatformAs(platformUse)
  }

  handleWheelScroll(e) {
    if (this.locals && this.locals.container) {
      const { container } = this.locals
      const { scrollHeight, scrollTop, clientHeight } = container
      const { deltaY } = e
      if (scrollTop + deltaY < 0) {
        e.preventDefault()
      }
      if (scrollTop + deltaY + clientHeight > scrollHeight) {
        e.preventDefault()
      }
    }
  }

  handleEnterButton = (event) => {
    if (event.which === 13) {
      event.preventDefault()
    }
  }

  mapElementsHandler = (liClass, anchorClass) => {
    return ([title, routeFn, routeType, isFunc], index) => (
      <li className={liClass} key={title + index}>
        { routeType ?
          (
            <Link
              className={anchorClass}
              to={routeFn}
            >
              {title}
            </Link>
          ) : (
            <a
              className={anchorClass}
              href={isFunc ? routeFn : routeFn()}
            >
              {title}
            </a>
          )
        }
      </li>
    )
  }

  handleMapProfileMenuItems = () => {
    const liClass = 'profile-menu-element'
    const anchorClass = 'profile-menu-anchor'
    const { currentReader } = this.props
    const {
      orders,
      referrals,
      authorBuzz,
      authorBuzzSettings,
      publisherBuzz,
      publisherBuzzSettings
    } = routes
    const nonMenuRoutes = [
      ['Orders', orders],
      ['Referrals', referrals],
      ['Settings', '/profile/settings', true],
    ]

    {currentReader.hasAuthorBuzz ?
      nonMenuRoutes.push(
        ['GoRead Buzz', authorBuzz({ slug: currentReader.author.slug }), false, true],
        ['GoRead Buzz Settings', authorBuzzSettings],
    ) : null }

    {currentReader.hasPublisherBuzz && currentReader.isPublisher ?
      nonMenuRoutes.push(
        ['GoRead Publisher Buzz', publisherBuzz({ slug: currentReader.publisher.slug }),
          false, true],
        ['GoRead Publisher Buzz Settings',
          publisherBuzzSettings({ slug: currentReader.publisher.slug }), false, true],
    ) : null }

    const NonMenuItem = this.mapElementsHandler(liClass, anchorClass)

    return R.map(NonMenuItem, nonMenuRoutes)

  }

  handleMapMobileCategories = () => {
    const { categories } = this.props
    return categories.map((category, index) => {
      return (
        <li key={`${index}_${category.id}`} className='bookstore-categories-list-element'>
          <a
            href={`/categories/${category.slug}`}
            className='bookstore-categories-list-anchor'
          >
            {category.name}
          </a>
        </li>
      )
    })
  }

  mapMobileCategoriesList = () => {
    return (
      <div
        className={this.state.categoriesOpen ?
            'bookstore-categories-list-container list-open' :
          'bookstore-categories-list-container list-close'
        }
      >
        <a
          onClick={this.handleCategoriesClick}
          className='bookstore-categorie-title'
        >
          &lt; Back
        </a>
        <ul className='bookstore-categories-list'>
          {this.props.categories ? this.handleMapMobileCategories() : null}
        </ul>
      </div>
    )
  }

  userProfileMenu = () => {
    const { currentReader } = this.props
    const { usePlatformAs } = this.state

    return (
      <ul
        className='profile-menu-container'
        onMouseLeave={this.handleProfileMenuHide}
      >
        <li className='profile-menu-element'>
          {currentReader.hasAuthorBuzz ||
           (currentReader.hasPublisherBuzz && currentReader.isPublisher) ?
            (
              <div className='publishing-as-container'>
                <label className='publishing-as-label'>
                  Use Platform as
                </label>
                <ul className='publishing-as-ul-container'>
                  <li className='publishing-as-list'>
                    <a
                      onClick={() => this.handlePlatformUse('reader')}
                      className={usePlatformAs === 'reader' ?
                      ('publishing-as-active') : ('publishing-as-anchor')}
                    >
                      Reader
                    </a>
                  </li>
                  {currentReader.hasAuthorBuzz ?
                    (
                      <li className='publishing-as-list'>
                        <a
                          onClick={() => this.handlePlatformUse('author')}
                          className={usePlatformAs === 'author' ?
                          ('publishing-as-active') : ('publishing-as-anchor')}
                        >
                          Author
                        </a>
                      </li>
                    ) : null
                  }
                  {currentReader.hasPublisherBuzz && currentReader.isPublisher ? (
                    <li className='publishing-as-list'>
                      <a
                        onClick={() => this.handlePlatformUse('publisher')}
                        className={usePlatformAs === 'publisher' ?
                        ('publishing-as-active') : ('publishing-as-anchor')}
                      >
                        Publisher
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
            ) : null
          }

        </li>
        {currentReader.hasAuthorBuzz ||
         (currentReader.hasPublisherBuzz && currentReader.isPublisher) ?
         <hr className='profile-menu-divider' /> : null
        }
        <li className='profile-menu-element'>
          <Link
            to={`/profile/${currentReader.slug}`}
            className='profile-menu-anchor'
          >
              View Profile
          </Link>
        </li>
        <hr className='profile-menu-divider' />
        { this.handleMapProfileMenuItems() }
        <li className='profile-menu-element'>
          <a
            className='profile-menu-anchor'
            href='http://support.readerslegacy.com/'
            target='_blank'
          >
            Support
          </a>
        </li>
        <li className='profile-menu-element'>
          <a className='profile-menu-anchor' onClick={this.handleLogoutClick}>
            Logout
          </a>
        </li>
      </ul>
    )
  }

  mapMobileExternalLinks = () => {
    return (
      <div className='bookstore-mobile-external-links'>
        <ul className='bookstore-mobile-external-container'>
          <li className='bookstore-mobile-external-list'>
            <a
              className='bookstore-mobile-external-anchor'
            >
              Advertising
            </a>
          </li>
          <li className='bookstore-mobile-external-list'>
            <a
              className='bookstore-mobile-external-anchor'
            >
              Author Enrollment
            </a>
          </li>
          <li className='bookstore-mobile-external-list'>
            <a
              className='bookstore-mobile-external-anchor'
            >
              Publisher Enrollment
            </a>
          </li>
          <li className='bookstore-mobile-external-list'>
            <a
              className='bookstore-mobile-external-anchor'
            >
              Media
            </a>
          </li>
        </ul>
      </div>
    )
  }

  mapPopularCategories = () => {
    const { popularCategories } = this.props
    return popularCategories.slice(0, 7).map((category, index) => {
      return (
        <li
          key={`${index}_${category.id}`}
          className='categories-list-item'
        >
          <a
            href={`/categories/${category.slug}`}
            className='categories-list-anchor'
          >
              <span className='categories-list-name'>
                {category.name}
              </span>
            <span className='categories-list-icon'>
                &gt;
              </span>
          </a>
        </li>
      )
    })
  }

  mapMainCategories = () => {
    const { categories } = this.props
    return categories.map((category, index) => {
      return (
        <li
          key={`${index}_${category.id}`}
          className='categories-list-item'
        >
          <a
            href={`/categories/${category.slug}`}
            className='categories-list-anchor'
          >
              <span className='categories-list-name'>
                {category.name}
              </span>
            <span className='categories-list-icon'>
                &gt;
              </span>
          </a>
        </li>
      )
    })
  }

  mapCategoriesMenuList = () => {
    return (
      <section
        className='categories-list-menu-container'
        onWheel={this.handleWheelScroll}
        ref={container=>{this.locals.container = container}}
      >
        <ul className='categories-list-menu'>
          <li className='categories-list-item-title'>
            Popular Categories
          </li>
          {this.props.popularCategories ? this.mapPopularCategories() : null}
          <li className='categories-list-item-title'>
            Main Categories
          </li>
          {this.props.categories ? this.mapMainCategories() : null}
        </ul>
      </section>
    )
  }

  renderSearchResults = () => {
    const { searchResults } = this.props
    if (searchResults.length) {
      return searchResults.map((book, index) => {
        return (
          <Book
            key={`${index}_${book.id}`}
            url={book.slug ? `/book/${book.slug}` : '/#'}
            image={book.imageUrl}
            title={book.title}
            authors={book.writtenBy ? book.writtenBy : null}
            rating={book.rating ? book.rating : null}
            bookType='searchResult'
          />
        )
      })
    }
    return null
  }

  handleShowHideSearchResuls = () => {
    const { isSearchResultsOpen } = this.state
    this.setState({
      isSearchResultsOpen: !isSearchResultsOpen
    })
  }

  render() {
    const isUserLoggedIn = AuthService.currentUserExists()
    const { currentReader } = this.props
    const { searchResults, isSearchResultsOpen } = this.state
    return (
      <header className='main-bookstore-navbar-container slide-down'>
        <section className='bookstore-navbar-container'>
          <nav className='bookstore-navbar'>
            <div className='bookstore-navbar-left-container'>
              <figure className='bookstore-navbar-logo-figure'>
                <Link to='/browse' className='bookstore-navbar-menu-logo-anchor'>
                  <img src='/image/book-store-logo-mobile.png' className='bookstore-mobile-logo'/>
                  <img src='/image/book-store-logo.svg' className='bookstore-desktop-logo'/>
                </Link>
              </figure>
              <ul className='bookstore-navbar-menu-elements'>
                <li className='bookstore-navbar-menu-list'>
                  <a
                    className={this.state.categoriesMenuOpen ?
                      'bookstore-navbar-menu-anchor-active' :
                      'bookstore-navbar-menu-anchor'
                    }
                    onClick={this.handleCategoriesMenuClick}
                  >
                    Categories
                  </a>
                  <CategoriesMenu
                    customBurgerIcon={false}
                    customCrossIcon={false}
                    id={'bookclub-categories-nav-menu'}
                    isOpen={this.state.categoriesMenuOpen}
                    style={styles.categoriesMenu}
                  >
                    {this.mapCategoriesMenuList()}
                  </CategoriesMenu>
                </li>
                {isUserLoggedIn ?
                  (
                    <li className='bookstore-navbar-menu-list'>
                      <a
                        className='bookstore-navbar-menu-anchor'
                        href='#'
                      >
                        My Wishlist
                      </a>
                    </li>
                  ) : (
                    <li className='bookstore-navbar-menu-list'>
                      <a
                        className='bookstore-navbar-menu-anchor'
                        onClick={this.handleSignUpModalOpen}
                      >
                        Join Community
                      </a>
                    </li>
                  )
                }
              </ul>
              <form onKeyPress={this.handleEnterButton} className='bookstore-search-form'>
                <input
                  className='bookstore-search-input'
                  placeholder='Search store...'
                  type='text'
                  onChange={this.handleSeach('searchTerm')}
                  onClick={this.handleShowHideSearchResuls}
                  value={this.state.searchTerm}
                />
                {isSearchResultsOpen && this.state.searchTerm.length > 3 ?
                  (
                    <img
                      onClick={this.handleShowHideSearchResuls}
                      src='/image/close.png'
                      className='bookstore-close-results-icon'
                    />
                  ) : (
                      <img src='/image/search-icon.svg' className='bookstore-search-icon'/>
                  )
                }
                {searchResults && isSearchResultsOpen ?
                  (
                    <div className='bookstore-search-results-container'>
                      {this.renderSearchResults()}
                    </div>
                  ) : null
                }
              </form>
            </div>
            <div className='bookstore-navbar-right-container'>
              {isUserLoggedIn ?
                (
                  <ul className='bookstore-navbar-menu-elements bookstore-logged-menu-elements'>
                    <li className='bookstore-navbar-menu-list on-desktop-only'>
                      <LitcoinStatus/>
                    </li>
                    <li className='bookstore-navbar-menu-list on-desktop-only'>
                      <a
                        className='bookstore-navbar-menu-anchor bookstore-badge-container'
                        href='#'
                      >
                        <Badge
                          badgeContent={12}
                          primary={true}
                          badgeStyle={{
                            top: -5,
                            right: -7,
                            width: '20px',
                            height: '20px',
                            paddingTop: 1,
                            fontWeight: 700,
                            backgroundColor: Colors.red,
                          }}
                        >
                          <img
                            src='/image/notifications-icon.svg'
                            placeholder='Search in the Store'
                          />
                        </Badge>
                      </a>
                    </li>
                    <li className='bookstore-navbar-menu-list on-desktop-only'>
                      <a
                        className='bookstore-navbar-menu-anchor bookstore-badge-container'
                        href='#'
                      >
                        <Badge
                          badgeContent={3}
                          primary={true}
                          badgeStyle={{
                            top: -5,
                            right: -7,
                            width: '20px',
                            height: '20px',
                            paddingTop: 1,
                            fontWeight: 700,
                            backgroundColor: Colors.red,
                          }}
                        >
                          <img
                            src='/image/messages-icon.svg'
                            placeholder='Search in the Store'
                          />
                        </Badge>
                      </a>
                    </li>
                    <li className='bookstore-navbar-menu-list'>
                      <Link
                        className='bookstore-navbar-menu-anchor bookstore-badge-container'
                        to='/shop/cart'
                      >
                        <Badge
                          badgeContent={
                            this.state.currentReader.cartItems ?
                              this.state.currentReader.cartItems : 0
                            }
                          primary={true}
                          badgeStyle={{
                            top: -5,
                            right: -7,
                            width: '20px',
                            height: '20px',
                            paddingTop: 1,
                            fontWeight: 700,
                            backgroundColor: Colors.red,
                          }}
                        >
                          <img src='/image/cart.svg' />
                        </Badge>
                      </Link>
                    </li>
                    <li className='bookstore-navbar-menu-list profile-menu-badge on-desktop-only'>
                      <a
                        className='bookstore-navbar-menu-anchor'
                        onClick={this.handleProfileMenuShow}
                      >
                        <figure className='bookstore-navbar-user-badge'>
                          <img src={currentReader.profileImage} />
                        </figure>
                      </a>
                      { this.state.profileMenuOpen ?
                        this.userProfileMenu() : null
                      }
                    </li>
                    <li className='bookstore-navbar-menu-list on-mobile-only'>
                      <a
                        className='bookstore-navbar-menu-anchor'
                        onClick={this.handleLoggedMenuClick}
                      >
                        <MenuIcon />
                      </a>
                    </li>
                    <MobileMenu
                      customBurgerIcon={false}
                      customCrossIcon={false}
                      id={'bookclub-nav-menu'}
                      isOpen={this.state.isMobileLoggedMenuOpen}
                      style={styles.mobileMenu}
                    >
                      <section className='bookstore-mobile-menu-container'>
                        <div className='bookstore-mobile-menu-profile-container'>
                          <figure className='bookstore-mobile-menu-profile-figure'>
                            <Link
                              className='bookstore-mobile-menu-profile-img-anchor'
                              to={`/profile/${currentReader.slug}`}
                            >
                              <img
                                className='bookstore-mobile-menu-profile-img'
                                src={currentReader.profileImage}
                              />
                            </Link>
                          </figure>
                          <div className='bookstore-mobile-menu-profile-name'>
                            <Link
                              to={`/profile/${currentReader.slug}`}
                              className='bookstore-mobile-menu-profile-name-anchor'
                            >
                              <span>{currentReader.firstName} {currentReader.lastName}</span>
                            </Link>
                          </div>
                          <div className='bookstore-mobile-menu-litcoints'>
                            <LitcoinStatus />
                          </div>
                        </div>
                        <ul className='bookstore-mobile-elements-container'>
                          <li className='bookstore-mobile-menu-title'>
                            Store
                          </li>
                          <li className='bookstore-mobile-menu-list'>
                            <a
                              onClick={this.handleCategoriesClick}
                              className='bookstore-mobile-menu-anchor'
                            >
                              Categories
                            </a>
                          </li>
                          <li className='bookstore-mobile-menu-list'>
                            <a
                              className='bookstore-mobile-menu-anchor'
                            >
                              My Wishlist
                            </a>
                          </li>
                          <li className='bookstore-mobile-menu-title'>
                            Account
                          </li>
                          <li className='bookstore-mobile-menu-list'>
                            <Link
                              to={`/profile/${currentReader.slug}`}
                              className='bookstore-mobile-menu-anchor'
                            >
                              View Profile
                            </Link>
                          </li>
                          <li className='bookstore-mobile-menu-list'>
                            <Link
                              to='/'
                              className='bookstore-mobile-menu-anchor'
                            >
                              My Read Feed
                            </Link>
                          </li>
                          <li className='bookstore-mobile-menu-list'>
                            <a
                              className='bookstore-mobile-menu-anchor'
                            >
                              Orders
                            </a>
                          </li>
                          <li className='bookstore-mobile-menu-list'>
                            <Link
                              to='/profile/settings'
                              className='bookstore-mobile-menu-anchor'
                            >
                              Settings
                            </Link>
                          </li>
                          <li className='bookstore-mobile-menu-list'>
                            <a
                              className='bookstore-mobile-menu-anchor'
                            >
                              Help
                            </a>
                          </li>
                          <li className='bookstore-mobile-menu-list'>
                            <a
                              onClick={this.handleLogoutClick}
                              className='bookstore-mobile-menu-anchor'
                            >
                              Log Out
                            </a>
                          </li>
                        </ul>
                        {this.mapMobileExternalLinks()}
                        {this.state.categoriesOpen ? this.mapMobileCategoriesList() : null }
                      </section>
                    </MobileMenu>
                  </ul>
                ) : (
                  <ul className='bookstore-navbar-menu-elements'>
                    <li className='bookstore-navbar-menu-list on-desktop-only'>
                      <a
                        className='bookstore-navbar-menu-anchor'
                        onClick={this.handleLogInModalOpen}
                      >
                        Sign In
                      </a>
                    </li>
                    <li className='bookstore-navbar-menu-list'>
                      <a
                        className='bookstore-navbar-menu-anchor'
                        href='/shop/cart'
                      >
                        <img
                          src='/image/cart.svg'
                          placeholder='Search in the Store'
                        />
                      </a>
                    </li>
                    <li className='bookstore-navbar-menu-list on-mobile-only'>
                      <a
                        className='bookstore-navbar-menu-anchor'
                        onClick={this.handleMenuClick}
                      >
                        <MenuIcon />
                      </a>
                    </li>
                    <MobileMenu
                      customBurgerIcon={false}
                      customCrossIcon={false}
                      id={'bookclub-nav-menu'}
                      isOpen={this.state.isMobileMenuOpen}
                    >
                      <section className='bookstore-mobile-menu-container'>
                        <ul className='bookstore-mobile-elements-container'>
                          <li className='bookstore-mobile-menu-title'>
                            Store
                          </li>
                          <li className='bookstore-mobile-menu-list'>
                            <a
                              onClick={this.handleCategoriesClick}
                              className='bookstore-mobile-menu-anchor'
                            >
                              Categories
                            </a>
                          </li>
                          <li className='bookstore-mobile-menu-list'>
                            <a
                              onClick={this.handleSignUpModalOpen}
                              className='bookstore-mobile-menu-anchor'
                            >
                              Join the Community
                            </a>
                          </li>
                          <li className='bookstore-mobile-menu-title'>
                            GoRead Profile
                          </li>
                          <li className='bookstore-mobile-menu-list'>
                            <a
                              onClick={this.handleLogInModalOpen}
                              className='bookstore-mobile-menu-anchor'
                            >
                              Sign In
                            </a>
                          </li>
                        </ul>
                        {this.mapMobileExternalLinks()}
                        {this.state.categoriesOpen ? this.mapMobileCategoriesList() : null }
                      </section>
                    </MobileMenu>
                  </ul>
                )
              }
            </div>
          </nav>
        </section>
        <SignUpModal
          modalOpen={this.state.modalSignUpOpen}
          handleClose={this.handleSignUpModalClose}
        />
        <LogInModal
          modalOpen={this.state.modalLogInOpen}
          handleClose={this.handleLogInModalClose}
        />
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentReader: state.currentReader,
    categories: state.store.categories,
    popularCategories: state.store.popularCategories,
    searchResults: state.search.books,
  }
}

const mapDispatchToProps = {
  logoutCurrentReader,
  processUserLogout,
  usePlatformAs,
  getCurrentReader,
  verifyUserToken,
  getCategories,
  getPopularCategories,
  mainSearch,
  updateSearch,
}

export default connect(mapStateToProps, mapDispatchToProps)(BookStoreNavBar)
