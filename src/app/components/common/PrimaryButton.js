import React, { PropTypes } from 'react'
import Radium from 'radium'
import { Colors } from '../../constants/style'

const styles = {
  notDisabled: {
    backgroundColor: Colors.blue,
    border: `1px solid ${Colors.blue}`,
    color: Colors.white,
    boxShadow: 0,
    borderRadius: 25,
    fontSize: 16,
    padding: '15px 30px',

    ':hover': {
      backgroundColor: Colors.blue,
      opacity: 0.85,
    },

    ':focus': {
      outline: 0,
    },
  },

  disabled: {
    backgroundColor: 'white',
    boxShadow: 0,
    border: '1px solid grey',
    borderRadius: 25,
    fontFamily: 'Open Sans',
    fontSize: 16,
    padding: '15px 30px',
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
