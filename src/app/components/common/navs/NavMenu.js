import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { stack as MobileMenu } from 'react-burger-menu'
import { Link } from 'react-router'
import { Popover, Menu, MenuItem, Badge } from 'material-ui'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import { Auth, CurrentReader, Chat, Notifications as NotifActions } from '../../../redux/actions'
import { Auth as AuthService } from '../../../services'
import { connect } from 'react-redux'
import R from 'ramda'
import SecondaryButton from '../SecondaryButton'
import { ExternalRoutes as routes, PopularTopics } from '../../../constants'
import SearchModal from '../SearchModal'
import { Colors } from '../../../constants/style'
import LogInModal from '../SignInModal'
import AuthedRedirect from '../AuthedRedirect'
import LitcoinStatus from '../LitcoinStatus'
import { LatestMessagePopupWindow } from '../chat'
import { NotificationPopupWindow } from '../notifications'
import BooksForChildrenCounter from './utils/BooksForChildrenCounter'

const { toggleMessagePopup } = Chat
const { loadNotifications } = NotifActions
const { CATEGORIES, GENRES } = PopularTopics
const { usePlatformAs, getCurrentReader, logoutCurrentReader } = CurrentReader
const { verifyUserToken, processUserLogout } = Auth

const styles = {
  navContainer: {
    backgroundColor: Colors.white,
    padding: '0 20px',
    zIndex: 1000,
    width: '100%'
  },

  navLinks: {
    padding: 20,
  },

  navItemLinks: {
    fontWeight: 200,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logNavItemLink: {
    fontWeight: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.5em 0',
  },

  navUl: {
    backgroundColor: Colors.white,
  },

  rightNavItems: {
    padding: 20,
  },

  mobileNavContainer: {
    backgroundColor: Colors.white,
    left: 0,
    height: '60px',
    zIndex: '12',
  },

  bmBurgerButton: {
    position: 'fixed',
    width: 25,
    height: '30px',
    left: '36px',
    top: '36px'
  },

  popover: {
    padding: 20,

    ':hover': {
      backgroundColor: Colors.white,
      color: Colors.blue,
    },
  },

  profileImageBadge: {
    width: '42px',
    margin: '0 auto',
    height: '42px',
    borderRadius: '100%',
    border: 'solid 2px #696969',
  },

  menuIcon: {
    color: Colors.grey,
    marginTop: 5,
    height: 28,
    width: 28,
  },
  messageBadge: {
    position: 'relative',
    padding: 0,
  }
}

const {
  articles,
  authors,
  news,
} = routes

class NavMenu extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      modalOpen: false,
      modalLogInOpen: false,
      profileMenuOpen: false,
      searchModalOpen: false,
      usePlatformAs: false,
      readerFetched: false,
      chatModalOpen: false,
      socialFollowers: 0,
      socialFollowed: 0,
      isReadFeed: true,
      notificationsOpen: false,
      chatsContainerOpen: false,
    }

    this.handleProfileMenuShow = this.handleProfileMenuShow.bind(this)
    this.handleProfileMenuHide = this.handleProfileMenuHide.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
    this.handleClickSearch = this.handleClickSearch.bind(this)
    this.handleNotificationsShow = this.handleNotificationsShow.bind(this)
    this.handleHideNotifications = this.handleHideNotifications.bind(this)
    this.handleChatsContainerShow = this.handleChatsContainerShow.bind(this)
    this.loadNotifications = this.loadNotifications.bind(this)
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillReceiveProps = (nextProps) => {

    if (nextProps.social.followers) {
      this.setState({
        socialFollowers: nextProps.social.followers.count
      })
    }

    if (nextProps.social.followed) {
      this.setState({
        socialFollowed: nextProps.social.followed.count
      })
    }

    if (nextProps.currentReader.token && !this.state.readerFetched) {
      this.props.getCurrentReader()
      this.setState({
        readerFetched: true
      })
    }

    if (!this.state.usePlatformAs && nextProps.currentReader.publishingAs) {
      this.setState({ usePlatformAs: nextProps.currentReader.publishingAs })
    }
  }

  componentWillMount = () => {
    const { router } = this.context
    if (router.params.slug || router.location.pathname === '/profile/settings') {
      this.setState({
        isReadFeed: false,
      })
    }
  }

  componentDidMount() {
    this.loadNotifications()
  }

  loadNotifications = () => {
    const { isUserLoggedIn } = this.props
    if (isUserLoggedIn) {
      this.props.loadNotifications()
    }
  }

  handleNavHover = (event) => {
    event.preventDefault()

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    })
  }

  handleNotificationsShow = (event) => {
    const { chatsContainerOpen, notificationsOpen } = this.state
    chatsContainerOpen ? this.handleChatsContainerShow(event) : null
    !notificationsOpen ?
    this.setState({
      notificationsOpen: true,
      profileMenuOpen: false,
    }) :
    this.setState({ notificationsOpen: false })
  }

  handleHideNotifications = (event) => {
    event.preventDefault()
    this.setState({
      notificationsOpen: false,
    })
  }

  handleChatsContainerShow = (event) => {
    const { chatsContainerOpen } = this.state
    !chatsContainerOpen ?
    this.setState({
      chatsContainerOpen: true,
      notificationsOpen: false,
      profileMenuOpen: false,
    }) : (
    this.setState({ chatsContainerOpen: false })
    )
    this.props.toggleMessagePopup()
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  handleProfileMenuShow = (event) => {
    const { profileMenuOpen, chatsContainerOpen } = this.state
    chatsContainerOpen ? this.handleChatsContainerShow(event) : null
    !profileMenuOpen ?
    this.setState({
      profileMenuOpen: true,
      notificationsOpen: false,
    }) : this.setState({ profileMenuOpen: false })
  }

  handleProfileMenuHide = () => {
    this.setState({ profileMenuOpen: false })
  }

  handleClickSearch = (event) => {
    event.preventDefault()
    this.setState({ searchModalOpen: true })
  }

  handleSearchClose = () => {
    this.setState({ searchModalOpen: false })
  }

  handleMapProfileMenuItems = () => {
    const { referrals } = routes

    const nonMenuRoutes = [
      ['Orders', '/store/orders', true],
      ['Referrals', referrals],
      ['Settings', '/profile/settings', true],
    ]

    const NonMenuItem = ([title, routeFn, routeType], index) => (
      <li className='profile-menu-element' key={title + index}>
        { routeType ?
          (
            <Link
              className='profile-menu-anchor'
              to={routeFn}
            >
              {title}
            </Link>
          ) : (
            <a
              className='profile-menu-anchor'
              href={routeFn()}
            >
              {title}
            </a>
          )
        }
      </li>
    )

    return R.map(NonMenuItem, nonMenuRoutes)

  }

  handleMapProfileMenuItems = () => {
    const liClass = 'profile-menu-element'
    const anchorClass = 'profile-menu-anchor'
    const { currentReader } = this.props
    const {
      orders,
      referrals,
      authorBuzz,
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

  handleMenuClick = (event) => {
    event.preventDefault()
    if (this.state.isMobileMenuOpen) {
      this.setState({ isMobileMenuOpen: false })
    } else {
      this.setState({ isMobileMenuOpen: true })
    }
  }

  handleLogoutClick(event) {
    event.preventDefault()
    this.props.logoutCurrentReader()
    this.props.processUserLogout()
  }

  handlePlatformUse(platformUse) {
    this.setState({
      usePlatformAs: platformUse,
      isMobileMenuOpen: false
    })
    this.props.usePlatformAs(platformUse)
  }

  handleMapNavItems = (categories, genres) => {
    const bookStoreItem = (
      <li key={'popover-nav-item'} style={styles.navLinks} className='link nav-item'>

        <Link onMouseEnter={this.handleNavHover} to='/store'>
          Book Store
        </Link>

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
          style={styles.popover}
          className='nav-popover'
        >

          <div className='side-by-side-wrapper' onMouseLeave={this.handleRequestClose}>
            <div className='side-left'>

              <Menu style={styles}>
                <MenuItem
                  className='nav-popover-menu-title'
                  primaryText='BROWSE CATEGORIES:'
                  key='Menu Item title1'
                />
              { /** will probably turn categories and genre into objects to
                accomodate for links **/
                  categories.map((category, i) => {
                    return (
                      <MenuItem key={category + i}>
                        <Link
                          to={PopularTopics.routes[category]}
                        >
                         {PopularTopics.names[category]}
                        </Link>
                      </MenuItem>
                    )
                  })
                }
              </Menu>

            </div>

            <div className='side-right'>
              <Menu>
                <MenuItem
                  className='nav-popover-menu-title'
                  primaryText='BROWSE GENRES:'
                  key='Menu Item title2'
                />
                {
                  genres.map((genre, i) => {
                    return (
                      <MenuItem key={genre + i}>
                        <Link
                          to={PopularTopics.routes[genre]}
                        >
                          {PopularTopics.names[genre]}
                        </Link>
                      </MenuItem>
                    )
                  })
                }
                <MenuItem primaryText='See More >' href='/store' />
              </Menu>
            </div>

          </div>
        </Popover>
      </li>
    )

    const nonMenuRoutes = [
      ['Books for Kids', '/literacy', true],
      ['News', news],
      ['Articles', articles],
      ['Authors', authors],
    ]

    const NonMenuItem = ([title, routeFn, reactLink], index) => (
      <li style={styles.navLinks} className="link nav-item" key={title + index}>
        { reactLink ? (
          <Link to={routeFn}>
            {title}
          </Link>
        ) : (
          <a href={routeFn}>
            {title}
          </a>
        ) }
      </li>
    )

    const nonMenuItems = R.map(NonMenuItem, nonMenuRoutes)

    return [bookStoreItem].concat(nonMenuItems)

  }

  handleMapNavItemsMobile = () => {
    const { news, articles, authors } = routes

    const nonMenuRoutes = [
      ['Books for Kids', '/literacy', true],
      ['News', news],
      ['Articles', articles],
      ['Authors', authors],
    ]

    const NonMenuItem = ([title, routeFn, reactLink], index) => (
      <li style={styles.navLinks} className="link nav-item" key={title + index}>
        { reactLink ? (
          <Link to={routeFn}>
            {title}
          </Link>
        ) : (
          <a href={routeFn}>
            {title}
          </a>
        )}
      </li>
    )

    return R.map(NonMenuItem, nonMenuRoutes)

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

  mapMobileMenuItems = (type) => {
    const liClass = 'links-list'
    const anchorClass = 'links-anchor'
    const {
      myBookClubs,
      news,
      articles,
      goReadBooks,
      childrensLiteracy,
      videoTutorials,
      referrals,
      games,
    } = routes
    let nonMenuRoutes

    if (type === 'Explore') {
      nonMenuRoutes = [
        ['Store', '/store', true],
        ['My Book Clubs', myBookClubs],
        ['My Orders', '/store/orders', true],
        ['News', news],
        ['Articles', articles],
        ['GoRead Books', goReadBooks],
        ['Books for Kids', "/literacy", true],
        ['Video Tutorials', videoTutorials],
        ['Referrals', referrals],
        ['Games', games],
      ]
    }
    if (type === 'Help') {
      nonMenuRoutes = [
        ['Settings', 'profile/settings', true],
      ]
    }

    const NonMenuItem = this.mapElementsHandler(liClass, anchorClass)

    return R.map(NonMenuItem, nonMenuRoutes)

  }

  mapMobileMenuFooterItems = () => {
    const { advertisers, authorEnrollment, publishers, media } = routes

    const nonMenuRoutes = [
      ['Advertising', advertisers],
      ['Author Enrollment', authorEnrollment],
      ['Publisher Enrollment', publishers],
      ['Media', media],
    ]
    const NonMenuItem = ([title, routeFn], index) => (
      <a href={routeFn()} className='footer-anchor' key={title + index}>
        {title}
      </a>
    )
    return R.map(NonMenuItem, nonMenuRoutes)
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
                { currentReader.isPublisher ?
                  (
                    <li className='links-list'>
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
          (
            <hr className='profile-menu-divider' />
          ) : null
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
            href='http://support.goread.com/'
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
  countChatNotifications = () => {
    const { chat: { contacts } } = this.props
    if (contacts && contacts.length > 0) {
      return R.reduce((acc, c)=>{ return acc + c.unreadMessages }, 0, contacts)
    }
    return 0
  }

  renderLogInMenu = () => {
    const { currentReader, notifications } = this.props
    const { socialFollowers, socialFollowed, isReadFeed, usePlatformAs } = this.state
    const chatNotifications = this.countChatNotifications()
    return (
      <div className='relative-top-menu'>
        <div className='slide-down'>
          <div style={styles.mobileNavContainer} className='top-bar-mobile'>
            <nav className='nav-menu-logged'>
              <ul className='nav-menu-logged-container'>
                <li
                  className={`logged-menu-item ${isReadFeed ?
                    'loged-menu-item-active' : null} home`
                  }
                >
                  <Link
                    to='/' style={styles.navItemLinks}
                    className={`rf-nav-link ${isReadFeed ? 'home-link-active' : 'home-link'}`}
                  />
                </li>

                <li className='logged-menu-item'>
                  <a
                    style={styles.navItemLinks}
                    className='search-link rf-nav-link'
                    onClick={this.handleClickSearch}
                  />
                </li>
                <li className='logged-menu-item'>
                  <Badge
                    onClick={this.handleChatsContainerShow}
                    badgeContent={chatNotifications}
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
                    style={styles.messageBadge}
                  >
                    <a
                      style={styles.navItemLinks}
                      className='messages-link rf-nav-link'
                    />
                  </Badge>
                </li>

                <li style={styles.loggedInRightNavLi}>
                  <a
                    style={styles.navItemLinks}
                    className='menu-badge-container rf-nav-link'
                  >
                    <Badge
                      onClick={this.handleNotificationsShow}
                      badgeContent={
                        notifications.unreadCount ?
                          notifications.unreadCount : 0
                        }
                      primary={true}
                      badgeStyle={notifications.unreadCount ? {
                        top: 0,
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
                      />
                    </Badge>
                  </a>
                </li>
                <li style={styles.loggedInRightNavLi}>
                  <Link
                    to='/shop/cart'
                    style={styles.navItemLinks}
                    className='menu-badge-container rf-nav-link'
                  >
                    <Badge
                      badgeContent={
                        currentReader.cartItems ?
                          currentReader.cartItems : 0
                        }
                      primary={true}
                      badgeStyle={currentReader.cartItems ? {
                        top: -5,
                        right: -7,
                        width: '20px',
                        height: '20px',
                        paddingTop: 1,
                        fontWeight: 700,
                        backgroundColor: Colors.red,
                      } : { display: 'none' }}
                    >
                      <img src='/image/cart.svg' />
                    </Badge>
                  </Link>
                </li>
                <li className='nav-menu-logged-list'>
                  <a className='nav-menu-logged-anchor'>
                    <MenuIcon style={styles.menuIcon} onClick={this.handleMenuClick}/>
                  </a>
                </li>
              </ul>
            </nav>
            <MobileMenu
              customBurgerIcon={false}
              customCrossIcon={false}
              id={'mobile-menu-logged'}
              isOpen={this.state.isMobileMenuOpen}
              width={300}
            >
              <div className='profile-section-container'>
                <div className='first-row-elements'>
                  <Link to={`profile/${currentReader.slug}`} className='profile-badge-anchor'>
                    <figure className='profile-badge-container'>
                      <img
                        src={currentReader.profileImage}
                        className='profile-badge-img'
                        alt=''
                      />
                    </figure>
                  </Link>
                  <Link to={`profile/${currentReader.slug}`} className='profile-name-anchor'>
                    <span>{currentReader.firstName} {currentReader.lastName}</span>
                  </Link>
                </div>
                <div className='second-row-elements'>
                  <div className='follows-container'>
                    <span>
                      {socialFollowers ? socialFollowers : null} Followers
                    </span>
                  </div>
                  <div className='follows-container'>
                    <span>
                      {socialFollowed ? socialFollowed : null} Following
                    </span>
                  </div>
                </div>
                <div className='third-row-elements'>
                  <LitcoinStatus />
                </div>
              </div>
              <div className='explore-links-container'>
                {currentReader.hasAuthorBuzz ||
                (currentReader.hasPublisherBuzz && currentReader.isPublisher) ?
                  (
                    <ul className='links-container'>
                       <span className='links-title'>
                         Use Platform As
                       </span>
                      <div className='publishing-as-mobile-container'>
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
                        {currentReader.hasPublisherBuzz && currentReader.isPublisher ?
                          (
                            <li className='publishing-as-list'>
                              <a
                                onClick={() => this.handlePlatformUse('publisher')}
                                className={usePlatformAs === 'publisher' ?
                                  ('publishing-as-active') : ('publishing-as-anchor')}
                              >
                                Publisher
                              </a>
                            </li>
                          ) : null
                        }
                      </div>
                    </ul>
                  ) : null

                }
                <ul className='links-container'>
                  <span className='links-title'>
                    Explore
                  </span>
                  {currentReader.isAuthor && !currentReader.hasAuthorBuzz ?
                    (
                      <li className='links-list'>
                        <a
                          href={currentReader.author.url}
                          className='links-anchor'
                        >
                          My Author Page
                        </a>
                      </li>
                    ) : currentReader.isAuthor && currentReader.hasAuthorBuzz ?
                    (
                      <li className='links-list'>
                        <a
                          href={currentReader.author.url}
                          className='links-anchor'
                        >
                          GoRead Buzz
                        </a>
                      </li>
                    ) : null
                  }
                  {this.mapMobileMenuItems('Explore')}
                </ul>
                <ul className='links-container'>
                  <span className='links-title'>
                    Help & Settings
                  </span>
                  { currentReader.isAuthor && currentReader.hasAuthorBuzz ?
                    (
                      <li className='links-list'>
                        <a
                          href='/author/buzz/settings'
                          className='links-anchor'
                        >
                          Buzz Settings
                        </a>
                      </li>
                    ) : null

                  }
                  {this.mapMobileMenuItems('Help')}
                  <li className='links-list'>
                    <a onClick={this.handleLogoutClick} className='links-anchor'>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
              <div className='footer-links-container'>
                {this.mapMobileMenuFooterItems()}
              </div>
            </MobileMenu>
          </div>
          <div style={styles.navContainer} className='top-bar'>
            <div style={styles.insideNavContainer} className='top-bar-logged-menu'>
              <div className='top-bar-left'>
                <ul style={styles.navUl} className='menu'>
                  <li className='align-middle'>
                    <Link to='/' className='logo-logged-anchor'>
                      <img src='/image/logo.png' />
                    </Link>
                  </li>
                </ul>
              </div>

              <div className='top-bar-center-items'>
                <ul className='menu'>
                  <li
                    className={
                      `logged-menu-item ${isReadFeed ? 'loged-menu-item-active' : null} home`
                    }
                  >
                    <Link
                      to='/' style={styles.navItemLinks}
                      className={`rf-nav-link ${isReadFeed ? 'home-link-active' : 'home-link'}`}
                    >
                        Home
                    </Link>
                  </li>

                  <li style={styles.loggedInNavLi} className='logged-menu-item'>
                    <Badge
                      onClick={this.handleChatsContainerShow}
                      badgeContent={chatNotifications}
                      primary={true}
                      badgeStyle={chatNotifications > 0 ? {
                        top: 0,
                        left: 7,
                        width: '20px',
                        height: '20px',
                        fontWeight: 700,
                        fontSize: 12,
                        backgroundColor: Colors.red,
                      } : { display: 'none' }}
                      style={styles.messageBadge}
                    >
                      <a
                        style={styles.navItemLinks}
                        className='messages-link rf-nav-link'
                      >
                        Messages
                      </a>
                    </Badge>
                  </li>

                  <li className='logged-menu-item'>
                    <a
                      style={styles.navItemLinks}
                      className='search-link rf-nav-link'
                      onClick={this.handleClickSearch}
                    >
                      Search
                    </a>
                  </li>
                  <li className='logged-menu-item extra-nav-item'>
                    <BooksForChildrenCounter />
                  </li>
                </ul>
              </div>

              <div className='top-bar-right'>
                <ul className='menu'>

                  <li style={styles.loggedInRightNavLi}>
                    <LitcoinStatus />
                  </li>
                  <li style={styles.loggedInRightNavLi}>
                    <a
                      style={styles.navItemLinks}
                      className='menu-badge-container rf-nav-link'
                    >
                      <Badge
                        onClick={this.handleNotificationsShow}
                        badgeContent={
                          notifications.unreadCount ?
                            notifications.unreadCount : 0
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
                        />
                      </Badge>
                    </a>
                  </li>
                  <li style={styles.loggedInRightNavLi}>
                    <Link
                      to='/shop/cart'
                      style={styles.navItemLinks}
                      className='menu-badge-container rf-nav-link'
                    >
                      <Badge
                        badgeContent={
                          currentReader.cartItems ?
                            currentReader.cartItems : 0
                          }
                        primary={true}
                        badgeStyle={currentReader.cartItems ? {
                          top: -5,
                          right: -7,
                          width: '20px',
                          height: '20px',
                          paddingTop: 1,
                          fontWeight: 700,
                          backgroundColor: Colors.red,
                        } : { display: 'none' }}
                      >
                        <img src='/image/cart.svg' />
                      </Badge>
                    </Link>
                  </li>

                  <li style={styles.loggedInRightNavLi} className='profile-menu-badge'>
                    <a
                      style={styles.rightNavLinks}
                      onClick={this.handleProfileMenuShow}
                    >
                      <img
                        src={currentReader.profileImage}
                        style={styles.profileImageBadge}
                      />
                    </a>
                    { this.state.profileMenuOpen ?
                      this.userProfileMenu() : null}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <SearchModal
            modalOpen={this.state.searchModalOpen}
            handleClose={this.handleSearchClose}
          />
        </div>
        <div onMouseLeave={this.handleHideNotifications}>
          <NotificationPopupWindow
            wrapperClass='notifications-main-frame-container'
            mainClass='notifications-frame-container'
            isOpen={this.state.notificationsOpen}
          />
        </div>

        { this.props.chat.isMessagesOpen ?
          (
            <div onMouseLeave={this.handleChatsContainerShow}>
              <LatestMessagePopupWindow
                wrapperClass='chat-frame-main-container'
                mainClass='chats-frame-container'
                showMethod={this.handleChatsContainerShow}
              />
            </div>
          ) : null
        }
      </div>
    )
  }

  render() {
    const isUserLoggedIn = AuthService.currentUserExists()
    const { currentReader } = this.props

    if (isUserLoggedIn || currentReader.litcoinBalance) {
      return (
        this.renderLogInMenu()
      )
    }
    return (
      <div className='slide-down'>
        <div style={styles.mobileNavContainer} className='top-bar-mobile'>
          <MobileMenu id={'mobile-menu-container'}>
            <ul className='mobile-menu'>
              <li style={styles.navLinks} className='link nav-item'>
                <Link
                  to='/store'
                >
                  Book Store
                </Link>
              </li>
              {this.handleMapNavItemsMobile()}
            </ul>
          </MobileMenu>
          <div className='sign-in-btn-on-momile'>
            <Link to="/accounts/login">
              Log In
            </Link>
          </div>
        </div>
        <div style={styles.navContainer} className='top-bar'>
          <div className='top-bar-left'>
            <ul style={styles.navUl} className='dropdown menu' data-dropdown-menu>
              <li className='menu-text'>
                <Link to='/' className='logo-anon-anchor'>
                  <img src='/image/logo.png' />
                </Link>
              </li>
              {this.handleMapNavItems(R.values(CATEGORIES), R.values(GENRES))}
            </ul>
          </div>

          <div className='top-bar-right'>
            <ul className='menu'>

              <li style={styles.rightNavItems} className='link nav-item'>
                <Link to="/accounts/login">
                  Log In
                </Link>
              </li>

              <li>
                <Link to="/accounts/signup">
                  <SecondaryButton
                    label="Sign Up"
                  />
                </Link>
              </li>
            </ul>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  currentReader,
  social,
  chat,
  notifications,
}) => {
  return {
    currentReader,
    social,
    chat,
    notifications,
  }
}

const mapDispatchToProps = {
  logoutCurrentReader,
  processUserLogout,
  usePlatformAs,
  getCurrentReader,
  verifyUserToken,
  toggleMessagePopup,
  loadNotifications,
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu)
