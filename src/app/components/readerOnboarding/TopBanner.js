import React from 'react'
import { Link } from 'react-router'
import LitcoinBalance from '../common/LitcoinBalance'
import { Colors } from '../../constants/style'

const styles = {
  header: {
    background: Colors.white,
    padding: 20,
  },
}

const TopBanner = ({ selectAll }) => {
  return (
    <div className='row text-right nav-container' style={styles.header}>
      <div className='small-12 columns center-text'>
        <Link to='/'>
          <img src='./image/logo.png' />
        </Link>
      </div>
      <div className='small-12 columns'>
        <LitcoinBalance selectAll={selectAll}/>
      </div>
    </div>

  )
}

export default TopBanner
