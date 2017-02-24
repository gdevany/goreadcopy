import React, { PureComponent } from 'react'
import { stack as MobileMenu } from 'react-burger-menu'
import { Link } from 'react-router'
import R from 'ramda'
import { Colors } from '../../constants/style'
import { ExternalRoutes as routes } from '../../constants'
import HomeIcon from 'material-ui/svg-icons/action/home'
import PersonIcon from 'material-ui/svg-icons/action/perm-identity'
import SearchIcon from 'material-ui/svg-icons/action/search'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications-none'
import Badge from 'material-ui/Badge'
import ChatIcon from 'material-ui/svg-icons/communication/chat-bubble-outline'
import './styles/mobile-menu.scss'
import { Auth } from '../../redux/actions'
import { connect } from 'react-redux'

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
  profileImageBadge: {
    width: '42px',
    margin: '0 auto',
    height: '42px',
    borderRadius: '100%',
    border: 'solid 2px #696969',
  },
  bmBurgerButton: {
    position: 'fixed',
    width: 25,
    height: '30px',
    left: '36px',
    top: '36px'
  },
}
class NavMenuLogged extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      profileMenuOpen: false,
    }
    this.handleProfileMenuShow = this.handleProfileMenuShow.bind(this)
    this.handleProfileMenuHide = this.handleProfileMenuHide.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
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
    return (
      <ul
        className='profile-menu-container'
        onMouseLeave={this.handleProfileMenuHide}
      >
        <li className='profile-menu-element'>
          <a href='' className='profile-menu-anchor'>
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

  render() {
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
                  <HomeIcon /> Home
                </Link>
              </li>
              <li className='menu-text'>
                <a href='#' style={styles.navItemLinks}>
                  <PersonIcon/>
                  My Profile
                </a>
              </li>
              <li className='menu-text'>
                <a href='' style={styles.navItemLinks}>
                  <NotificationsIcon/>
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
                <Link to='/' style={styles.navItemLinks}>
                  <HomeIcon /> Home
                </Link>
              </li>
              <li className='menu-text loged-menu-item'>
                <a href='' style={styles.navItemLinks}>
                  <ChatIcon/>
                  Messages
                </a>
              </li>
              <li className='menu-text loged-menu-item'>
                <a href='' style={styles.navItemLinks}>
                  <SearchIcon/>
                  Search
                </a>
              </li>
            </ul>
          </div>
          <div className='top-bar-right'>
            <ul className='menu'>
              <li className='menu-text'>
                <a href='' style={styles.navItemLinks} className='menu-badge-container'>
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
                <a href='' style={styles.navItemLinks}>
                  <span>30,000</span>
                  <img className='litcoin-img' src='./image/litcoin.png' />
                </a>
              </li>
              <li className='menu-text profile-menu-badge'>
                <a
                  href='#'
                  style={styles.navItemLinks}
                  onClick={this.handleProfileMenuShow}
                >
                  <img
                    src='./image/kendunn.jpg'
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
    )
  }
}

export default connect(null, { processUserLogout })(NavMenuLogged)
