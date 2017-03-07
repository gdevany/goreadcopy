import React, { PureComponent } from 'react'
import {
  Card,
  CardText,
} from 'material-ui'

class AdsenseDefault extends PureComponent {

  render() {
    return (
      <Card className='base-tile-container'>
        <div className='base-tile-header'>
          <div className='tile-actor-details'>
            <div className='tile-actor-timestamp'>
              <span>
                Promoted
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

export default AdsenseDefault
