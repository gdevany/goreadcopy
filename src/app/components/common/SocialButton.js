import React from 'react'
import Radium from 'radium'
import { Colors } from '../../constants/style'
import R from 'ramda'

const styles = {
  button: {
    backgroundColor: 'red',
    borderRadius: 25,
    color: Colors.white,
    display: 'inline-block',
    fontSize: 16,
    marginBottom: 20,
    padding: '15px 0',
    position: 'relative',
    width: 275,

    ':hover': {
      opacity: 0.9,
    },
  },

  buttonText: {
    float: 'left',
    marginLeft: 65,
  },

  socialIcon: {
    position: 'absolute',
    left: '10%',
  },
}

const SocialButton = ({ href, text, backgroundColor, icon }) => {
  // TODO: add icon prop
  return (
    <div className='center-text'>
      <a
        href={href}
        style={R.merge(styles.button, { backgroundColor })}
      >
      <img
        src={icon}
        style={styles.socialIcon}
        className='social-icon'
      />
      <span style={styles.buttonText}>{text}</span>
      </a>
    </div>
  )
}

export default Radium(SocialButton)
