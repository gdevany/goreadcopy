import React, { PropTypes } from 'react'
import Radium from 'radium'

const styles = {
  notDisabled: {
    backgroundColor: 'black',
    boxShadow: 0,
    borderRadius: 0,
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 16,
    height: 50,
    textTransform: 'uppercase',
    width: '100%',
    '@media only screen and (min-width: 767px)': {
      width: 250,
    },

    ':hover': {
      backgroundColor: 'red',
    },

    ':focus': {
      outline: 0,
    },
  },

  disabled: {
    backgroundColor: 'white',
    boxShadow: 0,
    border: '1px solid grey',
    borderRadius: 0,
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 16,
    height: 50,
    textTransform: 'uppercase',
    width: '100%',
    '@media only screen and (min-width: 767px)': {
      width: 230,
    },
  },

  buttonContainer: {
    boxShadow: 0,
    borderRadius: 0,
    height: 50,
  },

  labelText: {
    color: 'white',
  },

  disabledText: {
    color: 'grey',
  },
}

const PrimaryButton = ({ label, onClick, type, disabled, value }) => (
  <button
    onClick={onClick}
    style={disabled ? styles.disabled : styles.notDisabled}
    type={type}
    disabled={disabled}
    value={value}
    className='button'
  >
    <span style={disabled ? styles.disabledText : styles.labelText}> {label} </span>
  </button>
)

PrimaryButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
}

export default Radium(PrimaryButton)
