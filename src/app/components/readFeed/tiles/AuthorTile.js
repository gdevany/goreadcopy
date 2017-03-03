import React, { Component } from 'react'
import LocationIcon from 'material-ui/svg-icons/communication/location-on'
class AuthorTile extends Component {
  render() {
    return (
      <div className='author-tile-container'>
        <h2 className='author-name'>Scott Hurff</h2>
        <h4 className='author-title'>Author</h4>
        <div className='author-location-container'>
          <LocationIcon className='author-location-icon'/>
          <h5 className='author-location'>
            Los Angeles, CA
          </h5>
        </div>
        <div className='author-short-bio-container'>
          <p className='author-short-bio'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consectetur dicta laudantium odio illo asperiores. Eos nesciunt
            quibusdam odio fuga nam. At rerum consequatur aliquam quasi, totam
            magni! Modi accusantium, nostrum.
            <a href='#' className='author-readmore-anchor'>
              Read more
            </a>
          </p>
        </div>
      </div>
    )
  }
}

export default AuthorTile
