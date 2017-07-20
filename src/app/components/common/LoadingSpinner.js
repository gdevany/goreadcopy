import React from 'react'
import { Colors } from '../../constants/style'
import RefreshIndicator from 'material-ui/RefreshIndicator'

const innerStyle = {
  display: 'inline-block',
  position: 'relative',
}

export default function LoadingSpinner(props) {
  const { size, containerStyle } = props
  return (
    <div
      className='spinner-loader'
      style={containerStyle || {}}
    >
      <RefreshIndicator
        size={size || 40}
        left={0}
        top={0}
        loadingColor={Colors.blue}
        status='loading'
        style={{
          ...innerStyle,
        }}
      />
    </div>
  )
}
