import React, { PureComponent } from 'react'
import {
  Card,
  CardHeader,
  CardText,
} from 'material-ui'
import { Colors } from '../../constants/style'

const styles = {

  headerContainer: {
    padding: 30,
    textAlign: 'left',
  },
  commentHeaderContainer: {
    padding: '30px 30px 15px',
    textAlign: 'left',
  },
  card: {
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 20px',
  },
  nameText: {
    color: Colors.blue,
    display: 'inline',
    fontSize: 14,
    fontWeight: 600,
  },
  postText: {
    color: Colors.black,
    display: 'inline',
    marginLeft: 6,
  },
  commentTimeStamp: {
    display: 'inline',
    marginLeft: 10,
  },
  timeStamp: {
    fontSize: 14,
    color: Colors.grey,
    position: 'absolute',
    left: 85,
    top: 53,
  },
  textContainer: {
    marginTop: -5,
  },
  contentContainer: {
    padding: '0 30px 30px 30px',
  },
  cardContainer: {
    borderRadius: 5,
    boxShadow: 'rgba(222, 222, 222, 0.5) 0px 4px 20px 0px',
  },
}

class MergedTileDefault extends PureComponent {

  render() {
    const {
      author,
      timestamp,
      action,
    } = this.props
    return (
      <Card
        style={styles.cardContainer}
        className='base-tile-container'
      >
        <CardHeader
          title={author.name}
          titleStyle={styles.nameText}
          subtitle={action}
          subtitleStyle={styles.postText}
          style={styles.headerContainer}
          textStyle={styles.textContainer}
          avatar={author.image}
          actAsExpander={true}
          className='merged-tile'
        >
          <span style={styles.timeStamp}> { timestamp } </span>
        </CardHeader>
        <CardText style={styles.contentContainer} className='tile-main-content'>
          {this.props.children}
        </CardText>
      </Card>
    )
  }
}

export default MergedTileDefault
