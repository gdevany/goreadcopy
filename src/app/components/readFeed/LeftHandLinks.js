import React, { PureComponent } from 'react'

class LeftHandLinks extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isCollapsed: true
    }

    this.handleShowMore = this.handleShowMore.bind(this, false)
    this.handleShowLess = this.handleShowLess.bind(this, true)
  }

  handleShowMore = () => {
    this.setState({ isCollapsed: false })
  }
  handleShowLess = () => {
    this.setState({ isCollapsed: true })
  }
  render() {
    const isCollapsed = this.state.isCollapsed

    return (
      <ul>
        <li>
          <a href='#'>My Book Clubs</a>
        </li>
        <li>
          <a href='#'>Book Store</a>
        </li>
        <li>
          <a href='#'>My Orders</a>
        </li>
        <li>
          <a href='#'>News</a>
        </li>
        <li>
          <a href='#'>Articles</a>
        </li>
        { !isCollapsed ?
          <div>
            <li>
              <a href='#'>Books with Ken</a>
            </li>
            <li>
              <a href='#'>Children's Literacy</a>
            </li>
            <li>
              <a href='#'>Video Tutorials</a>
            </li>
            <li>
              <a href='#'>Refferals</a>
            </li>
            <li>
              <a href='#'>Games</a>
            </li>
          </div> :
          null
        }
        <li>
          { isCollapsed ?
            <a onClick={this.handleShowMore} href='#'>Show More</a> :
            <a onClick={this.handleShowLess} href='#'>Show Less</a>
          }
        </li>
      </ul>
    )
  }

}

export default LeftHandLinks
