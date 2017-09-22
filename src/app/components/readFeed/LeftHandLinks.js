import React, { PureComponent } from 'react'
import { ExternalRoutes as routes } from '../../constants'
import { Link } from 'react-router'
import R from 'ramda'
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import ArrowUpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'

const styles = {
  linkContainer: {
    marginTop: 30,
    textAlign: 'left',
  },
}

class LeftHandLinks extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isCollapsed: true
    }

    this.handleShowMore = this.handleShowMore.bind(this, false)
    this.handleShowLess = this.handleShowLess.bind(this, true)
  }

  handleMapMenuItems = () => {
    const {
      news,
      articles,
    } = routes

    const leftMenuRoutes = [
      ['My Orders', '/store/orders', true],
      ['News', news],
      ['Articles', articles],
    ]

    const leftMenuItem = ([title, routeFn, routeType], index) => (
      <li className='left-hand-menu-item' key={title + index}>
        { routeType ?
          (
            <Link
              className='left-hand-menu-anchor'
              to={routeFn}
            >
              {title}
            </Link>
          ) : (
            <a
              className='left-hand-menu-anchor'
              href={routeFn()}
            >
              {title}
            </a>
          )
        }
      </li>
    )
    return R.map(leftMenuItem, leftMenuRoutes)
  }

  handleMapHiddenMenuItems = () => {
    const {
      goReadBooks,
      childrensLiteracy,
      videoTutorials,
      referrals,
      games,
      authorEnrollment,
      publishers,
    } = routes

    const leftMenuRoutes = [
      ['GoRead Books', goReadBooks],
      ['Children\'s Literacy', childrensLiteracy],
      ['Video Tutorials', videoTutorials],
      ['Referrals', referrals],
      ['Games', games],
      ['Author Enrollment', authorEnrollment],
      ['Publisher Enrollment', publishers],
    ]

    const leftMenuItem = ([title, routeFn], index) => (
      <li className='left-hand-menu-item' key={title + index}>
        <a
          className='left-hand-menu-anchor'
          href={routeFn()}
        >
          {title}
        </a>
      </li>
    )
    return R.map(leftMenuItem, leftMenuRoutes)
  }

  handleShowMore = () => this.setState({ isCollapsed: false })

  handleShowLess = () => this.setState({ isCollapsed: true })

  render() {
    const { isCollapsed } = this.state
    const {
      myBookClubs,
    } = routes
    return (
      <div style={styles.linkContainer}>
        <span className='small-header'>Explore</span>
        <ul className='left-hand-menu-container'>
          <li className='left-hand-menu-item'>
            <a
              className='left-hand-menu-anchor'
              href={myBookClubs()}
            >
              My Book Clubs
            </a>
          </li>
          <li className='left-hand-menu-item'>
            <Link
              className='left-hand-menu-anchor'
              to='/store'
            >
              Book Store
            </Link>
          </li>
          { this.handleMapMenuItems() }
          {
            isCollapsed ? null :
              <div>
                { this.handleMapHiddenMenuItems() }
              </div>
          }
          <li>
            {
              isCollapsed ?
                <span
                  className='left-hand-action-more'
                  onClick={this.handleShowMore}
                >
                  See More
                  <ArrowDownIcon />
                </span> :
                <span
                  className='left-hand-action-less'
                  onClick={this.handleShowLess}
                >
                  See Less
                  <ArrowUpIcon />
                </span>
            }
          </li>
        </ul>
      </div>
    )
  }

}

export default LeftHandLinks
