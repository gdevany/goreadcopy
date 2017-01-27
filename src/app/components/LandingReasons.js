import React from 'react'

export const LandingReasons = ({statement, description}) => {
  return (
    <div className='landing-reasons-wrapper'>
      <p className='general-font general-statement'> {statement} </p>
      <p className='general-font'> {description} </p>
    </div>
  )
}

export default LandingReasons
