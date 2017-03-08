import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Card,
  CardText,
} from 'material-ui'

const Welcome = {
  title: 'Welcome to GoRead!',
  body: `This is your Read Feed. You\'ll find 
        books and content from Authors and 
        Readers you follow.`,
}

class AnnouncementTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: '',
      announcement: null
    }
    this.handleClose = this.handleClose.bind(this)
  }

  componentWillMount = () => {
    this.setState({
      isOpen: true,
      announcement: this.props.isFirstLogin ? Welcome : null
    })
  }

  handleClose = () => {
    this.setState({
      isOpen: false,
    })
  }

  render() {
    if (this.state.isOpen && this.state.announcement) {
      return (
        <Card className='readfeed-announcement'>
          <img
            src='./image/close.png'
            className='general-font readfeed-announcement-close'
            onClick={this.handleClose}
          />
          <CardText>
            <h2>{this.state.announcement.title}</h2>
            <p>{this.state.announcement.body}</p>
          </CardText>
        </Card>
      )
    }
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    isFirstLogin: state.currentReader.loginCount === 0
  }
}

export default connect(mapStateToProps, null)(AnnouncementTile)
