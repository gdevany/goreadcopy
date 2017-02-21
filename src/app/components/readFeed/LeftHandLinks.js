import React, { PureComponent } from 'react'
import { ExternalRoutes as routes } from '../../constants'
import R from 'ramda'
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import ArrowUpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'

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
      myBookClubs,
      bookStore,
      myOrders,
      news,
      articles,
    } = routes

    const leftMenuRoutes = [
      ['My Book Clubs', myBookClubs],
      ['Book Store', bookStore],
      ['My Orders', myOrders],
      ['News', news],
      ['Articles', articles],
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

  handleMapHiddenMenuItems = () => {
    const {
      booksWithKen,
      childrensLiteracy,
      videoTutorials,
      referrals,
      games,
    } = routes

    const leftMenuRoutes = [
      ['Books With Ken', booksWithKen],
      ['Children\'s Literacy', childrensLiteracy],
      ['Video Tutorials', videoTutorials],
      ['Referrals', referrals],
      ['Games', games],
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

  handleShowMore = () => {
    this.setState({ isCollapsed: false })
  }

  handleShowLess = () => {
    this.setState({ isCollapsed: true })
  }

  render() {
    const { isCollapsed } = this.state

    return (
      <ul className='left-hand-menu-container'>
        { this.handleMapMenuItems() }
        { !isCollapsed ?
          <div>
            { this.handleMapHiddenMenuItems() }
          </div> :
          null
        }
        <li>
          { isCollapsed ?
            <a
              className='left-hand-action-more'
              onClick={this.handleShowMore}
              href='#'
            >
              See More
              <ArrowDownIcon />
            </a> :
            <a
              className='left-hand-action-less'
              onClick={this.handleShowLess}
              href='#'
            >
              See Less
              <ArrowUpIcon />
            </a>
          }
        </li>
      </ul>
    )
  }

}

export default LeftHandLinks
