import React from 'react'
import { connect } from 'react-redux'
import SnackBar from 'material-ui/Snackbar'
import { Common } from '../../../redux/actions'

const { clearAlert } = Common

const styles = {
  error: {
    backgroundColor: '#EC6464',
    textAlign: 'center',
    height: 50,
  },
  success: {
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
    alerts: {
      isOpen,
      message,
      type
    }
  } = props
  return (
    <SnackBar
      open={isOpen || false}
      message={message || ''}
      autoHideDuration={3000}
      onRequestClose={()=>{ props.clearAlert() }}
      bodyStyle={type === 'error' ?
        styles.error :
        styles.success
      }
      contentStyle={styles.contentStyle}
    />
  )
}

const mapStateToProps = ({
  common: {
    alerts
  }
}) => {
  return {
    alerts
  }
}

const mapDispatchToProps = {
  clearAlert,
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackBarAlert)
