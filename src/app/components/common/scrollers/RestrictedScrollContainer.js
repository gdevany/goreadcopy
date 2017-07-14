import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class RestrictedScrollContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    this.locals = {
      container: null
    }
    this.handleWheelScroll = this.handleWheelScroll.bind(this)
  }

  handleWheelScroll(e) {
    const { container } = this.locals
    const { onTopScroll, onBottomScroll } = this.props

    if (container) {
      const { scrollHeight, scrollTop, clientHeight } = container
      const { deltaY } = e

      if (scrollTop + deltaY < 0) {
        e.preventDefault()
        if (onTopScroll) { onTopScroll() }
        return false
      }
      if (scrollTop + deltaY + clientHeight > scrollHeight) {
        e.preventDefault()
        if (onBottomScroll) { onBottomScroll() }
        return false
      }
    }
    return true
  }

  render() {
    const { classes, children } = this.props
    return (
      <div
        ref={ref=>{this.locals.container = ref}}
        className={classes}
        onWheel={this.handleWheelScroll}
      >
        {children}
      </div>
    )
  }
}

RestrictedScrollContainer.propTypes = {
  classes: PropTypes.string,
  onTopScroll: PropTypes.func,
  onBottomScroll: PropTypes.func,
}

RestrictedScrollContainer.defaultProps = {
  classes: '',
  onTopScroll: null,
  onBottomScroll: null,
}

export default RestrictedScrollContainer
