import React from 'react'

const LandingImage = ({imageUrl}) => {
  // TODO: When we have images, either get from prop or directly from files.
  return (
    <img className='landing-image' src={imageUrl} />
  )
}

export default LandingImage
