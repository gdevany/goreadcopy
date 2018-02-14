import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Scroller } from './'

class PageScroller extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      ref: null
    }
    this.locals = {
      lastPageFetched: 1
    }
  }

  componentDidMount() {
    const { fetchOnLoad } = this.props
    if (fetchOnLoad) {
      this.fetchAndIncrement()
    }
  }

  onScroll = e => {
    e.stopPropagation()
    if (this.props.scrollParent === window) {
      this.onWindowScroll(e)
      return
    }
    this.onContainerScroll(e)
  }

  onWindowScroll = ev => {
    const { isLocked, onTopScroll, onBottomScroll } = this.props
    const clientHeight = document.body.clientHeight
    const windowHeight = window.innerHeight
    const scrollOffset = window.scrollY || window.pageYOffset
    if (onTopScroll && scrollOffset === 0) {
      this.fetchAndIncrement()
    }
    if (onBottomScroll && scrollOffset > (clientHeight - windowHeight) * 0.90 && !isLocked) {
      this.fetchAndIncrement()
    }
  }

  onContainerScroll = ev => {
    const { ref } = this.state
    const { isLocked, onTopScroll, onBottomScroll } = this.props
    if (ref !== null) {
      const { offsetHeight, scrollTop, scrollHeight } = ref
      if (onTopScroll && scrollTop === 0) {
        this.fetchAndIncrement()
      }
      if (onBottomScroll && offsetHeight + scrollTop > scrollHeight * 0.9 && !isLocked) {
        this.fetchAndIncrement()
      }
    }
  }

  fetchAndIncrement = () => {
    const { fetchHandler, currentPage } = this.props
    if (currentPage <= 1 || this.locals.lastPageFetched !== currentPage + 1 ) {
      fetchHandler({ page: currentPage + 1 })
      this.locals.lastPageFetched = currentPage + 1;
    }
  }

  render() {
    const { clsName } = this.props
    return (
      <Scroller
        onScroll={this.onScroll}
        debounced
        delay={250}
        enabled
        scrollParent={this.state.ref}
      >
        <div className={clsName} ref={(e)=>{!this.state.ref && this.setState({ ref: e })}}>
          {this.props.children}
        </div>
      </Scroller>
    )
  }
}

PageScroller.propTypes = {
  clsName: PropTypes.string,
  fetchHandler: PropTypes.func,
  fetchOnLoad: PropTypes.bool,
  isLocked: PropTypes.bool,
  currentPage: PropTypes.number,
  onTopScroll: PropTypes.bool,
  onBottomScroll: PropTypes.bool,
}

PageScroller.defaultProps = {
  clsName: '',
  fetchHandler: ()=>{return},
  fetchOnLoad: false,
  isLocked: false,
  currentPage: 1,
  onTopScroll: false,
  onBottomScroll: true,
}

export default PageScroller
