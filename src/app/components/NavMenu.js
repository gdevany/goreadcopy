import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import R from 'ramda'
import PrimaryButton from './PrimaryButton'
import {
  Popover,
  Menu,
  MenuItem
} from 'material-ui'

import { ExternalRoutes as routes } from '../constants'
import SignUpModal from './SignUpModal'

const styles = {
  navContainer: {
    backgroundColor: '#fff',
  },

  navLinks: {
    padding: 20,
  },
}

class NavMenu extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      modalOpen: false
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
    const { bookStore, about, news, articles, authors } = routes

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
        >
          <div className='side-by-side-wrapper'>
            <div className='side-left'>
              <Menu>
                <MenuItem
                  className='nav-popover-menu-title'
                  primaryText='BROWSE CATEGORIES:'
                  key='Menu Item title1'
                />
              { /** will probably turn categories and genre into objects to
                accomodate for links **/
                  categories.map((category, i) => {
                    return (
                      <MenuItem
                        primaryText={category}
                        key={category + i}
                        href='#'
                      />
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
                      <MenuItem
                        primaryText={genre}
                        key={genre + i}
                        href='#'
                      />
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
      ['About', about],
      ['News', news],
      ['Articles', articles],
      ['Authors', authors],
    ]

    const NonMenuItem = ([title, routeFn], index) => (
      <li style={styles.navLinks} className='link nav-item' key={title + index}>
        <a href={routeFn()} >
          {title}
        </a>
      </li>
    )

    const nonMenuItems = R.map(NonMenuItem, nonMenuRoutes)

    return [bookStoreItem].concat(nonMenuItems)
  }

  render() {
    const categories = [
      'Popular',
      'Newest',
      'Award Winners',
      'GoRead Picks',
      'AudioBooks',
      'Textbooks',
      'Sale'
    ]
    const genres = [
      'Sci-Fi',
      'Romance',
      'Young Adult',
      'Sports',
      'Business',
      'Cooking'
    ]

    return (
      <div className='top-bar'>
        <div className='top-bar-left'>
          <ul className='dropdown menu' data-dropdown-menu>
            <li className='menu-text'>
              <Link to='/'>
                <img src='./image/logo.png' />
              </Link>
            </li>
            {this.handleMapNavItems(categories, genres)}
          </ul>
        </div>
        <div className='top-bar-right'>
          <ul className='menu'>
            <li className='link nav-item'>
              <a href='#'>
                Log In
              </a>
            </li>
            <li>
              <PrimaryButton
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
    )
  }
}

export default NavMenu
