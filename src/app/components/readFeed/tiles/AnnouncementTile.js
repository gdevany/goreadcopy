import React, { Component } from 'react'

class AnnouncementTile extends Component {
  constructor() {
    super(props)
    this.state = {
      title: 'Welcome to GoRead!',
      body: `This is your Read Feed. You\'ll find 
             books and content from Authors and 
             Readers you follow.`,
    }
  }

  render() {
    return (
      <div className='text-center'>
        <h2>{this.state.title}</h2>
        <p>{this.state.body}</p>
      </div>
    )
  }
}

export default AnnouncementTile
