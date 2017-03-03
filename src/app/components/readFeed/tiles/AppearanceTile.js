import React, { Component } from 'react'
class AppearanceTile extends Component {
  render() {
    return (
      <div className='appearance-tile-container'>
        <figure className='heading-overflow-figure'>
          <img className='heading-img' src='./image/image.jpg' alt=''/>
        </figure>
        <div className='appearance-container'>
          <h4 className='appearance-title'>JK Rowling Los Angeles Meetup</h4>
          <div className='appearance-row'>
            <div className='appearance-column'>
              <span className='appearance-label'>Starts</span>
              <h4 className='appearance-date'>March 3</h4>
              <h5 className='appearance-time'>@ 7:00PM</h5>
            </div>
            <div className='appearance-column'>
              <span className='appearance-label'>Ends</span>
              <h4 className='appearance-date'>March 4</h4>
              <h5 className='appearance-time'>@ 5:00PM</h5>
            </div>
          </div>
          <div className='post-excerpt-container'>
            <p className='post-excerpt-pharagraph'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Dignissimos ratione cum sapiente quas...
              <a href='#' className='post-readmore-anchor'> See full details</a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default AppearanceTile
