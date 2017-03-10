import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Card,
  CardText,
} from 'material-ui'
import { Tiles } from '../../../services/api/currentReader'

const { getAnnouncements, dismissAnnouncement } = Tiles

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
      isOpen: true,
    }
    this.handleClose = this.handleClose.bind(this)
    this.getAnnouncement = this.getAnnouncement.bind(this)
  }

  componentDidMount() {
    this.getAnnouncement(this.props.isFirstLogin)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isFirstLogin !== nextProps.isFirstLogin) {
      this.getAnnouncement(nextProps.isFirstLogin)
    }
  }

  getAnnouncement(isFirstLogin) {
    if (isFirstLogin) {
      this.setState({ announcement: Welcome })
    } else {
      this.queryAnnouncement()
    }
  }

  queryAnnouncement() {
    getAnnouncements()
      .then(({ data: { title, body, id } }) => {
        this.setState({ announcement: { title, body, id } })
      })
      .catch(() => this.setState({ announcement: null }))
  }

  handleClose = () => {
    this.setState({
      isOpen: false,
    })
    // TO DO: SEND THE ID IN THE CORRECT FORMAT
    if (this.state.announcement.id) {
      dismissAnnouncement({ id: this.state.announcement.id })
    }
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
