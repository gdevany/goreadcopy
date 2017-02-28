import React, { PureComponent } from 'react'
import { stack as MobileMenu } from 'react-burger-menu'
import { Link } from 'react-router'
import { Auth } from '../../redux/actions'
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
import HomeIcon from 'material-ui/svg-icons/action/home'
import PersonIcon from 'material-ui/svg-icons/action/perm-identity'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications-none'
import SearchIcon from 'material-ui/svg-icons/action/search'
import Badge from 'material-ui/Badge'
import ChatIcon from 'material-ui/svg-icons/communication/chat-bubble-outline'
import './styles/mobile-menu.scss'

const { CATEGORIES, GENRES } = PopularTopics
const { processUserLogout } = Auth

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
    }

    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleLogInModalClose = this.handleLogInModalClose.bind(this)
    this.handleProfileMenuShow = this.handleProfileMenuShow.bind(this)
    this.handleProfileMenuHide = this.handleProfileMenuHide.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
    this.handleClickSearch = this.handleClickSearch.bind(this)
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

  userProfileMenu = () => {
    const { currenReader } = this.props
    return (
      <ul
        className='profile-menu-container'
        onMouseLeave={this.handleProfileMenuHide}
      >
        <li className='profile-menu-element'>
          <a href={currenReader.url} className='profile-menu-anchor'>
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

  renderLogInMenu = () => {
    const { currenReader } = this.props
    return (
      <div className='slide-down'>
        <div style={styles.mobileNavContainer} className='top-bar-mobile'>
          <Link to='/' className='mobile-gr-logo'>
            <img src='./image/logo.png' />
          </Link>

          <MobileMenu id={'mobile-menu-container'}>
            <ul className='mobile-menu'>
              <li className='menu-text'>
                <Link to='/' style={styles.logNavItemLink}>
                  <HomeIcon /> Home
                </Link>
              </li>
              <li className='menu-text'>
                <a href={currenReader.url} style={styles.logNavItemLink}>
                  <PersonIcon/>
                  My Profile
                </a>
              </li>
              <li className='menu-text'>
                <a href='' style={styles.logNavItemLink}>
                  <NotificationsIcon/>
                  Notifications
                </a>
              </li>
              <li className='menu-text'>
                <a href='' style={styles.logNavItemLink}>
                  <ChatIcon/>
                  Messages
                </a>
              </li>
            </ul>
          </MobileMenu>
        </div>
        <div style={styles.navContainer} className='top-bar top-bar-logged-menu'>
          <div className='top-bar-left'>
            <ul style={styles.navUl} className='menu'>
              <li className='menu-text align-middle'>
                <Link to='/'>
                  <img src='./image/logo.png' />
                </Link>
              </li>
            </ul>
          </div>
          <div className='top-bar-center-items'>
            <ul className='menu'>
              <li className='menu-text loged-menu-item loged-menu-item-active'>
                <Link to='/' style={styles.logNavItemLink}>
                  <HomeIcon /> Home
                </Link>
              </li>
              <li className='menu-text loged-menu-item'>
                <a href='' style={styles.logNavItemLink}>
                  <ChatIcon/>
                  Messages
                </a>
              </li>
              <li className='menu-text loged-menu-item'>
                <a
                  href=''
                  style={styles.logNavItemLink}
                  onClick={this.handleClickSearch}
                >
                  <SearchIcon/>
                  Search
                </a>
              </li>
            </ul>
          </div>
          <div className='top-bar-right'>
            <ul className='menu'>
              <li className='menu-text'>
                <a href='' style={styles.logNavItemLink} className='menu-badge-container'>
                  <Badge
                    badgeContent={10}
                    primary={true}
                    badgeStyle={{
                      top: -10,
                      right: -10,
                      width: '18px',
                      height: '18px',
                    }}
                  >
                    <NotificationsIcon />
                  </Badge>
                </a>
              </li>
              <li className='menu-text'>
                <a href='' style={styles.logNavItemLink}>
                  <span>{currenReader.litcoinBalance}</span>
                  <img className='litcoin-img' src='./image/litcoin.png' />
                </a>
              </li>
              <li className='menu-text profile-menu-badge'>
                <a
                  href='#'
                  style={styles.logNavItemLink}
                  onClick={this.handleProfileMenuShow}
                >
                  <img
                    src={currenReader.profileImage}
                    style={styles.profileImageBadge}
                  />
                </a>
                { this.state.profileMenuOpen ?
                  this.userProfileMenu() : null}
              </li>
            </ul>
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
    const { isUserLoggedIn, currenReader } = this.props

    if (isUserLoggedIn || currenReader.litcoinBalance) {
      return (
        this.renderLogInMenu()
      )
    }
    return (
      <div className='slide-down'>
        <div style={styles.navContainer} className='top-bar'>

          <div style={styles.mobileNavContainer} className='top-bar-mobile'>
            <Link to='/' className='mobile-gr-logo'>
              <img src='./image/logo.png' />
            </Link>

            <MobileMenu id={'mobile-menu-container'}>
              <ul className='mobile-menu'>
                {this.handleMapNavItemsMobile()}
              </ul>
            </MobileMenu>
          </div>

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
    currenReader: state.currentReader
  }
}

export default connect(mapStateToProps, { processUserLogout })(NavMenu)
