import React from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import { Colors } from '../../constants/style'

const styles = {
  notDisabled: {
    backgroundColor: Colors.white,
    border: `1px solid ${Colors.blue}`,
    boxShadow: 0,
    borderRadius: 25,
    fontFamily: 'Open Sans',
    fontSize: 16,
    padding: '15px 30px',

    ':hover': {
      backgroundColor: Colors.blue,
      transition: '0.35s'
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
    color: Colors.blue,
  },

  disabledText: {
    color: Colors.grey,
  },
}

const SecondaryButton = ({ label, onClick, type, disabled, value }) => (
  <button
    onClick={onClick}
    style={disabled ? styles.disabled : styles.notDisabled}
    type={type}
    disabled={disabled}
    value={value}
    className='secondary-button'
  >
    {label}
  </button>
)

SecondaryButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
}

export default Radium(SecondaryButton)
