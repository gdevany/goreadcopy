import React, { PureComponent } from 'react'
import {
  Card,
  CardText,
} from 'material-ui'

class BaseMergedTile extends PureComponent {

  render() {
    const {
      author,
      timestamp,
      action,
    } = this.props

    return (
      <Card className='base-tile-container'>
        <div className='base-tile-header'>
          <figure className='tile-actor-figure'>
            <a href={author.link}>
              <img className='tile-actor-image' src={author.image} alt=''/>
            </a>
          </figure>
          <div className='tile-actor-details'>
            <div className='tile-actor-container'>
              <span className='tile-actor-name'>
                <a href={author.link}>{author.name}</a>
              </span>
              <span className='tile-actor-action'>
                {action}
              </span>
            </div>
            <div className='tile-actor-timestamp'>
              <span>
                {timestamp}
              </span>
            </div>
          </div>
        </div>
        <CardText className='tile-main-content'>
          {this.props.children}
        </CardText>
      </Card>
    )
  }
}

export default BaseMergedTile
