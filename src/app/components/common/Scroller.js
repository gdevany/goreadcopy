import React, { PureComponent } from 'react'
import { debounce } from 'lodash'

class Scroller extends PureComponent {
  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    const { scrollParent } = this.props
    scrollParent.addEventListener('scroll', this.getScrollHandler())
  }

  componentWillUnmount() {
    const { scrollParent } = this.props
    scrollParent.removeEventListener('scroll', this.getScrollHandler())
  }

  handleScroll(e) {
    const { enabled } = this.props
    if (enabled) {
      this.props.onScroll(e)
    }
  }

  getScrollHandler() {
    const { debounced, delay } = this.props
    return debounced ? debounce(this.handleScroll, delay) : this.handleScroll
  }

  render() {
    return null
  }
}

Scroller.proptypes = {
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
