import React, { Component } from 'react'
import { connect } from 'react-redux'

const Welcome = {
  title: 'Welcome to GoRead!',
  body: `This is your Read Feed. You\'ll find 
        books and content from Authors and 
        Readers you follow.`,
}
const Blank = {
  title: '',
  body: ''
}

class AnnouncementTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      announcement: {
        title: '',
        body: ''
      }
    }
  }

  componentWillMount() {
    this.getAnnouncement()
  }

  getAnnouncement() {
    const announcement = this.state.isFirstLogin ? Welcome : Blank
    this.setState({ announcement })
  }

  render() {
    return (
      <div className='text-center'>
        <h2>{this.state.content.title}</h2>
        <p>{this.state.content.body}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFirstLogin: state.currentReader.loginCount === 0
  }
}

export default connect(mapStateToProps, null)(AnnouncementTile)
