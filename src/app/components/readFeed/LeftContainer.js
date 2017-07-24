import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ReadFeedProfile from './ReadFeedProfile'
import LeftHandLinks from './LeftHandLinks'
import { FavoriteGenres } from '../common'
import { CONTEXTS as C } from '../../constants/litcoins'

class LeftContainer extends PureComponent {
  render() {
    const {
      id,
      genreIds,
      isMyReadFeed,
      fullname
    } = this.props
    return (
      <div className='left-container large-3 hide-for-small-only hide-for-medium-only columns'>
        { id ? <ReadFeedProfile id={id}/> : null }
        <LeftHandLinks />
        <FavoriteGenres
          genreIds={genreIds}
          isCurrentReader={isMyReadFeed}
          fullname={fullname}
          context={C.READ_FEED}
        />
        <ul className='left-hand-footer'>
          <li className='left-hand-menu-item'>
            <Link
              className='left-hand-menu-anchor'
              to='/privacy'
            >
              Privacy
            </Link>
          </li>
          <span className='left-hand-menu-divider'>|</span>
          <li className='left-hand-menu-item'>
            <Link
              className='left-hand-menu-anchor'
              to='/terms'
            >
              Terms
            </Link>
          </li>
          <span className='left-hand-menu-divider'>|</span>
          <li className='left-hand-menu-item'>
            <Link
              className='left-hand-menu-anchor'
              to='/antispam'
            >
              AntiSpam
            </Link>
          </li>
        </ul>
        <div className='copyright-container'>
          <span className='copyright-element'>
            GoRead (copyright) 2017
          </span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  currentReader: {
    id,
    genreIds = [],
    fullname
  }
}) => {
  return {
    id,
    genreIds,
    fullname
  }
}

export default connect(mapStateToProps)(LeftContainer)
