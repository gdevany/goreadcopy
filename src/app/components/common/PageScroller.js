import React, { PureComponent } from 'react'
import { Scroller } from './'

class PageScroller extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      page: 1
    }
    this.onScroll = this.onScroll.bind(this)
  }

  componentWillMount() {
    const { fetchHandler } = this.props
    fetchHandler(/* Pasar solo el page de la peticion */)
  }

  onScroll(e) {
    console.log('Fired on PageScroller')
    e.stopPropagation()
    const { fetchHandler, isLocked, scrollParent } = this.props
    if (scrollParent === window) {
      const clientHeight = document.body.clientHeight
      const windowHeight = window.innerHeight
      const scrollOffset = window.scrollY || window.pageYOffset
      if (scrollOffset > (clientHeight - windowHeight) * 0.90 && !isLocked) {
        /* Pasar solo el page de la peticion */
        fetchHandler()
      }
    } else {
      const { offsetHeight, scrollTop, scrollHeight } = scrollParent
      if (offsetHeight + scrollTop > scrollHeight * 0.9) {
        console.log('Reached end of PageScroller!!!')
        /* Pasar solo el page de la peticion */
        fetchHandler()
      }
    }

  }

  render() {
    const { scrollParent } = this.props
    return (
      <Scroller
        onScroll={this.onScroll}
        debounced
        delay={250}
        enabled
        scrollParent={scrollParent}
      />
    )
  }
}

PageScroller.propTypes = {
  scrollParent: React.PropTypes.object,
  fetchHandler: React.PropTypes.func,
  isLocked: React.PropTypes.bool,
}

PageScroller.defaultProps = {
  scrollParent: window,
  fetchHandler: ()=>{return},
  isLocked: false,
}

export default PageScroller
