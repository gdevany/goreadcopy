import React, { PureComponent } from 'react'
import Radium from 'radium'
import { stack as MobileMenu } from 'react-burger-menu'
import { Link } from 'react-router'
import LitcoinBalance from './LitcoinBalance'
import R from 'ramda'
import SecondaryButton from './SecondaryButton'
import {
  Popover,
  Menu,
  MenuItem
} from 'material-ui'
import { ExternalRoutes as routes, PopularTopics } from '../../constants'
import { Colors } from '../../constants/style'
import SignUpModal from './SignUpModal'
import AuthedRedirect from './AuthedRedirect'
import HomeIcon from 'material-ui/svg-icons/action/home'
import PersonIcon from 'material-ui/svg-icons/action/perm-identity'
import NotificationIcon from 'material-ui/svg-icons/social/notifications-none'
import ChatIcon from 'material-ui/svg-icons/communication/chat-bubble-outline'
import './styles/mobile-menu.scss'

const { CATEGORIES, GENRES } = PopularTopics

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
}

const {
  articles,
  childrensLiteracy,
  authors,
  bookStore,
  login,
  news,
} = routes

class NavMenu extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      modalOpen: false,
      isLogged: true
    }

    this.handleModalClose = this.handleModalClose.bind(this)
  }

  handleModalOpen = () => {
    this.setState({ modalOpen: true })
  }

  handleModalClose = () => {
    this.setState({ modalOpen: false })
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

  render() {
    if (this.state.isLogged) {
      return (
        <div className='slide-down'>
          <div style={styles.mobileNavContainer} className='top-bar-mobile'>
            <Link to='/' className='mobile-gr-logo'>
              <img src='./image/logo.png' />
            </Link>

            <MobileMenu id={'mobile-menu-container'}>
              <ul className='mobile-menu'>
                <li className='menu-text'>
                  <Link to='/' style={styles.navItemLinks}>
                    <HomeIcon /> Read Feed
                  </Link>
                </li>
                <li className='menu-text'>
                  <Link to='my-profile' style={styles.navItemLinks}>
                    <PersonIcon/>
                    My Profile
                  </Link>
                </li>
                <li className='menu-text'>
                  <a href='' style={styles.navItemLinks}>
                    <NotificationIcon/>
                    Notifications
                  </a>
                </li>
                <li className='menu-text'>
                  <a href='' style={styles.navItemLinks}>
                    <ChatIcon/>
                    Messages
                  </a>
                </li>
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
                <li className='menu-text'>
                  <Link to='/' style={styles.navItemLinks}>
                    <HomeIcon /> Read Feed
                  </Link>
                </li>
                <li className='menu-text'>
                  <Link to='my-profile' style={styles.navItemLinks}>
                    <PersonIcon/>
                    My Profile
                  </Link>
                </li>
                <li className='menu-text'>
                  <a href='' style={styles.navItemLinks}>
                    <NotificationIcon/>
                    Notifications
                  </a>
                </li>
                <li className='menu-text'>
                  <a href='' style={styles.navItemLinks}>
                    <ChatIcon/>
                    Messages
                  </a>
                </li>
              </ul>
            </div>
            <div className='top-bar-right'>
              <ul className='menu'>
                <li>
                  <LitcoinBalance />
                </li>
              </ul>
            </div>
          </div>
        </div>
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
                <a href={login()}>
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
            </ul>

          </div>
        </div>
      </div>
    )
  }
}

export default Radium(NavMenu)
