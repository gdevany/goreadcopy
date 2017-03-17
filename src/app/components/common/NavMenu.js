import React, { PureComponent } from 'react'
import { stack as MobileMenu } from 'react-burger-menu'
import { Link } from 'react-router'
import { Auth, CurrentReader } from '../../redux/actions'
import { connect } from 'react-redux'
import R from 'ramda'
import SecondaryButton from './SecondaryButton'
import { Popover, Menu, MenuItem } from 'material-ui'
import { ExternalRoutes as routes, PopularTopics } from '../../constants'
import SearchModal from './SearchModal'
import { Colors } from '../../constants/style'
import SignUpModal from './SignUpModal'
import LogInModal from './SignInModal'
import AuthedRedirect from './AuthedRedirect'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import Badge from 'material-ui/Badge'
import LitcoinStatus from './LitcoinStatus'

import './styles/mobile-menu.scss'

const { CATEGORIES, GENRES } = PopularTopics
const { processUserLogout } = Auth
const { usePlatformAs } = CurrentReader

const styles = {
  navContainer: {
    backgroundColor: Colors.white,
    padding: '0 20px',
    position: 'relative',
    zIndex: 10,
  },

  navLinks: {
    padding: 20,
  },

  navItemLinks: {
    fontWeight: 200,
    display: 'flex',
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
}

const {
  articles,
  childrensLiteracy,
  authors,
  bookStore,
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
    }

    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleLogInModalClose = this.handleLogInModalClose.bind(this)
    this.handleProfileMenuShow = this.handleProfileMenuShow.bind(this)
    this.handleProfileMenuHide = this.handleProfileMenuHide.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
    this.handleClickSearch = this.handleClickSearch.bind(this)
  }

  componentWillReceiveProps = (nextProps) => {
    if (!this.state.usePlatformAs && nextProps.currentReader.publishingAs) {
      this.setState({ usePlatformAs: nextProps.currentReader.publishingAs })
    }
  }

  handleModalOpen = () => {
    this.setState({ modalOpen: true })
  }

  handleModalClose = () => {
    this.setState({ modalOpen: false })
  }

  handleLogInModalOpen = (event) => {
    event.preventDefault()
    this.setState({ modalLogInOpen: true })
  }

  handleLogInModalClose = () => {
    this.setState({ modalLogInOpen: false })
  }

  handleNavHover = (event) => {
    event.preventDefault()

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
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

  handleClickSearch = (event) => {
    event.preventDefault()
    this.setState({ searchModalOpen: true })
  }

  handleSearchClose = () => {
    this.setState({ searchModalOpen: false })
  }

  handleMapProfileMenuItems = () => {
    const { orders, referrals, settings, help } = routes

    const nonMenuRoutes = [
      ['Orders', orders],
      ['Referrals', referrals],
      ['Settings', settings],
      ['Help', help],
    ]

    const NonMenuItem = ([title, routeFn], index) => (
      <li className='profile-menu-element' key={title + index}>
        <a
          className='profile-menu-anchor'
          href={routeFn()}
        >
          {title}
        </a>
      </li>
    )

    return R.map(NonMenuItem, nonMenuRoutes)

  }

  handleLogoutClick(event) {
    event.preventDefault()
    this.props.processUserLogout()
  }

  handlePlatformUse(platformUse) {
    this.setState({ usePlatformAs: platformUse })
    this.props.usePlatformAs(platformUse)
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
          {currentReader.hasAuthorBuzz || currentReader.hasPublisherBuzz ?
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
                  {currentReader.hasPublisherBuzz ? (
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
        <hr className='profile-menu-divider' />
        <li className='profile-menu-element'>
          <a href={currentReader.url} className='profile-menu-anchor'>
            View Profile
          </a>
        </li>
        <hr className='profile-menu-divider' />
        { this.handleMapProfileMenuItems() }
        <li className='profile-menu-element'>
          <a href='' className='profile-menu-anchor' onClick={this.handleLogoutClick}>
            Logout
          </a>
        </li>
      </ul>
    )
  }

  handleMapNavItems = (categories, genres) => {
    const bookStoreItem = (
      <li key={'popover-nav-item'} style={styles.navLinks} className='link nav-item'>

        <a onMouseEnter={this.handleNavHover} href={bookStore()}>
          Book Store
        </a>

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

              <Menu styles={styles}>
                <MenuItem
                  className='nav-popover-menu-title'
                  primaryText='BROWSE CATEGORIES:'
                  key='Menu Item title1'
                />
              { /** will probably turn categories and genre into objects to
                accomodate for links **/
                  categories.map((category, i) => {
                    return (
                      <AuthedRedirect.MenuItem
                        key={category + i}
                        href={PopularTopics.routes[category]}
                      >
                       {PopularTopics.names[category]}
                      </AuthedRedirect.MenuItem>
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
                      <AuthedRedirect.MenuItem
                        key={genre + i}
                        href={PopularTopics.routes[genre]}
                      >
                        {PopularTopics.names[genre]}
                      </AuthedRedirect.MenuItem>
                    )
                  })
                }
                <MenuItem primaryText='See More >' href={bookStore()} />
              </Menu>
            </div>

          </div>
        </Popover>
      </li>
    )

    const nonMenuRoutes = [
      ["Children's Literacy", childrensLiteracy],
      ['News', news],
      ['Articles', articles],
      ['Authors', authors],
    ]

    const NonMenuItem = ([title, routeFn], index) => (
      <li style={styles.navLinks} className='link nav-item' key={title + index}>
        <AuthedRedirect.Link
          href={routeFn()}
        >
          {title}
        </AuthedRedirect.Link>
      </li>
    )

    const nonMenuItems = R.map(NonMenuItem, nonMenuRoutes)

    return [bookStoreItem].concat(nonMenuItems)

  }

  handleMapNavItemsMobile = () => {
    const { bookStore, childrensLiteracy, news, articles, authors } = routes

    const nonMenuRoutes = [
      ['Book Store', bookStore],
      ["Children's Literacy", childrensLiteracy],
      ['News', news],
      ['Articles', articles],
      ['Authors', authors],
    ]

    const NonMenuItem = ([title, routeFn], index) => (
      <li style={styles.navLinks} className='link nav-item' key={title + index}>
        <AuthedRedirect.Link
          href={routeFn()}
        >
          {title}
        </AuthedRedirect.Link>
      </li>
    )

    return R.map(NonMenuItem, nonMenuRoutes)

  }
  mapElementsHandler = (liClass, anchorClass) => {
    return ([title, routeFn], index) => (
      <li className={liClass} key={title + index}>
        <a
          className={anchorClass}
          href={routeFn()}
        >
          {title}
        </a>
      </li>
    )
  }

  handleMapProfileMenuItems = () => {
    const liClass = 'profile-menu-element'
    const anchorClass = 'profile-menu-anchor'
    const { orders, referrals, settings, help } = routes
    const nonMenuRoutes = [
      ['Orders', orders],
      ['Referrals', referrals],
      ['Settings', settings],
      ['Help', help],
    ]
    const NonMenuItem = this.mapElementsHandler(liClass, anchorClass)

    return R.map(NonMenuItem, nonMenuRoutes)

  }

  mapMobileMenuItems = (type) => {
    const liClass = 'links-list'
    const anchorClass = 'links-anchor'
    const {
      myBookClubs,
      bookStore,
      myOrders,
      news,
      articles,
      booksWithKen,
      childrensLiteracy,
      videoTutorials,
      referrals,
      games,
      settings,
      help
    } = routes
    let nonMenuRoutes

    if (type === 'Explore') {
      nonMenuRoutes = [
        ['My Book Clubs', myBookClubs],
        ['Book Store', bookStore],
        ['My Orders', myOrders],
        ['News', news],
        ['Articles', articles],
        ['Books With Ken', booksWithKen],
        ['Children\'s Literacy', childrensLiteracy],
        ['Video Tutorials', videoTutorials],
        ['Referrals', referrals],
        ['Games', games],
      ]
    }
    if (type === 'Help') {
      nonMenuRoutes = [
        ['Settings', settings],
        ['Help', help],
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

  handleMenuClick = (event) => {
    event.preventDefault()
    if (this.state.isMobileMenuOpen) {
      this.setState({ isMobileMenuOpen: false })
    } else {
      this.setState({ isMobileMenuOpen: true })
    }
  }

  renderLogInMenu = () => {
    const { currentReader } = this.props
    return (
      <div className='slide-down'>
        <div style={styles.mobileNavContainer} className='top-bar-mobile'>
          <nav className='nav-menu-logged'>
            <ul className='nav-menu-logged-container'>

              <li
                className='logged-menu-item loged-menu-item-active home'
              >
                <Link to='/' style={styles.navItemLinks} className='home-link rf-nav-link' />
              </li>

              <li className='logged-menu-item'>
                <a
                  style={styles.navItemLinks}
                  className='search-link rf-nav-link'
                  onClick={this.handleClickSearch}
                />
              </li>

              <li className='logged-menu-item'>
                <a href='' style={styles.navItemLinks} className='messages-link rf-nav-link' />
              </li>

              <li style={styles.loggedInRightNavLi}>
                <a
                  href=''
                  style={styles.navItemLinks}
                  className='menu-badge-container rf-nav-link'
                >
                  <Badge
                    badgeContent={10}
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
                    <img src='./image/notifications-icon.svg' />
                  </Badge>
                </a>
              </li>

              <li className='nav-menu-logged-list'>
                <a href='' className='nav-menu-logged-anchor'>
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
                <a href='' className='profile-badge-anchor'>
                  <figure className='profile-badge-container'>
                    <img
                      src={currentReader.profileImage}
                      className='profile-badge-img'
                      alt=''
                    />
                  </figure>
                </a>
                <a href='' className='profile-name-anchor'>
                  <span>{currentReader.firstName} {currentReader.lastName}</span>
                </a>
              </div>
              <div className='second-row-elements'>
                <div className='follows-container'>
                  <span>0 Followers</span>
                </div>
                <div className='follows-container'>
                  <span>10 Following</span>
                </div>
              </div>
              <div className='third-row-elements'>
                <LitcoinStatus />
              </div>
            </div>
            <div className='explore-links-container'>
              <ul className='links-container'>
                <span className='links-title'>
                  Explore
                </span>
                {this.mapMobileMenuItems('Explore')}
              </ul>
              <ul className='links-container'>
                <span className='links-title'>
                  Help & Settings
                </span>
                {this.mapMobileMenuItems('Help')}
                <li className='links-list'>
                  <a href='#' className='links-anchor'>
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
                  <Link to='/'>
                    <img src='./image/logo.png' />
                  </Link>
                </li>
              </ul>
            </div>

            <div className='top-bar-center-items'>
              <ul className='menu'>

                <li
                  className='logged-menu-item loged-menu-item-active home'
                >
                  <Link to='/' style={styles.navItemLinks} className='home-link rf-nav-link'>
                    Home
                  </Link>
                </li>

                <li className='logged-menu-item'>
                  <a href='' style={styles.navItemLinks} className='messages-link rf-nav-link'>
                    Messages
                  </a>
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

              </ul>
            </div>

            <div className='top-bar-right'>
              <ul className='menu'>

                <li style={styles.loggedInRightNavLi}>
                  <LitcoinStatus />
                </li>
                <li style={styles.loggedInRightNavLi}>
                  <a
                    href=''
                    style={styles.navItemLinks}
                    className='menu-badge-container rf-nav-link'
                  >
                    <Badge
                      badgeContent={10}
                      primary={true}
                      badgeStyle={{
                        top: -4,
                        right: -4,
                        width: '20px',
                        height: '20px',
                        paddingTop: 1,
                        fontWeight: 700,
                        backgroundColor: Colors.red,
                      }}
                    >
                      <img src='./image/notifications-icon.svg' />
                    </Badge>
                  </a>
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
    )
  }
  render() {
    const { isUserLoggedIn, currentReader } = this.props

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
              {this.handleMapNavItemsMobile()}
            </ul>
          </MobileMenu>
        </div>
        <div style={styles.navContainer} className='top-bar'>
          <div className='top-bar-left'>
            <ul style={styles.navUl} className='dropdown menu' data-dropdown-menu>
              <li className='menu-text'>
                <Link to='/'>
                  <img src='./image/logo.png' />
                </Link>
              </li>
              {this.handleMapNavItems(R.values(CATEGORIES), R.values(GENRES))}
            </ul>
          </div>

          <div className='top-bar-right'>
            <ul className='menu'>

              <li style={styles.rightNavItems} className='link nav-item'>
                <a href='' onClick={this.handleLogInModalOpen}>
                  Log In
                </a>
              </li>

              <li>
                <SecondaryButton
                  label='Sign Up'
                  onClick={this.handleModalOpen}
                />
              </li>

              <SignUpModal
                modalOpen={this.state.modalOpen}
                handleClose={this.handleModalClose}
              />
              <LogInModal
                modalOpen={this.state.modalLogInOpen}
                handleClose={this.handleLogInModalClose}
              />
            </ul>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentReader: state.currentReader
  }
}

export default connect(mapStateToProps, { processUserLogout, usePlatformAs })(NavMenu)
