import React from 'react'
import { Link } from 'react-router'

const MenuFooter = (props) => {
  return (
    <div>
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
          GoRead © 2017
        </span>
      </div>
    </div>
  )
}

export default MenuFooter
