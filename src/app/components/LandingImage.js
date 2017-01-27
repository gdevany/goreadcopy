import React from 'react'

export const LandingImage = ({imageUrl}) => {
  // TODO: When we have images, either get from prop or directly from files.
  return (
    <img className='landing-image' src={imageUrl} />
  )
}

export default LandingImage
