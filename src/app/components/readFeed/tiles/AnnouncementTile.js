import React, { Component } from 'react'
import {
  Card,
  CardText,
} from 'material-ui'

class AnnouncementTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: '',
      title: 'Welcome to GoRead!',
      body: `This is your Read Feed. You\'ll find
             books and content from Authors and
             Readers you follow.`,
    }
    this.handleClose = this.handleClose.bind(this)
  }

  componentWillMount = () => {
    this.setState({
      isOpen: true
    })
  }

  handleClose = () => {
    this.setState({
      isOpen: false,
    })
  }

  render() {
    if (this.state.isOpen) {
      return (
        <Card className='readfeed-announcement'>
          <img
            src='./image/close.png'
            className='general-font readfeed-announcement-close'
            onClick={this.handleClose}
          />
          <CardText>
            <h2>{this.state.title}</h2>
            <p>{this.state.body}</p>
          </CardText>
        </Card>
      )
    }
    return null
  }
}

export default AnnouncementTile
