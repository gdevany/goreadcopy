import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'

class HtmlToReact extends PureComponent {

  constructor(props) {
    super(props)
  }

  handleParse() {
    const { htmlInput } = this.props
    return renderHTML(htmlInput)
  }

  render() {
    const htmlToReturn = this.handleParse() || null
    return (
      <span>
        {htmlToReturn}
      </span>
    )
  }
}

HtmlToReact.propTypes = {
  htmlInput: PropTypes.string,
}

HtmlToReact.defaultProps = {
  htmlInput: null,
}

export default HtmlToReact
