import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import currentEnvRoutes from '../services/currentEnvRoutes'
import R from 'ramda'
import routes from '../services/currentEnvRoutes'
import RaisedButton from 'material-ui/RaisedButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle
} from 'material-ui/Toolbar'

export class NavMenu extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  handleNavHover = (event) => {
    event.preventDefault()

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    })
  }

  handleMapNavItems = (categories, genres) => {
    const { bookStore, about, news, articles, authors } = routes

    const bookStoreItem = (
      <div key={0}>
        <p className='link nav-item'>
          <a onMouseEnter={this.handleNavHover} href={bookStore()}>
            Book Store
          </a>
        </p>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
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
              { /** will probably turn categories and genre into objects to accomodate for links **/
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
      </div>
    )

    const nonMenuRoutes = [
      ['About', about],
      ['News', news],
      ['Articles', articles],
      ['Authors', authors],
    ]

    const NonMenuItem = ([title, routeFn]) => (
      <p className='link nav-item' key={title + 'foobar'}>
        <a href={routeFn()} >
          {title}
        </a>
      </p>
    )

    const nonMenuItems = R.map(NonMenuItem, nonMenuRoutes)

    return [bookStoreItem].concat(nonMenuItems)
  }

  render() {
    const categories = ['Popular', 'Newest', 'Award Winners', 'GoRead Picks', 'AudioBooks', 'Textbooks', 'Sale']
    const genres = ['Sci-Fi', 'Romance', 'Young Adult', 'Sports', 'Business', 'Cooking']

    return (
      <Toolbar className='general-background'>
        <ToolbarGroup>
          <Link to='/'>
            <ToolbarTitle className='general-title nav-title' text='GoRead' />
          </Link>
        </ToolbarGroup>
        <ToolbarGroup>
          {this.handleMapNavItems(categories, genres)}
        </ToolbarGroup>
        <ToolbarGroup className='nav-menu-left'>
          <p className='link nav-item'>
            <a href='#'>
              Log In
            </a>
          </p>
          <RaisedButton
            backgroundColor='transparent'
            label='Sign Up'
            href='#'
          />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default NavMenu
