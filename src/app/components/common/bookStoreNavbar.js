import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ExternalRoutes as routes } from '../../constants'
import { Auth, CurrentReader } from '../../redux/actions'
import { Auth as AuthService } from '../../services'
import LitcoinStatus from './LitcoinStatus'
import { Colors } from '../../constants/style'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import Badge from 'material-ui/Badge'
import R from 'ramda'

const isUserLoggedIn = AuthService.currentUserExists()
const { verifyUserToken, processUserLogout } = Auth
const { usePlatformAs, getCurrentReader, logoutCurrentReader } = CurrentReader

class BookStoreNavBar extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      profileMenuOpen: false,
      readerFetched: false,
      usePlatformAs: false,
    }
    this.handleProfileMenuShow = this.handleProfileMenuShow.bind(this)
    this.handleProfileMenuHide = this.handleProfileMenuHide.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  componentWillMount = () => {
    if (!this.state.readerFetched) {
      this.props.getCurrentReader()
      this.setState({
        readerFetched: true
      })
    }
  }

  componentWillReceiveProps = (nextProps) => {

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

  handlePlatformUse(platformUse) {
    this.setState({ usePlatformAs: platformUse })
    this.props.usePlatformAs(platformUse)
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

  render() {
    const { currentReader } = this.props
    return (
      <header className='main-bookstore-navbar-container slide-down'>
        <section className='bookstore-navbar-container'>
          <nav className='bookstore-navbar'>
            <div className='bookstore-navbar-left-container'>
              <figure className='bookstore-navbar-logo-figure'>
                <Link to='/' className='bookstore-navbar-menu-logo-anchor'>
                  <img src='/image/logo_share.png' className='bookstore-mobile-logo'/>
                  <img src='/image/book-store-logo.svg' className='bookstore-desktop-logo'/>
                </Link>
              </figure>
              <ul className='bookstore-navbar-menu-elements'>
                <li className='bookstore-navbar-menu-list'>
                  <a
                    className='bookstore-navbar-menu-anchor'
                    href='#'
                  >
                    Categories
                  </a>
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
                        href='#'
                      >
                        Join Community
                      </a>
                    </li>
                  )
                }
              </ul>
              <form className='bookstore-search-form'>
                <input
                  className='bookstore-search-input'
                  placeholder='Search store...'
                  type='text'
                />
                <img src='/image/search-icon.svg' className='bookstore-search-icon'/>
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
                      <a
                        className='bookstore-navbar-menu-anchor bookstore-badge-container'
                        href='#'
                      >
                        <Badge
                          badgeContent={
                            currentReader.cartItems ?
                              currentReader.cartItems : 0
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
                      </a>
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
                        href='#'
                      >
                        <MenuIcon />
                      </a>
                    </li>
                  </ul>
                ) : (
                  <ul className='bookstore-navbar-menu-elements'>
                    <li className='bookstore-navbar-menu-list on-desktop-only'>
                      <a
                        className='bookstore-navbar-menu-anchor'
                        href='#'
                      >
                        Sign In
                      </a>
                    </li>
                    <li className='bookstore-navbar-menu-list'>
                      <a
                        className='bookstore-navbar-menu-anchor'
                        href='#'
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
                        href='#'
                      >
                        <MenuIcon />
                      </a>
                    </li>
                  </ul>
                )
              }
            </div>
          </nav>
        </section>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentReader: state.currentReader,
  }
}

const mapDispatchToProps = {
  logoutCurrentReader,
  processUserLogout,
  usePlatformAs,
  getCurrentReader,
  verifyUserToken
}

export default connect(mapStateToProps, mapDispatchToProps)(BookStoreNavBar)
