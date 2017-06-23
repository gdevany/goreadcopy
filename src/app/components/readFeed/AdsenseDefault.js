import React, { PureComponent } from 'react'
import {
  Card,
  CardText,
} from 'material-ui'

const styles = {
  cardContainer: {
    borderRadius: 5,
    boxShadow: 'rgba(222, 222, 222, 0.5) 0px 4px 20px 0px',
  },
}

class AdsenseDefault extends PureComponent {

  render() {
    const { adchild } = this.props
    return (
      <Card style={styles.cardContainer} className='base-tile-container'>
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
          {adchild ? adchild : null}
        </CardText>
      </Card>
    )
  }
}

export default AdsenseDefault
