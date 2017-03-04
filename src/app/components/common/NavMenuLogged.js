import React, { PureComponent } from 'react'
import { stack as MobileMenu } from 'react-burger-menu'
import { Link } from 'react-router'
import R from 'ramda'
import { Colors } from '../../constants/style'
import { ExternalRoutes as routes } from '../../constants'
import SearchModal from './SearchModal'
import HomeIcon from 'material-ui/svg-icons/action/home'
import SearchIcon from 'material-ui/svg-icons/action/search'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import ChatIcon from 'material-ui/svg-icons/communication/chat-bubble-outline'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications-none'
import Badge from 'material-ui/Badge'
import './styles/mobile-menu.scss'

const styles = {
  navContainer: {
    backgroundColor: Colors.white,
    height: 60,
    padding: 0,
    position: 'relative',
    zIndex: 10,
  },

  insideNavContainer: {
    margin: '0 auto',
    maxWidth: 1172,
    padding: 0,
  },

  navLinks: {
    padding: 20,
  },

  navItemLinks: {
    fontSize: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '19px 0px',
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
    width: '36px',
    margin: '0 auto',
    height: '36px',
    borderRadius: '15%',
    border: 'solid 1px #DADADA',
  },

  bmBurgerButton: {
    position: 'fixed',
    width: 25,
    height: '30px',
    left: '36px',
    top: '36px'
  },

  loggedInNavLi: {
    padding: '0px 20px',
  },

  loggedInRightNavLi: {
    padding: '0px 10px',
  },

  rightNavLinks: {
    padding: 0,
    fontSize: 16,
  }
}
class NavMenuLogged extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      profileMenuOpen: false,
      searchModalOpen: false,
      isMobileMenuOpen: false,
    }
    this.handleProfileMenuShow = this.handleProfileMenuShow.bind(this)
    this.handleProfileMenuHide = this.handleProfileMenuHide.bind(this)
    this.handleClickSearch = this.handleClickSearch.bind(this)
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
          <a href='' className='profile-menu-anchor'>
            Logout
          </a>
        </li>
      </ul>
    )
  }

  handleClickSearch = (event) => {
    event.preventDefault()
    this.setState({ searchModalOpen: true })
  }

  handleSearchClose = () => {
    this.setState({ searchModalOpen: false })
  }

  handleMenuClick = (event) => {
    event.preventDefault()
    if (this.state.isMobileMenuOpen) {
      this.setState({ isMobileMenuOpen: false })
    } else {
      this.setState({ isMobileMenuOpen: true })
    }
  }

  render() {
    return (
      <div className='slide-down'>
        <div style={styles.mobileNavContainer} className='top-bar-mobile'>
          <nav className='nav-menu-logged'>
            <ul className='nav-menu-logged-container'>
              <li className='nav-menu-logged-list'>
                <a href='' className='nav-menu-logged-anchor'>
                  <HomeIcon/>
                </a>
              </li>
              <li className='nav-menu-logged-list'>
                <a
                  className='nav-menu-logged-anchor'
                  onClick={this.handleClickSearch}
                >
                  <SearchIcon/>
                </a>
              </li>
              <li className='nav-menu-logged-list'>
                <a href='' className='nav-menu-logged-anchor'>
                  <ChatIcon/>
                </a>
              </li>
              <li className='nav-menu-logged-list'>
                <a
                  href=''
                  className='nav-menu-logged-anchor menu-badge-container'
                >
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
              <li className='nav-menu-logged-list'>
                <a href='' className='nav-menu-logged-anchor'>
                  <MenuIcon onClick={this.handleMenuClick}/>
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
                      src='./image/kendunn.jpg'
                      className='profile-badge-img'
                      alt=''
                    />
                  </figure>
                </a>
                <a href='' className='profile-name-anchor'>
                  <span>Ken Dunn</span>
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
                <a href='' className='litcoin-balance-anchor'>
                  <span>30,000</span>
                  <img className='litcoin-img' src='./image/litcoin.png' />
                </a>
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
                  style={styles.loggedInNavLi}
                  className='loged-menu-item loged-menu-item-active home'
                >
                  <Link to='/' style={styles.navItemLinks} className='home-link rf-nav-link'>
                    Home
                  </Link>
                </li>

                <li style={styles.loggedInNavLi} className='loged-menu-item'>
                  <a href='' style={styles.navItemLinks} className='messages-link rf-nav-link'>
                    Messages
                  </a>
                </li>

                <li style={styles.loggedInNavLi} className='loged-menu-item'>
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
                  <a href='' style={styles.rightNavLinks} className='rf-nav-link'>
                    <span>30,000</span>
                    <img className='litcoin-nav-img' src='./image/litcoin.png' />
                  </a>
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
        <SearchModal
          modalOpen={this.state.searchModalOpen}
          handleClose={this.handleSearchClose}
        />
      </div>
    )
  }
}

export default NavMenuLogged
