import React, { PureComponent } from 'react'
import { debounce } from 'lodash'
import R from 'ramda'

class Scroller extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      ref: null
    }
    this.handleScroll = this.handleScroll.bind(this)
    this.debouncedHandleScroll = debounce(this.handleScroll, this.props.delay)
    this.getScrollHandler = this.getScrollHandler.bind(this)
  }

  componentDidMount() {
    const { scrollParent } = this.props
    if (scrollParent !== null) {
      scrollParent.addEventListener('scroll', this.getScrollHandler())
    }
  }

  componentWillReceiveProps(nextProps) {
    const currentParent = this.props.scrollParent
    const newParent = nextProps.scrollParent
    if (!R.equals(currentParent, newParent)) {
      if (currentParent !== null) {
        currentParent.removeEventListener('scroll', this.getScrollHandler())
      }
      if (newParent !== null) {
        newParent.addEventListener('scroll', this.getScrollHandler())
      }
    }
  }

  componentWillUnmount() {
    const { scrollParent } = this.props
    if (scrollParent !== null) {
      scrollParent.removeEventListener('scroll', this.getScrollHandler())
    }
  }

  handleScroll(e) {
    const { enabled } = this.props
    if (enabled) {
      this.props.onScroll(e)
    }
  }

  getScrollHandler() {
    const { debounced } = this.props
    return debounced ? this.debouncedHandleScroll : this.handleScroll
  }

  render() {
    return this.props.children
  }
}

Scroller.propTypes = {
  onScroll: React.PropTypes.func,
  debounced: React.PropTypes.bool,
  delay: React.PropTypes.number,
  enabled: React.PropTypes.bool,
  scrollParent: React.PropTypes.object
}

Scroller.defaultProps = {
  onScroll: null,
  debounced: false,
  delay: 0,
  enabled: false,
  scrollParent: window
}

export default Scroller
