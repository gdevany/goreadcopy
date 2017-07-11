import React from 'react'
import SnackBar from 'material-ui/Snackbar'

const styles = {
  snackBarError: {
    backgroundColor: '#EC6464',
    textAlign: 'center',
    height: 50,
  },
  snackBarSuccess: {
    backgroundColor: '#32BB65',
    textAlign: 'center',
    height: 50,
  },
  contentStyle: {
    fontSize: 16,
  }
}

function SnackBarAlert(props) {
  const {
    open,
    message,
    onRequestClose,
    type
  } = props
  return (
    <SnackBar
      open={open}
      message={message}
      autoHideDuration={3000}
      onRequestClose={onRequestClose}
      bodyStyle={type === 'error' ?
        styles.snackBarError :
        styles.snackBarSuccess
      }
      contentStyle={styles.contentStyle}
    />
  )
}

export default SnackBarAlert
