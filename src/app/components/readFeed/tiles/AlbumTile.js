import React, { PureComponent } from 'react'
import TileDefault from '../TileDefault'

const name = 'JK Rowling'
const description = 'posted on her Album'
const profileImage = './image/portrait3.png'
const timestamp = '3 hours ago' // TODO: Need to know how time will be sent over
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
    authorImage: './image/kendunn.jpg',
    commentImage: '.../commentImage/path', // if they posted an image with their post
    timestamp: '3 minutes ago',
    content: 'sooo cool!'
  },
  {
    id: 3,
    name: 'Larry Rules',
    authorImage: './image/kendunn.jpg',
    commentImage: '.../commentImage/path', // if they posted an image with their post
    timestamp: '2 hours ago',
    content: 'This is wow, just wow!',
  },
  {
    id: 5,
    name: 'Berry Shmules',
    authorImage: './image/kendunn.jpg',
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

class AlbumTile extends PureComponent {
  render() {
    return (
      <TileDefault
        name={name}
        description={description}
        profileImage={profileImage}
        timestamp={timestamp}
        likes={likes}
        comments={comments}
        content={content}
      >
        <div className='album-tile-container'>
          <figure className='album-tile-figure'>
            <img className='album-tile-img' src='./image/image.jpg' alt=''/>
          </figure>
        </div>
      </TileDefault>
    )
  }
}

export default AlbumTile
