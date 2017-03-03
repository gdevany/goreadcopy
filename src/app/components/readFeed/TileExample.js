import React, { PureComponent } from 'react'
import TileDefault from './TileDefault'

const name = 'JK Rowling'
const description = 'posted on her page'
const profileImage = './image/portrait3.png'
const timestamp = '3 hours ago' // TODO: Need to know how time will be sent over
const shared = {
  count: 30
}
const likes = {
  count: 10,
  likedByCurrentUser: false
}
const comments = {
  count: 12,
  commentedByCurrentUser: false,
  results: [{
    id: 2,
    name: 'Julia Jules',
    authorImage: '.../image/path',
    commentImage: '.../commentImage/path', // if they posted an image with their post
    timestamp: '3 minutes ago',
    content: 'sooo cool!'
  },
  {
    id: 3,
    name: 'Larry Rules',
    authorImage: '.../image/path',
    commentImage: '.../commentImage/path', // if they posted an image with their post
    timestamp: '2 hours ago',
    content: 'This is wow, just wow!',
  },
  {
    id: 5,
    name: 'Berry Shmules',
    authorImage: '.../image/path',
    commentImage: '.../commentImage/path', // if they posted an image with their post
    timestamp: '5 seconds ago',
    content: 'AMAAAAZING.',
  }
  ]
}

const content = {
  title: 'Best 5 Books in the industry',
  media: './image/bookclub.jpg',
  details: 'These are the 5 best books in the industry!'
}

{/**An example of what a tile would look like using TileDefault **/}
class TileExample extends PureComponent {
  render() {
    return (
      <div className='foobarbaz'>
        <TileDefault
          name={name}
          description={description}
          profileImage={profileImage}
          timestamp={timestamp}
          shared={shared}
          likes={likes}
          comments={comments}
          content={content}
        >
          <h2> {content.title} </h2>
          <img src={content.media} />
          <p> {content.details}</p>
        </TileDefault>
      </div>
    )
  }
}

export default TileExample
