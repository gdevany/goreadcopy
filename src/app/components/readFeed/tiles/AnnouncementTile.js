import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Card,
  CardText,
} from 'material-ui'
import { Tiles } from '../../../services/api/currentReader'

const styles = {
  container: {
    borderRadius: 5,
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 20px',
    padding: 30,
  },

  subText: {
    margin: 0,
  },
}

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
    this.getAnnouncement(this.props.loginCount)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.loginCount !== nextProps.loginCount) {
      this.getAnnouncement(nextProps.loginCount)
    }
  }

  getAnnouncement(loginCount) {
    if (loginCount) {
      this.setState({ announcement: Welcome })
    } else {
      this.queryAnnouncement()
    }
  }

  queryAnnouncement() {
    getAnnouncements()
      .then((res) => {
        const { title, body, id } = res.data
        if (title && body) {
          this.setState({ announcement: { title, body, id } })
        } else {
          this.setState({ announcement: null })
        }
      })
      .catch(() => this.setState({ announcement: null }))
  }

  handleClose = () => {
    this.setState({ isOpen: false })
    if (this.state.announcement.id) {
      dismissAnnouncement({ id: this.state.announcement.id })
    }
  }

  render() {
    const { isOpen, announcement } = this.state
    if (isOpen && announcement) {
      return (
        <Card className='readfeed-announcement' style={styles.container}>
          <img
            src='./image/close.png'
            className='general-font readfeed-announcement-close'
            onClick={this.handleClose}
            style={styles.close}
          />
          <CardText>
            <h2>{announcement.title}</h2>
            <p style={styles.subText}>{announcement.body}</p>
          </CardText>
        </Card>
      )
    }
    return null
  }
}

const mapStateToProps = ({
  currentReader: {
    loginCount
  }
}) => {
  return {
    loginCount
  }
}

export default connect(mapStateToProps, null)(AnnouncementTile)
