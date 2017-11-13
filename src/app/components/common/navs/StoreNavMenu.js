import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Scroll from 'react-scroll'
import { ExternalRoutes as routes } from '../../../constants'
import {
  Auth,
  CurrentReader,
  Store,
  Chat,
  Notifications as NotifActions
} from '../../../redux/actions'
import { Auth as AuthService } from '../../../services'
import SearchModal from '../SearchModal'
import SignUpModal from '../SignUpModal'
import LogInModal from '../SignInModal'
import LitcoinStatus from '../LitcoinStatus'
import { Colors } from '../../../constants/style'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import Badge from 'material-ui/Badge'
import { Search } from '../../../redux/actions'
// import { debounce } from 'lodash'
// import Book from '../../store/common/Book'
import { stack as MobileMenu, slide as CategoriesMenu } from 'react-burger-menu'
import R from 'ramda'
import { NotificationPopupWindow } from '../notifications'
import { LatestMessagePopupWindow } from '../chat'
import { RestrictedScrollContainer } from '../scrollers'

const { mainSearch, updateSearch, cleanSearchState } = Search
const { verifyUserToken, processUserLogout } = Auth
const { usePlatformAs, getCurrentReader, logoutCurrentReader } = CurrentReader
const { getCategories, getPopularCategories } = Store
const { toggleMessagePopup } = Chat
const { loadNotifications } = NotifActions
const Anchor = Scroll.Link

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
      isFetchingResults: false,
      isSearchResultsOpen: false,
      notificationsOpen: false,
      chatsContainerOpen: false,
      wishlist: false,
      searchModalOpen: false,
    }
    this.handleSignUpModalClose = this.handleSignUpModalClose.bind(this)
    this.handleLogInModalClose = this.handleLogInModalClose.bind(this)
    this.handleProfileMenuShow = this.handleProfileMenuShow.bind(this)
    this.handleProfileMenuHide = this.handleProfileMenuHide.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
    this.handleCategoriesClick = this.handleCategoriesClick.bind(this)
    this.handleWheelScroll = this.handleWheelScroll.bind(this)
    // this.handleSeach = this.handleSeach.bind(this)
    // this.debouncedSearch = this.debouncedSearch.bind(this)
    this.countChatNotifications = this.countChatNotifications.bind(this)
    this.handleChatsContainerShow = this.handleChatsContainerShow.bind(this)
    this.handleNotificationsShow = this.handleNotificationsShow.bind(this)
    this.handleHideNotifications = this.handleHideNotifications.bind(this)
    this.handleMenuStateChange = this.handleMenuStateChange.bind(this)
    this.handleClickSearch = this.handleClickSearch.bind(this)
  }

  componentWillMount = () => {
    const isUserLoggedIn = AuthService.currentUserExists()
    const { getCurrentReader, getCategories, getPopularCategories } = this.props
    const { readerFetched } = this.state
    if (!readerFetched && isUserLoggedIn) {
      getCurrentReader()
      this.setState({
        readerFetched: true
      })
    }
    getCategories()
    getPopularCategories()
  }

  componentWillReceiveProps = (nextProps) => {
    const isUserLoggedIn = AuthService.currentUserExists()
    const { getCurrentReader } = this.props
    const { readerFetched, usePlatformAs, currentReader } = this.state
    if (isUserLoggedIn && !readerFetched) {
      getCurrentReader()
      this.setState({
        readerFetched: true
      })
    }
    if (!usePlatformAs && nextProps.currentReader.publishingAs) {
      this.setState({ usePlatformAs: nextProps.currentReader.publishingAs })
    }
    if (nextProps.currentReader && nextProps.currentReader.cartItems &&
      (nextProps.currentReader.cartItems !== currentReader.cartItems)) {
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
    if (nextProps.wishList) {
      this.setState({ wishlist: nextProps.wishList })
    }
  }

  componentDidMount() {
    this.loadNotifications()
  }

  loadNotifications = () => {
    if (AuthService.currentUserExists()) {
      this.props.loadNotifications()
    }
  }

  handleClickSearch = (event) => {
    event.preventDefault()
    this.setState({ searchModalOpen: true })
  }

  handleSearchClose = () => {
    this.setState({ searchModalOpen: false })
  }

  // handleSeach = R.curry((field, e) => {
  //   e.persist()
  //   this.setState({
  //     [field]: e.target.value,
  //     isSearchResultsOpen: false,
  //   })
  //   this.debouncedSearch(e)
  // })

  // debouncedSearch = debounce((event) => {
  //   const trimmedInput = event.target.value.trim()
  //   this.props.cleanSearchState()
  //   this.setState({
  //     searchResults: '',
  //   })
  //   if (trimmedInput.length >= 3) {
  //     this.props.mainSearch(trimmedInput, 'book-search')
  //   }
  // }, 1000)

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

  handleProfileMenuShow = (event) => {
    const { profileMenuOpen, chatsContainerOpen } = this.state
    chatsContainerOpen ? this.handleChatsContainerShow(event) : null
    !profileMenuOpen ?
    this.setState({
      profileMenuOpen: true,
      chatsContainerOpen: false,
      notificationsOpen: false,
      categoriesMenuOpen: false,
    }) : this.setState({ profileMenuOpen: false })
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
    const { categoriesMenuOpen, chatsContainerOpen } = this.state
    chatsContainerOpen ? this.handleChatsContainerShow(event) : null
    !categoriesMenuOpen ?
    this.setState({
      categoriesMenuOpen: true,
      notificationsOpen: false,
      profileMenuOpen: false,
    }) :
    this.setState({ categoriesMenuOpen: false })
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
    const { categoriesOpen } = this.state
    !categoriesOpen ?
    this.setState({ categoriesOpen: true }) :
    this.setState({ categoriesOpen: false })
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

  handleNotificationsShow = (event) => {
    const { chatsContainerOpen, notificationsOpen } = this.state
    chatsContainerOpen ? this.handleChatsContainerShow(event) : null
    !notificationsOpen ?
      this.setState({
        notificationsOpen: true,
        profileMenuOpen: false,
        categoriesMenuOpen: false,
      }) :
      this.setState({ notificationsOpen: false })
  }

  handleHideNotifications = (event) => {
    event.preventDefault()
    this.setState({ notificationsOpen: false })
  }

  handleChatsContainerShow = (event) => {
    const { chatsContainerOpen } = this.state
    !chatsContainerOpen ?
    this.setState({
      chatsContainerOpen: true,
      notificationsOpen: false,
      profileMenuOpen: false,
      categoriesMenuOpen: false,
    }) : (
    this.setState({ chatsContainerOpen: false })
    )
    this.props.toggleMessagePopup()
  }

  countChatNotifications = () => {
    const { chat: { contacts } } = this.props
    if (contacts && contacts.length > 0) {
      return R.reduce((acc, c)=>{ return acc + c.unreadMessages }, 0, contacts)
    }
    return 0
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
      referrals,
      authorBuzz,
      publisherBuzz,
      publisherBuzzSettings
    } = routes
    const nonMenuRoutes = [
      ['Orders', '/store/orders', true],
      ['Referrals', referrals],
      ['Settings', '/profile/settings', true],
    ]

    {currentReader.hasAuthorBuzz ?
      nonMenuRoutes.push(
        ['GoRead Buzz', authorBuzz({ slug: currentReader.author.slug }), false, true],
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

  handleMenuStateChange = (state)=> {
    const { isOpen } = state
    const { categoriesMenuOpen } = this.state
    if (!isOpen && categoriesMenuOpen) {
      this.setState({ categoriesMenuOpen: isOpen })
    }
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
          onClick={this.handleCategoriesMenuClick}
        >
          <Link
            to={`/categories/${category.slug}`}
            className='categories-list-anchor'
          >
              <span className='categories-list-name'>
                {category.name}
              </span>
            <span className='categories-list-icon'>
                &gt;
              </span>
          </Link>
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
          onClick={this.handleCategoriesMenuClick}
        >
          <Link
            to={`/categories/${category.slug}`}
            className='categories-list-anchor'
          >
              <span className='categories-list-name'>
                {category.name}
              </span>
            <span className='categories-list-icon'>
                &gt;
              </span>
          </Link>
        </li>
      )
    })
  }

  mapCategoriesMenuList = () => {
    return (
      <RestrictedScrollContainer
        classes='categories-list-menu-container'
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
      </RestrictedScrollContainer>
    )
  }

  // renderSearchResults = () => {
  //   const { searchResults } = this.props
  //   if (searchResults && searchResults.length) {
  //     return searchResults.map((book, index) => {
  //       return (
  //         <Book
  //           key={`${index}_${book.id}`}
  //           url={book.slug ? `/book/${book.slug}` : '/#'}
  //           image={book.imageUrl}
  //           title={book.title}
  //           authors={book.writtenBy ? book.writtenBy : null}
  //           rating={book.rating ? book.rating : null}
  //           bookType='searchResult'
  //         />
  //       )
  //     })
  //   }
  //   return (
  //     <div className='notifications-blank-state'>
  //       <figure className='notifications-blank-state-figure'>
  //         <img
  //           src='/image/notifications_blank.png'
  //           alt='Notifications Blank state'
  //         />
  //       </figure>
  //       <p>
  //         Sorry, we didn't find anything with the term:
  //         &nbsp;
  //         <b>{this.state.searchTerm}</b>
  //       </p>
  //     </div>
  //   )
  // }

  // handleShowHideSearchResuls = () => {
  //   if (this.state.isSearchResultsOpen) {
  //     this.props.cleanSearchState()
  //     this.setState({
  //       isSearchResultsOpen: false
  //     })
  //   }
  // }

  render() {
    const isUserLoggedIn = AuthService.currentUserExists()
    const chatNotifications = this.countChatNotifications()
    const { currentReader, notifications } = this.props
    const { wishlist } = this.state

    return (
      <div className='relative-top-menu'>
        <header className='main-bookstore-navbar-container slide-down'>
          <section className='bookstore-navbar-container'>
            <nav className='bookstore-navbar'>
              <div className='bookstore-navbar-left-container'>
                <figure className='bookstore-navbar-logo-figure'>
                  <Link to='/store' className='bookstore-navbar-menu-logo-anchor'>
                    <img src='/image/book-store-logo-mobile.png' className='bookstore-mobile-logo'/>
                    <img src='/image/book-store-logo.svg' className='bookstore-desktop-logo'/>
                  </Link>
                </figure>
                {/* <form onKeyPress={this.handleEnterButton} className='bookstore-search-form'>
                  <input
                    className='bookstore-search-input'
                    placeholder='Search store...'
                    type='text'
                    onChange={this.handleSeach('searchTerm')}
                    value={this.state.searchTerm}
                  />
                  {
                    // Show results only when these are true:
                    // -- It's flagged to open
                    // -- There are 3 or more characters to search
                    this.state.searchTerm.length >= 3 ?
                      !searchResults || !isSearchResultsOpen ?
                        (
                          <div className='loading-animation-store-search' />
                        ) :
                        (
                          <img
                            onClick={(e)=>{
                              this.handleShowHideSearchResuls(e)
                              this.setState({ searchTerm: '', searchResults: '' })
                            }}
                            src='/image/close.png'
                            className='bookstore-close-results-icon'
                          />
                        ) :
                      (
                        <img src='/image/search-icon.svg' className='bookstore-search-icon'/>
                      )
                  }
                  {
                    // Show results only when these are true:
                    // -- There are results
                    // -- It's flagged to open
                    // -- There are 3 or more characters to search
                    searchResults && isSearchResultsOpen && this.state.searchTerm.length >= 3 ?
                      (
                        <RestrictedScrollContainer
                          classes='bookstore-search-results-container'
                        >
                          {this.renderSearchResults()}
                        </RestrictedScrollContainer>
                      ) :
                      null
                  }
                </form> */}
              </div>
              <div className='bookstore-navbar-center-container'>
                <ul className='bookstore-navbar-menu-elements'>
                  <li className='bookstore-navbar-menu-list'>
                    <Link
                      className='bookstore-navbar-menu-anchor'
                      to='/'
                    >
                      Home
                    </Link>
                  </li>
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
                      onStateChange={this.handleMenuStateChange}
                      style={styles.categoriesMenu}
                    >
                      {this.mapCategoriesMenuList()}
                    </CategoriesMenu>
                  </li>
                  {isUserLoggedIn && wishlist &&
                    wishlist !== 'User has no books in the wish list' ?
                    (
                      <li className='bookstore-navbar-menu-list'>
                        <Anchor
                          to='wishlist'
                          spy={true}
                          smooth={true}
                          offset={-100}
                          duration={500}
                          className='bookstore-navbar-menu-anchor'
                        >
                          My Wishlist
                        </Anchor>
                      </li>
                    ) : null
                  }
                  {!isUserLoggedIn ?
                    (
                      <li className='bookstore-navbar-menu-list'>
                        <a
                          className='bookstore-navbar-menu-anchor'
                          onClick={this.handleSignUpModalOpen}
                        >
                          Join Community
                        </a>
                      </li>
                    ) : null
                  }
                  <li className='bookstore-navbar-menu-list'>
                    <a
                      className='bookstore-navbar-menu-anchor'
                      onClick={this.handleClickSearch}
                    >
                      Search
                    </a>
                  </li>
                </ul>
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
                          onClick={this.handleNotificationsShow}
                        >
                          <Badge
                            badgeContent={
                              notifications.unreadCount ?
                                notifications.unreadCount :
                                0
                            }
                            primary={true}
                            badgeStyle={notifications.unreadCount ? {
                              top: -5,
                              right: -7,
                              width: '20px',
                              height: '20px',
                              paddingTop: 1,
                              fontWeight: 700,
                              backgroundColor: Colors.red,
                            } : { display: 'none' }}
                          >
                            <img
                              src='/image/notifications-icon.svg'
                              placeholder='Notifications'
                            />
                          </Badge>
                        </a>
                      </li>
                      <li className='bookstore-navbar-menu-list on-desktop-only'>
                        <a
                          className='bookstore-navbar-menu-anchor bookstore-badge-container'
                          href='#'
                          onClick={this.handleChatsContainerShow}
                        >
                          <Badge
                            badgeContent={3}
                            primary={true}
                            badgeStyle={chatNotifications > 0 ? {
                              top: -7,
                              left: 7,
                              width: '20px',
                              height: '20px',
                              fontWeight: 700,
                              fontSize: 12,
                              backgroundColor: Colors.red,
                            } : { display: 'none' }}
                          >
                            <img
                              src='/image/messages-icon.svg'
                              placeholder='Messages'
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
                            badgeStyle={this.state.currentReader.cartItems ? {
                              top: -5,
                              right: -7,
                              width: '20px',
                              height: '20px',
                              paddingTop: 1,
                              fontWeight: 700,
                              backgroundColor: Colors.red,
                            } : { display: 'none' }}
                          >
                            <img
                              src='/image/cart.svg'
                              placeholder='Cart'
                            />
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
                            {isUserLoggedIn && wishlist &&
                              wishlist !== 'User has no books in the wish list' ?
                              (
                                <li className='bookstore-mobile-menu-list'>
                                  <Anchor
                                    to='wishlist'
                                    spy={true}
                                    smooth={true}
                                    offset={50}
                                    duration={500}
                                    className='bookstore-mobile-menu-anchor'
                                  >
                                    My Wishlist
                                  </Anchor>
                                </li>
                              ) : null
                            }
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
                        <Link
                          className='bookstore-navbar-menu-anchor'
                          to='/shop/cart'
                        >
                          <img
                            src='/image/cart.svg'
                            placeholder='Search in the Store'
                          />
                        </Link>
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
                              <Link
                                to='/'
                                className='bookstore-mobile-menu-anchor'
                              >
                                Home
                              </Link>
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
            <SearchModal
              modalOpen={this.state.searchModalOpen}
              handleClose={this.handleSearchClose}
            />
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
        <div onMouseLeave={this.handleHideNotifications}>
          <NotificationPopupWindow
            wrapperClass='store-notifications-main-frame-container'
            mainClass='store-notifications-frame-container'
            isOpen={this.state.notificationsOpen}
          />
        </div>
        { this.props.chat.isMessagesOpen ?
          (
            <div onMouseLeave={this.handleChatsContainerShow}>
              <LatestMessagePopupWindow
                wrapperClass='store-chat-frame-main-container'
                mainClass='store-chats-frame-container'
                showMethod={this.handleChatsContainerShow}
              />
            </div>
          ) : null
        }
      </div>
    )
  }
}

const mapStateToProps = ({
  currentReader,
  store: {
    categories,
    popularCategories
  },
  search: {
    books
  },
  chat,
  notifications,
  profilePage: {
    wishList,
  },
}) => {
  return {
    currentReader,
    categories,
    popularCategories,
    searchResults: books,
    chat,
    notifications,
    wishList,
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
  toggleMessagePopup,
  loadNotifications,
  cleanSearchState,
}

export default connect(mapStateToProps, mapDispatchToProps)(BookStoreNavBar)
