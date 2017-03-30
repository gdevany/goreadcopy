import React, { PureComponent } from 'react'
import { Scroller } from './'

class PageScroller extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      ref: null
    }
    this.onScroll = this.onScroll.bind(this)
    this.fetchAndIncrement = this.fetchAndIncrement.bind(this)
  }

  fetchAndIncrement() {
    const { fetchHandler, currentPage } = this.props
    fetchHandler({ page: currentPage + 1 })
  }

  componentWillMount() {
    const { fetchOnLoad } = this.props
    if (fetchOnLoad) {
      this.fetchAndIncrement()
    }
  }

  onScroll(e) {
    e.stopPropagation()
    const { isLocked, scrollParent } = this.props
    const { ref } = this.state
    if (scrollParent === window) {
      const clientHeight = document.body.clientHeight
      const windowHeight = window.innerHeight
      const scrollOffset = window.scrollY || window.pageYOffset
      if (scrollOffset > (clientHeight - windowHeight) * 0.90 && !isLocked) {
        this.fetchAndIncrement()
      }
    } else {
      const { offsetHeight, scrollTop, scrollHeight } = ref
      if (offsetHeight + scrollTop > scrollHeight * 0.9 && !isLocked) {
        this.fetchAndIncrement()
      }
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
  clsName: React.PropTypes.string,
  fetchHandler: React.PropTypes.func,
  fetchOnLoad: React.PropTypes.bool,
  isLocked: React.PropTypes.bool,
  currentPage: React.PropTypes.number,
}

PageScroller.defaultProps = {
  clsName: '',
  fetchHandler: ()=>{return},
  fetchOnLoad: false,
  isLocked: false,
  currentPage: 1,
}

export default PageScroller
