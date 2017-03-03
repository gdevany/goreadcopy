import React, { Component } from 'react'
import LocationIcon from 'material-ui/svg-icons/communication/location-on'
class PublisherUpdateTile extends Component {
  render() {
    return (
      <div className='publisher-tile-container'>
        <figure className='publisher-figure'>
          <img className='publisher-img' src='./image/ncp.jpg' alt=''/>
        </figure>
        <div className='publisher-content'>
          <h2 className='publisher-name'>Next Century Publishing</h2>
          <h4 className='publisher-title'>Publisher</h4>
          <div className='publisher-location-container'>
            <LocationIcon className='publisher-location-icon'/>
            <h5 className='publisher-location'>
              Los Angeles, CA
            </h5>
          </div>
        </div>
      </div>
    )
  }
}

export default PublisherUpdateTile
