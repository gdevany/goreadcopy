import React, { PureComponent } from 'react'
import R from 'ramda'
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import ArrowUpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'

class FavoriteQuotes extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isCollapsed: true
    }
  }

  handleShowMore = () => this.setState({ isCollapsed: false })

  handleShowLess = () => this.setState({ isCollapsed: true })

  renderQuotes = (quotes) => {
    return quotes.map((quote, index) => {
      if (quote) {
        return (
          <li key={index} className='quoutes-list-element'>
            <img
              className='quotes-image'
              src='/image/quotes.png'
            />
            <p className='quoutes-text'>
              {quote}
            </p>
          </li>
        )
      }
      return null
    })
  }

  render() {
    const { quotes } = this.props
    const { isCollapsed } = this.state

    return (
      <div className='sidebar-element-container box'>
        <h3 className='sidebar-element-title'> Favorite Quotes </h3>
        <div>
          <ul className='sidear-quoutes-container'>
            {quotes ? this.renderQuotes(R.take(3, quotes)) : null}
          </ul>
          { !isCollapsed && quotes.length > 3 ? this.renderQuotes(quotes.slice(3)) : null}
          <span
            className='left-hand-action-more'
            onClick={isCollapsed ? this.handleShowMore : this.handleShowLess}
          >
            {isCollapsed ? 'See More' : 'See Less'}
            {isCollapsed ? <ArrowDownIcon /> : <ArrowUpIcon />}
          </span>
        </div>
      </div>
    )
  }
}

export default FavoriteQuotes
