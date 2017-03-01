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

  mapMobileMenuExploreItems = () => {
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
    } = routes

    const nonMenuRoutes = [
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

    const NonMenuItem = ([title, routeFn], index) => (
      <li className='links-list' key={title + index}>
        <a href={routeFn()} className='links-anchor'>
          {title}
        </a>
      </li>
    )

    return R.map(NonMenuItem, nonMenuRoutes)

  }

  mapMobileMenuHelpItems = () => {
    const { settings, help } = routes

    const nonMenuRoutes = [
      ['Settings', settings],
      ['Help', help],
    ]

    const NonMenuItem = ([title, routeFn], index) => (
      <li className='links-list' key={title + index}>
        <a href={routeFn()} className='links-anchor'>
          {title}
        </a>
      </li>
    )

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
                  href=''
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
                {this.mapMobileMenuExploreItems()}
              </ul>
              <ul className='links-container'>
                <span className='links-title'>
                  Help & Settings
                </span>
                {this.mapMobileMenuHelpItems()}
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
                <a
                  href=''
                  style={styles.navItemLinks}
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
        <SearchModal
          modalOpen={this.state.searchModalOpen}
          handleClose={this.handleSearchClose}
        />
      </div>
    )
  }
}

export default NavMenuLogged
