import React, { PureComponent } from 'react'
import { stack as MobileMenu } from 'react-burger-menu'
import { Link } from 'react-router'
// import {
//   Popover,
//   Menu,
//   MenuItem
// } from 'material-ui'
import { Colors } from '../../constants/style'
import HomeIcon from 'material-ui/svg-icons/action/home'
import PersonIcon from 'material-ui/svg-icons/action/perm-identity'
import SearchIcon from 'material-ui/svg-icons/action/search'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications-none'
import Badge from 'material-ui/Badge'
import ChatIcon from 'material-ui/svg-icons/communication/chat-bubble-outline'
import './styles/mobile-menu.scss'

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
    width: '32px',
    margin: '0 auto',
    height: '32px',
    borderRadius: '100%',
    border: 'solid 1px #696969',
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
class NavMenuLogged extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      profileMenuOpen: false,
    }
    this.handleProfileMenuShow = this.handleProfileMenuShow.bind(this)
    this.handleProfileMenuHide = this.handleProfileMenuHide.bind(this)
  }

  handleProfileMenuShow() {
    if (!this.state.profileMenuOpen) {
      this.setState({ profileMenuOpen: true })
    } else {
      this.setState({ profileMenuOpen: false })
    }
  }

  handleProfileMenuHide() {
    this.setState({ profileMenuOpen: false })
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
                  <HomeIcon /> Read Feed
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
                    className='litcoin-img'
                    src='./image/kendunn.jpg'
                    style={styles.profileImageBadge}
                  />
                </a>
                { this.state.profileMenuOpen ?
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
                    <li className='profile-menu-element'>
                      <a href='' className='profile-menu-anchor'>
                        Orders
                      </a>
                    </li>
                    <li className='profile-menu-element'>
                      <a href='' className='profile-menu-anchor'>
                        Refferals
                      </a>
                    </li>
                    <li className='profile-menu-element'>
                      <a href='' className='profile-menu-anchor'>
                        Settings
                      </a>
                    </li>
                    <li className='profile-menu-element'>
                      <a href='' className='profile-menu-anchor'>
                        Help
                      </a>
                    </li>
                    <li className='profile-menu-element'>
                      <a href='' className='profile-menu-anchor'>
                        Logout
                      </a>
                    </li>
                  </ul> : null}
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default NavMenuLogged
