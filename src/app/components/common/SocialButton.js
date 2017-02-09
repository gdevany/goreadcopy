import React from 'react'

const SocialButton = ({ href, text }) => {
  // TODO: add icon prop
  return (
    <div>
      <a
        href={href}
        className='button'
      >
      {text}
      </a>
    </div>
  )
}

export default SocialButton
