import React, { PureComponent } from 'react'
import { Link } from 'react-router'

const migratedUris = ['/profile/']

class HyperLinkWrapper extends PureComponent {
  render() {
    let isFromReact = false
    const { url, cls } = this.props

    for (let i = 0; i < migratedUris.length; i++) {
      if (url.includes(migratedUris[i])) {
        isFromReact = true
        break
      }
    }

    return isFromReact ?
    (
      <Link to={url} className={cls}>
        {this.props.children}
      </Link>
    ) :
    (
      <a href={url} className={cls}>
        {this.props.children}
      </a>
    )
  }
}

export default HyperLinkWrapper
