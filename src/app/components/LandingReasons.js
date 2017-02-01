import React from 'react'

const LandingReasons = ({statement, description}) => {
  return (
    <div className='landing-reasons-wrapper'>
      <h2 className='general-font general-statement'> {statement} </h2>
      <p className='general-font'> {description} </p>
    </div>
  )
}

export default LandingReasons
