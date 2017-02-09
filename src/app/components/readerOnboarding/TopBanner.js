import React from 'react'
import { Link } from 'react-router'
import Litcoins from '../common/Litcoins'
import { Colors } from '../../constants/style'

const styles = {
  header: {
    background: Colors.white,
    padding: 20,
  },
}

const TopBanner = () => {
  return (
    <div className='row text-right nav-container' style={styles.header}>
      <div className='small-12 columns center-text'>
        <Link to='/'>
          <img src='./image/logo.png' />
        </Link>
      </div>
      <div className='small-12 columns'>
        <Litcoins />
      </div>
    </div>

  )
}

export default TopBanner
